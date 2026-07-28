import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

const VenueReviews = () => {
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
                        <Link to={`/VenueOverView/${id}/schedule`}>Lịch trống</Link>
                        <Link to={`/VenueOverView/${id}/reviews`} className="is-active">Đánh giá</Link>
                        <Link to={`/VenueOverView/${id}/rules`}>Quy định</Link>
                    </nav>
                    <a href="schedule.html" className="btn btn-gold btn-sm venue-tabs-book-btn">Đặt sân ngay</a>
                </div>
            </div>

            <main className="container" style={{ padding: '40px 16px' }}>
                <div className="venue-detail-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '40px' }}>
                        <div className="listing-layout" style={{ gridTemplateColumns: '300px 1fr' }}>
                            <aside className="review-summary-card">
                                <div className="review-score">
                                    <p className="number">4.9</p>
                                    <div className="stars">
                                        <svg className="filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                        <svg className="filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                        <svg className="filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                        <svg className="filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                        <svg className="filled" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                    </div>
                                    <p className="count">214 đánh giá</p>
                                </div>
                                <div>
                                    <div className="review-bar-row">
                                        <span style={{ width: '12px' }}>5</span>
                                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                        <span class="review-bar-track"><span class="review-bar-fill" style={{ width: '40%' }}></span></span>
                                        <span style={{ width: '20px', textAlign: 'right' }}>2</span>
                                    </div>
                                    <div className="review-bar-row">
                                        <span style={{ width: '12px' }}>4</span>
                                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                        <span class="review-bar-track"><span class="review-bar-fill" style={{ width: '60%' }}></span></span>
                                        <span style={{ width: '20px', textAlign: 'right' }}>3</span>
                                    </div>
                                    <div className="review-bar-row">
                                        <span style={{ width: '12px' }}>3</span>
                                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                        <span class="review-bar-track"><span class="review-bar-fill" style={{ width: '0%' }}></span></span>
                                        <span style={{ width: '20px', textAlign: 'right' }}>0</span>
                                    </div>
                                    <div className="review-bar-row">
                                        <span style={{ width: '12px' }}>2</span>
                                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                        <span class="review-bar-track"><span class="review-bar-fill" style={{ width: '0%' }}></span></span>
                                        <span style={{ width: '20px', textAlign: 'right' }}>0</span>
                                    </div>
                                    <div className="review-bar-row">
                                        <span style={{ width: '12px' }}>1</span>
                                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                        <span class="review-bar-track"><span class="review-bar-fill" style={{ width: '0%' }}></span></span>
                                        <span style={{ width: '20px', textAlign: 'right' }}>0</span>
                                    </div>
                                </div>
                            </aside>

                            <div className="review-list-card">
                                <div className="review-item">
                                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80" alt="Nguyễn Minh Anh" />
                                    <div className="review-item-body">
                                        <div className="review-item-head"><span className="name">Nguyễn Minh Anh</span><span className="time">1 ngày trước</span></div>
                                        <span className="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg><strong>4.0</strong></span>
                                        <p className="comment">Sân đẹp, ánh sáng tốt, đặt lịch qua app rất nhanh và tiện lợi.</p>
                                    </div>
                                </div>
                                <div className="review-item">
                                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&h=200&q=80" alt="Trần Quốc Bảo" />
                                    <div className="review-item-body">
                                        <div className="review-item-head"><span className="name">Trần Quốc Bảo</span><span className="time">2 ngày trước</span></div>
                                        <span className="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg><strong>5.0</strong></span>
                                        <p className="comment">Nhân viên hỗ trợ nhiệt tình, mặt sân chất lượng tốt hơn mong đợi.</p>
                                    </div>
                                </div>
                                <div className="review-item">
                                    <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&h=200&q=80" alt="Lê Thị Hồng" />
                                    <div className="review-item-body">
                                        <div className="review-item-head"><span className="name">Lê Thị Hồng</span><span className="time">4 ngày trước</span></div>
                                        <span className="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg><strong>4.0</strong></span>
                                        <p className="comment">Giá hợp lý so với chất lượng, sẽ quay lại vào tuần sau.</p>
                                    </div>
                                </div>
                                <div className="review-item">
                                    <img src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=200&h=200&q=80" alt="Phạm Văn Đức" />
                                    <div className="review-item-body">
                                        <div className="review-item-head"><span className="name">Phạm Văn Đức</span><span className="time">5 ngày trước</span></div>
                                        <span className="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg><strong>5.0</strong></span>
                                        <p className="comment">Không gian sang trọng, bãi đỗ xe rộng rãi, rất đáng tiền.</p>
                                    </div>
                                </div>
                                <div className="review-item">
                                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80" alt="Đỗ Thu Trang" />
                                    <div className="review-item-body">
                                        <div className="review-item-head"><span className="name">Đỗ Thu Trang</span><span className="time">7 ngày trước</span></div>
                                        <span className="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg><strong>4.0</strong></span>
                                        <p className="comment">Đặt sân dễ dàng, thanh toán online tiện, chỉ tiếc là hơi đông vào cuối tuần.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default VenueReviews;