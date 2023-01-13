import React from 'react'
import { useState, useEffect } from 'react'
import Setting from '../assets/img/setting.svg'
import Logout from '../assets/img/log.svg'
import Dashboard from '../assets/img/dash.svg'

const PopupMenu = ({open}) => {
  const [isShown, setIsShown] = useState(open)
  useEffect(() => {
      setIsShown(open)
  }, [open])

  const handleLogout = () => {
    localStorage.setItem('isLogged', false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'
  }

  const handleSetting = () => {
    window.location.href = '/client/setting'
  }

  const handleDashboard = () => {
    window.location.href = '/client/'
  }

  return (
      <div
        className={`popup-menu flex flex-col gap-2 ${isShown ? 'shown' : ''}`}
      >
        <div className='flex gap-6 text-lg text-white font-semibold px-6 py-1 cursor-pointer'  onClick={()=> handleDashboard()}><img src={Dashboard}/> Dashboard</div>
        <div className='flex gap-6 text-lg text-white font-semibold px-6 py-1 cursor-pointer'  onClick={()=> handleSetting()}><img src={Setting}/> Setting</div>
        <div className='flex gap-6 text-lg text-white font-semibold px-6 py-1 cursor-pointer' onClick={()=> handleLogout()}><img src={Logout}/> Logout</div>
      </div>
  )
}

export default PopupMenu