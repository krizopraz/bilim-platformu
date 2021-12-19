
import { graphql, Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import BlogLayout from '../components/blogLayout'
import Seo from '../components/blogSeo'
import client from '../db/supabase.js'
/**
 * * Beyin Fırtınasının ana sayfası.
 * todo : Sayfa numaralandırılması ve konuların listelenmesi eklenecek
 * @returns React.Component
 */
const beyinFirtinasi = () => {
    const [modalOpen, setModalOpen] = useState(false),
        [konular, setKonular] = useState([]),
        [icerik, setİcerik] = useState(null),
        [loading, setLoading] = useState(false),
        [authModal, toggleAuthModal] = useState(false)
    const toggle = ()=>{loading?'':setModalOpen(!modalOpen)}
    useEffect(() => {
        const getKonular = async ()=>{
            try{
                const {data,error} =  await client.from('beyinfirtinasi').select().eq('ana_gonderi',true)
                if(error)throw error
                setKonular(data)
            } catch (error){
            // todo setKonular()
            }
        }
        getKonular()
    },['none'])
    console.log(konular)
    function yeniKonuEkle(){
        console.log('one')
        setLoading(true)
        const ekle = async ()=>{
            if(icerik=='')throw 'err'
            console.log('two')
            const {data,error} = await client.from('beyinfirtinasi').insert([{
                icerik,
                kullanici_ad:client.auth.user().user_metadata.ad,
                kullanici_soyad:client.auth.user().user_metadata.soyad,
                kullanici_id:client.auth.user().id
            }])
            if (error) throw error
            console.log(data)


        }
        ekle().then(()=>toggle()).then(()=>setLoading(false)).catch(err=>{console.log(err);setLoading(false)})
        console.log('four')
    }
    const kayit = ()=>{toggleAuthModal(!authModal)}
    return (
        <>
            <div className={`modal ${authModal ? 'is-active':''} `}>
                <div onClick={kayit} className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Giriş yapmanız gerekiyor</p>
                        <button onClick={kayit} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        Bu işlemi yapabilmek için giriş yapmanız gerekmektedir.
                    </section>
                    <footer className="modal-card-foot">
                        <Link to='/girisyap?redirect=/beyinfirtinasi' className="button is-success">Giriş Yap</Link>
                        <button onClick={kayit} className="button">İptal</button>
                    </footer>
                </div>
            </div>

            <form onSubmit={(e)=>{e.preventDefault();yeniKonuEkle()}} className={`modal ${modalOpen ? 'is-active':''} form`}>
                <div onClick={toggle} className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Yeni Konu Ekle</p>
                        <button onClick={toggle} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label htmlFor="icerik" className="label">Konu İçeriği</label>
                            <div className="control">
                                <input onChange={(e)=>{setİcerik(e.target.value.trim())}} name='icerik' type="textarea" className="textarea" />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button type='submit' className={`button ${loading ? 'is-loading':''} is-success`}>Ekle</button>
                        <button onClick={toggle} type='reset' className="button">İptal</button>
                    </footer>
                </div>
            </form>
            <BlogLayout>
                <Seo title='Beyin Fırtınası' />
                <div className="section">
                    <div className="columns">
                        <div className="column is-three-fifths is-flex is-flex-direction-column">
                        Konular
                        </div>
                        <div className="column is-two-fifths is-flex is-flex-direction-column">
                            <button onClick={client.auth.user()===null?kayit:toggle} className='button' >Yeni Konu Oluştur</button>

                        </div>
                    </div>
                </div>
            </BlogLayout>
        </>
    )
}


export default beyinFirtinasi
export const pagequerry = graphql`
{
    site{
        siteMetadata{
            title
        }
    }
}
`
