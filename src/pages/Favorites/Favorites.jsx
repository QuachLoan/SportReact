import './Favorites.css';
function Favorites(){
    return(
        <>
    <main className="container" style={{ padding: '40px 16px 170px' }}>
      <div className="favorites-head">
        <span className="icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
          </svg>
        </span>
        <div>
          <h1>Sân yêu thích</h1>
          <p>2 sân đã lưu</p>
        </div>
      </div>

      <div className="grid grid-3">

        <article className="venue-card">
          <a href="venue-detail.html" className="venue-card-media" style={{ display: 'block' }}>
            <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&h=900&q=80" alt="The Platinum Arena" />
            <span className="badge badge-success" style={{ position: 'absolute', left: '12px', top: '12px', zIndex: 2 }}>
              Còn trống hôm nay
            </span>
          </a>
          <button className="venue-fav is-active" data-favorite-toggle aria-label="Yêu thích">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
            </svg>
          </button>
          <div className="venue-card-body">
            <div className="venue-card-title-row">
              <a href="venue-detail.html"><h3>The Platinum Arena</h3></a>
              <span className="rating">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                </svg>
                <strong>4.9</strong>
              </span>
            </div>
            <p className="venue-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg> 
              Quận 1
            </p>
            <div className="venue-card-footer">
              <div className="venue-price">
                <span className="from">Từ </span>
                <span className="amount">290.000 ₫</span>
                <span className="unit">/giờ</span>
              </div>
              <span className="badge badge-gold">214 đánh giá</span>
            </div>
          </div>
        </article>

        <article className="venue-card">
          <a href="venue-detail.html" className="venue-card-media" style={{ display: 'block' }}>
            <img src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1200&h=900&q=80" alt="Azure Swim Center" />
            <span className="badge badge-success" style={{ position: 'absolute', left: '12px', top: '12px', zIndex: 2 }}>
              Còn trống hôm nay
            </span>
          </a>
          <button className="venue-fav is-active" data-favorite-toggle aria-label="Yêu thích">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
            </svg>
          </button>
          <div className="venue-card-body">
            <div className="venue-card-title-row">
              <a href="venue-detail.html"><h3>Azure Swim Center</h3></a>
              <span className="rating">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                </svg>
                <strong>4.9</strong>
              </span>
            </div>
            <p className="venue-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg> 
              Quận 7
            </p>
            <div className="venue-card-footer">
              <div className="venue-price">
                <span className="from">Từ </span>
                <span className="amount">150.000 ₫</span>
                <span className="unit">/giờ</span>
              </div>
              <span className="badge badge-gold">98 đánh giá</span>
            </div>
          </div>
        </article>
      </div>

      <div className="empty-state hidden">
        <div className="empty-state-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
          </svg>
        </div>
        <h3>Chưa có sân yêu thích</h3>
        <p>Nhấn biểu tượng trái tim trên sân bạn thích để lưu lại tại đây.</p>
        <a href="venues.html" className="btn btn-primary">Khám phá sân</a>
      </div>
    </main>
        </>
    )
}
export default Favorites;