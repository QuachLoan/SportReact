import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import "./Booking.css";
import qrImg from "./../../../imgs/qr.jpg"; // Import ảnh QR trực tiếp để tránh lỗi đường dẫn tĩnh

export default function Booking5() {
    const location = useLocation();
    const isPosted = useRef(false);

    const [bookingData] = useState(() => {
        if (location.state && Object.keys(location.state).length > 0) {
            sessionStorage.setItem('lastBookingData', JSON.stringify(location.state));
            return location.state;
        }
        const saved = sessionStorage.getItem('lastBookingData');
        return saved ? JSON.parse(saved) : {};
    });

    const [bookingCode] = useState(() => `SH${Math.floor(100000 + Math.random() * 900000)}`);
    const [createdBookingId, setCreatedBookingId] = useState(null); // Lưu ID đơn hàng để PATCH khi xác nhận
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const {
        selectedSlots = [],
        selectedServices = [],
        appliedVoucher = null,
        customerInfo = {},
        venueName
    } = bookingData;

    const courtAmount = selectedSlots.reduce((total, slot) => total + Number(slot.price || 0), 0);
    const serviceAmount = selectedServices.reduce((total, service) => total + Number(service.price || 0), 0);
    const initialTotalAmount = courtAmount + serviceAmount;
    const discountAmount = appliedVoucher ? (initialTotalAmount * Number(appliedVoucher.discount || 0)) / 100 : 0;
    const finalTotalAmount = Math.max(0, initialTotalAmount - discountAmount);

    const courtNames = selectedSlots.map(slot => slot.courtName || slot.name).join(', ');
    const times = selectedSlots.map(slot => slot.startTime || slot.time).join(', ');

    const getTodayFormatted = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const bookingDate = selectedSlots[0]?.date || getTodayFormatted();

    useEffect(() => {
        if (!bookingData || Object.keys(bookingData).length === 0 || isPosted.current) {
            return;
        }

        const createBooking = async () => {
            isPosted.current = true;
            setIsSaving(true);

            const newBooking = {
                bookingCode: bookingCode,
                lastName: customerInfo.lastName || "",
                firstName: customerInfo.firstName || "",
                location: venueName || "Chưa xác định",
                date: bookingDate,
                phone: customerInfo.phone || "",
                court: courtNames || "Chưa xác định",
                time: times || "Chưa xác định",
                status: "pending", // Ban đầu lưu là pending
                totalAmount: finalTotalAmount,
                createdAt: new Date().toISOString()
            };

            try {
                // Lưu booking mới vào database
                const response = await fetch('http://localhost:3000/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newBooking),
                });

                if (response.ok) {
                    const savedBooking = await response.json();
                    setCreatedBookingId(savedBooking.id); // Lưu ID đơn đặt sân
                }

                // Lưu/Cập nhật các slot thành pending
                const slotPromises = selectedSlots.map(async (slot) => {
                    if (String(slot.id).startsWith('virtual-')) {
                        return fetch('http://localhost:3000/timeSlots', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                courtId: slot.courtId,
                                startTime: slot.startTime,
                                date: slot.date || bookingDate,
                                status: "pending",
                                price: slot.price
                            })
                        });
                    } else {
                        return fetch(`http://localhost:3000/timeSlots/${slot.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: "pending" })
                        });
                    }
                });

                await Promise.all(slotPromises);

                if (response.ok) {
                    setSaveStatus('success');
                } else {
                    setSaveStatus('error');
                }
            } catch (error) {
                setSaveStatus('error');
                console.error('Lỗi khi khởi tạo đơn hàng:', error);
            } finally {
                setIsSaving(false);
            }
        };

        createBooking();
    }, [bookingData, bookingCode, customerInfo, venueName, bookingDate, courtNames, times, finalTotalAmount, selectedSlots]);

    const handleConfirmTransfer = async () => {
        setIsConfirming(true);
        try {
            if (createdBookingId) {
                await fetch(`http://localhost:3000/bookings/${createdBookingId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: "booked" })
                });
            }
            const timeSlotsRes = await fetch('http://localhost:3000/timeSlots');
            const allTimeSlots = await timeSlotsRes.json();
            const updatePromises = selectedSlots.map(async (slot) => {
                let targetSlotId = slot.id;
                if (String(slot.id).startsWith('virtual-')) {
                    const matchedSlot = allTimeSlots.find(
                        ts => ts.courtId === slot.courtId &&
                            ts.startTime === slot.startTime &&
                            ts.date === (slot.date || bookingDate)
                    );
                    if (matchedSlot) {
                        targetSlotId = matchedSlot.id;
                    }
                }

                if (targetSlotId && !String(targetSlotId).startsWith('virtual-')) {
                    return fetch(`http://localhost:3000/timeSlots/${targetSlotId}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: "booked" })
                    });
                }
            });

            await Promise.all(updatePromises);
            setIsConfirmed(true);
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đã chuyển khoản:', error);
            alert('Có lỗi xảy ra khi xác nhận chuyển khoản. Vui lòng thử lại!');
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <main className="container" style={{ padding: '40px 16px', maxWidth: '700px' }}>
            <div className="success-card">
                <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>
                <h1>{isConfirmed ? "Xác nhận chuyển khoản thành công!" : "Đặt sân thành công!"}</h1>
                <p>
                    Mã đặt sân của bạn là{' '}
                    <strong style={{ color: 'var(--navy-900, #0f172a)' }}>{bookingCode}</strong>. Xuất trình mã QR bên dưới tại quầy lễ tân để check-in.
                </p>

                {isSaving && <p style={{ color: '#0284c7', fontSize: '14px', textAlign: 'center' }}>Đang tạo đơn hàng...</p>}
                {saveStatus === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center' }}>⚠️ Không thể lưu đơn hàng vào JSON Server.</p>
                )}

                <div
                    className="qr-container"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        margin: '24px 0'
                    }}
                >
                    <img
                        src={qrImg}
                        alt="Mã QR Check-in"
                        style={{
                            width: '180px',
                            height: '180px',
                            objectFit: 'contain',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            padding: '8px',
                            background: '#ffffff',
                            display: 'block'
                        }}
                    />
                </div>

                <div className="success-summary-box">
                    <h3 style={{ marginBottom: '16px', fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>
                        Tóm tắt đơn hàng
                    </h3>

                    {selectedSlots.length === 0 ? (
                        <p>Chưa chọn sân nào</p>
                    ) : (
                        selectedSlots.map((slot) => (
                            <div className="summary-row" key={slot.id || Math.random()}>
                                <span className="label">{slot.courtName || slot.name} · {slot.startTime || slot.time}</span>
                                <span className="value">{Number(slot.price || 0).toLocaleString("vi-VN")} ₫</span>
                            </div>
                        ))
                    )}

                    {selectedServices.map((service) => (
                        <div className="summary-row" key={service.id || Math.random()}>
                            <span className="label">+ Dịch vụ: {service.label}</span>
                            <span className="value">+{Number(service.price || 0).toLocaleString("vi-VN")} ₫</span>
                        </div>
                    ))}

                    {appliedVoucher && (
                        <div className="summary-row discount">
                            <span className="label">Giảm giá ({appliedVoucher.discount}%)</span>
                            <span className="value">-{discountAmount.toLocaleString("vi-VN")} ₫</span>
                        </div>
                    )}

                    <div className="summary-total">
                        <span className="label">Tổng cộng</span>
                        <span className="value">{finalTotalAmount.toLocaleString("vi-VN")} ₫</span>
                    </div>
                </div>

                <div className="success-actions">
                    {isConfirmed ? (
                        <button type="button" className="btn btn-outline" disabled style={{ backgroundColor: '#e2e8f0', color: '#1e293b', borderColor: '#cbd5e1' }}>
                            ✓ Đã xác nhận chuyển khoản
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={handleConfirmTransfer}
                            disabled={isConfirming || isSaving}
                        >
                            {isConfirming ? "Đang xác nhận..." : "Xác nhận đã chuyển khoản"}
                        </button>
                    )}

                    <Link to="/" className="btn btn-primary">
                        Về trang chủ
                    </Link>
                </div>
            </div>
        </main>
    );
}