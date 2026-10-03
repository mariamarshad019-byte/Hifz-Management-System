import { useState, useEffect } from "react";
import "./App.css";
import landingBg from "./assets/landing-bg.png";
import mosqueLogo from "./assets/logo.jpg";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import RoleSelection from "./pages/RoleSelection";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import Practice from "./pages/Practice";
import QuranReader from "./pages/QuranReader";
import Listen from "./pages/Listen";
import VoicePractice from "./pages/VoicePractice";
import Revision from "./pages/Revision";
import Achievements from "./pages/Achievements";
import Subscription from "./pages/Subscription";
import Settings from "./pages/Settings";
import Demo from "./pages/Demo";
import HifzQuiz from "./pages/HifzQuiz";

function App() {
const [showSignIn, setShowSignIn] = useState(false);
const [showSignUp, setShowSignUp] = useState(false);
const [showRoleSelection, setShowRoleSelection] = useState(false);
const [showDashboard, setShowDashboard] = useState(
  localStorage.getItem("hifzLoggedIn") === "true"
);

const [switchingPortal, setSwitchingPortal] = useState(false);

const [userRole, setUserRole] = useState(
  localStorage.getItem("userRole") || "student"
);

const [showPractice, setShowPractice] = useState(false);
const [showQuranReader, setShowQuranReader] = useState(false);

const [showListen, setShowListen] = useState(false);
const [showVoicePractice, setShowVoicePractice] = useState(false);
const [showRevision, setShowRevision] = useState(false);
const [showAchievements, setShowAchievements] = useState(false);
const [showSubscription, setShowSubscription] = useState(false);
const [showSettings, setShowSettings] = useState(false);
const [showDemo, setShowDemo] = useState(false);

const [showHifzQuiz, setShowHifzQuiz] = useState(false);

useEffect(() => {
  const handleSwitchPortal = () => {
    setSwitchingPortal(true);
    setShowDashboard(false);
    setShowRoleSelection(true);
  };

  window.addEventListener("switchPortal", handleSwitchPortal);

  return () => {
    window.removeEventListener("switchPortal", handleSwitchPortal);
  };
}, []);

if (showRoleSelection) {
  return (
    <RoleSelection
      onStudent={() => {
        localStorage.setItem("selectedRole", "student");

        if (switchingPortal) {
          localStorage.setItem("userRole", "student");
          setUserRole("student");
          setSwitchingPortal(false);
          setShowRoleSelection(false);
          setShowDashboard(true);
        } else {
          setShowRoleSelection(false);
          setShowSignIn(true);
        }
      }}

      onTeacher={() => {
        localStorage.setItem("selectedRole", "teacher");

        if (switchingPortal) {
          localStorage.setItem("userRole", "teacher");
          setUserRole("teacher");
          setSwitchingPortal(false);
          setShowRoleSelection(false);
          setShowDashboard(true);
        } else {
          setShowRoleSelection(false);
          setShowSignIn(true);
        }
      }}

      onParent={() => {
        localStorage.setItem("selectedRole", "parent");

        if (switchingPortal) {
          localStorage.setItem("userRole", "parent");
          setUserRole("parent");
          setSwitchingPortal(false);
          setShowRoleSelection(false);
          setShowDashboard(true);
        } else {
          setShowRoleSelection(false);
          setShowSignIn(true);
        }
      }}

      onBack={() => {
        setSwitchingPortal(false);
        setShowRoleSelection(false);
      }}
    />
  );
}

if (showPractice) {
  return (
    <Practice
      onBack={() => setShowPractice(false)}
    />
  );
}


  if (showQuranReader) {
  return (
    <QuranReader
      onBack={() => setShowQuranReader(false)}
    />
  );
}

if (showListen) {
  return (
    <Listen
      onBack={() => setShowListen(false)}
      onPractice={() => {
        setShowListen(false);
        setShowPractice(true);
      }}
    />
  );
}

if (showVoicePractice) {
  return (
    <VoicePractice
      onBack={() => setShowVoicePractice(false)}
    />
  );
}

if (showRevision) {
  return (
    <Revision
      onBack={() => setShowRevision(false)}
    />
  );
}

if (showAchievements) {
  return (
    <Achievements
      onBack={() => setShowAchievements(false)}
    />
  );
}

if (showSubscription) {
  return (
    <Subscription
      onBack={() => setShowSubscription(false)}
    />
  );
}

if (showDemo) {
  return (
    <Demo
      onBack={() => setShowDemo(false)}
    />
  );
}

if (showHifzQuiz) {
  return (
    <HifzQuiz
      onBack={() => setShowHifzQuiz(false)}
    />
  );
}


if (showSettings) {
  return (
    <Settings
      onBack={() => setShowSettings(false)}
      onLogout={() => {
        localStorage.removeItem("hifzLoggedIn");
        setShowSettings(false);
        setShowDashboard(false);
      }}
    />
  );
}

if (showDashboard) {
  if (userRole === "teacher") {
    return (
<TeacherDashboard
onBack={() => {
  setShowDashboard(false);
  setShowRoleSelection(true);
}}
  onLogout={() => {
    localStorage.removeItem("hifzLoggedIn");
    localStorage.removeItem("userRole");
    setShowDashboard(false);
  }}
/>
    );
  }

  if (userRole === "parent") {
    return (
 <ParentDashboard
  onBack={() => {
    setShowDashboard(false);
    setShowRoleSelection(true);
  }}
  onLogout={() => {
    // keep your existing logout code here
  }}
/>
    );
  }

  return (
    <Dashboard
  userName={localStorage.getItem("userName") || "Student"}
  userId={localStorage.getItem("userId")}
  onPractice={() => setShowPractice(true)}
  onLogout={() => {
        localStorage.removeItem("hifzLoggedIn");
        localStorage.removeItem("userRole");
        setShowDashboard(false);
      }}
      onQuranReader={() => setShowQuranReader(true)}
      onListen={() => setShowListen(true)}
      onVoicePractice={() => setShowVoicePractice(true)}
      onRevision={() => setShowRevision(true)}
      onAchievements={() => setShowAchievements(true)}
      onSubscription={() => setShowSubscription(true)}
      onSettings={() => setShowSettings(true)}
      onHifzQuiz={() => setShowHifzQuiz(true)}
    />
  );
}

if (showSignIn) {
  return (
<SignIn
 selectedRole={localStorage.getItem("selectedRole") || "student"}
onSignIn={() => {
  localStorage.setItem("hifzLoggedIn", "true");

  const role = localStorage.getItem("userRole") || "student";

  setUserRole(role);

  setShowSignIn(false);
  setShowDashboard(true);
}}
      onSignUp={() => {
        setShowSignIn(false);
        setShowSignUp(true);
      }}
      onBack={() => setShowSignIn(false)}
    />
  );
}

if (showSignUp) {
  return (
    <SignUp
      onBack={() => setShowSignUp(false)}
      onSignIn={() => {
        setShowSignUp(false);
        setShowSignIn(true);
      }}
    />
  );
}
  

  return (
<div
  className="app"
  style={{
    backgroundImage: `url(${landingBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  }}
>
      <nav className="navbar">
        <div className="logo">
          <img className="logo-image" src={mosqueLogo} alt="Mosque Logo" />
          <div>
            <h2>HIFZ</h2>
            <span>MANAGEMENT SYSTEM</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </div>

      <div className="nav-buttons">
  <button
    className="login-btn"
    onClick={() => setShowSignIn(true)}
  >
    Sign In
  </button>

  <button
    className="signup-btn"
    onClick={() => setShowRoleSelection(true)}
  >
    Get Started
  </button>

</div>
      </nav>

      <main>
    <section
  className="hero"
  id="home"
  style={{
    backgroundImage: `url(${landingBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
          <div className="hero-content">
            <span className="hero-label">
              YOUR JOURNEY • YOUR QURAN • YOUR HIFZ
            </span>

            <h1>
              Memorize the Quran
              <br />
              <span>with confidence.</span>
            </h1>

            <p>
              A simple and beautiful Hifz management system designed to help
              you memorize, revise, listen, and track your Quran journey.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() => setShowRoleSelection(true)}
              >
                Start Your Journey →
              </button>

<button
  className="secondary-btn"
  onClick={() => setShowDemo(true)}
>
  ▶ Watch Demo
</button>
            </div>
          </div>


        </section>

        <section className="features" id="features">
          <div className="section-heading">
            <span>POWERFUL FEATURES</span>
            <h2>Everything you need for your Hifz journey.</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Quran Reader</h3>
              <p>Read the Quran comfortably while working on your Hifz.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h3>Listen & Learn</h3>
              <p>Listen to Quran recitation and improve your memorization.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎙️</div>
              <h3>Voice Recording</h3>
              <p>Record your own recitation and practice with confidence.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Revision</h3>
              <p>Keep your memorized Surahs strong with regular revision.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Achievements</h3>
              <p>Complete goals and unlock meaningful Hifz achievements.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>See your daily and overall memorization progress clearly.</p>
            </div>
          </div>
        </section>

        <section className="how-it-works" id="how-it-works">
          <div className="section-heading">
            <span>HOW IT WORKS</span>
            <h2>A simple path to consistent Hifz.</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Create Your Account</h3>
              <p>Set up your personal Hifz profile.</p>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <h3>Set Your Goals</h3>
              <p>Choose your daily memorization target.</p>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <h3>Memorize & Revise</h3>
              <p>Use the tools to learn and revise every day.</p>
            </div>

            <div className="step">
              <div className="step-number">04</div>
              <h3>Celebrate Progress</h3>
              <p>Complete goals and earn achievements.</p>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div>
            <span>ABOUT THE SYSTEM</span>
            <h2>
              Make every day a step closer to completing your Hifz.
            </h2>
          </div>

          <p>
            Hifz Management System brings Quran reading, listening, recording,
            memorization, revision, progress tracking, and achievements into
            one organized place.
          </p>
        </section>

        <section className="cta">
          <span>START TODAY</span>
          <h2>Your Quran journey starts with one Ayah.</h2>

          <button
            className="primary-btn"
            onClick={() => setShowRoleSelection(true)}
          >
            Create Your Account →
          </button>
        </section>
      </main>
<footer className="footer">
  <div className="footer-content">

    <div className="footer-brand">
      <img
        className="logo-image"
        src={mosqueLogo}
        alt="Mosque Logo"
      />

      <div>
        <h2>HIFZ</h2>
        <span>MANAGEMENT SYSTEM</span>
      </div>
    </div>

    <p className="footer-text">
      A simple and meaningful way to manage your Hifz journey.
    </p>

    <div className="social-links">
      <a href="#" aria-label="Facebook">f</a>
      <a href="#" aria-label="Instagram">◎</a>
      <a href="#" aria-label="Twitter">𝕏</a>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 Hifz Management System. All rights reserved.</p>
  </div>
</footer>
    </div>
  );
}

export default App;