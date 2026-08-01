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
  </main>

        </>
    )
}
export default BookingLookUp;