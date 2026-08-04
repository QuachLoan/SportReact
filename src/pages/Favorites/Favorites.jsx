import './Favorites.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
    const [favouriteVenues, setFavouriteVenues] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userStr = localStorage.getItem('currentUser');
        if (!userStr) {
            setLoading(false);
            return;
        }

        try {
            const user = JSON.parse(userStr);
            setCurrentUser(user);

            const favoriteIds = user.favorites || [];

            if (favoriteIds.length === 0) {
                setFavouriteVenues([]);
                setLoading(false);
                return;
            }

            fetch('http://localhost:3000/venues')
                .then(res => res.json())
                .then(allVenues => {
                    const favs = allVenues.filter(venue => favoriteIds.includes(venue.id));
                    setFavouriteVenues(favs);
                })
                .catch(err => console.error("Lỗi lấy danh sách venues:", err))
                .finally(() => setLoading(false));
        } catch (error) {
            console.error("Lỗi đọc dữ liệu user:", error);
            setLoading(false);
        }
    }, []);

    const updateFavoritesOnServer = async (newFavIds) => {
        if (!currentUser) return;

        const updatedUser = { ...currentUser, favorites: newFavIds };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);

        try {
            await fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ favorites: newFavIds })
            });
        } catch (error) {
            console.error("Lỗi cập nhật server:", error);
        }
    };

    const removeFavourite = (venueId) => {
        const currentFavIds = currentUser.favorites || [];
        const newFavIds = currentFavIds.filter(id => id !== venueId);
        setFavouriteVenues(prev => prev.filter(v => v.id !== venueId));
        updateFavoritesOnServer(newFavIds);
    };

    const removeAllFavourites = () => {
        setFavouriteVenues([]);
        updateFavoritesOnServer([]);
    };

    if (loading) {
        return (
            <main className="container" style={{ padding: '40px 16px 170px' }}>
                <p>Đang tải danh sách yêu thích...</p>
            </main>
        );
    }

    if (!currentUser) {
        return (
            <main className="container" style={{ padding: '40px 16px 170px' }}>
                <div className="empty-state">
                    <h3>Vui lòng đăng nhập</h3>
                    <p>Bạn cần đăng nhập để xem danh sách sân yêu thích của mình.</p>
                    <Link to="/Login" className="btn btn-primary">Đăng nhập ngay</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="container" style={{ padding: '40px 16px 170px' }}>
            <div className="favorites-head">
                <span className="icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
                    </svg>
                </span>
                <div>
                    <h1>Sân yêu thích</h1>
                    <p>{favouriteVenues.length} sân đã lưu</p>
                    {favouriteVenues.length > 0 && (
                        <button onClick={removeAllFavourites} className="btn btn-primary">Xóa tất cả</button>
                    )}
                </div>
            </div>

            {favouriteVenues.length > 0 ? (
                <div className="grid grid-3">
                    {favouriteVenues.map((venue) => (
                        <article key={venue.id} className="venue-card">
                            <Link to={`/VenueOverView/${venue.id}`} className="venue-card-media" style={{ display: 'block' }}>
                                <img
                                    src={venue.image}
                                    alt={venue.name}
                                />
                                {venue.status === 'available' && (
                                    <span className="badge badge-success" style={{ position: 'absolute', left: '12px', top: '12px', zIndex: 2 }}>
                                        Còn trống hôm nay
                                    </span>
                                )}
                            </Link>
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
                                    <Link to={`/VenueOverView/${venue.id}`}><h3>{venue.name}</h3></Link>
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
                    <Link to="/Venues" className="btn btn-primary">Khám phá sân</Link>
                </div>
            )}
        </main>
    );
}

export default Favorites;