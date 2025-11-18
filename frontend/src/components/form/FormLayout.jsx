import React from 'react'
import Notification from './Notification';


function FormLayout({ children }) {
  return (
    <div className="form-window relative w-full h-full  flex flex-col  items-center justify-center  bg-cover bg-center bg-no-repeat bg-[url('/background.jpg')]">
      {children}
    </div>
  )
}

export default FormLayout