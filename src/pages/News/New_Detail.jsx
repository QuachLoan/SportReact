import { Link, useParams } from 'react-router-dom';
import './New_Detail.css'
import { useEffect, useState } from 'react';
import News from './News';
function New_Detail(){
    const {id}= useParams();
    const [news, setNews] = useState("");
    const[rele,setRele] = useState([])
   useEffect(()=>{
      fetch(`http://localhost:3000/news`)
      .then(res=>res.json())
      .then(data=>setRele(data))
    },[id])
    useEffect(()=>{
      fetch(`http://localhost:3000/news/${id}`)
      .then(res=>res.json())
      .then(data=>setNews(data))
    },[id])
    return(
        <>
   <main className="container"  style={{ padding: '40px 16px 56px' }}>
    <article className="news-article">
      <Link to='/News' className="back-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Tin tức</Link>
      <div>
      <h1>{news.title}</h1>
      <div className="news-article-meta">
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Đội ngũ SportHub</span>
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> {news.date}</span>
      </div>
      <img className="cover" src={news.image} alt="5 mẹo khởi động trước khi chơi tennis" />
      <p className="content">{news.content}</p>
      </div>
        
      

      <div className="related-news">
        <h2>Bài viết liên quan</h2>
        <div className="grid grid-3">
          {rele.slice(3,6).map(x=>(
            <Link to={`/New_Detail/${x.id}`}  className="news-card">
            <div className="news-card-media">
              <img src={x.image} alt="SportHub tổ chức giải bóng rổ doanh nghiệp mùa hè 2026" />
              <span className="badge">{x.category}</span>
            </div>
            <div className="news-card-body">
              <h3>{x.shortDescription}</h3>
              <p className="date">{x.date}</p>
            </div>
          </Link>
          ))}


        </div>
      </div>
    </article>
  </main>
        </>
    )
}
export default New_Detail;