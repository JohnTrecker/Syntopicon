import React from 'react';
import { LogoSmall } from 'icons/Logo';
import './About.scss';
import content from 'constants/content.json';


const About = () => (
  <section className="about--container">
    <div className="about--content">
      <div className="content--branding">
        <h1 className="content--title">About Helios</h1>
        <p className="content--tagline">{content.tagline}</p>
        <LogoSmall />
      </div>
      <div className="content--description">
      <p>{content.description}</p>
      </div>
    </div>
  </section>
)

export default About;