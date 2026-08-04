import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const VenueRules = () => {
    const { id } = useParams();
    const [venue, setVenue] = useState("");
    const navigate = useNavigate();
        const handleBooking = () => {
            const userCurrently = localStorage.getItem("currentUser");
            if(!userCurrently){          
                navigate('/Login');
            }else{
                navigate(`/VenueOverView/${id}/schedule`);
            }
        }

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
                <Link to="/venues" className="venue-hero-back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </Link>
                <div className="venue-hero-content">
                    <div className="container" style={{ padding: 0 }}>
                        <h1>{venue.name}</h1>
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
                        <Link to={`/VenueOverView/${id}/schedule`} >Lịch trống</Link>
                        <Link to={`/VenueOverView/${id}/reviews`}>Đánh giá</Link>
                        <Link to={`/VenueOverView/${id}/rules`} className="is-active">Quy định</Link>
                    </nav>
                    <Button onClick={handleBooking}  className="btn btn-gold btn-sm venue-tabs-book-btn">
                        Đặt sân ngay
                    </Button>
                </div>
            </div>

            <main className="container" style={{ padding: '40px 16px' }}>
                <h2 style={{ marginBottom: '4px', fontSize: '20px', fontWeight: 700 }}>
                    Quy định tại The Platinum Arena
                </h2>
                <p style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--navy-500)' }}>
                    Vui lòng đọc kỹ trước khi đặt sân để có trải nghiệm tốt nhất.
                </p>

                <div className="rules-list">
                    <div className="rule-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                            <line x1={12} y1={9} x2={12} y2={13} />
                            <line x1={12} y1={17} x2={12.01} y2={17} />
                        </svg>
                        <p>Vui lòng có mặt trước giờ đặt 10 phút để làm thủ tục check-in.</p>
                    </div>

                    <div className="rule-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                            <line x1={12} y1={9} x2={12} y2={13} />
                            <line x1={12} y1={17} x2={12.01} y2={17} />
                        </svg>
                        <p>Huỷ lịch miễn phí trước 24 giờ, huỷ trễ hơn sẽ mất 50% giá trị đặt sân.</p>
                    </div>

                    <div className="rule-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                            <line x1={12} y1={9} x2={12} y2={13} />
                            <line x1={12} y1={17} x2={12.01} y2={17} />
                        </svg>
                        <p>Không mang đồ ăn, thức uống có cồn vào khu vực thi đấu.</p>
                    </div>

                    <div className="rule-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                            <line x1={12} y1={9} x2={12} y2={13} />
                            <line x1={12} y1={17} x2={12.01} y2={17} />
                        </svg>
                        <p>Trang phục và giày thể thao phù hợp là bắt buộc khi vào sân.</p>
                    </div>

                    <div className="rule-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                            <line x1={12} y1={9} x2={12} y2={13} />
                            <line x1={12} y1={17} x2={12.01} y2={17} />
                        </svg>
                        <p>Trẻ em dưới 12 tuổi cần có người lớn đi kèm.</p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default VenueRules;