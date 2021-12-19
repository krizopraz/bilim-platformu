import React from 'react'
import MainLayout from '../components/mainLayout'
import {Link, graphql} from 'gatsby'
import Seo from '../components/blogSeo'
const etkinlikler = ({data}) => {
    const etkinliklerListesi = data.allMdx.nodes
    console.log(data)
    return(
        <MainLayout>
            <Seo title={data.site.siteMetadata.title}/>
            <div className="section columns is-multiline">
                {
                    etkinliklerListesi.map((etkinlik)=>{
                        return(
                            <div  key={etkinlik.id} className="column is-one-quarter">
                                <Link to={'/etkinlikler'+etkinlik.fields.slug} className='box'>
                                    <h1 className='' >{etkinlik.frontmatter.title}</h1>
                                    <figure className='image is-3by2'>
                                        <img src={etkinlik.frontmatter.thumbnail} alt="" />
                                    </figure>
                                    <br />
                                    <div className='content'>
                                        <p className=''>{etkinlik.frontmatter.description}</p>
                                        <sub className='' >{etkinlik.frontmatter.date}</sub>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

        </MainLayout>
    )
}
export const pageQuerry = graphql`
query MyQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {fileAbsolutePath: {regex: "content/etkinlik/"}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          date
          thumbnail
          description
          title
        }
      }
    }
  }
`
export default etkinlikler
