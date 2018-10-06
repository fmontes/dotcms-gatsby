import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import styled from 'styled-components'

const NewsList = styled.main`
    list-style: none;
    margin: 0;
    padding: 0;

    li {
        display: grid;
        grid-template-columns: 200px 1fr;
        grid-gap: 2rem;
    }
`

const News = ({ data }) => (
    <Layout>
        <h1>News Items</h1>
        <p><Link to="/">Go back to the homepage</Link></p>
        <NewsList>
            {data.allDotCmsNews.edges.map(({ node }, index) => (
                <li key={index}>
                    <img src={`http://localhost:8080/dA/${node.image.split('/')[3]}/200w`} alt={node.title} />
                    <div>
                        <h4><a href={"/news/" + node.urlTitle}>{node.title}</a></h4>
                        <p>{node.lead}</p>
                    </div>
                </li>
            ))}
        </NewsList>
    </Layout>
)

export const query = graphql`
    query {
        allDotCmsNews {
            edges {
                node {
                    lead
                    title
                    urlTitle,
                    image
                }
            }
        }
    }
`

export default News
