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
        if (!keyword.trim()) {
            return;
        }
        setHasSearched(true);
        try {
            const [resByCode, resByPhone, resVenues, resCourts] = await Promise.all([
                fetch(`http://localhost:3000/bookings?bookingCode_like=${keyword.trim()}`),
                fetch(`http://localhost:3000/bookings?phone_like=${keyword.trim()}`),
                fetch(`http://localhost:3000/venues`),
                fetch(`http://localhost:3000/courts`)
            ]);
            const dataByCode = await resByCode.json();
            const dataByPhone = await resByPhone.json();
            const venues = await resVenues.json();
            const courts = await resCourts.json();
            const combinedBookings = [...dataByCode, ...dataByPhone];
            const uniqueBookings = combinedBookings.filter((value, index, self) =>
                self.findIndex(item => item.id === value.id) === index
            );
            const finalData = uniqueBookings.map(order => {
                const matchedVenue = venues.find(v => v.id === order.venueId);
                const matchedCourt = courts.find(c => c.id === order.courtId);
                return {
                    ...order,
                    venueName: matchedVenue ? matchedVenue.name : `Cụm sân (ID: ${order.venueId})`,
                    courtName: matchedCourt ? matchedCourt.name : `Sân nhỏ (ID: ${order.courtId})`
                };
            });

            setBookingResults(finalData);
        }
        catch (err) {
            console.error("Lỗi kết nối json-server:", err);
            console.log("Không thể kết nối tới server dữ liệu!");
        }

    };

    return (
        <>
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
                            placeholder="VD: SPT100001 hoặc 0912345678"
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
                        <div style={{ textAlign: 'center', color: 'red', padding: '20px', border: '1px dashed red', borderRadius: '8px' }}>
                            Không tìm thấy lịch sử đặt sân nào tương ứng!
                        </div>
                    )}
                    {bookingResults.length > 0 && (
                        <div>
                            <h3 style={{ marginBottom: '20px', fontWeight: 600 }}>Kết quả tra cứu ({bookingResults.length}):</h3>
                            {bookingResults.map((order) => (
                                <div key={order.id} style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    marginBottom: '20px',
                                    background: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                                        <strong>Mã đơn: {order.bookingCode}</strong>
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: order.status === "confirmed" ? "#2e7d32" : order.status === "cancelled" ? "#d32f2f" : "#ed6c02",
                                            backgroundColor: order.status === "confirmed" ? "#e8f5e9" : order.status === "cancelled" ? "#ffebee" : "#fff3e0",
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            fontSize: '12px'
                                        }}>
                                            {order.status === "confirmed" ? "Thành công" : order.status === "cancelled" ? "Đã hủy" : "Chờ xử lý"}
                                        </span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                                        <p><strong>Khách hàng:</strong> {order.customerName}</p>
                                        <p><strong>Số điện thoại:</strong> {order.phone}</p>
                                        <p><strong>Địa điểm:</strong> {order.venueName}</p>
                                        <p><strong>Sân:</strong> {order.courtName}</p>
                                        <p><strong>Ngày chơi:</strong> {order.date}</p>
                                        <p><strong>Thời gian:</strong> {order.startTime} - {order.endTime}</p>
                                    </div>

                                    <div style={{ borderTop: '1px solid #eee', marginTop: '15px', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <div style={{ fontSize: '13px', color: '#666' }}>
                                            <div>Tiền sân: {formatCurrency(order.courtPrice)}</div>
                                            <div>Tiền dịch vụ: {formatCurrency(order.equipmentPrice)}</div>
                                        </div>
                                        <strong>Tổng tiền: <span style={{ color: '#b89047', fontSize: '20px' }}>{formatCurrency(order.totalPrice)}</span></strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default BookingLookUp;