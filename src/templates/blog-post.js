/* eslint-disable react/prop-types */
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/blogLayout'
import Seo from '../components/blogSeo'
import client from '../db/supabase.js'
import { MDXRenderer } from 'gatsby-plugin-mdx'

// eslint-disable-next-line react/prop-types
function YorumYap({ location, postId, actions }) {
    const [icerik, setIcerik] = React.useState('')
    if (client.auth.session() === undefined || client.auth.session() === null)
        return (
            <span>
        Yorum yapabilmek için <Link to={`/girisyap?redirect=${window.location.pathname}` }>Giriş yapmalısınız</Link>
        .Kayıt olmak için <Link to="/kayitol">buraya tıklayın</Link>.
            </span>
        )
    function handle() {
        (async () => {
            let user = client.auth.user()
            console.log(user)
            if(icerik === '' || icerik === undefined || icerik === null )return 0
            try {
                const { data, error } = await client
                    .from('yorumlar')
                    .insert([
                        {   icerik:icerik.trim(),
                            post_id:postId,
                            kullanici_id: user.id,
                            kullanici_adi:user.user_metadata.ad,
                            kullanici_soyadi:user.user_metadata.soyad
                        },
                    ])
                if (error) throw error
                actions.setYorumlar(actions.yorumlar.concat(data))
                setIcerik('')
            } catch (error) {

                console.log(error)
            }
        })()
    }
    return (
        <form className='media'
            onSubmit={e => {
                e.preventDefault()
                handle(e)
            }}
        >
            <div className="media-content">
                <div className="field">
                    <div className="control">
                        <textarea
                            className='textarea'
                            onChange={event => {
                                setIcerik(event.target.value.trim())
                            }}
                            value={icerik}
                            type="text"
                            placeholder="Herkese açık bir yorum ekle..."
                            name="yorum"
                            id="yorumyap"
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className='button is-primary' type="submit">Gönder</button>
                    </div>
                </div>
            </div>
            <div className='is-divider' data-content='SA' />
        </form>
    )
}

function Yorumlar({ postId }) {
    const [yorumlar, setYorumlar] = React.useState([])

    React.useEffect(() => {
        const getirYorumlar = async () => {
            try {
                const { data, error } = await client
                    .from('yazilar_yorumlar')
                    .select()
                    .eq('post_id', postId)
                if (error) throw error
                setYorumlar(data)
            } catch (error) {
                //console.log(error)
            }
        }
        getirYorumlar()
    }, [])
    //console.log(yorumlar)
    if (yorumlar == null) {
        return (
            <>
                <YorumYap postId={postId} actions={{ yorumlar, setYorumlar }} />
                <span>Yorum Bulunamadı. İlk yorumu atmaya ne dersin ? </span>
            </>
        )
    }
    return (
        <div className='section' >
            <h2 className='title is-2' >Yorumlar</h2>
            <YorumYap postId={postId} actions={{ yorumlar, setYorumlar }} />
            <ul className='section'>
                {yorumlar.length === 0 ? (
                    <span>Yorum Bulunamadı. İlk yorumu atmaya ne dersin ? </span>
                ) : (
                    yorumlar.map(yorum => {
                        return (
                            <li className='media' key={yorum.id}>
                                <div className='media-content' >
                                    <article className='content' >
                                        <h4 >{yorum.kullanici_adi+' '+yorum.kullanici_soyadi }</h4>
                                        <p>{yorum.icerik}</p>
                                        <sub>{(new Date(yorum.zaman)).toLocaleDateString()}</sub>
                                        <footer>

                                        </footer>
                                    </article>
                                </div>
                            </li>
                        )
                    })
                )}
            </ul>
        </div>
    )
}

const BlogPostTemplate = ({ data, location }) => {

    const post = data.mdx
    const siteTitle = data.site.siteMetadata?.title || 'Title'
    const { previous, next } = data
    return (
        <Layout location={location} className='section' title={siteTitle}>
            <Seo
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <article
                className="blog-post m-4 container"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <h1 className='title is-1' itemProp="headline">{post.frontmatter.title}</h1>
                    <sub className='subtitle is-6' >Paylaşıldığı tarih: {(new Date(post.frontmatter.date)).toLocaleDateString()}</sub>
                </header>
                <section
                    className=' section content'
                    itemProp="articleBody"
                >
                    <MDXRenderer>{post.body}</MDXRenderer>
                </section>
                <hr />
                <footer>
                    <Yorumlar location={location} postId={post.id} />
                </footer>
            </article>
            <nav className="blog-post-nav">
                <ul

                >
                    <li>
                        {previous && (
                            <Link to={'/blog' + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={'/blog' + next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
