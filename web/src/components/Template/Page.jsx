import React, { useEffect, useState } from 'react'
import { isLogged } from '../../utils/auth'
import { redirectDocument } from "react-router-dom";

export default function Page({ children, title = '', window = 'all', auth = false }) {
    const [classStyle, setClassStyle] = useState('col-lg-6 col-md-8 col-sm-12')

    useEffect(() => {
        if (!isLogged() && auth)
            redirectDocument("/login")

        if (window === 'mini')
            setClassStyle('col-sm-12 col-md-6 col-lg-4')
    }, [])

    return (
        <div className={`mx-auto ${classStyle}`}>
            {title ??
                <div className='p-3'>
                    <h5>{title}</h5>
                </div>
            }

            <div className='p-3'>
                {children}
            </div>
        </div>
    )
}