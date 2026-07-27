import React, { useEffect, useState } from 'react';
import './Venue.css';
import { useSearchParams } from 'react-router-dom';

export default function Venue() {
    //state
    const [venues, setVenues] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyWord = searchParams.get('q') || '';
    const selectedSport = searchParams.get('sport') || '';
    const selectedArea = searchParams.get('area') || '';
    const maxPrice = searchParams.get('maxPrice') || '200000';
    const [searchInput, setSearchInput] = useState(keyWord);

    //function
    useEffect(() => {
        fetch('http://localhost:3000/venues')
            .then(response => response.json())
            .then(data => {
                console.log("Dữ liệu thực tế React nhận được:", data);
                setVenues(data);
            })
            .catch(error => console.error("Lỗi gọi data:", error));
    }, []);

    useEffect(() => {
        setSearchInput(keyWord);
    }, [keyWord]);

    const updateFilters = (newParams) => {
        const current = Object.fromEntries(searchParams.entries());
        const updated = { ...current, ...newParams };
        Object.keys(updated).forEach(key => {
            if (!updated[key]) delete updated[key];
        });
        setSearchParams(updated);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        updateFilters({ q: searchInput.trim() });
    };

    const filterSearchInput = venues.filter((venue) => {
        if (keyWord.trim()) {
            const query = keyWord.toLowerCase().trim();
            const resultName = venue.name ? venue.name.toLowerCase().includes(query) : false;
            const resultAddress = venue.address ? venue.address.toLowerCase().includes(query) : false;
            const resultSport = venue.sport ? venue.sport.toLowerCase().includes(query) : false;
            if (!(resultName || resultAddress || resultSport)) return false;
        }
        if (selectedSport) {
            const venueSport = venue.sport ? venue.sport.toLowerCase() : '';
            const venueName = venue.name ? venue.name.toLowerCase() : '';
            if (venueSport !== selectedSport.toLowerCase() && !venueName.includes(selectedSport.toLowerCase())) {
                return false;
            }
        }
        if (selectedArea) {
            const venueAddress = venue.address ? venue.address.toLowerCase() : '';
            if (!venueAddress.includes(selectedArea.toLowerCase())) {
                return false;
            }
        }
        if (venue.minPrice && Number(venue.minPrice) > Number(maxPrice)) {
            return false;
        }
        return true;
    });

    return (
        <>
            {/* ============ MAIN CONTENT ============ */}
            <main className="container" style={{ paddingTop: '40px', paddingBottom: '56px' }}>
                <div className="page-header" style={{ padding: '0 0 32px' }}>
                    <h1>Danh sách sân thể thao</h1>
                    <p>{filterSearchInput.length} sân phù hợp với tìm kiếm của bạn</p>
                </div>

                <form className="search-row" onSubmit={handleSearchSubmit}>
                    <div className="search-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input type="text" placeholder="Tìm sân, khu vực..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <button type="submit">Tìm kiếm</button>
                    </div>
                    <button type="button" className="btn btn-outline filter-toggle-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="21" y1="4" x2="14" y2="4" /><line x1="10" y1="4" x2="3" y2="4" /><line x1="21" y1="12" x2="12" y2="12" />
                            <line x1="8" y1="12" x2="3" y2="12" /><line x1="21" y1="20" x2="16" y2="20" /><line x1="12" y1="20" x2="3" y2="20" />
                            <line x1="14" y1="2" x2="14" y2="6" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="16" y1="18" x2="16" y2="22" />
                        </svg>
                        Lọc
                    </button>
                </form>

                <div className="listing-layout">
                    {/* ============ FILTERS (desktop) ============ */}
                    <aside className="filters-panel desktop-filters">
                        <div>
                            <h3>Môn thể thao</h3>
                            <select
                                className="select"
                                value={selectedSport}
                                onChange={(e) => updateFilters({ sport: e.target.value })}
                            >
                                <option value="">Tất cả môn</option>
                                <option value="tennis">Tennis</option>
                                <option value="basketball">Bóng rổ</option>
                                <option value="badminton">Cầu lông</option>
                                <option value="football">Bóng đá</option>
                                <option value="pickleball">Pickleball</option>
                            </select>
                        </div>
                        <div>
                            <h3>Khu vực</h3>
                            <select
                                className="select"
                                value={selectedArea}
                                onChange={(e) => updateFilters({ area: e.target.value })}
                            >
                                <option value="">Tất cả khu vực</option>
                                <option value="Cầu Giấy">Cầu Giấy</option>
                                <option value="Thanh Xuân">Thanh Xuân</option>
                                <option value="Ba Đình">Ba Đình</option>
                                <option value="Hoàng Mai">Hoàng Mai</option>
                                <option value="Tây Hồ">Tây Hồ</option>
                                <option value="Long Biên">Long Biên</option>
                                <option value="Đống Đa">Đống Đa</option>
                                <option value="Nam Từ Liêm">Nam Từ Liêm</option>
                                <option value="Hà Đông">Hà Đông</option>
                                <option value="Hoàn Kiếm">Hoàn Kiếm</option>
                            </select>
                        </div>
                        <div>
                            <div className="filter-price-row">
                                <h3 style={{ margin: 0 }}>Mức giá tối đa</h3>
                                <span>{Number(maxPrice).toLocaleString()} ₫</span>
                            </div>
                            <input
                                type="range"
                                className="range"
                                min="50000"
                                max="200000"
                                step="10000"
                                value={maxPrice}
                                onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                            />
                        </div>
                        <div>
                            <h3>Đánh giá</h3>
                            <div className="rating-filter-list">
                                <button type="button" className="rating-chip">4.5+ ★</button>
                                <button type="button" className="rating-chip">4.0+ ★</button>
                                <button type="button" className="rating-chip">3.5+ ★</button>
                            </div>
                        </div>
                        <label className="checkbox-row filter-divider">
                            <input type="checkbox" />
                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--navy-700)' }}>Còn trống hôm nay</span>
                        </label>
                    </aside>

                    {/* ============ RESULTS ============ */}
                    <div>
                        <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '24px' }}>
                            <div className="grid grid-3">
                                {filterSearchInput.length > 0 ? (
                                    filterSearchInput.map((venue) => (
                                        <article key={venue.id} className="venue-card">
                                            <a href={`/venue/${venue.id}`} className="venue-card-media" style={{ display: 'block' }}>
                                                <img
                                                    src={
                                                        venue.image
                                                            ? `${window.location.origin}/${venue.image.replace(/^\//, '')}`
                                                            : venue.name.includes('bóng đá') ? '/imgs/football1.jpg'
                                                                : venue.name.includes('pickleball') ? '/imgs/pickleball.jpg'
                                                                    : venue.name.includes('tennis') ? '/imgs/tennis1.jpg'
                                                                        : venue.name.includes('cầu lông') ? '/imgs/badminton1.jpg'
                                                                            : venue.name.includes('bóng rổ') ? '/imgs/basketball1.jpg'
                                                                                : '/imgs/football1.jpg'
                                                    }
                                                    alt={venue.name}
                                                />
                                                {venue.status === 'available' && (
                                                    <span className="badge badge-success" style={{ position: 'absolute', left: '12px', top: '12px', zIndex: 2 }}>
                                                        Còn trống hôm nay
                                                    </span>
                                                )}
                                            </a>

                                            <button className="venue-fav" aria-label="Yêu thích">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                                    ))
                                ) : (
                                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: '#666' }}>
                                        Không tìm thấy sân nào phù hợp với các bộ lọc hiện tại.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Phân trang */}
                        <div className="pagination">
                            <button className="nav-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button className="is-active">1</button>
                            <button className="nav-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}