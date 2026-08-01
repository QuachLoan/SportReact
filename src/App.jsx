import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home/Home'
import { Route, Router, Routes } from 'react-router-dom'
import News from './pages/News/News'
import New_Detail from './pages/News/New_Detail'
import Venues from "./pages/Venue/Venues.jsx";
import BookingLookUp from './pages/BookingLookUp/BookingLookUp.jsx'
import Favorites from './pages/Favorites/Favorites.jsx'
import VenueOverview from "./pages/Venue/VenueOverView.jsx";
import VenueCourt from "./pages/Venue/VenueCourt.jsx";
import VenueSchedule from "./pages/Venue/VenueSchedule.jsx";
import VenueReviews from "./pages/Venue/VenueReviews.jsx";
import VenueRules from "./pages/Venue/VenueRules.jsx";
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import LoginForm from './pages/Login/Login.jsx';
import RegisterForm from './pages/Register/Register.jsx';
import Booking from './pages/Booking/Booking.jsx';

function App() {
  return (
    <>
       <Header/>
           <Routes>
               <Route path="/" element={<Home/>}/>
                <Route path = "/Login" element ={<Login/>}/>
                <Route path = "/Register" element = {<Register/>}/>
                <Route path="/News" element={<News/>}/>
                <Route path="/New_Detail/:id" element={<New_Detail/>}/>
                <Route path = "/Venues" element = {<Venues/>}/>
                <Route path = "/BookingLookUp" element={<BookingLookUp/>}/>
                <Route path='/Favorites' element={<Favorites/>}/>
                <Route path = "/VenueOverView/:id" element = {<VenueOverview/>}/>
                <Route path = "/VenueOverView/:id/court" element = {<VenueCourt/>}/>
                <Route path = "/VenueOverView/:id/schedule" element = {<VenueSchedule/>}/>
                <Route path = "/VenueOverView/:id/reviews" element = {<VenueReviews/>}/>
                <Route path = "/VenueOverView/:id/rules" element={<VenueRules/>}/>
                <Route path = "/Booking" element={<Booking/>}/>
           </Routes>
       <Footer/>
    </>
  )
}

export default App
