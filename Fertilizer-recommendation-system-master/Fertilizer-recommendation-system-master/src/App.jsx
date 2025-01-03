import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Home from './Home'
import Faq from './Faq';
function App() {

  return (
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/faq' element={<Faq/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
