/* eslint-disable react/prop-types */
import { Link } from 'gatsby'
import React from 'react'
import {StaticImage} from 'gatsby-plugin-image'
function MainLayout({ children }) {
    return (
        <>
            <header className='header' >
                <nav aria-label='main navigation' role={'navigation'} className='navbar is-spaced is-dark' >
                    <div className="navbar-brand">
                        <Link className='navbar-item image' to="/">
                            <StaticImage imgStyle={{width:128,height:128,maxHeight:'unset'}} style={{width:128,height:128,maxHeight:'unset'}} alt='LOGO' src='../images/Logo.png' formats={['auto','avif','png']}/>
                        </Link>
                    </div>
                    <div className='navbar-menu'>
                        <div className='navbar-start'>
                            <Link className='navbar-item' activeClassName='is-active' to="/">Ana Sayfa</Link>
                            <div className="navbar-item has-dropdown is-hoverable ">
                                <Link className='navbar-link' activeClassName='is-active' to="/bizkimiz">Biz Kimiz ? </Link>
                                <div className="navbar-dropdown">
                                    <Link className='navbar-item' activeClassName='is-active' to="/bizkimiz/topluluk">Topluluk</Link>
                                    <Link className='navbar-item' activeClassName='is-active' to="/bizkimiz/komiteler">Komiteler</Link>
                                </div>
                            </div>
                            <Link className='navbar-item' activeClassName='is-active' to="/etkinlikler">Etkinliklerimiz</Link>
                            <Link className='navbar-item' activeClassName='is-active' to="/yazilar">Yazılar</Link>
                            <Link className='navbar-item' activeClassName='is-active' to="/beyinfirtinasi">Beyin Fırtınası</Link>
                            <Link className='navbar-item' activeClassName='is-active' to="/iletisim">İletişim</Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer>
                THE FOOTER
            </footer>
        </>
    )
}

export default MainLayout
