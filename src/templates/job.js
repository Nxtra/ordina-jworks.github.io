import React from 'react'
import Layout from '../components/layout';
import { graphql } from 'gatsby'
import Banner from '../components/banner';
import Navigation from '../components/navigation';

class JobTemplate extends React.Component {
  render() {
    const job = this.props.data.markdownRemark

    return (
      <Layout>
        <div id="header-image" className="header-image"
             style={{ backgroundImage: `url(${job.frontmatter.image.childImageSharp.resolutions.src})` }}></div>
        <div id="page-wrapper">
          <Navigation/>
          <Banner title={job.frontmatter.title} subtitle={job.frontmatter.subtitle}/>
          <div id="page-wrapper">
            <section id="wrapper">
              <div className="inner" dangerouslySetInnerHTML={{ __html: job.html }}>
              </div>
            </section>
          </div>
        </div>
        <div id="over"></div>
      </Layout>
    )
  }
}

export default JobTemplate

export const pageQuery = graphql`
  query JobBySlug($slug: String!) {
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
        subtitle
        image {
          childImageSharp {
            resolutions(width: 20, height: 12, quality: 100) {
              src
            }
          }
        }
      }
    }
  }
`
