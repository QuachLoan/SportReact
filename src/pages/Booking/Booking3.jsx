import React, {useEffect, useState} from 'react';
import { useParams, useNavigate, Link , useLocation} from 'react-router-dom';
import "./Booking.css";
import {serviceIcon} from "../../../Data/serviceIcon.jsx";

export default function Booking3() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [venues, setVenues] = useState([]);
    const location = useLocation();
    const {selectedSlots, venueId, customerInfo, venueName} = location.state || {};
    const [selectedServices, setSelectedServices] = useState([]);
    const [servicesData, setServicesData] = useState([]);

    const handleGoBack = () => {
        navigate(`/VenueOverView/${venueId}/schedule`);
    };

    useEffect(() => {
        fetch('http://localhost:3000/services')
            .then(res => res.json())
            .then(data => setServicesData(data))
            .catch(err => console.error("Lỗi fetch dữ liệu services:", err));
    }, []);

    const courtAmount = selectedSlots.reduce((total, slot) => total + Number(slot.price || 0), 0);
    const serviceAmount = selectedServices.reduce((total, service) => total + service.price, 0);
    const totalAmount = courtAmount + serviceAmount;

    const handleToggleService = (service) => {
        setSelectedServices(prevServices => {
            const isExisted = prevServices.find(item => item.id === service.id);
            if (isExisted) {
                return prevServices.filter(item => item.id !== service.id);
            } else {
                return [...prevServices, service];
            }
        });
    };

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
                <div className="step-item is-active" data-step-item="3">
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
                            {servicesData.map(service => {
                                const isSelected = selectedServices.some(item => item.id === service.id);
                                return (
                                    <button
                                        key={service.id}
                                        type="button"
                                        className={`service-card ${isSelected ? 'is-active' : ''}`}
                                        onClick={() => handleToggleService(service)}
                                        title={service.description}
                                    >
                                        <div className="service-icon-wrapper">
                                            {serviceIcon[service.id] || <span>⚙️</span>}
                                        </div>

                                        <span className="label">{service.label}</span>
                                        <span className="price">+{service.price.toLocaleString("vi-VN")} ₫</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {/* Điều hướng các bước */}
                    <div className="step-actions">
                        <Link to = "/Booking2" className="btn btn-outline" data-step-prev disabled state={{ selectedSlots, venueId , customerInfo, selectedServices, venueName}}>Quay lại</Link>
                        <Link to = "/Booking4" className="btn btn-primary" data-step-next state={{ selectedSlots, venueId, customerInfo , selectedServices, venueName}}>Tiếp tục</Link>
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