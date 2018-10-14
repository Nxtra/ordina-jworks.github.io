import React from 'react'

const Banner = props => {
  let title, subtitle

  if (props.title) {
    title = <h2>{props.title}</h2>
  }

  if (props.subtitle) {
    subtitle = <p>{props.subtitle}</p>
  }

  return (
    <section id="banner">
      <header>
        <div className="inner">
          {title}
          {subtitle}
          {props.content}
        </div>
      </header>
    </section>
  )
}

export default Banner