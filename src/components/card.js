import React from 'react'

import { Link } from 'gatsby'

const Card = props => (
  <article>
    <Link to={props.slug}>
      <img src={props.imageSrc} className="article-image" alt={props.title}/>
      <h3 className="major">{props.title}</h3>
    </Link>
    <p>{props.subtitle}</p>
    <Link to={props.slug} className="special">{props.action}</Link>

  </article>
)

export default Card