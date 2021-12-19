import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import Seo from '../components/blogSeo'
import client from '../db/supabase'
const Kayitol = () => {
    // const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState({
    })
    function handleinput(event) {
        setFields({
            ...fields,
            [event.target.name]:event.target.value
        })
    }
    function kayit() {
        //console.log('Sent')
        client.auth
            .signUp(
                {
                    email: fields.email,
                    password: fields.sifre,
                },
                {
                    data: {
                        ad: fields.ad,
                        soyad: fields.soyad,
                    },
                }
            )
            .catch(err => console.error(err))
        //console.log('done')
        return true
    }
    return (
        <div className='hero is-primary is-fullheight'>
            <Seo title='Kayıt Ol'/>
            <div className="hero-body">
                <div className="container">
                    <form
                        className='form box'
                        onSubmit={event => {
                            event.preventDefault()
                            kayit()
                        }}
                    >
                        <div className=" has-text-dark has-text-centered">
                            <Link className='level-item image' to="/">
                                <StaticImage className='image is-128x128' alt='LOGO' src='../images/Logo.png' formats={['auto','avif','png']}/>
                            </Link>
                            <br />
                            <h3 className='title has-text-dark is-3'>Kayıt Ol | Bilim Platformu</h3>
                        </div>
                        <div className="field">
                            <label className='label' htmlFor="ad">Ad</label>
                            <div className="control">
                                <input
                                    className='input'
                                    onChange={event => {
                                        handleinput(event)
                                    }}
                                    type="text"
                                    name="ad"
                                    id="ad"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className='label' htmlFor="soyisim">Soyad</label>
                            <input
                                className='input'
                                onChange={event => handleinput(event)}
                                type="text"
                                name="soyad"
                                id="soyad"
                            />
                        </div>
                        <div className="field">
                            <label className='label' htmlFor="email">Email</label>
                            <div className="control">
                                <input
                                    onChange={event => {
                                        handleinput(event)
                                    }}
                                    className='input'
                                    type="email"
                                    name="email"
                                    id="email"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className='label' htmlFor="sifre">Şifre</label>
                            <div className="control">
                                <input
                                    className='input'
                                    onChange={event => {
                                        handleinput(event)
                                    }}
                                    type="password"
                                    name="sifre"
                                    id="sifre"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <div className="level">
                                    <div className="level-right">
                                        <button className='button' type="submit">Kayıt Ol</button>
                                    </div>
                                    <div className="level-left">
                                        <Link className='has-text-link'  to='/girisyap'> Zaten hesabın varmı ? Hemen giriş yapmak için buraya tıkla. </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Kayitol
