import React from 'react'
import {Router} from '@reach/router'
import BlogLayout from '../../components/blogLayout'
import Profil from '../../components/profil'
const index = () => {
    return (
        <BlogLayout>
            <Router basepath='/profil'>
                <Profil path='/' />
            </Router>
        </BlogLayout>
    )
}

export default index
