import {useParams, Link, useOutletContext} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "./VenueOverView.css";

export default function VenueOverview() {
    // state
    const { id } = useParams();
    const [venue, setVenue] = useState("");
    const [loading, setLoading] = useState(true);

    // function
    const formatCurrency = (amount) => {
        if (!amount) return "Liên hệ";
        return Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/venues/${id}`)
            .then(response => {
                if (!response.ok) throw new Error("Không tìm thấy sân");
                return response.json();
            })
            .then(data => {
                setVenue(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi gọi data chi tiết sân:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px', fontSize: '16px' }}>Đang tải dữ liệu...</div>;
    }

    if (!venue) {
        return <div style={{ textAlign: 'center', padding: '40px', fontSize: '16px', color: 'red' }}>Không tìm thấy thông tin sân thể thao này!</div>;
    }
    return (
        <div className="w-full">

            {/* ============ 1. KHỐI BANNER LỚN DÀN ĐỀU (venue-hero) ============ */}
            <div className="venue-hero">
                <img
                    src={venue.image}
                    alt={venue.name}
                />
                {/* Nút quay lại (venue-hero-back) */}
                <Link to="/venues" className="venue-hero-back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </Link>
                {/* Nội dung đè lên banner (venue-hero-content) */}
                <div className="venue-hero-content">
                    <div className="container" style={{ padding: 0 }}>
                        <h1>{venue.name}</h1>
                        <div className="venue-hero-meta">
              <span>
                <svg className="star" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                </svg>
                <strong>{venue.rating}</strong>
              </span>
                            <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                                {venue.address}
              </span>
                            <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                                {venue.openTime} – {venue.closeTime}
              </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============ 2. BANNER TAB ĐIỀU HƯỚNG (venue-tabs-bar) ============ */}
            <div className="venue-tabs-bar">
                <div className="container venue-tabs-inner">
                    <nav className="venue-tabs">
                        <Link to="" className="is-active">Tổng quan</Link>
                        <Link to="court">Sân</Link>
                        <Link to="schedule">Lịch trống</Link>
                        <Link to="reviews">Đánh giá</Link>
                        <Link to="rule">Quy định</Link>
                    </nav>
                    <Link to="schedule" className="btn btn-gold btn-sm venue-tabs-book-btn">
                        Đặt sân ngay
                    </Link>
                </div>
            </div>

            {/* ============ 3. LƯỚI CHIA CỘT THÔNG TIN (venue-detail-grid) ============ */}
            <main className="container" style={{ padding: '40px 16px' }}>
                <div className="venue-detail-grid">

                    {/* CỘT TRÁI: NỘI DUNG CHI TIẾT */}
                    <div>
                        {/* Section Giới thiệu */}
                        <section className="detail-section">
                            <h2>Giới thiệu</h2>
                            <p>{venue.description || "Chưa có mô tả cho sân này."}</p>
                            <div style={{ marginTop: '16px', fontSize: '14px', color: 'var(--navy-500)' }}>
                                <p style={{ marginBottom: '4px' }}>📍 Địa chỉ: {venue.address}</p>
                                <p style={{ marginBottom: '4px' }}>📞 Điện thoại: {venue.phone}</p>
                                <p>⏰ Giờ mở cửa: {venue.openTime} - {venue.closeTime}</p>
                            </div>
                        </section>

                        {/* Section Tiện ích (amenity-grid) */}
                        <section className="detail-section">
                            <h2>Tiện ích</h2>
                            <div className="amenity-grid">
                                {venue?.facilities && venue.facilities.length > 0 ? (
                                    venue.facilities.map((a) => (
                                        <div key={a} className="amenity-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                                <polyline points="22 4 12 14.01 9 11.01"/>
                                            </svg>
                                            {/* Giữ nguyên logic hiển thị tên tiện ích cũ của bạn */}
                                            Tiện ích số {a}
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ fontSize: '14px', color: 'var(--navy-400)', gridColumn: 'span 2' }}>
                                        Chưa có thông tin tiện ích.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Section Hình ảnh sân (gallery-grid) */}
                        <section className="detail-section">
                            <h2>Hình ảnh</h2>
                            <div className="gallery-grid">
                                {venue?.gallery && venue.gallery.length > 0 ? (
                                    venue.gallery.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`${venue.name} ${i + 1}`}
                                        />
                                    ))
                                ) : (
                                    <img
                                        src={venue.image}
                                        alt={venue.name}
                                    />
                                )}
                            </div>
                        </section>

                        {/* Section Bảng giá sân (price-table) */}

                    </div>

                    {/* CỘT PHẢI: SIDEBAR ĐẶT SÂN (sticky-booking-card) */}
                    <aside className="sticky-booking-card">
                        <p className="price-from">Giá thuê sân từ</p>
                        <p className="price-amount">
                            {formatCurrency ? formatCurrency(venue.minPrice) : venue.minPrice}
                            <span>/giờ</span>
                        </p>
                        <Link to="schedule" className="cta-link">
                            Xem lịch &amp; đặt sân
                        </Link>
                        <p className="note">Miễn phí huỷ trước 24 giờ</p>
                    </aside>

                </div>
            </main>
        </div>
    );
}