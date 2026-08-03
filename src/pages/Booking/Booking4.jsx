import React, { useState } from 'react';
import { useParams, useNavigate, Link , useLocation} from 'react-router-dom';
import "./Booking.css";

export default function Booking4() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [venues, setVenues] = useState([]);
    const location = useLocation();
    const {selectedSlots, venueId, formData, selectedServices} = location.state || {};

    const handleGoBack = () => {
        navigate(`/VenueOverView/${venueId}/schedule`);
    };

    const courtAmount = selectedSlots.reduce((total, slot) => total + Number(slot.price || 0), 0);
    const serviceAmount = selectedServices.reduce((total, service) => total + service.price, 0);
    const totalAmount = courtAmount + serviceAmount;


    return (
        <main className="container" style={{ padding: '40px 16px', maxWidth: '1100px' }}>
            <button
                type="button"
                onClick={handleGoBack}
                className="back-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Quay lại
            </button>

            {/* Stepper */}
            <div className="stepper">
                <div className="step-item " data-step-item="1">
                    <div className="step-col">
                        <div className="step-circle">1</div>
                        <span className="step-label">Thông tin khách hàng</span>
                    </div>
                    <div className="step-line"></div>
                </div>
                <div className="step-item" data-step-item="2">
                    <div className="step-col">
                        <div className="step-circle">2</div>
                        <span className="step-label">Thông tin đặt sân</span>
                    </div>
                    <div className="step-line"></div>
                </div>
                <div className="step-item" data-step-item="3">
                    <div className="step-col">
                        <div className="step-circle">3</div>
                        <span className="step-label">Dịch vụ thêm</span>
                    </div>
                    <div className="step-line"></div>
                </div>
                <div className="step-item is-active" data-step-item="4">
                    <div className="step-col">
                        <div className="step-circle">4</div>
                        <span className="step-label">Xác nhận</span>
                    </div>
                </div>
            </div>

            <div className="booking-layout">
                <div className="booking-form-card">
                    {/* Bước 4 */}
                    <div className="step-panel" data-step-panel="4">
                        <h2>4. Xác nhận &amp; ưu đãi</h2>
                        <div className="confirm-box">
                            <p>
                                <strong>{`${formData.lastName || ''} ${formData.firstName || ''}`}</strong>
                                {" · "}
                                {formData.phone }
                                {" · "}
                                {formData.email }
                            </p>
                        </div>
                        <div className="field">
                            <label className="field-label">Mã giảm giá</label>
                            <div className="coupon-row">
                                <div className="field-wrap">
                                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42Z" />
                                        <circle cx="7.5" cy="7.5" r="1.5" />
                                    </svg>
                                    <input type="text" className="input has-icon" placeholder="Nhập mã ưu đãi" />
                                </div>
                                <button type="button" className="btn btn-outline">Áp dụng</button>
                            </div>
                            <p className="coupon-success">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                Đã áp dụng mã "SPORTHUB10" — giảm 10%
                            </p>
                        </div>
                    </div>
                    {/* Điều hướng các bước */}
                    <div className="step-actions">
                        <Link to = "/Booking3" className="btn btn-outline" data-step-prev disabled state={{ selectedSlots, venueId }}>Quay lại</Link>
                        <Link to = "/Booking4" className="btn btn-primary" data-step-next>Tiếp tục</Link>
                    </div>
                </div>

                {/* Tóm tắt đơn hàng */}
                <aside className="booking-summary-card">
                    <h3>Tóm tắt đơn hàng</h3>
                    {selectedSlots.length === 0 ? (
                        <p>Chưa chọn sân nào</p>
                    ) : (
                        selectedSlots.map(slot => (
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
                    {selectedServices.map(service => (
                        <div className="summary-row" key={service.id} style={{ color: '#666', fontStyle: 'italic' }}>
                            <span className="label">+ Dịch vụ: {service.label}</span>
                            <span className="value">+{service.price.toLocaleString("vi-VN")} ₫</span>
                        </div>
                    ))}
                    <div className="summary-total">
                        <span className="label">Tổng cộng</span>
                        <span className="value">{totalAmount.toLocaleString("vi-VN")} ₫</span>
                    </div>
                </aside>
            </div>
        </main>
    )
}