import React from 'react';
import "./Login.css";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    //state
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    //function
    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.email.toLowerCase() == userName.toLowerCase() && user.password.toLowerCase() == password.toLowerCase());
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/");
        } else {
            setError("Email hoặc mật khẩu không đúng.");
        }
    }

    return (
        <div className="auth-shell">
            {/* Cột trái: form đăng nhập */}
            <div className="auth-form-panel">
                <div className="auth-form-panel-inner">
                    <Link to="/" className="auth-logo" aria-label="Về trang chủ SportHub">
            <span className="auth-logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
                <path d="M7 5H4a1 1 0 0 0-1 1c0 2.5 1.5 4.5 4 5" />
                <path d="M17 5h3a1 1 0 0 1 1 1c0 2.5-1.5 4.5-4 5" />
              </svg>
            </span>
                        <span className="auth-logo-text">Sport<span>Hub</span></span>
                    </Link>

                    <div className="auth-heading">
                        <h1>Chào mừng trở lại</h1>
                        <p>Đăng nhập để tiếp tục đặt sân yêu thích của bạn.</p>
                    </div>

                    <div className="auth-social-row">
                        <button type="button" className="auth-social-btn">
                            <svg viewBox="0 0 48 48" width="18" height="18">
                                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5Z" />
                                <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z" />
                                <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 34.7 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44Z" />
                                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C39.9 37.4 44 31.4 44 24c0-1.2-.1-2.4-.4-3.5Z" />
                            </svg>
                            Google
                        </button>
                        <button type="button" className="auth-social-btn">
                            <svg viewBox="0 0 24 24" fill="#1877F2" width="18" height="18">
                                <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.49-1.46H16.5V4.34c-.26-.03-1.16-.1-2.2-.1-2.18 0-3.67 1.33-3.67 3.77v2.1H8.1v3h2.53V21h2.87Z" />
                            </svg>
                            Facebook
                        </button>
                    </div>

                    <div className="auth-divider">hoặc đăng nhập bằng email</div>

                    <form className="auth-form" id="login-form" noValidate>
                        <div className="auth-field">
                            <label htmlFor="login-identifier">Email hoặc số điện thoại</label>
                            <div className="auth-input-wrap">
                                <input
                                    type="text"
                                    id="login-identifier"
                                    name="identifier"
                                    className="auth-input"
                                    placeholder="ban@email.com hoặc 09xxxxxxxx"
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="login-password">Mật khẩu</label>
                            <div className="auth-input-wrap">
                                <input
                                    type="password"
                                    id="login-password"
                                    name="password"
                                    className="auth-input has-toggle"
                                    placeholder="Nhập mật khẩu"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="auth-toggle-visibility"
                                    data-toggle-target="login-password"
                                    aria-label="Hiện/ẩn mật khẩu"
                                >
                                    <svg className="icon-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <svg className="icon-eye-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 3l18 18" />
                                        <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c7 0 10.5 7 10.5 7a13.4 13.4 0 0 1-3.1 3.9M6.6 6.6C3.4 8.6 1.5 12 1.5 12s3.5 7 10.5 7c1.5 0 2.8-.3 4-.8" />
                                        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="auth-row-between">
                            <label className="auth-checkbox">
                                <input type="checkbox" id="login-remember" name="remember" />
                                Ghi nhớ đăng nhập
                            </label>
                            <Link to="/forgotPassWord" className="auth-link">Quên mật khẩu?</Link>
                        </div>

                        <button type="submit" className="auth-submit">Đăng nhập</button>
                    </form>

                    <p className="auth-switch">
                        Chưa có tài khoản? <Link to="/Register">Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
