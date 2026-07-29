import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import './VenueCourt.css'
export default function VenueCourt() {
    const [venue, setVenue] = React.useState(null);
    const [court, setCourt] = useState([])
    const [sport,setSport] = useState([])
    const { id } = useParams();

     useEffect(() => {
        fetch(`http://localhost:3000/venues/${id}`)
            .then(res => res.json())
            .then(data => {
            setVenue(data);

                data.sports.map(sid =>
                fetch(`http://localhost:3000/sports/${sid}`).then(res => res.json())
            ).then(sportList => setSport(sportList));
            });
        }, [id]);

    useEffect(() => {
    fetch(`http://localhost:3000/courts?venueId=${id}`)
        .then(res => res.json())
        .then(data => setCourt(data));
    }, [id]);

        const formatCurrency = (amount) => {
        if (!amount) return "Liên hệ";
        return Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    if (!venue) {
        return <div className="container" style={{ padding: '40px' }}>Đang tải thông tin sân...</div>;
    }
    return (
        <div className="w-full">
            {/* ============ VENUE HERO BANNER ============ */}
            <div className="venue-hero">
                <img
                    src={venue.image}
                    alt = {venue.name}
                />
                <Link to="/venues" className="venue-hero-back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points={"15 18 9 12 15 6"}/>
                    </svg>
                </Link>
                <div className="venue-hero-content">
                    <div className="container" style={{ padding: 0 }}>
                        <h1>{venue.name}</h1>
                        <div className="venue-hero-meta">
              <span>
                <svg className="star" viewBox="0 0 24 24">
                  <path d={"M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"}/>
                </svg>
                <strong>{venue.rating}</strong>
              </span>
                            <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {venue.address}
              </span>
                            <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points={"12 6 12 12 16 14"}/>
                </svg>
                                {venue.openTime} - {venue.closeTime}
              </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============ NAVIGATION TABS BAR ============ */}
            <div className="venue-tabs-bar">
                <div className="container venue-tabs-inner">
                    <nav className="venue-tabs">
                        {/* Dùng id lấy từ useParams() hoặc từ state venue.id */}
                        <Link to={`/VenueOverView/${id}`}>Tổng quan</Link>
                        <Link to={`/VenueOverView/${id}/court`} className="is-active">Sân</Link>
                        <Link to={`/VenueOverView/${id}/schedule`}>Lịch trống</Link>
                        <Link to={`/VenueOverView/${id}/reviews`}>Đánh giá</Link>
                        <Link to={`/VenueOverView/${id}/rules`}>Quy định</Link>
                    </nav>
                    <Link to={`/VenueOverView/${id}/schedule`} className="btn btn-gold btn-sm venue-tabs-book-btn">
                        Đặt sân ngay
                    </Link>
                </div>
            </div>

            <main className="container" style={{ padding: '40px 16px' }}>
                <h2 style={{ marginBottom: '4px', fontSize: '20px', fontWeight: 700 }}>
                    {venue.name}
                </h2>
                <p style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--navy-500)' }}>
                    Chọn sân phù hợp và đặt nhanh, hoặc xem toàn bộ lịch trống.
                </p>
                    {/* <div class="grid grid-3">
                    <div class="court-card">
                        <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=200&h=200&q=80" alt="Sân B" />
                        <div class="court-card-body">
                        <p class="name">Sân B - Mặt cứng</p>
                        <p class="sport">Tennis</p>
                        <p class="capacity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> Sức chứa 4 người</p>
                        <div class="court-card-footer">
                            <span class="price">290.000 ₫<span>/giờ</span></span>
                            <a href="booking.html" class="btn btn-gold btn-sm">Đặt nhanh</a>
                        </div>
                        </div>
                    </div>   
                    </div> */}
                    <div className="grid grid-3">
                    {court.map(x => (
                        <div key={x.id} className="court-card">
                        {venue && <img src={venue.image} alt={venue.name} />}
                        <div className="court-card-body">
                            <p className="name">{x.name}</p>
                            <p className="sport">
                            {sport.find(s => s.id === x.sportId)?.name}
                            </p>
                            <p className="capacity">Sức chứa {x.capacity} người</p>
                            <div className="court-card-footer">
                            <span className="price">{formatCurrency ? formatCurrency ( x.pricePerHour) : x.pricePerHour} ₫<span>/giờ</span></span>
                            <a href="booking.html" className="btn btn-gold btn-sm">Đặt nhanh</a>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>

            </main>
         
        </div>
    );
}