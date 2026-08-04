import React, { useState } from 'react';
import './BookingLookUp.css';

function BookingLookUp() {
    const [keyword, setKeyword] = useState("");
    const [bookingResults, setBookingResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const formatCurrency = (amount) => {
        if (!amount) return "0 ₫";
        return Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const cleanKeyword = keyword.trim();
        if (!cleanKeyword) return;

        setHasSearched(true);
        try {
            const [resByCode, resByPhone] = await Promise.all([
                fetch(`http://localhost:3000/bookings?bookingCode_like=${cleanKeyword}`),
                fetch(`http://localhost:3000/bookings?phone_like=${cleanKeyword}`)
            ]);

            const dataByCode = await resByCode.json();
            const dataByPhone = await resByPhone.json();

            // Gộp kết quả và lọc trùng bằng id
            const combinedBookings = [...dataByCode, ...dataByPhone];
            const uniqueBookings = combinedBookings.filter((value, index, self) =>
                self.findIndex(item => item.id === value.id) === index
            );

            setBookingResults(uniqueBookings);
        } catch (err) {
            console.error("Lỗi kết nối json-server:", err);
            setBookingResults([]);
        }
    };

    // Hàm kiểm tra màu sắc & nhãn cho trạng thái đơn
    const getStatusBadge = (status) => {
        const isConfirmed = status === "Đã đặt" || status === "booked";
        const isCancelled = status === "Đã hủy" || status === "cancelled";

        return {
            label: isConfirmed ? "Đã đặt" : isCancelled ? "Đã hủy" : (status || "Đang xử lý"),
            color: isConfirmed ? "#2e7d32" : isCancelled ? "#d32f2f" : "#ed6c02",
            bgColor: isConfirmed ? "#e8f5e9" : isCancelled ? "#ffebee" : "#fff3e0"
        };
    };

    return (
        <main className="container" style={{ padding: "56px 16px" }}>
            <div className="page-header is-center">
                <h1>Tra cứu đặt sân</h1>
                <p>Nhập mã đặt sân hoặc số điện thoại để kiểm tra trạng thái</p>
            </div>

            <form className="lookup-form" onSubmit={handleSearch}>
                <div className="field-wrap">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="input has-icon"
                        placeholder="VD: SH482910 hoặc 0987654321"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-gold">
                    Tra cứu
                </button>
            </form>

            {/* KHỐI HIỂN THỊ KẾT QUẢ */}
            <div style={{ marginTop: '40px' }}>
                {hasSearched && bookingResults.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#d32f2f', padding: '20px', border: '1px dashed #d32f2f', borderRadius: '8px', background: '#fdf2f2' }}>
                        Không tìm thấy lịch sử đặt sân nào tương ứng!
                    </div>
                )}

                {bookingResults.length > 0 && (
                    <div>
                        <h3 style={{ marginBottom: '20px', fontWeight: 600 }}>Kết quả tra cứu ({bookingResults.length}):</h3>
                        {bookingResults.map((order) => {
                            let badge = "";
                            if (order.status === "pending"){
                                badge = getStatusBadge("Đang xử lí");
                            }
                            else if (order.status === "booked"){
                                badge = getStatusBadge("Đã đặt");
                            }
                            else if (order.status === "cancelled"){
                                badge = getStatusBadge("Đã hủy");
                            }
                            const fullName = `${order.lastName || ''} ${order.firstName || ''}`.trim() || "Chưa cập nhật";

                            return (
                                <div key={order.id} style={{
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    marginBottom: '20px',
                                    background: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                                        <strong>Mã đơn: <span style={{ color: '#0f172a' }}>{order.bookingCode}</span></strong>
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: badge.color,
                                            backgroundColor: badge.bgColor,
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            fontSize: '13px'
                                        }}>
                                            {badge.label}
                                        </span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                                        <p><strong>Khách hàng:</strong> {fullName}</p>
                                        <p><strong>Số điện thoại:</strong> {order.phone || "N/A"}</p>
                                        <p><strong>Địa điểm:</strong> {order.location || "N/A"}</p>
                                        <p><strong>Sân:</strong> {order.court || "N/A"}</p>
                                        <p><strong>Ngày chơi:</strong> {order.date || "N/A"}</p>
                                        <p><strong>Khung giờ:</strong> {order.time || "N/A"}</p>
                                    </div>

                                    <div style={{ borderTop: '1px solid #eee', marginTop: '15px', paddingTop: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <div style={{ fontSize: '16px' }}>
                                            <strong>Tổng cộng: </strong>
                                            <span style={{ color: '#b89047', fontSize: '20px', fontWeight: 'bold' }}>
                                                {formatCurrency(order.totalAmount)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}

export default BookingLookUp;