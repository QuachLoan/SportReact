import './BookingLookUp.css'
function BookingLookUp(){
    return(
        <>
         <main className="container" style={{padding:"56px 16px"}}>
    <div className="page-header is-center">
      <h1>Tra cứu đặt sân</h1>
      <p>Nhập mã đặt sân hoặc số điện thoại để kiểm tra trạng thái</p>
    </div>

    <form className="lookup-form">
      <div className="field-wrap">
        <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" className="input has-icon" placeholder="VD: SH123456 hoặc 09xx xxx xxx" />
      </div>
      <button type="submit" className="btn btn-gold">Tra cứu</button>
    </form>

    <div className="lookup-layout">
      <div className="lookup-result-card">
        <div className="lookup-head">
          <div>
            <p className="venue-name">The Platinum Arena</p>
            <p className="court-name"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> Sân A - Mặt cứng</p>
          </div>
          <div>
            <p className="datetime"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 26/07/2026 · 18:00 - 19:00</p>
            <p className="total">290.000 ₫</p>
          </div>
        </div>

        <ol className="status-steps">
          <li className="status-step is-done">
            <div className="status-step-col">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span className="status-line"></span>
            </div>
            <div className="status-step-body">
              <p className="title">Đã đặt sân</p>
              <p className="desc">Yêu cầu đặt sân đã được ghi nhận</p>
            </div>
          </li>
          <li className="status-step is-done">
            <div className="status-step-col">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span className="status-line"></span>
            </div>
            <div className="status-step-body">
              <p className="title">Đã xác nhận</p>
              <p className="desc">Sân đã sẵn sàng cho lịch của bạn</p>
            </div>
          </li>
          <li className="status-step is-done">
            <div className="status-step-col">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span className="status-line"></span>
            </div>
            <div className="status-step-body">
              <p className="title">Đang diễn ra</p>
              <p className="desc">Đã check-in tại sân</p>
            </div>
          </li>
          <li className="status-step">
            <div className="status-step-col">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <div className="status-step-body">
              <p className="title">Hoàn thành</p>
              <p className="desc">Cảm ơn bạn đã sử dụng SportHub</p>
            </div>
          </li>
        </ol>
      </div>

      <aside className="feedback-card">
        <h3>Đánh giá trải nghiệm</h3>
        <div className="star-input" data-star-input>
          <button type="button"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg></button>
          <button type="button"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg></button>
          <button type="button"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg></button>
          <button type="button"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg></button>
          <button type="button"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg></button>
        </div>
        <textarea className="textarea" rows="4" placeholder="Chia sẻ cảm nhận của bạn..."></textarea>
        <button type="button" className="btn btn-primary btn-block" style={{ marginTop: "16px" }} >Gửi đánh giá</button>
      </aside>
    </div>
  </main>

        </>
    )
}
export default BookingLookUp;