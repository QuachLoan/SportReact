import React, { useState } from 'react';
import { useParams, useNavigate , Link, useLocation} from 'react-router-dom';
import "./Booking.css";

export default function Booking2() {
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [venues, setVenues] = useState([]);

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
                    {/* Bước 2 */}
                    <div className="step-panel" data-step-panel="2">
                        <h2>2. Thông tin đặt sân</h2>
                        <div className="booking-slot-row">
                            <div>
                                <p className="name">Sân A - Mặt cứng</p>
                                <p className="meta">26/07/2026 · 06:00</p>
                            </div>
                            <p className="price">290.000 ₫</p>
                        </div>
                        <div className="booking-slot-row">
                            <div>
                                <p className="name">Sân A - Mặt cứng</p>
                                <p className="meta">26/07/2026 · 08:00</p>
                            </div>
                            <p className="price">290.000 ₫</p>
                        </div>
                    </div>

                    {/* Điều hướng các bước */}
                    <div className="step-actions">
                        <Link to = "/Booking1" className="btn btn-outline" data-step-prev disabled state={{ selectedSlots }}>Quay lại</Link>
                        <Link to = "/Booking3" className="btn btn-primary" data-step-next state={{ selectedSlots }}>Tiếp tục</Link>
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