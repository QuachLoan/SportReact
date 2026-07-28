import './Favorites.css';
import {useEffect, useState} from "react";
function Favorites(){
    //state
    const [favourites, setFavourites] = useState([])

    //function
    useEffect(()=>{
        const saved = localStorage.getItem('favorites');
        if (saved) {
          setFavourites(JSON.parse(saved));
        }
      }, [])

    const removeFavourite = (id)=>{
        const updatedFavourites = favourites.filter(fav => fav.id !== id);
        setFavourites(updatedFavourites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavourites));
    }
    return(
        <>
    <main className="container" style={{ padding: '40px 16px 170px' }}>
      <div className="favorites-head">
        <span className="icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
          </svg>
        </span>
        <div>
          <h1>Sân yêu thích</h1>
          <p>{favourites.length} sân đã lưu</p>
        </div>
      </div>

      <div className="empty-state hidden">
        <div className="empty-state-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
          </svg>
        </div>
        <h3>Chưa có sân yêu thích</h3>
        <p>Nhấn biểu tượng trái tim trên sân bạn thích để lưu lại tại đây.</p>
        <a href="venues.html" className="btn btn-primary">Khám phá sân</a>
      </div>
    </main>
        </>
    )
}
export default Favorites;