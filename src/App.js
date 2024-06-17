import React from 'react'
import Header from './Header'
import { Route, Routes, BrowserRouter, Link } from "react-router-dom"
import AddContacts from './AddContacts'
import Edit from './Edit'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/home" >Home Page</Link>
       
        <Routes>
          <Route path="/home" element={<Header/>} />
          <Route path="/add" element={<AddContacts/>} />
          <Route path="/edit" element={<Edit/>} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
