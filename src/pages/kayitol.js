import React, { useState } from 'react'
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
            .then(response => console.log(response))
            .catch(err => console.error(err))
        //console.log('done')
        return true
    }
    return (
        <div className='hero is-primary is-fullheight'>
            <form
                className='form hero-body container'
                onSubmit={event => {
                    event.preventDefault()
                    kayit()
                }}
            >
                <div className="box">
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
                    <div className="field">
                        <div className="control"><button className='button is-primary' type="submit">Kayıt Ol</button></div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Kayitol
