import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import {Link, useParams, useNavigate} from "react-router-dom";

export default function VenueSchedule() {
    const { id } = useParams();
    const [venue, setVenue] = useState("");
    const[court,setCourt] = useState([])
    const today= new Date();
    const[currentDate,setCurrentDate]= useState(today);
    const[timeSlot,setTimeSlot] =useState([]);
    const[selectedSlots,setSelectedSlots] = useState([]);
    const navigate = useNavigate();

    const handleBooking = () => {
        const userCurrently = localStorage.getItem("currentUser");
        if(!userCurrently){          
            navigate('/Login');
        }
        else{
            navigate(`/Booking1`, { state: { selectedSlots, venueId: id , venueName: venue.name} });
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3000/venues/${id}`)
            .then(response => response.json())
            .then(data => {
                setVenue(data);
            })
        fetch(`http://localhost:3000/courts?venueId=${id}`)
        .then(res=>res.json())
        .then(data=> setCourt(data));
        
        fetch(`http://localhost:3000/timeSlots`)
        .then(res=>res.json())
        .then(data=> setTimeSlot(data));

    }, [id]);
         
    if (!venue) {
        return <div className="container" style={{ padding: '40px' }}>Đang tải thông tin sân...</div>;
    }
   
        
        const changeDate = (days) =>{
        const newDate = new Date(currentDate);
        newDate.setDate(
            newDate.getDate()+days
        );
         const todayDate = new Date();

        todayDate.setHours(0, 0, 0, 0);
        newDate.setHours(0, 0, 0, 0);
        if (newDate<todayDate){
            return ;
        }
        setCurrentDate(newDate);
        }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

const hours = [
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00"
];
const handleSelectSlot = (slot, courtData) => {
        console.log("SLOT:", slot);
    console.log("PRICE:", slot.price);
    setSelectedSlots(prev => {
        const isSelected = prev.some(
            item => item.id === slot.id
        );

        if (isSelected) {
            return prev.filter(
                item => item.id !== slot.id
            );
        }
        return [
            ...prev,
            {
                ...slot,
                courtName: courtData.name
            }
        ];
    });
};
    return (
        <>
            <div className="venue-hero">
                <img src={venue.image} alt="The Platinum Arena" />
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
                        <Link to={`/VenueOverView/${id}/schedule`} className="is-active">Lịch trống</Link>
                        <Link to={`/VenueOverView/${id}/reviews`}>Đánh giá</Link>
                        <Link to={`/VenueOverView/${id}/rules`}>Quy định</Link>
                    </nav>
                    <Button onClick={handleBooking}  className="btn btn-gold btn-sm venue-tabs-book-btn">
                                            Đặt sân ngay
                                        </Button>
                </div>
            </div>

            <main className="container" style={{ padding: '40px 16px' }}>
                <div className="schedule-head">
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Lịch trống — {venue.name}</h2>
                        <p style={{ fontSize: '14px', color: 'var(--navy-500)' }}>Chọn khung giờ để đặt sân</p>
                    </div>
                    <div className="date-switcher">
                        <button onClick={() => changeDate(-1)} type="button">
                            <svg  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <span className="current-date">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>{' '}
                         {currentDate.toLocaleDateString("vi-VN")}
            </span>
                        <button type="button" onClick={() => changeDate(1)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="schedule-legend">
                    <span><span className="legend-dot available"></span> Trống</span>
                    <span><span className="legend-dot selected"></span> Đã chọn</span>
                    <span><span className="legend-dot pending"></span> Chờ xử lý</span>
                    <span><span className="legend-dot booked"></span> Đã đặt</span>
                </div>

                <div className="schedule-layout">
                    <div className="schedule-table-wrap">
                        <table className="schedule-table">
                            <thead>
                            <tr>
                                <th>Sân</th>
                                {
                                    hours.map(hours=>(
                                        <th>{hours}</th>
                                    ))
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {court.map(x => (
                                <tr key={x.id}>
                                    <td>{x.name}</td>
                                    {hours.map(hour => {
                                        const dynamicSlot = timeSlot.find(
                                            item =>
                                                item.courtId === x.id &&
                                                item.startTime === hour &&
                                                item.date === formatDate(currentDate)
                                        );
                                        const slot = dynamicSlot || {
                                            id: `virtual-${x.id}-${hour}`,
                                            courtId: x.id,
                                            courtName: x.name,
                                            startTime: hour,
                                            date: formatDate(currentDate),
                                            status: "Trống",
                                            price: x.pricePerHour
                                        };
                                        const isSelected = selectedSlots.some(
                                            item => item.id === slot.id
                                        );
                                        const getSlotConfig = (status) => {
                                            switch (status) {
                                                case "booked":
                                                    return { className: "slot-booked", text: "Đã đặt", disabled: true };
                                                case "pending":
                                                    return { className: "slot-pending", text: "Đang xử lý", disabled: true };
                                                default:
                                                    return { className: "slot-available", text: "Trống", disabled: false };
                                            }
                                        };

                                        const config = getSlotConfig(slot.status);

                                        return (
                                            <td key={hour}>
                                                <button
                                                    type="button"
                                                    disabled={config.disabled}
                                                    onClick={() => handleSelectSlot(slot, x)}
                                                    className={`slot-btn ${isSelected ? "slot-selected" : config.className}`}
                                                >
                                                    {isSelected ? "Đã chọn" : config.text}
                                                </button>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                        <aside className="booking-summary-card">
                            <h3>Tóm tắt đơn hàng</h3>
                            {selectedSlots.length === 0 ? (
                                <p>Chưa chọn sân nào</p>
                            ) : (
                                selectedSlots.map(slot => (
                                    <div
                                        className="summary-row"
                                        key={slot.id}
                                    >
                                        <span className="label">
                                            {slot.courtName} · {slot.startTime}
                                        </span>

                                        <span className="value">
                                            {Number(slot.price || 0).toLocaleString("vi-VN")} ₫
                                        </span>
                                    </div>
                                ))
                            )}

                            <div className="summary-total">
                                <span className="label">
                                    Tổng cộng
                                </span>

                                <span className="value">
                                    {selectedSlots
                                        .reduce(
                                            (total, slot) =>
                                                total + Number(slot.price || 0),
                                            0
                                        )
                                        .toLocaleString("vi-VN")} ₫
                                </span>
                            </div>
                            <Button className={`btn btn-gold btn-block ${selectedSlots.length === 0 ? 'disabled' : ''}`}
                                  style={{ marginTop: "20px",...(selectedSlots.length === 0 && {
                                          pointerEvents: "none",
                                          opacity: 0.5,
                                          cursor: "not-allowed"})
                            }} onClick = {handleBooking}> Tiếp tục đặt sân
                            </Button>
                        </aside>
                </div>
            </main>
        </>
    );
}