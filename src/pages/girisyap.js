import React from 'react'
import { Helmet } from 'react-helmet'
import client from '../db/supabase.js'

const Girisyap = () => {
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
            <Helmet>
                <title>Giriş Yap</title>
            </Helmet>
            <div className="hero-body">
                <div className="container">
                    <form className='box'
                        onSubmit={event => {
                            event.preventDefault()
                            const giris = async () => {
                                const { user, error } = await client.auth.signIn(
                                    {
                                        email: fields.email,
                                        password: fields.password,
                                    },
                                    { redirectTo: 'localhost:8000/blog' }
                                )
                                if (error) return 0
                                console.log(user)
                                window.location.href = '/blog'
                            }
                            giris()
                        }}
                    >
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
                        <div className="control"><button className='button' type="submit">Giriş Yap</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Girisyap
