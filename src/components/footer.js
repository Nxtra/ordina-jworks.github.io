import React from 'react'

const Footer = () => (
  <footer>
    <div className="contact">
      <div className="address">
        <div className="icon"><i className="fa fa-fw fa-home"></i></div>
        <div className="text">Ordina Belgium<br/>Blarenberglaan 3B,<br/>2800 Mechelen, Belgium</div>
      </div>
      <div className="phone">
        <div className="icon"><i className="fa fa-fw fa-phone"></i></div>
        <div className="text"><a href="tel:003215295858">+32 15 29 58 58</a></div>
      </div>
      <div className="email">
        <div className="icon"><i className="far fa-fw fa-envelope"></i></div>
        <div className="text"><a href="mailto:jworks@ordina.be">jworks@ordina.be</a></div>
      </div>
    </div>
    <ul className="social">
      <li>
        <a href="https://twitter.com/lifeatordinabe" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-fw fa-twitter"></i><span>Twitter</span>
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/lifeatordinabe" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-fw fa-facebook-f"></i><span>Facebook</span>
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/company/ordina-belgium" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-fw fa-linkedin-in"></i><span>LinkedIn</span>
        </a>
      </li>
      <li>
        <a href="https://plus.google.com/113222464071666722451" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-fw fa-google-plus-g"></i><span>Google+</span>
        </a>
      </li>
      <li>
        <a href="/youtube" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-fw fa-youtube"></i><span>YouTube</span>
        </a>
      </li>
      <li>
        <a href="/github" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-fw fa-github"></i><span>GitHub</span>
        </a>
      </li>
      <li>
        <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-fw fa-rss"></i><span>RSS Feed</span>
        </a>
      </li>
    </ul>
    <div className="copyright">
      &copy; {new Date().getFullYear()} Ordina JWorks. All rights reserved.
      <br/> Disclaimer: Opinions expressed on this blog reflect the writer's views and not the position of Ordina
      <img id="analyticsImg" alt="analytics img" src="" width="1" height="1" style={{ border: 0 }}/>
    </div>
  </footer>
)

export default Footer