import {useParams, Link, useOutletContext, useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "./VenueOverView.css";
import { h1 } from 'framer-motion/client';
import Button from 'react-bootstrap/Button';

export default function VenueOverview() {
    // state
    const { id } = useParams();
    const [venue, setVenue] = useState("");
    const [loading, setLoading] = useState(true);
    const [court,setCourt] = useState([]);
    const [venues, setVenues] = useState([]);
    const [facilitiesData, setFacilitiesData] = useState([]);
    const navigate = useNavigate();
    const handleBooking = () => {
        const userCurrently = localStorage.getItem("currentUser");
        if(!userCurrently){
            navigate('/Login');
        }
        else{
            navigate(`/VenueOverView/${id}/schedule`);
        }
    }
    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:3000/venues`)
            .then(res => res.json())
            .then(data => setVenues(data))
            .catch(err => console.error("Lỗi fetch danh sách sân:", err));

        fetch(`http://localhost:3000/facilities`)
            .then(res => res.json())
            .then(data => setFacilitiesData(data))
            .catch(err => console.error("Lỗi fetch danh mục tiện ích:", err));

        fetch(`http://localhost:3000/venues/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Không tìm thấy sân");
                return res.json();
            })
            .then(data => {
                setVenue(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi gọi data chi tiết sân:", error);
                setLoading(false);
            });

        fetch(`http://localhost:3000/courts?venueId=${id}`)
            .then(res => res.json())
            .then(data => setCourt(data))
            .catch(err => console.error("Lỗi fetch danh sách court:", err));

    }, [id]);

    // function
    const formatCurrency = (amount) => {
        if (!amount) return "Liên hệ";
        return Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

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
                        <Link to="rules">Quy định</Link>
                    </nav>
                    {/* <Link onClick={handleBooking}  className="btn btn-gold btn-sm venue-tabs-book-btn">
                        Đặt sân ngay
                    </Link> */}
                     <Button onClick={handleBooking}  className="btn btn-gold btn-sm venue-tabs-book-btn">
                        Đặt sân ngay
                    </Button>
                
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
                               <p style={{ marginBottom: '4px' }}>
                                    <i className="bi bi-geo-alt-fill"></i> Địa chỉ: {venue.address}
                                    </p>

                                    <p style={{ marginBottom: '4px' }}>
                                    <i className="bi bi-telephone-fill"></i> Điện thoại: {venue.phone}
                                    </p>

                                    <p>
                                    <i className="bi bi-clock-fill"></i> Giờ mở cửa: {venue.openTime} - {venue.closeTime}
                                    </p>
                            </div>
                        </section>

                        {/* Section Tiện ích (amenity-grid) */}
                        <section className="detail-section">
                            <h2>Tiện ích</h2>
                            <div className="amenity-grid">
                                {venue?.facilities && venue.facilities.length > 0 ? (
                                    venue.facilities.map((facilityId) => {
                                        const matchedFacility = facilitiesData.find(f => f.id === Number(facilityId));
                                        if (!matchedFacility) return null;
                                        return (
                                            <div key={facilityId} className="amenity-item">
                                                <i className={matchedFacility.icon} style={{ marginRight: '8px', fontSize: '18px' }}></i>
                                                <span>{matchedFacility.name}</span>
                                            </div>
                                        );
                                    })
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
                        <Button onClick={handleBooking} className="cta-link">
                            Xem lịch &amp; đặt sân
                        </Button>
                        <p className="note">Miễn phí huỷ trước 24 giờ</p>
                    </aside>
                    

        <section class="detail-section">
                <h2>Bảng giá sân</h2>
                <div class="table-wrap">
                    <table class="price-table">
                    <thead>
                        <tr><th>Loại sân</th><th>Bộ môn</th><th style={{ textAlign: 'right' }}>Giá / giờ</th></tr>
                    </thead>
                    <tbody>
                        {
                            court.map(x=>(
                         <tr>
                            <td class="name">{x.surface}</td>
                            <td>{x.name}</td>
                            <td class="price">{formatCurrency(x.pricePerHour) } </td>
                          </tr>

                            ))
                        }
                    </tbody>
                    </table>
                </div>
        </section>
        


        <section class="span-2">
        <h2 style={{marginBottom: '20px',fontSize: '20px',fontWeight: 700}}>Sân liên quan</h2>
        <div class="grid grid-4">
          {/* <article class="venue-card">
            <a href="venue-detail.html" class="venue-card-media" style={{display:'block'}}>
              <img src="https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?auto=format&fit=crop&w=1200&h=900&q=80" alt="The Plainum Arena" />
              <span class="badge badge-success" style={{position:'absolute left:12px top:12px z-index:2'}}>Còn trống hôm nay</span>
            </a>
            <button class="venue-fav" data-favorite-toggle aria-label="Yêu thích"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg></button>
            <div class="venue-card-body">
              <div class="venue-card-title-row"><a href="venue-detail.html"><h3>The Plainum Arena</h3></a><span class="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg><strong>4.7</strong></span></div>
              <p class="venue-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> Bình Thạnh</p>
              <div class="venue-card-footer"><div class="venue-price"><span class="from">Từ </span><span class="amount">350.000 ₫</span><span class="unit">/giờ</span></div><span class="badge badge-gold">156 đánh giá</span></div>
            </div>
          </article> */}
          
          {
          venues.slice(0,4).map(x=>(
          
           <article className="venue-card">
  <Link to={`/VenueOverView/${x.id}`} className="venue-card-media" style={{ display: 'block' }}>
    <img src={x.image} alt={x.name || "The Platinum Arena"} />
  </Link>
            <button class="venue-fav" data-favorite-toggle aria-label="Yêu thích"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg></button>
            <div class="venue-card-body">
              <div class="venue-card-title-row"><a href="venue-detail.html"><h3>{x.name}</h3></a><span class="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg><strong>{x.rating}</strong></span></div>
              <p class="venue-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> {x.district}</p>
              <div class="venue-card-footer"><div class="venue-price"><span class="from">Từ </span><span class="amount">{ formatCurrency ( x.minPrice) }</span><span class="unit">/giờ</span></div><span class="badge badge-gold">{x.reviewCount} đánh giá</span></div>
            </div>
          </article>

          ))}
       
        </div>
      </section>
                </div>
            </main>
        </div>
    );
}