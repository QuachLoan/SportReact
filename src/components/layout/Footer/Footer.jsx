import './Footer.css';
import {Link} from 'react-router-dom';

function Footer(){
    return(
        <>
  <footer className="site-footer">
    <div className="container footer-top">
      <div className="footer-brand">
         <a href="index.html" className="brand">
        <span className="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10"/><path d="M17 4v6a5 5 0 0 1-10 0V4"/><path d="M5 4H3a2 2 0 0 0 0 4h2"/><path d="M19 4h2a2 2 0 0 1 0 4h-2"/></svg>
        </span>
        <span className="brand-name">Sport<span>Hub</span></span>
      </a>
        <p>Nền tảng đặt sân thể thao cao cấp — nhanh chóng, minh bạch và đẳng cấp.</p>
        <div className="footer-contact">
          <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> 268 Lý Thường Kiệt, Quận 10, TP.HCM</div>
          <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 1900 8888</div>
          <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg> hello@sporthub.vn</div>
        </div>
      </div>

      <div className="footer-col">
        <h4>Công ty</h4>
        <ul>
          <li><a href="index.html">Về chúng tôi</a></li>
          <li><a href="pages/news.html">Tin tức</a></li>
          <li><a href="index.html">Tuyển dụng</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Sân thể thao</h4>
        <ul>
          <li><Link to="/venues?q=tennis">Tennis</Link></li>
          <li><Link to="/venues?q=basketball">Bóng rổ</Link></li>
          <li><Link to="/venues?q=badminton">Cầu lông</Link></li>
          <li><Link to="/venues?q=football">Bóng đá</Link></li>
          <li><Link to="/venues?q=pickleball">Pickleball</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Hỗ trợ</h4>
        <ul>
          <li><Link to="/BookingLookUp">Tra cứu đặt sân</Link></li>
          <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
          <li><Link to="/contact">Liên hệ</Link></li>
        </ul>
      </div>
    </div>

    <div className="container footer-bottom">
      <p>© 2026 SportHub. Đã đăng ký bản quyền.</p>
      <div className="social-links">
        <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.49-1.46H16.5V4.34c-.26-.03-1.16-.1-2.2-.1-2.18 0-3.67 1.33-3.67 3.77v2.1H8.1v3h2.53V21h2.87Z"/></svg></a>
        <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"/></svg></a>
        <a href="#" aria-label="Youtube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.6a2.7 2.7 0 0 0-1.9-1.9C18 5.2 12 5.2 12 5.2s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.6 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.4 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9c.3-1.4.4-2.9.4-4.4a28 28 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z"/></svg></a>
      </div>
    </div>
  </footer>
        </>
    )
}
export default Footer;
