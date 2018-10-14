import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../components/layout'
import Card from '../components/card';
import Banner from '../components/banner';
import Navigation from '../components/navigation';

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
          <Navigation/>
          <Banner title="Jobs" subtitle="Want to work with us?"/>
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
                          image={node.frontmatter.image.childImageSharp.fluid}
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