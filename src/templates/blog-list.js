
import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonary from 'react-masonry-css'
import Bio from '../components/blogBio'
import BlogLayout from '../components/blogLayout'
import Seo from '../components/blogSeo'

const blogList = ({ data, location }) => {
    console.log(location)
    const siteTitle = data.site.siteMetadata?.title || 'Title'
    const posts = data.allMdx.nodes
    const [sort, setSort] = React.useState('DESC')
    if (posts.length === 0) {
        return (
            <BlogLayout location={location} title={siteTitle}>
                <Seo title="Tüm Postlar" />
                <Bio />
                <p>
                    Hmm... Burası tertemiz.Bir post eklemeye ne dersin ?
                </p>
            </BlogLayout>
        )
    }
    const breakpoints = {
        default:3,
        1024:2,
        768:1,
    }
    return (
        <BlogLayout location={location} title={siteTitle}>
            <Seo title="Tüm Yazılarımız" />
            <section className="section">
                <div className="level">
                    <div className="level-left">
                        <h1 className="title is-1">Yazılarımız</h1>
                    </div>
                    <div className="level-right">

                    </div>
                    <div className='field has-addons' >
                        <div className="control has-icons-left is-expanded">
                            {
                            /**
                             * TODO:'@mdi/react @mdi/js indirilip iconlar değiştirilecek'
                             *
                             */
                            }
                            <span aria-hidden='true' className='icon'>
                                <i className='mdi mdi-dark mdi-magnify' aria-hidden='true'></i>
                            </span>
                            <input className='input' list='yazilar' type="search" placeholder='Yazılarda Ara' name="search" id="search" />
                            <datalist id='yazilar' >
                                {posts.map(post=>{
                                    return(<option key={post.frontmatter.slug} >
                                        {post.frontmatter.title}
                                    </option>)
                                })}
                            </datalist>
                        </div>
                        <div className="control">
                            <select
                                className='select'
                                value={sort}
                                onChange={event => {
                                    setSort(event.target.value)
                                }}
                                name="filter"
                                id="filter"
                            >
                                <option value=''>Tüm Kategoriler</option>
                                <option value="astronomi">Astronomi</option>
                                <option value='biyoloji'>Biyoloji</option>
                                <option value='fizik'>Fizik</option>
                                <option value='kimya'>Kimya</option>
                                <option value='matematik'>Matematik</option>
                            </select>
                        </div>
                        <div className="control">
                            <button className="button is-primary">Ara</button>
                        </div>
                    </div>
                </div>
                <ol className='' style={{ listStyle: 'none' }}>
                    <Masonary className="tile is-anchestor" columnClassName="tile is-vertical is-parent" breakpointCols={breakpoints}>
                        {posts.map(post => {
                            const title = post.frontmatter.title || post.fields.slug
                            return (
                                <Link className=' has-background-white-ter tile is-child box' key={post.fields.slug} to={`/yazilar${post.fields.slug}`} itemProp="url">
                                    <li className='' >
                                        <article
                                            className="post-list-item"
                                            itemScope
                                            itemType="http://schema.org/Article"
                                        >
                                            <header>
                                                <h2 className='title is-2' >
                                                    {title}
                                                </h2>
                                                <br />
                                            </header>
                                            <section>
                                                <p
                                                    className='content'
                                                    dangerouslySetInnerHTML={{
                                                        __html: post.frontmatter.description || post.excerpt,
                                                    }}
                                                    itemProp="description"
                                                />
                                            </section>
                                            <footer>
                                                <br />
                                                <sub className=''>{post.frontmatter.date}</sub>
                                            </footer>
                                        </article>
                                    </li>
                                </Link>
                            )
                        })}
                    </Masonary>
                </ol>
            </section>
        </BlogLayout>
    )
}


export default blogList

// GRAPHQL
export const pageQuery = graphql`
query BlogPageQuery($skip: Int!, $limit: Int!) {
    site {
        siteMetadata {
          title
        }
      }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
        nodes {
            excerpt
            fields {
              slug
            }
            frontmatter {
                date(formatString: "DD/MM/YYYY")
                title
                description
              }
      }
    }
  }
`
