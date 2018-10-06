import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
    const post = data.allDotCmsNews.edges[0].node
    return (
        <Layout>
            <img src={`http://localhost:8080/${post.image}`} alt={post.title} />
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.story }} />
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        allDotCmsNews(filter: { urlTitle: { eq: $slug } }) {
            edges {
                node {
                    title,
                    story,
                    image
                }
            }
        }
    }
`
