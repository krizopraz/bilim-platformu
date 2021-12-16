/* eslint-disable react/prop-types */
import CMS from 'netlify-cms-app'
//import "../style.css"
import '../normalize.css'
import React from 'react'

import ReactMarkdown from 'react-markdown'
import BlogPostTemplate from './preview-templates/BlogPreviewTemplate'
const BlogPostPreview = ({ entry, widgetFor }) => {
    //console.log(widgetFor('body'))
    //const Content = widgetFor('body')
    return (
        <BlogPostTemplate entry={entry} body={
            <ReactMarkdown >
                {widgetFor('body')}
            </ReactMarkdown>
        }  />

    )
}
CMS.registerPreviewTemplate('blog',BlogPostPreview)
//import styles from '!node-sass!../styles/global.scss'
//CMS.registerPreviewStyle(styles.toString(),{raw:true})
