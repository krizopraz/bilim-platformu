/**
 * @deprecated
 */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Masonary from 'react-masonry-css'
import Bio from './src/components/blogBio'
import BlogLayout from './src/components/blogLayout'
import Seo from './src/components/blogSeo'

const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || 'Title'
    const posts = data.allMarkdownRemark.nodes
    const [sort, setSort] = React.useState('DESC')
    if (posts.length === 0) {
        return (
            <BlogLayout locati on={location} title={siteTitle}>
                <Seo title="All posts" />
                <Bio />
                <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
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
            <Seo title="Tüm Blog Postları" />
            <Bio />
            <div className='field is-grouped' >
                <input className='control' type="search" name="filter" id="filter" />
                <select
                    className='control'
                    value={sort}
                    onChange={event => {
                        setSort(event.target.value)
                    }}
                    name="sort"
                    id="sort"
                >
                    <option value="ASC">En eskiden en yeniye</option>
                    <option defaultChecked={true} value="DESC">En yeniden en eskiye</option>
                </select>
            </div>
            <ol className='' style={{ listStyle: 'none' }}>
                <Masonary className="tile is-anchestor" columnClassName="tile is-vertical is-parent" breakpointCols={breakpoints}>
                    {posts.map(post => {
                        const title = post.frontmatter.title || post.fields.slug
                        return (

                            <Link className=' has-background-white-ter tile is-child box' key={post.fields.slug} to={`/blog${post.fields.slug}`} itemProp="url">
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
                                            <small className='subtitle is-5'>{post.frontmatter.date}</small>
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
                                    </article>
                                </li>
                            </Link>
                        )
                    })}
                </Masonary>
            </ol>
        </BlogLayout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
