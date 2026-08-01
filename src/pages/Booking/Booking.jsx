import React from 'react';
import {Link, useParams} from 'react-router-dom';

export default function BookingForm() {
    const { id } = useParams();
  return (
    <main className="container" style={{ padding: '40px 16px', maxWidth: '1100px' }}>
      <Link to ={`/VenueOverView/${id}/schedule`} className="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg> 
        Quay lại
      </Link>

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

          {/* Bước 1 */}
          <div className="step-panel is-visible" data-step-panel="1">
            <h2>1. Thông tin khách hàng</h2>
            <div className="form-grid-2">
              <div className="field">
                <label className="field-label">Họ</label>
                <input type="text" className="input" placeholder="Nguyễn" />
              </div>
              <div className="field">
                <label className="field-label">Tên</label>
                <input type="text" className="input" placeholder="Minh Anh" />
              </div>
              <div className="field">
                <label className="field-label">Số điện thoại</label>
                <input type="text" className="input" placeholder="09xx xxx xxx" />
              </div>
              <div className="field">
                <label className="field-label">Email</label>
                <input type="email" className="input" placeholder="ban@email.com" />
              </div>
            </div>
          </div>

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

          {/* Bước 4 */}
          <div className="step-panel" data-step-panel="4">
            <h2>4. Xác nhận &amp; ưu đãi</h2>
            <div className="confirm-box">
              <p><strong>Nguyễn Văn A</strong> · 0901234567 · a@example.com</p>
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
            <button type="button" className="btn btn-outline" data-step-prev disabled>Quay lại</button>
            <button type="button" className="btn btn-primary" data-step-next>Tiếp tục</button>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <aside className="booking-summary-card">
          <h3>Tóm tắt đơn hàng</h3>
          <div className="summary-row">
            <span className="label">Sân A - Mặt cứng · 06:00</span>
            <span className="value">290.000 ₫</span>
          </div>
          <div className="summary-row">
            <span className="label">Sân A - Mặt cứng · 08:00</span>
            <span className="value">290.000 ₫</span>
          </div>
          <div className="summary-total">
            <span className="label">Tổng cộng</span>
            <span className="value">580.000 ₫</span>
          </div>
        </aside>
      </div>
    </main>
  );
}