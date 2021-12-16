/* eslint-disable react/prop-types */
import { Link } from 'gatsby'
import React from 'react'

const AuthPageLayout = ({children}) => {
    return (
        <div>
            <Link to='/'>HOME</Link>
            {children}
        </div>
    )
}

export default AuthPageLayout
