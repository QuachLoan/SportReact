import {useParams, Link, useOutletContext} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "./VenueOverView.css";

export default function VenueOverview() {
    // state
    const { id } = useParams();
    const [venue, setVenue] = useState("");
    const [loading, setLoading] = useState(true);

    // function
    const formatCurrency = (amount) => {
        if (!amount) return "Liên hệ";
        return Number(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/venues/${id}`)
            .then(response => {
                if (!response.ok) throw new Error("Không tìm thấy sân");
                return response.json();
            })
            .then(data => {
                setVenue(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi gọi data chi tiết sân:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px', fontSize: '16px' }}>Đang tải dữ liệu...</div>;
    }

    if (!venue) {
        return <div style={{ textAlign: 'center', padding: '40px', fontSize: '16px', color: 'red' }}>Không tìm thấy thông tin sân thể thao này!</div>;
    }
    return (
        <div className="w-full space-y-6" style={{ padding: '20px' }}> {/* Đã sửa: Thẻ bọc ngoài cùng chuẩn chỉnh */}

            {/* 1 KHỐI ẢNH BANNER LỚN DÀN 100% (Lấy từ dữ liệu động venue.image) */}
            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                <img
                    src={venue.image}
                    alt="Banner sân thể thao"
                    className="w-full h-[250px] object-cover sm:h-[400px]"
                />
            </div>

            {/* 2. LƯỚI CHIA CỘT THÔNG TIN (Hợp nhất lại chuẩn chỉ) */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">

                {/* CỘT TRÁI: NỘI DUNG CHI TIẾT */}
                <div>
                    {/* Section Giới thiệu */}
                    <section className="mb-10">
                        <h2 className="mb-4 font-display text-xl font-bold text-navy-900">Giới thiệu về {venue.name}</h2>
                        <p className="leading-relaxed text-navy-600">{venue.description || "Chưa có mô tả cho sân này."}</p>
                        <div className="mt-4 space-y-1">
                            <p className="text-sm text-navy-500">📍 Địa chỉ: {venue.address}</p>
                            <p className="text-sm text-navy-500">📞 Điện thoại: {venue.phone}</p>
                            <p className="text-sm text-navy-500">⏰ Giờ mở cửa: {venue.openTime} - {venue.closeTime}</p>
                        </div>
                    </section>

                    {/* Section Tiện ích */}
                    <section className="mb-10">
                        <h2 className="mb-4 font-display text-xl font-bold text-navy-900">Tiện ích</h2>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {venue?.facilities && venue.facilities.length > 0 ? (
                                venue.facilities.map((a) => (
                                    <div key={a} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5">
                                        <span style={{ color: '#10b981' }}>✓</span>
                                        <span className="text-sm font-medium text-navy-700">Tiện ích số {a}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Chưa có thông tin tiện ích.</p>
                            )}
                        </div>
                    </section>

                    {/* Section Hình ảnh sân */}
                    <section className="mb-10">
                        <h2 className="mb-4 font-display text-xl font-bold text-navy-900">Hình ảnh sân</h2>
                        <div className="grid grid-cols-3 gap-3">
                            <img
                            src={venue.image}
                            alt="Banner sân thể thao"
                            className="h-28 w-full rounded-xl object-cover sm:h-40"
                            />
                        </div>
                    </section>
                </div>

                {/* CỘT PHẢI: SIDEBAR ĐẶT SÂN */}
                <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-36">
                    <div>
                        <p className="text-xs text-navy-400">Giá thuê sân từ</p>
                        <p className="font-display text-2xl font-extrabold text-navy-900">
                            {formatCurrency(venue.minPrice)}
                            <span className="text-sm font-normal text-navy-400">/giờ</span>
                        </p>
                    </div>
                    <Link
                        to="schedule"
                        className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 font-semibold text-navy-950 shadow-gold transition-transform hover:scale-[1.01]"
                        style={{ background: 'linear-gradient(to bottom, #facc15, #eab308)', color: '#0f172a' }}
                    >
                        Xem lịch &amp; đặt sân
                    </Link>
                    <p className="text-center text-xs text-navy-400">
                        Miễn phí huỷ trước 24 giờ
                    </p>
                </aside>

            </div>
        </div>
    );
}