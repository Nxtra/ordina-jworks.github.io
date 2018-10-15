import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout';
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import _ from 'lodash'
import Banner from '../components/banner';
import Navigation from '../components/navigation';


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    let byAuthors = post.frontmatter.authors.map((author, index, array) => {
      if (index === 0) {
        return <Link key={author.id} to={author.fields.slug}>{author.first_name} {author.last_name}</Link>
      } else {
        if (index === (array.length - 1)) {
          return <> and <Link key={author.id} to={author.fields.slug}>{author.first_name} {author.last_name}</Link></>
        } else {
          return <>, <Link key={author.id}>{author.first_name} {author.last_name}</Link></>
        }
      }
    })

    return (
      <Layout>
        <div id="header-image" className="header-image"
             style={{ backgroundImage: `url(${post.frontmatter.image.childImageSharp.resolutions.src})` }}></div>
        <div id="page-wrapper">
          <Navigation/>

          <Banner
            title={post.frontmatter.title}
            content={<>Posted {post.frontmatter.date} in <Link to={_.kebabCase(post.frontmatter.category)}>{post.frontmatter.category}</Link> by {byAuthors}
              <br/>
              <i className="fa fa-tags"></i>&nbsp;
            {_.join(post.frontmatter.tags, ', ')}</>}
          />
          <section id="wrapper">
            <div className="inner">
              <section id="one" className="wrapper spotlight style1 post-body">
                <div className="inner" style={{ textAlign: "left" }}>
                  <div className="content" dangerouslySetInnerHTML={{ __html: post.html }}>
                  </div>
                </div>
              </section>
              <section id="two" className="wrapper alt spotlight style2">

                {post.frontmatter.authors.map((author) => {
                  return (
                    <div className="inner" key={author.id}>
                      <Link to={author.fields.slug} className="image spotlight-image">
                        <Img fluid={author.avatar.childImageSharp.fluid} className="p-image" alt={author.first_name}/>
                      </Link>

                      <div className="content">
                        <p dangerouslySetInnerHTML={{__html: author.bio}}></p>
                      </div>
                    </div>
                  )
                })}
              </section>
            </div>
          </section>
        </div>
        <div id="over"></div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        category
        tags
        date(formatString: "MMMM DD, YYYY")
        authors {
          id
          first_name
          last_name
          bio
          fields {
            slug
          }
          avatar {
            childImageSharp {
              fluid(maxWidth: 200, quality:100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        image {
          childImageSharp {
            resolutions(
              width: 20
              height: 12
              quality: 100
            ) {
              src
            }
          }
        }
      }
    }
  }
`
