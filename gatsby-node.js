const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { createClient } = require('@supabase/supabase-js')

const client = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY,
    {}
)

require('dotenv').config({
    path: `../../.env.${process.env.NODE_ENV}`,
})
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    // Define a template for blog post
    const blogPost = path.resolve('./src/templates/blog-post.js')
    // Get all markdown blog posts sorted by date
    const result = await graphql(
        `
        {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
    )
    if (result.errors) {
        reporter.panicOnBuild(
            'Yazılar Yüklenirken Bir Hata Oluştur. Lütfen Sayfayı Yenileyerek Tekrar Deneyiniz.',
            result.errors
        )
        return
    }
    const posts = result.data.allMdx.nodes
    // Create blog posts pages
    // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
    // `context` is available in the template as a prop and as a variable in GraphQL
    if (posts.length > 0) {
        posts.forEach((post, index) => {
            const previousPostId = index === 0 ? null : posts[index - 1].id
            const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
            process.env.NODE_ENV === 'production' ? '' : console.log('id:' + post.id)
            createPage({
                // FIXME yazilara kategori kısmı zaten ekli tüm yazılara kategori kısmı eklendiği zaman alttaki kullanılabilir
                // path: '/yazilar'+`${post.fields.category }` + post.fields.slug,
                path: '/yazilar'+ post.fields.slug,
                component: blogPost,
                context: {
                    id: post.id,
                    previousPostId,
                    nextPostId,
                },
            })
        })
    }
    const postsPerPage = 20
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? '/yazilar' : `/${i + 1}`,
            component: path.resolve('./src/templates/blog-list.js'),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            },
        })
    })

    // Etkinlik Page
    const etkinlikTemplate = path.resolve('./src/templates/etkinlik-post.js')
    const eresult = await graphql(`
    {
        allMdx(
          filter: {fileAbsolutePath: {regex: "content/etkinlik/"}}
          sort: {fields: frontmatter___date, order: DESC}
        ) {
          nodes {
            excerpt
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
    )

    // Etkinlik sayfası oluşturur
    const etkinlikler = eresult.data.allMdx.nodes
    if (etkinlikler.length > 0) {
        etkinlikler.forEach((etkinlik) => {
            process.env.NODE_ENV === 'production' ? '' : console.log('id:' + etkinlik.id)
            createPage({
                path: '/etkinlikler' + etkinlik.fields.slug,
                component: etkinlikTemplate,
                context: {
                    id: etkinlik.id,
                },
            })
        })
    }
    // Beyin fırtınası"
    const {data,error} =  await client.from('beyinfirtinasi').select().eq('ana_gonderi',true)
    if(error)console.error(error)
    if (data.length > 0) {
        data.forEach((konu) => {
            process.env.NODE_ENV === 'production' ? '' : console.log('id:' + konu.id)
            createPage({
                path: '/beyin-firtinasi/konular/'+ konu.id,
                component: path.resolve('./src/templates/beyinfirtinasi-konu.js'),
                context: {
                    id: konu.id,

                },
            })
        })
    }
    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? '/beyinfirtinasi' : `/${i + 1}`,
            component: path.resolve('./src/templates/beyinfirtinasi-main.js'),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            },
        })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === 'Mdx') {
        const value = createFilePath({ node, getNode })

        createNodeField({
            name: 'slug',
            node,
            value,
        })
    }
    if (node.internal.type === 'EtkinlikMarkdownRemark') {
        const value = createFilePath({ node, getNode })

        createNodeField({
            name: 'slug',
            node,
            value,
        })
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }


    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
    `)
}
