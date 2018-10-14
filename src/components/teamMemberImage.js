import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const TeamMemberImage = props => (
  <div className="team-member-image-holder">
    <Link to={props.slug}>
      {props.alumnus &&
      <span className="alumnus-badge" title={`${props.firstName} is no longer working at JWorks`}>Alumnus</span>
      }
      <Img fluid={props.image} className="p-image team-member-image" imgStyle={{ borderRadius: "999em" }}/>
    </Link>
  </div>
)

export default TeamMemberImage