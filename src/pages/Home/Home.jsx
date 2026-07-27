import { Image } from 'react-bootstrap';
import './Home.css';
import adv from '../../assets/banner.avif';
function Home(){
    return(
        <>
    <main>
    <section className="hero">
      <div className="hero-media">
      <img src={adv} alt="Banner" /> 
      </div>
      {/* <div class="container">
        <div class="hero-content">
          <span class="hero-eyebrow">NỀN TẢNG ĐẶT SÂN CAO CẤP #1</span>
          <h1 class="hero-title">Đặt sân thể thao <span class="accent">đẳng cấp</span> chỉ trong vài giây</h1>
          <p class="hero-desc">Hơn 200 cụm sân tennis, bóng rổ, cầu lông và bóng đá được tuyển chọn kỹ lưỡng — sẵn sàng cho trận đấu tiếp theo của bạn.</p>

          <form class="search-box is-lg" style="max-width:560px" action="pages/venues.html">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" name="q" placeholder="Tìm theo tên sân, khu vực..." />
            <button type="submit">Tìm kiếm</button>
          </form>

          <div class="hero-stats">
            <div><strong>200+</strong> cụm sân</div>
            <div><strong>50K+</strong> lượt đặt/tháng</div>
            <div><strong>4.8/5</strong> đánh giá trung bình</div>
          </div>
        </div>
      </div> */}
    </section>

    {/* <section class="section container">
      <div class="grid grid-3">
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <h3>Đặt sân minh bạch</h3>
          <p>Giá niêm yết rõ ràng, không phụ phí ẩn, hoàn tiền linh hoạt.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3>Xác nhận tức thì</h3>
          <p>Nhận mã QR check-in ngay sau khi thanh toán thành công.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8L4 11l6.1 2.2L12 19l1.9-5.8L20 11l-6.1-2.2Z"/></svg>
          </div>
          <h3>Chất lượng tuyển chọn</h3>
          <p>Mọi cụm sân đều được kiểm định kỹ càng trước khi lên hệ thống.</p>
        </div>
      </div>
    </section>

    <section class="section-sm container">
      <h2 class="section-eyebrow">Khám phá theo môn thể thao</h2>
      <div class="tag-cloud">
        <a href="pages/venues.html?sport=tennis" class="tag">Tennis</a>
        <a href="pages/venues.html?sport=basketball" class="tag">Bóng rổ</a>
        <a href="pages/venues.html?sport=badminton" class="tag">Cầu lông</a>
        <a href="pages/venues.html?sport=football" class="tag">Bóng đá</a>
        <a href="pages/venues.html?sport=volleyball" class="tag">Bóng chuyền</a>
        <a href="pages/venues.html?sport=swimming" class="tag">Bơi lội</a>
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <div>
          <h2>Sân nổi bật</h2>
          <p>Được lựa chọn nhiều nhất trong tuần qua</p>
        </div>
        <a href="pages/venues.html" class="btn btn-outline">
          Xem tất cả
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>

      <div class="grid grid-3">
        <article class="venue-card">
          <a href="pages/venue-detail.html" class="venue-card-media" style="display:block">
            <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&h=900&q=80" alt="The Platinum Arena" />
            <span class="badge badge-success" style="position:absolute;left:12px;top:12px;z-index:2;">Còn trống hôm nay</span>
          </a>
          <button class="venue-fav" data-favorite-toggle aria-label="Yêu thích">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
          </button>
          <div class="venue-card-body">
            <div class="venue-card-title-row">
              <a href="pages/venue-detail.html"><h3>The Platinum Arena</h3></a>
              <span class="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg><strong>4.9</strong></span>
            </div>
            <p class="venue-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Quận 1
            </p>
            <div class="venue-card-footer">
              <div class="venue-price"><span class="from">Từ </span><span class="amount">290.000 ₫</span><span class="unit">/giờ</span></div>
              <span class="badge badge-gold">214 đánh giá</span>
            </div>
          </div>
        </article>

        <article class="venue-card">
          <a href="pages/venue-detail.html" class="venue-card-media" style="display:block">
            <img src="https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?auto=format&fit=crop&w=1200&h=900&q=80" alt="The Plainum Arena" />
            <span class="badge badge-success" style="position:absolute;left:12px;top:12px;z-index:2;">Còn trống hôm nay</span>
          </a>
          <button class="venue-fav" data-favorite-toggle aria-label="Yêu thích">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
          </button>
          <div class="venue-card-body">
            <div class="venue-card-title-row">
              <a href="pages/venue-detail.html"><h3>The Plainum Arena</h3></a>
              <span class="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg><strong>4.7</strong></span>
            </div>
            <p class="venue-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Bình Thạnh
            </p>
            <div class="venue-card-footer">
              <div class="venue-price"><span class="from">Từ </span><span class="amount">350.000 ₫</span><span class="unit">/giờ</span></div>
              <span class="badge badge-gold">156 đánh giá</span>
            </div>
          </div>
        </article>

        <article class="venue-card">
          <a href="pages/venue-detail.html" class="venue-card-media" style="display:block">
            <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&h=900&q=80" alt="The Pelinum Arena" />
          </a>
          <button class="venue-fav" data-favorite-toggle aria-label="Yêu thích">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
          </button>
          <div class="venue-card-body">
            <div class="venue-card-title-row">
              <a href="pages/venue-detail.html"><h3>The Pelinum Arena</h3></a>
              <span class="rating"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg><strong>4.8</strong></span>
            </div>
            <p class="venue-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Quận 3
            </p>
            <div class="venue-card-footer">
              <div class="venue-price"><span class="from">Từ </span><span class="amount">180.000 ₫</span><span class="unit">/giờ</span></div>
              <span class="badge badge-gold">189 đánh giá</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="cta-banner">
      <div class="container cta-grid">
        <div>
          <span class="hero-eyebrow">DÀNH CHO DOANH NGHIỆP</span>
          <h2>Tổ chức giải đấu nội bộ cùng SportHub</h2>
          <p>Đặt trọn gói nhiều sân, quản lý lịch thi đấu và nhận ưu đãi riêng cho khách hàng doanh nghiệp.</p>
          <a href="pages/venues.html" class="btn btn-gold btn-lg">Liên hệ tư vấn</a>
        </div>
        <div class="cta-images">
          <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&h=600&q=80" alt="The Platinum Arena" />
          <img src="https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?auto=format&fit=crop&w=800&h=600&q=80" alt="The Plainum Arena" />
          <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&h=600&q=80" alt="The Pelinum Arena" />
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-head">
        <h2>Tin tức &amp; mẹo hay</h2>
        <a href="pages/news.html" class="btn btn-outline">
          Xem thêm
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
      <div class="grid grid-4">
        <a href="pages/news-detail.html" class="news-card">
          <div class="news-card-media">
            <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&h=600&q=80" alt="5 mẹo khởi động trước khi chơi tennis" />
            <span class="badge">Mẹo hay</span>
          </div>
          <div class="news-card-body">
            <h3>5 mẹo khởi động trước khi chơi tennis giúp tránh chấn thương</h3>
            <p class="date">6 giờ trước</p>
          </div>
        </a>
        <a href="pages/news-detail.html" class="news-card">
          <div class="news-card-media">
            <img src="https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&h=600&q=80" alt="SportHub tổ chức giải bóng rổ doanh nghiệp mùa hè 2026" />
            <span class="badge">Sự kiện</span>
          </div>
          <div class="news-card-body">
            <h3>SportHub tổ chức giải bóng rổ doanh nghiệp mùa hè 2026</h3>
            <p class="date">1 ngày trước</p>
          </div>
        </a>
        <a href="pages/news-detail.html" class="news-card">
          <div class="news-card-media">
            <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&h=600&q=80" alt="Hướng dẫn đặt sân nhanh chỉ trong 3 bước trên SportHub" />
            <span class="badge">Hướng dẫn</span>
          </div>
          <div class="news-card-body">
            <h3>Hướng dẫn đặt sân nhanh chỉ trong 3 bước trên SportHub</h3>
            <p class="date">2 ngày trước</p>
          </div>
        </a>
        <a href="pages/news-detail.html" class="news-card">
          <div class="news-card-media">
            <img src="https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&h=600&q=80" alt="Chế độ dinh dưỡng lý tưởng cho người chơi thể thao thường xuyên" />
            <span class="badge">Sức khỏe</span>
          </div>
          <div class="news-card-body">
            <h3>Chế độ dinh dưỡng lý tưởng cho người chơi thể thao thường xuyên</h3>
            <p class="date">3 ngày trước</p>
          </div>
        </a>
      </div>
    </section> */}
  </main>

        </>
    )
}
export default Home;