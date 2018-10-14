import React from 'react'

import { Link } from 'gatsby'
import Img from 'gatsby-image'

const Card = props => (
  <article>
    <Link to={props.slug}>
      <Img fluid={props.image} className="article-image" />
      <h3 className="major">{props.title}</h3>
    </Link>
    <p>{props.subtitle}</p>
    <Link to={props.slug} className="special">{props.action}</Link>

  </article>
)

export default Card