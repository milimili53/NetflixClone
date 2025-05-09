import React, {useState, useEffect } from 'react'
import './Nav.css'

export const Nav = () => {

  const [show, handleShow] = React.useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    })
    return () => {
      window.removeEventListener("scroll")
    };
  }, [])
  
  return (
    <div className={`nav ${show && "nav_black"}`}>
        <img className='nav_logo' src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
        <img className='nav_avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix Avatar" />
    </div>
  )
}


export default Nav