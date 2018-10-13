import React from 'react'
import { StaticQuery, Link, graphql } from "gatsby"
import TeamMemberImage from '../components/teamMemberImage';
import TeamMemberLinks from '../components/teamMemberLinks';
import Layout from '../components/layout';

const AboutPage = () => (
  <StaticQuery
    query={graphql`
      query {
        allAuthorsYaml(
          filter: { inactive: { ne: true }}
          sort: { fields: first_name }
        ) {
          edges {
            node {
              fields {
                slug
              }
              first_name
              last_name
              title
              title2
              phone
              email
              twitter
              linkedin
              github
              avatar {
                childImageSharp {
                  resolutions(width: 200, height: 200, quality:100) {
                    src
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
        <div id="page-wrapper">
          <section id="banner">
            <header>
              <div className="inner">
                <h2>Team</h2>
              </div>
            </header>
          </section>
          <section id="wrapper">
            <div className="inner">
              <section className="wrapper spotlight alt style1">
                <div className="inner">
                  <section className="team">
                    {data.allAuthorsYaml.edges.map(({ node }) => {
                      const fullName = node.first_name + ' ' + node.last_name;
                      return (
                        <div className="team-member">
                          <TeamMemberImage
                            firstName={node.first_name}
                            imageSrc={node.avatar.childImageSharp.resolutions.src}
                            slug={node.fields.slug}
                          />
                          <h1 className="team-member-name"><Link to={node.fields.slug}>{fullName}</Link></h1>
                          <span className="team-member-title">{node.title}</span>
                          <span className="team-member-title">{node.title2}</span>
                          <TeamMemberLinks
                            phone={node.phone}
                            email={node.email}
                            twitter={node.twitter}
                            github={node.github}
                            linkedin={node.linkedin}
                          />
                        </div>
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

export default AboutPage