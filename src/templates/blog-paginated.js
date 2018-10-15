import React from 'react'
import { graphql, withPrefix, Link } from 'gatsby'
import Layout from '../components/layout';
import Navigation from '../components/navigation';
import Banner from '../components/banner';
import Card from '../components/card';

class BlogPaginated extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout>
        <div id="header-image"></div>

        <Navigation transparant={true}/>

        <div id="page-wrapper">
          <Banner
            content={<>
              <div className="logo">
                <img src={withPrefix('/img/jworks-200x200-white.png')} alt="jworks logo" width="100"/>
              </div>
              <h2>JWorks Tech Blog</h2>
              <p>Powered by <img src={withPrefix('/img/ordina-logo-orange-300px.png')} alt="ordina logo"
                                 className="header-logo"/></p></>}
          />
          <section id="wrapper">
            <div className="inner">
              <section id="one" className="wrapper spotlight style1">
                <div className="inner">
                  <div className="content" style={{ textAlign: "left" }}>
                    <h2 className="major">Most recent posts</h2>
                    <section className="features">
                      {posts.map(({ node }) => {
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
                    <ul className="actions">
                      {!isFirst && (
                        <li>
                          <Link to={prevPage} rel="previous">
                            <span aria-hidden="true">&laquo;</span>
                          </Link>
                        </li>
                      )}

                      {Array.from({ length: numPages }, (_, i) => (
                        <li>
                          <Link key={`pagination-number${i + 1}`} to={`/${i === 0 ? "" : i + 1}`}
                                className={i + 1 === currentPage ? 'disabled' : ''}>
                            {i + 1}
                          </Link>
                        </li>
                      ))}

                      {!isLast && (
                        <Link to={nextPage} rel="next">
                          <span aria-hidden="true">&raquo;</span>
                        </Link>
                      )}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

      </Layout>
    )
  }
}

export default BlogPaginated

export const blogPaginatedQuery = graphql`
  query blogPaginatedQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fields: {type: { eq: "blog" }}}
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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