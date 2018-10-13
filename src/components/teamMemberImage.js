import React from 'react'
import { Link } from 'gatsby'

const TeamMemberImage = props => (
  <div className="team-member-image-holder">
    <Link to={props.slug}>
      {props.alumnus &&
      <span className="alumnus-badge" title={`${props.firstName} is no longer working at JWorks`}>Alumnus</span>
      }
      <img className="p-image team-member-image" src={props.imageSrc} alt={props.firstName}/>
    </Link>
  </div>
)

export default TeamMemberImage