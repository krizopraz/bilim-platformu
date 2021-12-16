/* eslint-disable react/prop-types */
import React from 'react'
//import PropTypes from 'prop-types'
//import '../bulma.min.css'
// eslint-disable-next-line react/prop-types

const BlogPostTemplate= ({entry,body})=>{
    return(
        <article
            className="blog-post m-4 container"
            itemScope
            itemType="http://schema.org/Article"
        >
            <header>
                <h1 className='title is-1' itemProp="headline">{entry.getIn(['data','title'])}</h1>
                <sub className='subtitle is-5' >{entry.getIn(['data','date'])}</sub>
            </header>
            <section
                className='content'
                itemProp="articleBody"
                dangerouslySetInnerHTML={{__html:body}}
            />
        </article>
    )
}


export default BlogPostTemplate
