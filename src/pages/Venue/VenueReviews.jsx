import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "./VenueReviews.css";

const VenueReviews = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [newReview, setNewReview] = useState([]);
    const [venue, setVenue] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    const handleBooking = () => {
        const userCurrently = localStorage.getItem("currentUser");
        if (!userCurrently) {
            navigate('/Login');
        } else {
            navigate(`/VenueOverView/${id}/schedule`);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3000/venues/${id}`)
            .then(response => response.json())
            .then(data => setVenue(data))
            .catch(error => console.error("Lỗi gọi data venue:", error));
    }, [id]);

    useEffect(() => {
        fetch("http://localhost:3000/reviews")
            .then(res => res.json())
            .then(data => setNewReview(data))
            .catch(error => console.error("Lỗi gọi data reviews:", error));
    }, []);

    if (!venue) {
        return <div className="container" style={{ padding: '40px' }}>Đang tải thông tin sân...</div>;
    }

    function handleRating(value) {
        setRating(value);
    }

    function handleComment(e) {
        setComment(e.target.value);
    }

    async function handleSubmit() {
        const userCurrently = localStorage.getItem("currentUser");

        if (!userCurrently) {
            navigate('/Login');
            return; // Dừng hàm nếu chưa đăng nhập
        }

        if (rating === 0) {
            alert("Vui lòng chọn số sao đánh giá!");
            return;
        }

        const user = JSON.parse(userCurrently);

        const reviewData = {
            venueId: venue.id,
            customerName: user.name || "Khách hàng",
            rating: rating,
            content: comment,
            Date: new Date().toISOString()
        };

        try {
            const response = await fetch("http://localhost:3000/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Đã lưu review:", data);

                // 1. Cập nhật ngay lập tức vào danh sách review ở đầu danh sách
                setNewReview(prev => [data, ...prev]);

                // 2. Reset ô nhập và số sao
                setRating(0);
                setComment("");
                setCurrentPage(1); // Quay về trang 1 để xem review mới nhất
            }
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
        }
    }

    const venueReviews = newReview.filter(rev => String(rev.venueId) === String(venue.id));

    const itemsPerPage = 5;
    const totalPages = Math.ceil(venueReviews.length / itemsPerPage) || 1;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentReviews = venueReviews.slice(firstItem, lastItem);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const formatTimeAgo = (dateString) => {
        if (!dateString) return "Mới đây";
        const reviewDate = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) return "Hôm nay";
        return `${diffDays} ngày trước`;
    };

    return (
        <>
            <div className="venue-hero">
                <img src={venue.image} alt={venue.name} />
                <Link to="/venues" className="venue-hero-back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </Link>
                <div className="venue-hero-content">
                    <div className="container" style={{ padding: 0 }}>
                        <h1>{venue.name}</h1>
                        <div className="venue-hero-meta">
                            <span>
                                <svg className="star" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                                </svg>
                                <strong>{venue.rating}</strong>
                            </span>
                            <span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>{' '}
                                {venue.address}
                            </span>
                            <span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>{' '}
                                {venue.openTime} - {venue.closeTime}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="venue-tabs-bar">
                <div className="container venue-tabs-inner">
                    <nav className="venue-tabs">
                        <Link to={`/VenueOverView/${id}`}>Tổng quan</Link>
                        <Link to={`/VenueOverView/${id}/court`}>Sân</Link>
                        <Link to={`/VenueOverView/${id}/schedule`}>Lịch trống</Link>
                        <Link to={`/VenueOverView/${id}/reviews`} className="is-active">Đánh giá</Link>
                        <Link to={`/VenueOverView/${id}/rules`}>Quy định</Link>
                    </nav>
                    <Button onClick={handleBooking} className="btn btn-gold btn-sm venue-tabs-book-btn">
                        Đặt sân ngay
                    </Button>
                </div>
            </div>

            <main className="container" style={{ padding: '40px 16px' }}>
                <div className="venue-detail-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '40px' }}>
                        <div className="listing-layout" style={{ gridTemplateColumns: '300px 1fr' }}>
                            <aside className="feedback-card">
                                <h3>Đánh giá trải nghiệm</h3>
                                <div className="star-input1" data-star-input>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => handleRating(star)}
                                            className={rating >= star ? "is-active" : ""}
                                            type="button"
                                        >
                                            <svg viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>

                                <textarea
                                    value={comment} // Gán value để reset nội dung khi submit thành công
                                    onChange={handleComment}
                                    className="textarea"
                                    rows="4"
                                    placeholder="Chia sẻ cảm nhận của bạn..."
                                ></textarea>

                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    style={{ marginTop: "16px" }}
                                >
                                    Gửi đánh giá
                                </button>
                            </aside>

                            <div className="review-list-card">
                                {currentReviews.length > 0 ? (
                                    currentReviews.map((x, index) => (
                                        <div className="review-item" key={x.id || index}>
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80" alt={x.customerName} />
                                            <div className="review-item-body">
                                                <div className="review-item-head">
                                                    <span className="name">{x.customerName}</span>
                                                    <span className="time">{formatTimeAgo(x.Date)}</span>
                                                </div>
                                                <span className="rating">
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                                                    </svg>
                                                    <strong>{x.rating}.0</strong>
                                                </span>
                                                <p className="comment">{x.content}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ padding: "20px", textAlign: "center" }}>Chưa có đánh giá nào cho sân này.</p>
                                )}

                                {totalPages > 1 && (
                                    <div className="pagination">
                                        <button onClick={handlePrev} className="nav-btn" disabled={currentPage === 1}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 18 9 12 15 6"/>
                                            </svg>
                                        </button>
                                        {Array.from({ length: totalPages }).map((_, index) => (
                                            <button
                                                key={index}
                                                className={currentPage === index + 1 ? "is-active" : ""}
                                                onClick={() => setCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button onClick={handleNext} className="nav-btn" disabled={currentPage === totalPages}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6"/>
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default VenueReviews;