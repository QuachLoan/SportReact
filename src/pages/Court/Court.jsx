import React, {useEffect, useState} from 'react';
import './Court.css';
import { useSearchParams, Link } from 'react-router-dom';

export default function Court() {
    //state
    const [courtData, setCourtData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyWord = searchParams.get('q') || '';
    const [searchInput, setSearchInput] = useState(keyWord);

    //function
    useEffect(() => {
        fetch('http://localhost:5000/courtData')
            .then(response => response.json())
            .then(data => {
                setCourtData(data);
            })
            .catch(error => console.error("Lỗi gọi data:", error));
    }, []);

    const filterSearchInput = courtData.filter((court) => {
        const resultName = court.name.toLowerCase().includes(keyWord.toLowerCase());
        const resultLocation = court.location.toLowerCase().includes(keyWord.toLowerCase());
        return resultName || resultLocation;
    })

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()){
            setSearchParams({q: searchInput.trim()});
        }
        else{
            setSearchParams({});
        }
    }

    useEffect(() => {
        setSearchInput(keyWord);
    }, [keyWord]);
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
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input type="text" placeholder="Tìm sân, khu vực..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                        <button type="submit">Tìm kiếm</button>
                    </div>
                    <button type="button" className="btn btn-outline filter-toggle-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/><line x1="21" y1="12" x2="12" y2="12"/>
                            <line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/>
                            <line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/>
                        </svg>
                        Lọc
                    </button>
                </form>

                <div className="listing-layout">
                    {/* ============ FILTERS (desktop) ============ */}
                    <aside className="filters-panel desktop-filters">
                        <div>
                            <h3>Môn thể thao</h3>
                            <select className="select">
                                <option>Tất cả môn</option>
                                <option>Tennis</option>
                                <option>Bóng rổ</option>
                                <option>Cầu lông</option>
                                <option>Bóng đá</option>
                                <option>Bóng chuyền</option>
                                <option>Bơi lội</option>
                            </select>
                        </div>
                        <div>
                            <h3>Khu vực</h3>
                            <select className="select">
                                <option>Tất cả khu vực</option>
                                <option>Quận 1</option>
                                <option>Quận 2</option>
                                <option>Quận 3</option>
                                <option>Quận 7</option>
                                <option>Bình Thạnh</option>
                                <option>Thủ Đức</option>
                            </select>
                        </div>
                        <div>
                            <div className="filter-price-row">
                                <h3 style={{ margin: 0 }}>Mức giá tối đa</h3>
                                <span>600.000 ₫</span>
                            </div>
                            <input type="range" className="range" min="100000" max="600000" step="10000" defaultValue="600000" />
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
                                    filterSearchInput.map((court) => (
                                        <article key={court.id} className="venue-card">

                                            {/* 1. Phần hình ảnh của sân */}
                                            <a href="/venue-detail.html" className="venue-card-media" style={{ display: 'block' }}>
                                                <img src={court.image} alt={court.name} />
                                                {court.availableToday && (
                                                    <span className="badge badge-success" style={{ position: 'absolute', left: '12px', top: '12px', zIndex: 2 }}>
                  Còn trống hôm nay
                </span>
                                                )}
                                            </a>

                                            {/* 2. Nút yêu thích */}
                                            <button className="venue-fav" aria-label="Yêu thích">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
                                                </svg>
                                            </button>

                                            {/* 3. Phần thông tin chi tiết của sân (Tên, đánh giá, vị trí, giá tiền) */}
                                            <div className="venue-card-body">
                                                <div className="venue-card-title-row">
                                                    <a href="/venue-detail.html"><h3>{court.name}</h3></a>
                                                    <span className="rating">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                  </svg>
                  <strong>{court.rating}</strong>
                </span>
                                                </div>
                                                <p className="venue-location">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                                                    </svg>
                                                    {' '}{court.location}
                                                </p>
                                                <div className="venue-card-footer">
                                                    <div className="venue-price">
                                                        <span className="from">Từ </span>
                                                        <span className="amount">{court.price} ₫</span>
                                                        <span className="unit">/giờ</span>
                                                    </div>
                                                    <span className="badge badge-gold">{court.reviews} đánh giá</span>
                                                </div>
                                            </div>

                                        </article>
                                    ))
                                ) : (
                                    /* Trường hợp không tìm thấy sân nào */
                                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: '#666' }}>
                                        Không tìm thấy sân nào phù hợp với từ khóa "{keyWord}"
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Phân trang */}
                        <div className="pagination">
                            <button className="nav-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"/>
                                </svg>
                            </button>
                            <button className="is-active">1</button>
                            <button className="nav-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* ============ MOBILE FILTER DRAWER ============ */}
            <div className="filter-drawer">
                <div className="filter-drawer-overlay"></div>
                <div className="filter-drawer-panel">
                    <div className="filter-drawer-head">
                        <h3>Bộ lọc</h3>
                        <button type="button">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                    <aside className="filters-panel">
                        <div>
                            <h3>Môn thể thao</h3>
                            <select className="select">
                                <option>Tất cả môn</option>
                                <option>Tennis</option>
                                <option>Bóng rổ</option>
                                <option>Cầu lông</option>
                            </select>
                        </div>
                        <div>
                            <h3>Khu vực</h3>
                            <select className="select">
                                <option>Tất cả khu vực</option>
                                <option>Quận 1</option>
                                <option>Quận 3</option>
                            </select>
                        </div>
                        <label className="checkbox-row">
                            <input type="checkbox" />
                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--navy-700)' }}>Còn trống hôm nay</span>
                        </label>
                    </aside>
                </div>
            </div>
        </>
    );
}