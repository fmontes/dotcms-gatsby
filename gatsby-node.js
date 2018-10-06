/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
        graphql(`
            {
                allDotCmsNews {
                    edges {
                        node {
                            inode
                            lead
                            sysPublishDate
                            title
                            urlTitle
                        }
                    }
                }
            }
        `).then(result => {
            result.data.allDotCmsNews.edges.forEach(({ node }) => {
                createPage({
                    path: `news/${node.urlTitle}`,
                    component: path.resolve(`./src/templates/news-item.js`),
                    context: {
                        // Data passed to context is available
                        // in page queries as GraphQL variables.
                        slug: node.urlTitle,
                    },
                })
            })
            resolve()
        })
    })
}
