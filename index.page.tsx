import React from "react";

export default function LandingPage() {
  return (
    <div className="page">
      {/* ── HERO ─────────────────────────── */}
      <div className="hero">
        <h1 className="heroTitle">Musement partner docs</h1>
      </div>

      {/* ── MAIN CONTENT ─────────────────── */}
      <main className="content">
        <div className="sectionHeadingContainer">
          <h2 className="sectionHeading">
            What kind of documentation are you looking for?
          </h2>
        </div>
        <section className="tileGrid">
          <a className="tile" href="/api/getting-started">
            <h3 className="tileTitle">API</h3>
            <p className="tileDesc">
              Integrate with our API to sell activities from the Musement
              catalog.
            </p>
          </a>
          <a className="tile" href="/white-label">
            <h3 className="tileTitle">White label</h3>
            <p className="tileDesc">
              Our white label solution lets you sell activities with your own
              branding.
            </p>
          </a>
          <a className="tile" href="/referral-links">
            <h3 className="tileTitle">Referral links</h3>
            <p className="tileDesc">
              A simple solution to associate your customers' bookings on
              Musement with your account.
            </p>
          </a>
          <a className="tile" href="/widgets">
            <h3 className="tileTitle">Widgets</h3>
            <p className="tileDesc">
              Promote activities from the Musement catalog on your own site with
              one of our widgets.
            </p>
          </a>
        </section>

        <div className="sectionHeadingContainer">
          <h2 className="sectionHeading">Other resources</h2>
        </div>
        <section className="tileColumn">
          <a className="tile" href="/analytics">
            <h3 className="tileTitle">Analytics</h3>
          </a>
          <a className="tile" href="/api/best-practices">
            <h3 className="tileTitle">Best practices</h3>
          </a>
          <a className="tile" href="/contact-us">
            <h3 className="tileTitle">Contact us</h3>
          </a>
        </section>
      </main>
    </div>
  );
}
