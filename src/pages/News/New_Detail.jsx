import { useParams } from 'react-router-dom';
import './New_Detail.css'
function New_Detail(){
    const {id}= useParams();
    return(
        <>
   <main className="container"  style={{ padding: '40px 16px 56px' }}>
    <article className="news-article">
      <a href="news.html" className="back-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Tin tức</a>

      <span className="badge badge-navy">Mẹo hay</span>
      <h1>5 mẹo khởi động trước khi chơi tennis giúp tránh chấn thương</h1>
      <div className="news-article-meta">
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Đội ngũ SportHub</span>
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 25/07/2026</span>
      </div>

      <img className="cover" src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&h=800&q=80" alt="5 mẹo khởi động trước khi chơi tennis" />

      <p className="content">Khởi động đúng cách không chỉ giúp bạn chơi tốt hơn mà còn giảm thiểu nguy cơ chấn thương khớp gối và vai. Dưới đây là 5 bài tập khởi động đơn giản mà bất kỳ ai cũng có thể thực hiện trước khi ra sân: xoay khớp cổ tay và cổ chân, chạy bước nhỏ tại chỗ, giãn cơ đùi sau, xoay vai và đánh tay nhẹ mô phỏng cú giao bóng.</p>

      <div className="related-news">
        <h2>Bài viết liên quan</h2>
        <div className="grid grid-3">
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
      </div>
    </article>
  </main>
        </>
    )
}
export default New_Detail;