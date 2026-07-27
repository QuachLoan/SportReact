import { Link } from 'react-router-dom';
import './Header.css' 
function Header(){
    return(
        <>
        <header className="navbar">
    <div className="container navbar-inner">
      {/* <a href="index.html" className="brand"> */}
      <Link to="/" className='brand'>
        <span className="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10"/><path d="M17 4v6a5 5 0 0 1-10 0V4"/><path d="M5 4H3a2 2 0 0 0 0 4h2"/><path d="M19 4h2a2 2 0 0 1 0 4h-2"/></svg>
        </span>
        <span className="brand-name">Sport<span>Hub</span></span>
     </Link>

      <nav className="nav-links">
        <Link to="/">Trang chủ</Link>
          <Link to="/Court">Sân thể thao</Link>
        <a href="pages/booking-lookup.html">Tra cứu đặt sân</a>
        <Link to="/News">Tin tức</Link>
      </nav>

      <div className="navbar-actions">
        <a href="" className="icon-btn" aria-label="Yêu thích">
            <i className="bi bi-heart"></i>
        </a>
        <a href="" className="btn btn-outline btn-sm">Đăng nhập</a>
        <a href="pages/venues.html" className="btn btn-gold btn-sm">Đăng ký</a>
      </div>

      <button className="nav-toggle" aria-label="Menu">
        <svg className="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
        <svg className="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div className="mobile-menu">
      <nav>
        <a href="../">Sân thể thao</a>
        <a href="pages/booking-lookup.html">Tra cứu đặt sân</a>
        <a href="pages/news.html">Tin tức</a>
        <a href="pages/favorites.html">Yêu thích</a>
      </nav>
      <div className="mobile-menu-actions">
        <a href="pages/venues.html" className="btn btn-outline btn-sm">Đăng nhập</a>
        <a href="pages/venues.html" className="btn btn-gold btn-sm">Đăng ký</a>
      </div>
    </div>
  </header>
        </>
    )
}
export default Header;
