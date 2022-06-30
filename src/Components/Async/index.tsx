import React, { useEffect, useState } from 'react'

export default function Async() {
    const [isButtonVisisble, setIsButtonVisisble] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsButtonVisisble(true)
        }, 1000)
    }, [])


    return (
        <div>
            <div>Hello World</div>            
            {isButtonVisisble && <button>Button</button> }
        </div>
    )
}
