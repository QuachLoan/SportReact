import {Link, useNavigate} from 'react-router-dom';
import './Header.css'
import {useEffect, useState} from "react";
function Header(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    const checkUser = () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        setCurrentUser(user);
    };

    useEffect(() => {
        checkUser();
        window.addEventListener('storage', checkUser);
        const interval = setInterval(checkUser, 300);
        return () => {
            window.removeEventListener('storage', checkUser);
            clearInterval(interval);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        navigate("/");
    };


    return(
        <>
            <header className="navbar">
                <div className="container navbar-inner">
                    <Link to="/" className='brand'>
                        <span className="brand-mark">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10"/><path d="M17 4v6a5 5 0 0 1-10 0V4"/><path d="M5 4H3a2 2 0 0 0 0 4h2"/><path d="M19 4h2a2 2 0 0 1 0 4h-2"/></svg>
                        </span>
                        <span className="brand-name">Sport<span>Hub</span></span>
                    </Link>

                    <nav className="nav-links">
                        <div className='nav-item'><Link to="/">Trang chủ</Link></div>
                        <div className='nav-item'><Link to="/Venues">Sân thể thao</Link></div>
                        <div className='nav-item'><Link to="/BookingLookUp">Tra cứu đặt sân</Link></div>
                        <div className='nav-item'><Link to="/News">Tin tức</Link></div>
                    </nav>

                    <div className="navbar-actions">
                        <Link to="/Favorites" className="icon-btn" aria-label="Yêu thích">
                            <i className="bi bi-heart"></i>
                        </Link>

                        {/* Biến đổi giao diện trên PC dựa vào trạng thái đăng nhập */}
                        {currentUser ? (
                            <div className="user-logged-in" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span className="user-name">Chào, <strong>{currentUser.name || currentUser.email}</strong></span>
                                <button onClick={handleLogout} className="btn btn-outline btn-sm">Đăng xuất</button>
                            </div>
                        ) : (
                            <>
                                <Link to="/Login" className="btn btn-outline btn-sm">Đăng nhập</Link>
                                <Link to="/Register" className="btn btn-gold btn-sm">Đăng ký</Link>
                            </>
                        )}
                    </div>

                    <button className="nav-toggle" aria-label="Menu">
                        <svg className="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
                        <svg className="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className="mobile-menu">
                    <nav>
                        <Link to="/Venues">Sân thể thao</Link>
                        <Link to="/BookingLookUp">Tra cứu đặt sân</Link>
                        <Link to="/News">Tin tức</Link>
                        <Link to="/Favorites">Yêu thích</Link>
                    </nav>
                    <div className="mobile-menu-actions">
                        {/* Biến đổi giao diện trên Mobile dựa vào trạng thái đăng nhập */}
                        {currentUser ? (
                            <div className="user-logged-in-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center' }}>
                                <span className="user-name">Chào, {currentUser.name || currentUser.email}</span>
                                <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ width: '100%' }}>Đăng xuất</button>
                            </div>
                        ) : (
                            <>
                                <Link to="/Login" className="btn btn-outline btn-sm">Đăng nhập</Link>
                                <Link to="/Register" className="btn btn-gold btn-sm">Đăng ký</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;
