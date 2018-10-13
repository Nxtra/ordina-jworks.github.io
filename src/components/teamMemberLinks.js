import React from 'react'

const TeamMemberLinks = (props) => {
  let phone, email, twitter, github, linkedin

  if (props.phone) {
    phone = <a href={`tel:${props.phone}`}><i className="fas fa-phone"></i> <span className="label">Phone</span></a>
  } else {
    phone = <><i className="fas fa-phone"></i> <span className="label">Phone</span></>
  }

  if (props.email) {
    email =
      <a href={`mailto:${props.email}`}><i className="far fa-envelope"></i> <span className="label">Email</span></a>
  } else {
    email = <><i className="far fa-envelope"></i> <span className="label">Email</span></>
  }

  if (props.twitter) {
    twitter = <a href={`https://twitter.com/${props.twitter}`}><i className="fab fa-twitter"></i><span
      className="label">Twitter</span></a>
  } else {
    twitter = <><i className="fab fa-twitter"></i><span className="label">Twitter</span></>
  }

  if (props.github) {
    github = <a href={`https://github.com/${props.github}`}><i className="fab fa-github"></i><span
      className="label">GitHub</span></a>
  } else {
    github = <><i className="fab fa-github"></i><span className="label">GitHub</span></>
  }

  if (props.linkedin) {
    linkedin = <a href={`https://be.linkedin.com/in/${props.linkedin}`}><i className="fab fa-linkedin-in"></i><span
      className="label">LinkedIn</span></a>
  } else {
    linkedin = <><i className="fab fa-linkedin-in"></i><span className="label">GitHub</span></>
  }

  return (
    <ul className="team-member-links">
      <li className="team-member-link">
        {phone}
      </li>
      <li className="team-member-link">
        {email}
      </li>
      <li className="team-member-link">
        {twitter}
      </li>
      <li className="team-member-link">
        {github}
      </li>
      <li className="team-member-link">
        {linkedin}
      </li>
    </ul>
  )
}

export default TeamMemberLinks