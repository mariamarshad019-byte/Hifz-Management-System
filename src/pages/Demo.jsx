import { useRef } from "react";
import "../App.css";

function Demo({ onBack }) {
    const videoRef = useRef(null);
  return (
    <div className="demo-page">
      <header className="demo-header">
        <button className="demo-back-btn" onClick={onBack}>
          ← Back
        </button>

 <div className="demo-title">
  <h1>Demo</h1>
</div>

<button
  className="demo-icon"
  onClick={() => {
    videoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }}
>
  ▶
</button>

      </header>

      <main className="demo-content">
        <div className="demo-intro">
          <span>QUICK DEMO</span>
          <h2>Your complete Hifz journey in one place.</h2>
          <p>
            Explore how you can memorize, listen, practice, revise,
            and track your Quran journey.
          </p>
        </div>

        <section className="demo-video-card">
          <div className="demo-video-screen">
 
<video
  ref={videoRef}
  className="demo-video"
  controls
  poster="/demo/demo-poster.jpg"
>
  <source src="/demo/hifz-demo.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>

          </div>
        </section>

<section className="demo-features">
  <div className="demo-feature">
    <span>01</span>
    <h3>Quran Reader</h3>
    <p>Read Quran while following your memorization journey.</p>
  </div>

  <div className="demo-feature">
    <span>02</span>
    <h3>Listen & Practice</h3>
    <p>Listen to recitation and practice your own voice.</p>
  </div>

  <div className="demo-feature">
    <span>03</span>
    <h3>Revision</h3>
    <p>Keep your memorized portions strong with regular revision.</p>
  </div>

  <div className="demo-feature">
    <span>04</span>
    <h3>Achievements</h3>
    <p>Complete goals and unlock milestone rewards.</p>
  </div>

  <div className="demo-feature">
    <span>05</span>
    <h3>Daily Hifz Goals</h3>
    <p>
      Set daily memorization targets and keep track of your progress.
    </p>
  </div>

  <div className="demo-feature">
    <span>06</span>
    <h3>Profile & Settings</h3>
    <p>
      Manage your profile, preferences, notifications, and account settings.
    </p>
  </div>
</section>
 

        <button className="demo-start-btn" onClick={onBack}>
          Explore the System →
        </button>
      </main>
    </div>
  );
}

export default Demo;