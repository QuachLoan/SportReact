import React, { useState } from 'react';
import { useParams, useNavigate, Link , useLocation} from 'react-router-dom';
import "./Booking.css";

export default function Booking3() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [venues, setVenues] = useState([]);
    const location = useLocation();

    const handleGoBack = () => {
        // Nếu có id hợp lệ thì chuyển về trang schedule tương ứng,
        // ngược lại sẽ dùng navigate(-1) để quay về trang vừa xem
        navigate(-1);
    };

    const [selectedSlots, setSelectedSlots] = useState(
        location.state?.selectedSlots || []
    );

    const totalAmount = selectedSlots.reduce((total, slot) => total + Number(slot.price || 0), 0);


    return (
        <main className="container" style={{ padding: '40px 16px', maxWidth: '1100px' }}>
            {/* Sử dụng button thay vì Link để xử lý linh hoạt */}
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
                <div className="step-item is-active" data-step-item="1">
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
                <div className="step-item" data-step-item="4">
                    <div className="step-col">
                        <div className="step-circle">4</div>
                        <span className="step-label">Xác nhận</span>
                    </div>
                </div>
            </div>

            <div className="booking-layout">
                <div className="booking-form-card">
                    {/* Bước 3 */}
                    <div className="step-panel" data-step-panel="3">
                        <h2>3. Dịch vụ bổ sung</h2>
                        <div className="service-grid">
                            <button type="button" className="service-card" data-service-card>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m14.4 14.4-4.8-4.8" />
                                    <path d="M18.657 21.485a2 2 0 1 1-2.829-2.829l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.829 2.829z" />
                                    <path d="m21.5 21.5-1.4-1.4" />
                                    <path d="m3.9 3.9-1.4-1.4" />
                                    <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
                                </svg>
                                <span className="label">Thiết bị</span>
                                <span className="price">+50.000 ₫</span>
                            </button>
                            <button type="button" className="service-card" data-service-card>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18h6" />
                                    <path d="M10 22h4" />
                                    <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z" />
                                </svg>
                                <span className="label">Đèn chiếu sáng</span>
                                <span className="price">+30.000 ₫</span>
                            </button>
                            <button type="button" className="service-card" data-service-card>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <span className="label">Tủ đồ</span>
                                <span className="price">+20.000 ₫</span>
                            </button>
                            <button type="button" className="service-card" data-service-card>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                </svg>
                                <span className="label">Dịch vụ khác</span>
                                <span className="price">+15.000 ₫</span>
                            </button>
                        </div>
                    </div>
                    {/* Điều hướng các bước */}
                    <div className="step-actions">
                        <Link to = "/Booking2" className="btn btn-outline" data-step-prev disabled state={{ selectedSlots }}>Quay lại</Link>
                        <Link to = "/Booking4" className="btn btn-primary" data-step-next state={{ selectedSlots }}>Tiếp tục</Link>
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
                    <div className="summary-total">
                        <span className="label">Tổng cộng</span>
                        <span className="value">{totalAmount.toLocaleString("vi-VN")} ₫</span>
                    </div>
                </aside>
            </div>
        </main>
    )
}