import './Favorites.css';
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function Favorites() {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            setFavourites(JSON.parse(saved));
        }
    }, []);

    const removeFavourite = (id) => {
        const updatedFavourites = favourites.filter(fav => fav.id !== id);
        setFavourites(updatedFavourites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavourites));
    };

    const removeAllFavourites = () => {
        setFavourites([]);
        localStorage.setItem('favorites', JSON.stringify([]));
    }

    return (
        <>
            <main className="container" style={{ padding: '40px 16px 170px' }}>
                <div className="favorites-head">
                    <span className="icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
                        </svg>
                    </span>
                    <div>
                        <h1>Sân yêu thích</h1>
                        <p>{favourites.length} sân đã lưu</p>
                        <button onClick={() => removeAllFavourites()} className="btn btn-primary">Xóa tât cả</button>
                    </div>
                </div>

                {favourites.length > 0 ? (
                    <div className="grid grid-3">
                        {favourites.map((venue) => (
                            <article key={venue.id} className="venue-card">
                                <a href={`/venue/${venue.id}`} className="venue-card-media" style={{ display: 'block' }}>
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
                                </a>
                                <button
                                    className="venue-fav is-active"
                                    aria-label="Bỏ yêu thích"
                                    onClick={() => removeFavourite(venue.id)}
                                    style={{ color: 'red', fill: 'red' }}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
                                    </svg>
                                </button>
                                <div className="venue-card-body">
                                    <div className="venue-card-title-row">
                                        <a href={`/venue/${venue.id}`}><h3>{venue.name}</h3></a>
                                        <span className="rating">
                                            <svg viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                                            </svg>
                                            <strong>{venue.rating || "5.0"}</strong>
                                        </span>
                                    </div>
                                    <p className="venue-location">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                            <circle cx="12" cy="10" r="3" />
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
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
                            </svg>
                        </div>
                        <h3>Chưa có sân yêu thích</h3>
                        <p>Nhấn biểu tượng trái tim trên sân bạn thích để lưu lại tại đây.</p>
                        <Link to="/venues" className="btn btn-primary">Khám phá sân</Link>
                    </div>
                )}
            </main>
        </>
    );
}

export default Favorites;