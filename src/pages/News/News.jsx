import { Link } from 'react-router-dom';
import './News.css';
import { useEffect, useState } from 'react';
function News(){
  const [news, setNews] = useState([]);
   useEffect(()=>{
          fetch(`http://localhost:3000/news`)
          .then(res=>res.json())
          .then(data=> setNews(data))
      },[])
    return(
      
        <>
<main className="container" style={{ padding: "40px 16px 155px" }}>
    <div className="page-header text-center">
      <h1>Tin tức &amp; Mẹo hay</h1>
      <p>Cập nhật xu hướng, mẹo tập luyện và sự kiện mới nhất từ SportHub</p>
    </div>

    <div className="grid grid-4">
        {/* <Link to="/News/1" className='news-card home'>
        <div className="news-card-media ">
          <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&h=600&q=80" alt="5 mẹo khởi động trước khi chơi tennis" />
          <span className="badge">Mẹo hay</span>
        </div>
        <div className="news-card-body ">
          <h3>5 mẹo khởi động trước khi chơi tennis giúp tránh chấn thương</h3>
          <p className="date">6 giờ trước</p>
        </div>
      </Link> */}
      {news.map(x=>(
      <Link to={`/New_Detail/${x.id}`}className='news-card home'>
        <div className="news-card-media ">
          <img src={x.image} alt="5 mẹo khởi động trước khi chơi tennis" />
          <span className="badge">{x.category}</span>
        </div>
        <div className="news-card-body ">
          <h3>{x.title}</h3>
          <p className="date">{x.date}</p>
        </div>
      </Link>
      ))}
    </div>
  </main>

        </>
    )
}
export default News;