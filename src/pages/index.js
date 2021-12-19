import React from 'react'
import Seo from '../components/blogSeo'
import MainLayout from '../components/mainLayout'

const index = () => {
    return (
        <MainLayout>
            <Seo title='Ana Sayfa'/>
            <div className="hero is-primary is-large ">
                <div className="hero-body" style={{position:'relative',backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundAttachment:'fixed',backgroundImage:'url(https://images.pexels.com/photos/10438284/pexels-photo-10438284.jpeg?cs=srgb&dl=pexels-sasha-prasastika-10438284.jpg&fm=jpg)'}} >
                    <div className="container has-text-centered">
                        <h1 className="has-text-centered title is-1">Bilim Platformuna Hoşgeldiniz</h1>
                        <div className="level has-text-centered">
                            <div className="buttons mt-6 level-item">
                                <button className="button is-medium">Hakkımızda</button>
                                <button className="button is-medium">İletişim</button>
                            </div>
                        </div>
                        <div className="level has-text-centered mt-6">
                            <span className='heading level-item is-size-5' >PEKİ BİZ KİMİZ</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section">
                <article className='has-text-centered'>
                    <h3 className='title is-3'>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>

                    <sub className='subtitle is-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellat culpa officiis.</sub>
                </article>
                <section className='section'>
                    <article>
                        article one
                    </article>
                </section>
            </div>

        </MainLayout>
    )
}

export default index
