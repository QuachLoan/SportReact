import React, {useState,useEffect} from 'react';
import './Home.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
    // state
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const navigate = useNavigate();
    const [topVenues, setTopVenues] = useState([]);

    // function
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyWord.trim()){
            navigate(`/Venues?q=${encodeURIComponent(searchKeyWord)}`);
        }
        else{
            navigate('/Venues');
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/venues")
            .then(response => response.json())
            .then(data => {
                const sortedAndSliced = [...data]
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3);
                setTopVenues(sortedAndSliced);
            })
            .catch(error => console.error("Lỗi gọi data:", error));
    }, []);

    return (
        <>
            <main>
                <section className="hero">
                    <div className="hero-media">
                        <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1600&h=1000&q=80" alt="Sân tennis cao cấp" />
                    </div>
                    <div className="container">
                        <div className="hero-content">
                            <span className="hero-eyebrow">NỀN TẢNG ĐẶT SÂN CAO CẤP #1</span>
                            <h1 className="hero-title">Đặt sân thể thao <span className="accent">đẳng cấp</span> chỉ trong vài giây</h1>
                            <p className="hero-desc">Hơn 200 cụm sân tennis, bóng rổ, cầu lông và bóng đá được tuyển chọn kỹ lưỡng — sẵn sàng cho trận đấu tiếp theo của bạn.</p>

                            <form className="search-box is-lg" style={{ maxWidth: '560px' }} onSubmit = {handleSearch}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input type="text" name="q" placeholder="Tìm theo tên sân, khu vực..." value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value)}/>
                                <button type="submit">Tìm kiếm</button>
                            </form>

                            <div className="hero-stats">
                                <div><strong>200+</strong> cụm sân</div>
                                <div><strong>50K+</strong> lượt đặt/tháng</div>
                                <div><strong>4.8/5</strong> đánh giá trung bình</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section container">
                    <div className="grid grid-3">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                                    <polyline points="9 12 11 14 15 10" />
                                </svg>
                            </div>
                            <h3>Đặt sân minh bạch</h3>
                            <p>Giá niêm yết rõ ràng, không phụ phí ẩn, hoàn tiền linh hoạt.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <h3>Xác nhận tức thì</h3>
                            <p>Nhận mã QR check-in ngay sau khi thanh toán thành công.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m12 3-1.9 5.8L4 11l6.1 2.2L12 19l1.9-5.8L20 11l-6.1-2.2Z" />
                                </svg>
                            </div>
                            <h3>Chất lượng tuyển chọn</h3>
                            <p>Mọi cụm sân đều được kiểm định kỹ càng trước khi lên hệ thống.</p>
                        </div>
                    </div>
                </section>

                <section className="section-sm container">
                    <h2 className="section-eyebrow">Khám phá theo môn thể thao</h2>
                    <div className="tag-cloud">
                        <Link to="/venues?q=tennis" className="tag">Tennis</Link>
                        <Link to="/venues?q=basketball" className="tag">Bóng rổ</Link>
                        <Link to="/venues?q=badminton" className="tag">Cầu lông</Link>
                        <Link to="/venues?q=football" className="tag">Bóng đá</Link>
                        <Link to="/venues?q=pickleball" className="tag">Pickleball</Link>
                    </div>
                </section>

               <section className="section container">
                    <div className="section-head">
                        <div>
                            <h2>Sân nổi bật</h2>
                            <p>Được lựa chọn nhiều nhất trong tuần qua</p>
                        </div>
                        <Link to="/Venues" className="btn btn-outline">
                            Xem tất cả
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-3">
                        {topVenues.map((venue) => (
                            <article key={venue.id} className="venue-card">
                                <Link to ={`/VenueOverView/${venue.id}`} className="venue-card-media" style={{ display: 'block' }}>
                                    <img
                                        src={
                                            venue.image
                                        }
                                        alt={venue.name}
                                    />
                                    {venue.status === 'available' && (
                                        <span className="badge badge-success" style={{ position: 'absolute', left: '12px', top: '12px', zIndex: 2 }}>
                                                            Còn trống hôm nay
                                                        </span>
                                    )}
                                </Link>
                                <div className="venue-card-body">
                                    <div className="venue-card-title-row">
                                        <Link to={`/VenueOverView/${venue.id}`}><h3>{venue.name}</h3></Link>
                                        <span className="rating">
                                                            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                                            <strong>{venue.rating || "5.0"}</strong>
                                                        </span>
                                    </div>

                                    <p className="venue-location">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {' '}{venue.address || venue.surface}
                                    </p>

                                    <div className="venue-card-footer">
                                        <div className="venue-price">
                                            {venue.minPrice ? (
                                                <>
                                                    <span className="from">Từ </span>
                                                    <span className="amount">{Number(venue.minPrice).toLocaleString()} ₫</span>
                                                    <span className="unit">/giờ</span>
                                                </>
                                            ) : (
                                                <span className="amount" style={{ fontSize: '14px', color: '#888' }}>Liên hệ</span>
                                            )}
                                        </div>
                                        <span className="badge badge-gold">{venue.reviewCount || 0} đánh giá</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="cta-banner">
                    <div className="container cta-grid">
                        <div>
                            <span className="hero-eyebrow">DÀNH CHO DOANH NGHIỆP</span>
                            <h2>Tổ chức giải đấu nội bộ cùng SportHub</h2>
                            <p>Đặt trọn gói nhiều sân, quản lý lịch thi đấu và nhận ưu đãi riêng cho khách hàng doanh nghiệp.</p>
                            <a href="pages/venues.html" className="btn btn-gold btn-lg">Liên hệ tư vấn</a>
                        </div>
                        <div className="cta-images">
                            <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&h=600&q=80" alt="The Platinum Arena" />
                            <img src="https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?auto=format&fit=crop&w=800&h=600&q=80" alt="The Plainum Arena" />
                            <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&h=600&q=80" alt="The Pelinum Arena" />
                        </div>
                    </div>
                </section>

                <section className="section container">
                    <div className="section-head">
                        <h2>Tin tức & mẹo hay</h2>
                        <a href="pages/news.html" className="btn btn-outline">
                            Xem thêm
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>
                    <div className="grid grid-4">
                        <a href="pages/news-detail.html" className="news-card">
                            <div className="news-card-media">
                                <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&h=600&q=80" alt="5 mẹo khởi động trước khi chơi tennis" />
                                <span className="badge">Mẹo hay</span>
                            </div>
                            <div className="news-card-body">
                                <h3>5 mẹo khởi động trước khi chơi tennis giúp tránh chấn thương</h3>
                                <p className="date">6 giờ trước</p>
                            </div>
                        </a>
                        <a href="pages/news-detail.html" className="news-card">
                            <div className="news-card-media">
                                <img src="https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&h=600&q=80" alt="SportHub tổ chức giải bóng rổ doanh nghiệp mùa hè 2026" />
                                <span className="badge">Sự kiện</span>
                            </div>
                            <div className="news-card-body">
                                <h3>SportHub tổ chức giải bóng rổ doanh nghiệp mùa hè 2026</h3>
                                <p className="date">1 ngày trước</p>
                            </div>
                        </a>
                        <a href="pages/news-detail.html" className="news-card">
                            <div className="news-card-media">
                                <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&h=600&q=80" alt="Hướng dẫn đặt sân nhanh chỉ trong 3 bước trên SportHub" />
                                <span className="badge">Hướng dẫn</span>
                            </div>
                            <div className="news-card-body">
                                <h3>Hướng dẫn đặt sân nhanh chỉ trong 3 bước trên SportHub</h3>
                                <p className="date">2 ngày trước</p>
                            </div>
                        </a>
                        <a href="pages/news-detail.html" className="news-card">
                            <div className="news-card-media">
                                <img src="https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&h=600&q=80" alt="Chế độ dinh dưỡng lý tưởng cho người chơi thể thao thường xuyên" />
                                <span className="badge">Sức khỏe</span>
                            </div>
                            <div className="news-card-body">
                                <h3>Chế độ dinh dưỡng lý tưởng cho người chơi thể thao thường xuyên</h3>
                                <p className="date">3 ngày trước</p>
                            </div>
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
}