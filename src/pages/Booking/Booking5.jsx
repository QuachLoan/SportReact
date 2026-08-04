import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import "./Booking.css";

export default function Booking5() {
    const location = useLocation();
    const bookingCode = `SH${Math.floor(100000 + Math.random() * 900000)}`

    const {
        selectedSlots = [],
        selectedServices = [],
        appliedVoucher = null,
    } = location.state || {};

    const courtAmount = selectedSlots.reduce((total, slot) => total + Number(slot.price || 0), 0);
    const serviceAmount = selectedServices.reduce((total, service) => total + Number(service.price || 0), 0);
    const initialTotalAmount = courtAmount + serviceAmount;

    const discountAmount = appliedVoucher
        ? (initialTotalAmount * Number(appliedVoucher.discount || 0)) / 100
        : 0;

    const finalTotalAmount = Math.max(0, initialTotalAmount - discountAmount);

    return (
        <main className="container" style={{ padding: '40px 16px', maxWidth: '700px' }}>
            <div className="success-card">
                <div className="success-icon">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>
                <h1>Đặt sân thành công!</h1>
                <p>
                    Mã đặt sân của bạn là{' '}
                    <strong style={{ color: 'var(--navy-900, #0f172a)' }}>{bookingCode}</strong>. Xuất trình mã QR bên dưới tại quầy lễ tân để check-in.
                </p>

                <div className="qr-mock">
                    <span className="on"></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span className="on"></span>
                    <span></span>
                    <span className="on"></span>
                    <span></span>
                </div>

                <div className="success-summary-box">
                    <h3
                        style={{
                            marginBottom: '16px',
                            fontFamily: 'var(--font-display)',
                            fontSize: '16px',
                            fontWeight: 700,
                        }}
                    >
                        Tóm tắt đơn hàng
                    </h3>

                    {selectedSlots.length === 0 ? (
                        <p>Chưa chọn sân nào</p>
                    ) : (
                        selectedSlots.map((slot) => (
                            <div className="summary-row" key={slot.id}>
                                <span className="label">
                                    {slot.courtName} · {slot.startTime}
                                </span>
                                <span className="value">
                                    {Number(slot.price || 0).toLocaleString("vi-VN")} ₫
                                </span>
                            </div>
                        ))
                    )}

                    {selectedServices.map((service) => (
                        <div className="summary-row" key={service.id}>
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
                    <button type="button" className="btn btn-outline">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Tải phiếu đặt sân
                    </button>
                    <Link to="/" className="btn btn-primary">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Về trang chủ
                    </Link>
                </div>
            </div>
        </main>
    );
}