/* eslint-disable react/prop-types */
import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/blogSeo'
import MainLayout from '../components/mainLayout'

const NotFoundPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title

    return (
        <MainLayout location={location} title={siteTitle}>
            <Seo title="404: Not Found" />
            <h1>404: Not Found</h1>
            <p>Olmayan bir sayfaya girmeye çalışmışsın gibi duruyor.</p>
        </MainLayout>
    )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
