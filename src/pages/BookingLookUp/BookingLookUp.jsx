import React, { useState } from 'react';
import './BookingLookUp.css';
import qrImg from "./../../../imgs/qr.jpg"

function BookingLookUp() {
    const [keyword, setKeyword] = useState("");
    const [bookingResults, setBookingResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const [selectedOrderToCancel, setSelectedOrderToCancel] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const formatCurrency = (amount) => {
        if (!amount) return "0 ₫";
        return Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const cleanKeyword = keyword.trim();
        if (!cleanKeyword) return;

        setErrorMessage("");
        setSuccessMessage("");
        setHasSearched(true);

        try {
            const [resByCode, resByPhone] = await Promise.all([
                fetch(`http://localhost:3000/bookings?bookingCode_like=${cleanKeyword}`),
                fetch(`http://localhost:3000/bookings?phone_like=${cleanKeyword}`)
            ]);

            const dataByCode = await resByCode.json();
            const dataByPhone = await resByPhone.json();

            const combinedBookings = [...dataByCode, ...dataByPhone];
            const uniqueBookings = combinedBookings.filter((value, index, self) =>
                self.findIndex(item => item.id === value.id) === index
            );

            setBookingResults(uniqueBookings.reverse());
        } catch (err) {
            console.error("Lỗi kết nối json-server:", err);
            setBookingResults([]);
            setErrorMessage("Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại kết nối mạng!");
        }
    };

    const getStatusBadge = (status) => {
        const isConfirmed = status === "Đã đặt" || status === "confirmed" || status === "booked";
        const isCancelled = status === "Đã hủy" || status === "cancelled";

        if (isConfirmed) return { label: "Đã đặt", color: "#2e7d32", bgColor: "#e8f5e9" };
        if (isCancelled) return { label: "Đã hủy", color: "#d32f2f", bgColor: "#ffebee" };
        return { label: "Đang xử lý", color: "#ed6c02", bgColor: "#fff3e0" };
    };

    const canCancelBooking = (bookingDateStr) => {
        if (!bookingDateStr) return false;

        const [year, month, day] = bookingDateStr.split('-').map(Number);
        const bookingDate = new Date(year, month - 1, day);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = bookingDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays >= 1;
    };

    const handleCancelClick = (order) => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!canCancelBooking(order.date)) {
            setErrorMessage("Bạn chỉ có thể hủy sân trước ngày chơi ít nhất 1 ngày!");
            return;
        }
        setSelectedOrderToCancel(order);
    };

    const handleConfirmCancel = async () => {
        if (!selectedOrderToCancel) return;
        const order = selectedOrderToCancel;

        try {
            const resBooking = await fetch(`http://localhost:3000/bookings/${order.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'cancelled' })
            });

            if (!resBooking.ok) throw new Error('Cập nhật đơn thất bại');

            const resSlots = await fetch(`http://localhost:3000/timeSlots?date=${order.date}`);
            if (resSlots.ok) {
                const slots = await resSlots.json();
                const updatePromises = slots.map(async (slot) => {
                    if (order.time && order.time.includes(slot.startTime)) {
                        return fetch(`http://localhost:3000/timeSlots/${slot.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: 'cancelled' })
                        });
                    }
                });
                await Promise.all(updatePromises);
            }

            setBookingResults(prev =>
                prev.map(item => item.id === order.id ? { ...item, status: 'cancelled' } : item)
            );

            setSuccessMessage(`Hủy đặt sân thành công cho đơn hàng ${order.bookingCode}!`);
        } catch (err) {
            console.error('Lỗi khi hủy sân:', err);
            setErrorMessage("Có lỗi xảy ra trong quá trình hủy sân. Vui lòng thử lại sau!");
        } finally {
            setSelectedOrderToCancel(null);
        }
    };

    const handleConfirmPayment = async (order) => {
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const res = await fetch(`http://localhost:3000/bookings/${order.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'confirmed' })
            });

            if (!res.ok) throw new Error('Cập nhật trạng thái thanh toán thất bại');

            setBookingResults(prev =>
                prev.map(item => item.id === order.id ? { ...item, status: 'confirmed' } : item)
            );

            setSuccessMessage(`Xác nhận thanh toán thành công cho đơn hàng ${order.bookingCode}! Trạng thái đơn đã chuyển sang Đã đặt.`);
        } catch (err) {
            console.error('Lỗi khi xác nhận thanh toán:', err);
            setErrorMessage("Có lỗi xảy ra khi xác nhận thanh toán. Vui lòng thử lại sau!");
        }
    };

    return (
        <main className="container" style={{ padding: "56px 16px" }}>
            <div className="page-header is-center">
                <h1>Tra cứu đặt sân</h1>
                <p>Nhập mã đặt sân hoặc số điện thoại để kiểm tra trạng thái</p>
            </div>



            <form className="lookup-form" onSubmit={handleSearch}>
                <div className="field-wrap">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="input has-icon"
                        placeholder="VD: SH482910 hoặc 0987654321"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-gold">
                    Tra cứu
                </button>
            </form>

            {errorMessage && (
                <div style={{
                    marginTop: '20px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#ffebee',
                    color: '#d32f2f',
                    border: '1px solid #ffcdd2',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span>⚠️ {errorMessage}</span>
                    <button
                        onClick={() => setErrorMessage("")}
                        style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', fontWeight: 'bold' }}>
                        ✕
                    </button>
                </div>
            )}

            {successMessage && (
                <div style={{
                    marginTop: '20px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#e8f5e9',
                    color: '#2e7d32',
                    border: '1px solid #c8e6c9',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span>✅ {successMessage}</span>
                    <button
                        onClick={() => setSuccessMessage("")}
                        style={{ background: 'none', border: 'none', color: '#2e7d32', cursor: 'pointer', fontWeight: 'bold' }}>
                        ✕
                    </button>
                </div>
            )}

            <div style={{ marginTop: '40px' }}>
                {hasSearched && bookingResults.length === 0 && !errorMessage && (
                    <div style={{ textAlign: 'center', color: '#d32f2f', padding: '20px', border: '1px dashed #d32f2f', borderRadius: '8px', background: '#fdf2f2' }}>
                        Không tìm thấy lịch sử đặt sân nào tương ứng!
                    </div>
                )}

                {bookingResults.length > 0 && (
                    <div>
                        <h3 style={{ marginBottom: '20px', fontWeight: 600 }}>Kết quả tra cứu ({bookingResults.length}):</h3>
                        {bookingResults.map((order) => {
                            const badge = getStatusBadge(order.status);
                            const fullName = `${order.lastName || ''} ${order.firstName || ''}`.trim() || "Chưa cập nhật";
                            const isEligibleToCancel = canCancelBooking(order.date) && order.status !== "cancelled";

                            const isPendingPayment = order.status !== "confirmed" && order.status !== "Đã đặt" && order.status !== "booked" && order.status !== "cancelled" && order.status !== "Đã hủy";

                            return (
                                <div key={order.id} style={{
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    marginBottom: '20px',
                                    background: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                                        <strong>Mã đơn: <span style={{ color: '#0f172a' }}>{order.bookingCode}</span></strong>
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: badge.color,
                                            backgroundColor: badge.bgColor,
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            fontSize: '13px'
                                        }}>
                                            {badge.label}
                                        </span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                                        <p><strong>Khách hàng:</strong> {fullName}</p>
                                        <p><strong>Số điện thoại:</strong> {order.phone || "N/A"}</p>
                                        <p><strong>Địa điểm:</strong> {order.location || "N/A"}</p>
                                        <p><strong>Sân:</strong> {order.court || "N/A"}</p>
                                        <p><strong>Ngày chơi:</strong> {order.date || "N/A"}</p>
                                        <p><strong>Khung giờ:</strong> {order.time || "N/A"}</p>
                                    </div>

                                    {isPendingPayment && (
                                        <div style={{
                                            marginTop: '15px',
                                            padding: '15px',
                                            backgroundColor: '#f8fafc',
                                            borderRadius: '8px',
                                            border: '1px dashed #cbd5e1',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}>
                                            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#334155' }}>
                                                Quét mã QR để thanh toán đơn hàng:
                                            </p>
                                            <img
                                                src={qrImg}
                                                alt="Mã QR Thanh toán"
                                                style={{ width: '180px', height: '180px', objectFit: 'contain', borderRadius: '6px' }}
                                            />
                                            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', textAlign: 'center' }}>
                                                Nội dung chuyển khoản: <strong>{order.bookingCode}</strong>
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => handleConfirmPayment(order)}
                                                style={{
                                                    backgroundColor: '#22c55e',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '10px 20px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    marginTop: '5px'
                                                }}
                                            >
                                                Xác nhận chuyển khoản
                                            </button>
                                        </div>
                                    )}

                                    <div style={{
                                        borderTop: '1px solid #eee',
                                        marginTop: '15px',
                                        paddingTop: '15px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        {order.status !== 'cancelled' && (
                                            <button
                                                type="button"
                                                onClick={() => handleCancelClick(order)}
                                                disabled={!isEligibleToCancel}
                                                style={{
                                                    backgroundColor: isEligibleToCancel ? '#ef4444' : '#cbd5e1',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '8px 16px',
                                                    borderRadius: '6px',
                                                    cursor: isEligibleToCancel ? 'pointer' : 'not-allowed',
                                                    fontWeight: '600',
                                                    fontSize: '14px'
                                                }}
                                                title={!isEligibleToCancel ? "Chỉ được hủy trước ngày chơi ít nhất 1 ngày" : ""}
                                            >
                                                Hủy đặt sân
                                            </button>
                                        )}

                                        <div style={{ fontSize: '16px', marginLeft: 'auto' }}>
                                            <strong>Tổng cộng: </strong>
                                            <span style={{ color: '#b89047', fontSize: '20px', fontWeight: 'bold' }}>
                                                {formatCurrency(order.totalAmount)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {selectedOrderToCancel && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff',
                        padding: '24px',
                        borderRadius: '12px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '700' }}>Xác nhận hủy đặt sân</h3>
                        <p style={{ color: '#475569', fontSize: '14px', marginBottom: '20px' }}>
                            Bạn có chắc chắn muốn hủy đơn đặt sân <strong>{selectedOrderToCancel.bookingCode}</strong> vào ngày <strong>{selectedOrderToCancel.date}</strong> không?
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setSelectedOrderToCancel(null)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: '1px solid #cbd5e1',
                                    background: '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                Bỏ qua
                            </button>
                            <button
                                onClick={handleConfirmCancel}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: '#ef4444',
                                    color: '#fff',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Xác nhận hủy
                            </button>
                        </div>
                    </div>
                    
                </div>
            )}

            
        </main>
    );
}

export default BookingLookUp;