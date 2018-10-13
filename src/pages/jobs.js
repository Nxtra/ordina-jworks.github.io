import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'

import Layout from '../components/layout'
import Card from '../components/card';

const JobsPage = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          filter: { fields: {type: { eq: "job" }}}
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                subtitle
                image {
                  childImageSharp {
                    resolutions(width: 500, height: 293, quality:100) {
                      src
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
                <h2>Jobs</h2>
                <p>Want to work with us?</p>
              </div>
            </header>
          </section>
          <section id="wrapper">
            <div className="inner">
              <section id="four" className="wrapper alt style1">
                <div className="inner">
                  <h2 className="major">JWorks in a nutshell...</h2>
                  <p>
                    We're growing quickly and often this can result in limitations and rules prohibiting creativity and
                    freedom.
                    Not at JWorks though.
                    We're very fond of our <span className="accentuate">down-to-earth culture</span> and no-bullshit way
                    of
                    working.
                  </p>
                  <p>Prefer a <span className="accentuate">Macbook</span> with IntelliJ over a Windows laptop with
                    Eclipse?
                    No problem!
                  </p>
                  <p>
                    Want to make an impact on the architectural choices or tools we use?
                    Jump right in!
                  </p>

                  <section className="features features-jobs">
                    {data.allMarkdownRemark.edges.map(({ node }) => {
                      return (
                        <Card
                          title={node.frontmatter.title}
                          subtitle={node.frontmatter.subtitle}
                          action="Tell me more"
                          slug={node.fields.slug}
                          imageSrc={node.frontmatter.image.childImageSharp.resolutions.src}
                          key={node.id}
                        />
                      )
                    })}
                  </section>
                </div>
              </section>
            </div>
          </section>
        </div>
      </Layout>
    )}
  />
)

export default JobsPage