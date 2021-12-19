/* eslint-disable react/prop-types */
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Seo from '../components/blogSeo.js'

import client from '../db/supabase.js'

const Girisyap = ({location}) => {
    const params = new URLSearchParams(location.search)
    if(client.auth.session() != null || client.auth.session() != undefined ){
        window.location.href = '/blog'
    }
    const [fields, setFields] = React.useState({})
    console.log(fields)
    function handleinput(event) {
        let value = event.target.value,name = event.target.name
        setFields({
            ...fields,
            [name]:value
        })
    }
    return (
        <div className='hero is-primary is-fullheight'>
            <Seo title='Giriş Yap' />
            <div className="hero-body">
                <div className="container">
                    <form className='form box'
                        onSubmit={event => {
                            event.preventDefault()
                            const giris = async () => {
                                const { user, error } = await client.auth.signIn(
                                    {
                                        email: fields.email,
                                        password: fields.password,
                                    },
                                    { redirectTo: 'localhost:8000'+params.get('redirect') }
                                )
                                if (error) return 0
                                console.log(user)
                                window.location.href = params.get('redirect')
                            }
                            giris()
                        }}
                    >
                        <div className=" has-text-dark has-text-centered">
                            <Link className='level-item image' to="/">
                                <StaticImage className='image is-128x128' alt='LOGO' src='../images/Logo.png' formats={['auto','avif','png']}/>
                            </Link>
                            <br />
                            <h3 className='title has-text-dark is-3'>Giriş Yap | Bilim Platformu</h3>
                        </div>
                        <div className="field">
                            <label className='label' htmlFor="email">Email</label>
                            <div className="control">
                                <input
                                    onChange={event => handleinput(event)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className='input'
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label  className='label' htmlFor="password">Password</label>
                            <div className="control">
                                <input
                                    className='input'
                                    onChange={event => handleinput(event)}
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <div className="level">
                                    <div className="level-right">
                                        <button className='button' type="submit">Giriş Yap</button>
                                    </div>
                                    <div className="level-left">
                                        <Link className='has-text-link' to='/kayitol'> Hesabın yokmu ? Hemen kayıt olmak için buraya tıkla. </Link>
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

export default Girisyap
