import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

export default function VenueSchedule() {
    const { id } = useParams();
    const [venue, setVenue] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/venues/${id}`)
            .then(response => response.json())
            .then(data => {
                setVenue(data);
            })
            .catch(error => console.error("Lỗi gọi data:", error));
    }, [id]);

    if (!venue) {
        return <div className="container" style={{ padding: '40px' }}>Đang tải thông tin sân...</div>;
    }
    return (
        <>
            <div className="venue-hero">
                <img src={venue.image} alt="The Platinum Arena" />
                <a href="venues.html" className="venue-hero-back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </a>
                <div className="venue-hero-content">
                    <div className="container" style={{ padding: 0 }}>
                        <h1>The Platinum Arena</h1>
                        <div className="venue-hero-meta">
              <span>
                <svg className="star" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
                <strong>{venue.rating}</strong>
              </span>
                            <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>{' '}
                                {venue.address}
              </span>
                            <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>{' '}
                                {venue.openTime} - {venue.closeTime}
              </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="venue-tabs-bar">
                <div className="container venue-tabs-inner">
                    <nav className="venue-tabs">
                        <Link to={`/VenueOverView/${id}`}>Tổng quan</Link>
                        <Link to={`/VenueOverView/${id}/court`}>Sân</Link>
                        <Link to={`/VenueOverView/${id}/schedule`} className="is-active">Lịch trống</Link>
                        <Link to={`/VenueOverView/${id}/reviews`}>Đánh giá</Link>
                        <Link to={`/VenueOverView/${id}/rules`}>Quy định</Link>
                    </nav>
                    <Link to={`/VenueOverView/${id}/schedule`} className="btn btn-gold btn-sm venue-tabs-book-btn">
                        Đặt sân ngay
                    </Link>
                </div>
            </div>

            <main className="container" style={{ padding: '40px 16px' }}>
                <div className="schedule-head">
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Lịch trống — The Platinum Arena</h2>
                        <p style={{ fontSize: '14px', color: 'var(--navy-500)' }}>Chọn khung giờ để đặt sân</p>
                    </div>
                    <div className="date-switcher">
                        <button type="button">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <span className="current-date">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>{' '}
                            Chủ Nhật, 26/07
            </span>
                        <button type="button">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="schedule-legend">
                    <span><span className="legend-dot available"></span> Trống</span>
                    <span><span className="legend-dot selected"></span> Đã chọn</span>
                    <span><span className="legend-dot pending"></span> Chờ xử lý</span>
                    <span><span className="legend-dot booked"></span> Đã đặt</span>
                </div>

                <div className="schedule-layout">
                    <div className="schedule-table-wrap">
                        <table className="schedule-table">
                            <thead>
                            <tr>
                                <th>Sân</th>
                                <th>06:00</th><th>07:00</th><th>08:00</th><th>09:00</th><th>10:00</th><th>11:00</th>
                                <th>12:00</th><th>13:00</th><th>14:00</th><th>15:00</th><th>16:00</th><th>17:00</th>
                                <th>18:00</th><th>19:00</th><th>20:00</th><th>21:00</th><th>22:00</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Sân A - Mặt cứng</td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-pending" disabled>Chờ xử lý</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-selected">Đã chọn</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-pending" disabled>Chờ xử lý</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                            </tr>
                            <tr>
                                <td>Sân B - Mặt cứng</td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-pending" disabled>Chờ xử lý</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-selected">Đã chọn</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                            </tr>
                            <tr>
                                <td>Sân C - VIP có mái che</td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-pending" disabled>Chờ xử lý</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                            </tr>
                            <tr>
                                <td>Sân D - Mặt cứng</td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-pending" disabled>Chờ xử lý</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-booked" disabled>Đã đặt</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-available">Trống</button></td>
                                <td><button className="slot-btn slot-pending" disabled>Chờ xử lý</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <aside className="booking-summary-card">
                        <h3>Tóm tắt đơn hàng</h3>
                        <div className="summary-row">
                            <span className="label">Sân A - Mặt cứng · 18:00</span>
                            <span className="value">290.000 ₫</span>
                        </div>
                        <div className="summary-row">
                            <span className="label">Sân B - Mặt cứng · 18:00</span>
                            <span className="value">290.000 ₫</span>
                        </div>
                        <div className="summary-total">
                            <span className="label">Tổng cộng</span>
                            <span className="value">580.000 ₫</span>
                        </div>
                        <a href="booking.html" className="btn btn-gold btn-block" style={{ marginTop: '20px' }}>
                            Tiếp tục đặt sân
                        </a>
                    </aside>
                </div>
            </main>
        </>
    );
}