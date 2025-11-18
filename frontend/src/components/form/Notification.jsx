import React, { useEffect, useRef, useState } from 'react'

function Notification({ message, show }) {
    const notification = useRef()
    const [display, setDisplay] = useState(show);
    const removeNotification = () => {
        setDisplay((prev) => { return false })
    }
    useEffect(() => {
        if (show) {
            setDisplay(true)
            const timer = setTimeout(removeNotification, 3000) // auto hide after 3 sec
            return () => clearTimeout(timer)
        }
    }, [show])

    return (
        <>
            {display && <div ref={notification} className='notification-container border-2 border-white rounded-xl min-12 mt-[20px] mb-[20px] bg-green-200 text-green-500 relative p-[10px] '>
                <span className='flex gap-2'>
                    <p>
                        {message}
                    </p>
                    <svg onClick={removeNotification} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </span>
            </div>}
        </>
    )

}

export default Notification