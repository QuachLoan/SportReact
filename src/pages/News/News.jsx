import { Link } from 'react-router-dom';
import './News.css';
function News(){
    return(
        <>
<main className="container" style={{ padding: "40px 16px 56px" }}>
    <div className="page-header text-center">
      <h1>Tin tức &amp; Mẹo hay</h1>
      <p>Cập nhật xu hướng, mẹo tập luyện và sự kiện mới nhất từ SportHub</p>
    </div>

    <div className="grid grid-4">
        <Link to="/News/1" className='news-card'>
        <div className="news-card-media ">
          <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&h=600&q=80" alt="5 mẹo khởi động trước khi chơi tennis" />
          <span className="badge">Mẹo hay</span>
        </div>
        <div className="news-card-body ">
          <h3>5 mẹo khởi động trước khi chơi tennis giúp tránh chấn thương</h3>
          <p className="date">6 giờ trước</p>
        </div>
      </Link>
      <a href="news-detail.html" className="news-card">
        <div className="news-card-media">
          <img src="https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&h=600&q=80" alt="SportHub tổ chức giải bóng rổ doanh nghiệp mùa hè 2026" />
          <span className="badge">Sự kiện</span>
        </div>
        <div className="news-card-body">
          <h3>SportHub tổ chức giải bóng rổ doanh nghiệp mùa hè 2026</h3>
          <p className="date">1 ngày trước</p>
        </div>
      </a>
      <a href="news-detail.html" className="news-card">
        <div className="news-card-media">
          <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&h=600&q=80" alt="Hướng dẫn đặt sân nhanh chỉ trong 3 bước trên SportHub" />
          <span className="badge">Hướng dẫn</span>
        </div>
        <div className="news-card-body">
          <h3>Hướng dẫn đặt sân nhanh chỉ trong 3 bước trên SportHub</h3>
          <p className="date">2 ngày trước</p>
        </div>
      </a>
      <a href="news-detail.html" className="news-card">
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
  </main>

        </>
    )
}
export default News;