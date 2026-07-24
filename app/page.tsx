import Image from "next/image";

const features = [
  {
    number: "01",
    title: "Track anything",
    copy: "Build a tracker from simple fields—choices, numbers, dates—and make it fit the way you think.",
  },
  {
    number: "02",
    title: "See the shape of a day",
    copy: "Switch activities as you go, then look back without reconstructing your day from memory.",
  },
  {
    number: "03",
    title: "Keep what is yours",
    copy: "Your data stays on your iPhone. Versioned backup and restore means you can take it with you.",
  },
];

function AppMark() {
  return (
    <Image
      className="app-mark"
      src="/tracky-icon.png"
      alt=""
      width={152}
      height={152}
      aria-hidden="true"
    />
  );
}

function Phone({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        <Image
          src={src}
          alt={alt}
          width={368}
          height={800}
          priority={priority}
          sizes="(max-width: 720px) 58vw, 330px"
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Tracky home">
          <AppMark />
          <span>Tracky</span>
        </a>
        <span className="beta-label">Local-first · iPhone</span>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Your life, in your own words</p>
          <h1>Notice where your time goes.</h1>
          <p className="lede">
            Track what you do, log what matters, and find the patterns hiding in
            an ordinary day.
          </p>
          <div className="availability">
            <span className="status-dot" />
            <span>Built for iPhone</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Tracky app preview">
          <div className="orb orb-blue" />
          <div className="orb orb-amber" />
          <Phone
            src="/screens/track.jpg"
            alt="Tracky tracker overview showing Drinking and Meditation"
            className="phone-primary"
            priority
          />
          <Phone
            src="/screens/history.jpg"
            alt="Tracky drinking history grouped by date"
            className="phone-secondary"
            priority
          />
          <p className="capture-note">Captured in the iOS Simulator</p>
        </div>
      </section>

      <section className="statement shell" aria-label="Product principle">
        <p>
          Most tracking apps decide what matters before you open them.
          <span> Tracky starts with you.</span>
        </p>
      </section>

      <section className="features shell" aria-label="Tracky features">
        {features.map((feature) => (
          <article className="feature" key={feature.number}>
            <span className="feature-number">{feature.number}</span>
            <h2>{feature.title}</h2>
            <p>{feature.copy}</p>
          </article>
        ))}
      </section>

      <section className="day-section shell">
        <div className="day-copy">
          <p className="eyebrow">A quieter kind of calendar</p>
          <h2>Your day is more than appointments.</h2>
          <p>
            Tracky turns the day you actually lived into a simple timeline—work,
            chores, rest, or whatever else belongs there.
          </p>
        </div>
        <div className="day-visual">
          <div className="day-glow" />
          <Phone
            src="/screens/day.jpg"
            alt="Tracky day timeline with a compact weekly calendar"
            className="phone-day"
          />
        </div>
      </section>

      <section className="closing shell">
        <AppMark />
        <p className="eyebrow">Track less. Notice more.</p>
        <h2>Built to become yours.</h2>
        <p className="closing-copy">
          Tracky is an independent, local-first iPhone app being shaped into
          its first release.
        </p>
      </section>

      <footer className="footer shell">
        <span>© {new Date().getFullYear()} Tracky</span>
        <span>Made in Berlin</span>
      </footer>
    </main>
  );
}
