import React from 'react'
import { Link } from 'gatsby'

const Navigation = (props) => (
  <>
    <header id="header" className={props.transparant ? 'alt' : ''}>
      <h1>
        <Link to={`/`}>
          JWorks Tech Blog
        </Link>
      </h1>
    </header>
  </>
)

export default Navigation