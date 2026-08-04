import React, { useState, useEffect } from 'react';
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Hash, {genSalt} from "./../../hash/Hash.js";

export default function Register() {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLastName("");
        setFirstName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setPasswordConfirm("");
        setAgreeTerms(false);
        setError("");
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        if (!lastName.trim() || !firstName.trim()) {
            setError("Vui lòng điền đầy đủ họ và tên.");
            return;
        }
        if (!email.trim()) {
            setError("Vui lòng nhập Email.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Định dạng email không hợp lệ.");
            return;
        }
        const phoneRegex = /^(0|\+84|84)(3|5|7|8|9)[0-9]{8}$/;
        if (!phoneRegex.test(phone.trim().replace(/\s+/g, ''))) {
            setError("Số điện thoại không hợp lệ (Phải gồm 10 số và đúng đầu số nhà mạng VN).");
            return;
        }
        if (password.length < 8) {
            setError("Mật khẩu phải chứa ít nhất 8 ký tự.");
            return;
        }
        if (password !== passwordConfirm) {
            setError("Mật khẩu nhập lại không trùng khớp.");
            return;
        }
        if (!agreeTerms) {
            setError("Bạn phải đồng ý với Điều khoản & Chính sách bảo mật.");
            return;
        }

        try {
            const checkResponse = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email.trim().toLowerCase())}`);
            if (!checkResponse.ok) {
                throw new Error("Không thể kết nối đến máy chủ.");
            }
            const existingUsers = await checkResponse.json();
            if (existingUsers.length > 0) {
                setError("Email này đã được sử dụng. Vui lòng chọn email khác.");
                return;
            }
            const salt = genSalt();
            const newUser = {
                name: `${lastName.trim()} ${firstName.trim()}`,
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                password: Hash(password, salt),
                salt: salt,
            };

            const registerResponse = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (registerResponse.ok) {
                setLastName("");
                setFirstName("");
                setEmail("");
                setPhone("");
                setPassword("");
                setPasswordConfirm("");
                setAgreeTerms(false);
                navigate("/Login");
            } else {
                setError("Đăng ký thất bại. Vui lòng thử lại.");
            }

        }
        catch (err) {
            console.error(err);
            setError("Có lỗi xảy ra kết nối đến hệ thống. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="auth-shell">
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
                        <h1>Tạo tài khoản mới</h1>
                        <p>Chỉ mất 1 phút để bắt đầu đặt sân yêu thích.</p>
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

                    <div className="auth-divider">hoặc đăng ký bằng email</div>

                    {/* Hiển thị thông báo lỗi lên giao diện nếu có */}
                    {error && <div className="auth-error-message" style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}

                    <form className="auth-form" id="register-form" onSubmit={handleRegister} noValidate autoComplete="off">
                        <div className="auth-form-row">
                            <div className="auth-field">
                                <label htmlFor="register-last-name">Họ</label>
                                <div className="auth-input-wrap">
                                    <input
                                        type="text"
                                        id="register-last-name"
                                        className="auth-input"
                                        placeholder="Nguyễn"
                                        autoComplete="off"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="auth-field">
                                <label htmlFor="register-first-name">Tên</label>
                                <div className="auth-input-wrap">
                                    <input
                                        type="text"
                                        id="register-first-name"
                                        className="auth-input"
                                        placeholder="Văn A"
                                        autoComplete="off"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="register-email">Email</label>
                            <div className="auth-input-wrap">
                                <input
                                    type="email"
                                    id="register-email"
                                    className="auth-input"
                                    placeholder="ban@email.com"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="register-phone">Số điện thoại</label>
                            <div className="auth-input-wrap">
                                <input
                                    type="tel"
                                    id="register-phone"
                                    className="auth-input"
                                    placeholder="09xxxxxxxx"
                                    autoComplete="off"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="register-password">Mật khẩu</label>
                            <div className="auth-input-wrap">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="register-password"
                                    className="auth-input has-toggle"
                                    placeholder="Tối thiểu 8 ký tự"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="auth-toggle-visibility"
                                    aria-label="Hiện/ẩn mật khẩu"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="icon-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg className="icon-eye-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 3l18 18" />
                                            <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c7 0 10.5 7 10.5 7a13.4 13.4 0 0 1-3.1 3.9M6.6 6.6C3.4 8.6 1.5 12 1.5 12s3.5 7 10.5 7c1.5 0 2.8-.3 4-.8" />
                                            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="register-password-confirm">Nhập lại mật khẩu</label>
                            <div className="auth-input-wrap">
                                <input
                                    type={showPasswordConfirm ? "text" : "password"}
                                    id="register-password-confirm"
                                    className="auth-input has-toggle"
                                    placeholder="Nhập lại mật khẩu"
                                    autoComplete="new-password"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="auth-toggle-visibility"
                                    aria-label="Hiện/ẩn mật khẩu"
                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                >
                                    {showPasswordConfirm ? (
                                        <svg className="icon-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg className="icon-eye-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 3l18 18" />
                                            <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c7 0 10.5 7 10.5 7a13.4 13.4 0 0 1-3.1 3.9M6.6 6.6C3.4 8.6 1.5 12 1.5 12s3.5 7 10.5 7c1.5 0 2.8-.3 4-.8" />
                                            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <label className="auth-checkbox align-start">
                            <input
                                type="checkbox"
                                id="register-terms"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                            />
                            <span className="auth-checkbox-terms">
                                Tôi đồng ý với <a href="#">Điều khoản</a> &amp; <a href="#">Chính sách bảo mật</a>
                            </span>
                        </label>

                        <button type="submit" className="auth-submit">Đăng ký</button>
                    </form>

                    <p className="auth-switch">
                        Đã có tài khoản? <Link to="/Login">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}