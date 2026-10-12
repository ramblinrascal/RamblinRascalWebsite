import type { Metadata } from 'next';
import Subpage from '@/components/rascal/subpage';
import { instagram } from '@/lib/rascal-data';

export const metadata: Metadata = {
  title: 'About · Ramblin’ Rascal',
  description: 'Sydney’s 5 Star Dive Bar. Established in 2014. World class cocktails, shit tins and honest hospitality in a bluesy basement.',
};

export default function About() {
  return <Subpage>
    <div className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-title-block">
          <p className="sub-kicker">RAMBLIN’ RASCAL / ABOUT US</p>
          <p className="about-stars" aria-label="Five star"><span aria-hidden="true">★★★★★</span><span>EST. 2014 · SYDNEY</span></p>
          <h1 id="about-title">5 STAR<br/><span>DIVE BAR.</span></h1>
          <p className="about-hero-note">World class cocktails.<br/>Six dollar shit tins.<br/>Same warm welcome.</p>
          <a className="text-link" href="#our-story">THE STORY BELOW ↓</a>
        </div>
        <figure className="about-patch">
          <img src="/brand/full-patch.png" alt="Ramblin Rascal Sydney - the original three-skull denim patch" width="1462" height="1370"/>
          <figcaption>THE UNIFORM’S DENIM. THE WELCOME’S WARM.</figcaption>
        </figure>
      </section>

      <section id="our-story" className="about-story" aria-labelledby="story-title">
        <p className="about-index">01 / THE BACK STORY</p>
        <div>
          <h2 id="story-title">BORN ON<br/>THE BACK STOOLS.</h2>
          <p>Ramblin’ Rascal Tavern was established in 2014 as Sydney’s premier 5 Star Dive Bar.</p>
          <p>Born off the back stools of The Baxter Inn, where the three owners claim their pedigree, the Rascals built a watering hole around honest, straight up and down hospitality.</p>
          <p>World class cocktails or $6 shit tins. Whatever’s in your glass, making you feel at home is the philosophy.</p>
        </div>
      </section>

      <figure className="about-room">
        <img src="/images/room.jpg" alt="The bar and bluesy basement at Ramblin’ Rascal Tavern" width="1200" height="800" loading="lazy"/>
        <figcaption><span>199 ELIZABETH STREET</span><span>GO DOWN. SETTLE IN.</span></figcaption>
      </figure>

      <section className="about-tunes" aria-labelledby="tunes-title">
        <div><p className="about-index">02 / TURN IT UP</p><h2 id="tunes-title">LIVE TUNES.<br/>THURSDAY<br/>TO SUNDAY.</h2><p>Four nights a week, the music tears out of this bluesy basement. Get the latest acts and times from the crew.</p><a className="sub-button" href={instagram} target="_blank" rel="noopener noreferrer">LATEST LINEUP ↗</a></div>
        <div className="about-coaster"><img src="/brand/skulls-round.png" alt="The Ramblin’ Rascal three-skull coaster" width="1080" height="1080" loading="lazy"/><p>GOOD BOOZE. BETTER COMPANY.</p></div>
      </section>

      <section className="about-rule" aria-labelledby="rule-title">
        <p className="about-index">03 / ONE HOUSE RULE</p>
        <h2 id="rule-title">DON’T BE A DICK.<br/><span>DRINK LIKE A CHAMPION.</span></h2>
        <p>Everyone else is welcome.</p>
        <div><a href="/bookings/" className="sub-button">BOOK A NIGHT</a><a href="/#find-us" className="text-link">FIND THE BLACK DOOR</a></div>
      </section>
    </div>
  </Subpage>;
}
