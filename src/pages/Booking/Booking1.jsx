import React, { useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import "./Booking.css";

export default function Booking1() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [venues, setVenues] = useState([]);
    const location = useLocation();
    const {selectedSlots, venueId, venueName} = location.state || {};
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        phone: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    const handleGoBack = () => {
        navigate(`/VenueOverView/${venueId}/schedule`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        let tempErrors = {};

        const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.lastName.trim()) {
            tempErrors.lastName = "Họ không được để trống";
        }

        if (!formData.firstName.trim()) {
            tempErrors.firstName = "Tên không được để trống";
        }

        if (!formData.phone.trim()) {
            tempErrors.phone = "Số điện thoại không được để trống";
        } else if (!phoneRegex.test(formData.phone)) {
            tempErrors.phone = "Số điện thoại không hợp lệ (cần 10 chữ số)";
        }

        if (!formData.email.trim()) {
            tempErrors.email = "Email không được để trống";
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Định dạng Email không đúng";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleNext = (e) => {
        e.preventDefault();

        if (validateForm()) {
            navigate('/Booking2', {
                state: {
                    selectedSlots,
                    venueId,
                    customerInfo: formData,
                    venueName
                }
            });
        }
    };

    const totalAmount = selectedSlots.reduce((total, slot) => total + Number(slot.price || 0), 0);

    return (
        <main className="container" style={{ padding: '40px 16px', maxWidth: '1100px' }}>
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
                <form onSubmit={handleNext} className="booking-form-card">

                    {/* Bước 1 */}
                    <div className="step-panel is-visible" data-step-panel="1">
                        <h2>1. Thông tin khách hàng</h2>
                        <div className="form-grid-2">

                            <div className="field">
                                <label className="field-label">Họ *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className={`input ${errors.lastName ? 'input-error' : ''}`}
                                    placeholder="Ngô"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                            </div>

                            <div className="field">
                                <label className="field-label">Tên *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className={`input ${errors.firstName ? 'input-error' : ''}`}
                                    placeholder="Đại Lâm"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>

                            <div className="field">
                                <label className="field-label">Số điện thoại *</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className={`input ${errors.phone ? 'input-error' : ''}`}
                                    placeholder="09xx xxx xxx"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                            </div>

                            <div className="field">
                                <label className="field-label">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`input ${errors.email ? 'input-error' : ''}`}
                                    placeholder="ban@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>

                        </div>
                    </div>

                    {/* Điều hướng các bước */}
                    <div className="step-actions" style={{ marginTop: '24px' }}>
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={handleGoBack}
                        >
                            Quay lại
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Tiếp tục
                        </button>
                    </div>
                </form>
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
    );
}

