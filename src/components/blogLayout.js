/* eslint-disable react/prop-types */
import * as React from 'react'
import { Link } from 'gatsby'
import client from '../db/supabase'
import { StaticImage } from 'gatsby-plugin-image'
import { useState } from 'react'

function Kullanici() {
    let user = client.auth.user()
    if (client.auth.session() === null ||client.auth.session() === undefined ) {
        return (
            <div className=" navbar-item buttons">
                <Link  className='navbar-item button is-primary'to="/girisyap">Giriş Yap</Link>
                <Link className='navbar-item button is-primary is-outlined 'to="/kayitol">Kayıt Ol</Link>
            </div>
        )
    } else {
        return (
            <div id='user' className="navbar-item has-dropdown is-hoverable ">
                <div style={{cursor:'default'}} className="navbar-link">
                    <h4>{`${user.user_metadata.ad} ${user.user_metadata.soyad}`}</h4>
                </div>
                <div className="navbar-dropdown is-dark">
                    <ul className=''>
                        <li className='navbar-item' ><Link className='link' to='/profil/'>Profil ve Ayarlar</Link></li>
                        <hr className='navbar-divider' />
                        <li className='navbar-item' ><button  className='button is-dark ' onClick={()=>{client.auth.signOut();location.reload()}} >Çıkış Yap</button></li>
                    </ul>
                </div>
            </div>
        )
    }
}

// eslint-disable-next-line react/prop-types
const BlogLayout = ({ children }) => {
    const [menustate, setMenustate] = useState(false)
    const image = {width:66,height:66,maxHeight:'unset'}
    return (
        <>
            <header className='header' >
                <nav aria-label='main navigation' role={'navigation'} className='navbar' >
                    <div className="navbar-brand">
                        <Link className='navbar-item' to="/">
                            <StaticImage imgStyle={image} style={image} alt='LOGO' src='../images/Logo.png' formats={['auto','avif','png']}/>
                        </Link>
                        <button style={{height:'112px'}} type='menu' role="button" className={`navbar-burger ${menustate ? 'is-active' : '' }`} aria-label="menu" aria-expanded="false" onClick={()=>{setMenustate(!menustate)}} data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>

                    <div id='navbarBasicExample' className={`navbar-menu ${menustate ? 'is-active' : '' }`}>
                        <div className='navbar-start'>
                            <Link className='navbar-item' activeClassName='is-active' to="/">Ana Sayfa</Link>
                            <div className="navbar-item has-dropdown is-hoverable ">
                                <Link className='navbar-link' activeClassName='is-  active' to="/bizkimiz">Biz Kimiz ? </Link>
                                <div className="navbar-dropdown">
                                    <Link className='navbar-item has-text-weight-bold ' activeClassName='is-active' to="/bizkimiz/topluluk">Topluluk</Link>
                                    <hr className="navbar-divider" />
                                    <Link className='navbar-item has-text-weight-bold ' activeClassName='is-active' to="/bizkimiz/komiteler">Komiteler</Link>
                                    <Link className='navbar-item ' activeClassName='is-active' to="/bizkimiz/komiteler/astronomi"><span className="ml-3">Astronomi</span></Link>
                                    <Link className='navbar-item ' activeClassName='is-active' to="/bizkimiz/komiteler/biyoloji"><span className="ml-3">Biyoloji</span></Link>
                                    <Link className='navbar-item ' activeClassName='is-active' to="/bizkimiz/komiteler/fizik"><span className="ml-3">Fizik</span></Link>
                                    <Link className='navbar-item ' activeClassName='is-active' to="/bizkimiz/komiteler/kimya"><span className="ml-3">Kimya</span></Link>
                                    <Link className='navbar-item ' activeClassName='is-active' to="/bizkimiz/komiteler/matematik"><span className="ml-3">Matematik</span></Link>
                                </div>
                            </div>
                            <Link className='navbar-item' activeClassName='is-active' to="/etkinlikler">Etkinliklerimiz</Link>
                            <Link className='navbar-item' activeClassName='is-active' to="/yazilar">Yazılar</Link>
                            <Link className='navbar-item' activeClassName='is-active' to="/beyinfirtinasi">Beyin Fırtınası</Link>
                            <Link className='navbar-item' activeClassName='is-active' to="/iletisim">İletişim</Link>
                        </div>
                        <div className="navbar-end">
                            <Kullanici />
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer className='footer level level-item'>
            Bilim Platformu&nbsp;<a href='https://www.ankara.edu.tr'>Ankara Üniversitesi</a>&apos;ne bağlı bir toplulukdur.
            </footer>
        </>
    )
}

export default BlogLayout
