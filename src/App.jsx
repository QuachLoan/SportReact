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
// import Court from "./pages/Court/Court.jsx";

function App() {
  return (
    <>
       <Header/>
           <Routes>
               <Route path="/" element={<Home/>}/>
                <Route path="/News" element={<News/>}/>
                <Route path="/News/:id" element={<New_Detail/>}/>
               {/* <Route path = "/Court" element = {<Court/>}/> */}
           </Routes>
       <Footer/>
    </>
  )
}

export default App
