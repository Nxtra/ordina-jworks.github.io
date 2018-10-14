import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { withPrefix } from 'gatsby'


import Layout from '../components/layout'
import Card from '../components/card';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          filter: { fields: {type: { eq: "blog" }}}
          sort: { fields : frontmatter___date, order: DESC }
          limit: 10
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "DD MMM YYYY")
                image {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
    }
    render={data => (
      <Layout>
        <div id="header-image"></div>
        <div id="page-wrapper">
          <section id="banner">
            <header>
              <div className="inner">
                <div className="logo">
                  <img src={withPrefix('/img/jworks-200x200-white.png')} width="100"/>
                </div>
                <h2>JWorks Tech Blog</h2>
                <p>Powered by <img src={withPrefix('/img/ordina-logo-orange-300px.png')} className="header-logo"/></p>
              </div>
            </header>
          </section>
          <section id="wrapper">
            <div className="inner">
              <section id="one" className="wrapper spotlight style1">
                <div className="inner">
                  <div className="content" style={{ textAlign: "left" }}>
                    <h2 className="major">Most recent posts</h2>
                    <section className="features">
                      {data.allMarkdownRemark.edges.map(({ node }) => {
                        return (
                          <Card
                            title={node.frontmatter.title}
                            subtitle={node.frontmatter.date}
                            action="Read more"
                            slug={node.fields.slug}
                            image={node.frontmatter.image.childImageSharp.fluid}
                            key={node.id}
                          />
                        )
                      })}
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </Layout>
    )}
  />

)

export default IndexPage