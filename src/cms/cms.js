/* eslint-disable react/prop-types */
import CMS from 'netlify-cms-app'
//import "../style.css"
import '../normalize.css'
import React from 'react'

import ReactMarkdown from 'react-markdown'
const BlogPostPreview = ({ entry, widgetFor }) => {
    console.log(widgetFor('body'))
    //const Content = widgetFor('body')
    return (
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

            >

                <ReactMarkdown escapeHtml={false} >
                    {widgetFor('body')}
                </ReactMarkdown>
            </section>
        </article>
    )
}

CMS.registerPreviewTemplate('yazi',BlogPostPreview)
CMS.registerPreviewStyle('./bulma.min.css')
