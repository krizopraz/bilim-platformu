/* eslint-disable react/prop-types */
import * as React from 'react'
import { Link } from 'gatsby'
import client from '../db/supabase'
import { StaticImage } from 'gatsby-plugin-image'

function Kullanici() {
    let user = client.auth.user()
    if (client.auth.session() === null ||client.auth.session() === undefined ) {
        return (
            <div className="buttons">
                <Link  className='navbar-item button is-primary'to="/girisyap">Giriş Yap</Link>
                <Link className='navbar-item button is-primary is-outlined 'to="/kayitol">Kayıt Ol</Link>
            </div>
        )
    } else {
        return (
            <div id='user' className="navbar-item has-dropdown is-hoverable ">
                <div style={{cursor:'default'}} className="button is-dark navbar-link">
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
const BlogLayout = ({ location, children }) => {

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
                        <div className="navbar-end">
                            <Kullanici />
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

export default BlogLayout
