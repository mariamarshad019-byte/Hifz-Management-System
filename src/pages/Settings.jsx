import { useState } from "react";
import "../App.css";

function Settings({ onBack, onLogout }) {
  const [name, setName] = useState(
  localStorage.getItem("hifzName") || "Mariam"
);

const [email, setEmail] = useState(
  localStorage.getItem("hifzEmail") || "mariam@example.com"
);

const [dailyTarget, setDailyTarget] = useState(
  localStorage.getItem("hifzDailyTarget") || "20"
);

const [notifications, setNotifications] = useState(
  localStorage.getItem("hifzNotifications") === "true"
);
  const [saved, setSaved] = useState(false);

const saveSettings = () => {
  localStorage.setItem("hifzName", name);
  localStorage.setItem("hifzEmail", email);
  localStorage.setItem("hifzDailyTarget", dailyTarget);
  localStorage.setItem("hifzNotifications", String(notifications));

  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 2500);
};


  return (
    <div className="settings-page">
      <header className="settings-header">
        <button className="settings-back-btn" onClick={onBack}>
          ← Dashboard
        </button>

        <div className="settings-title">
          <span>ACCOUNT SETTINGS</span>
          <h1>Profile & Settings</h1>
        </div>

        <div className="settings-header-icon">
          ⚙
        </div>
      </header>

      <main className="settings-content">
        <div className="settings-intro">
          <span>YOUR ACCOUNT</span>
          <h2>Manage your Hifz experience.</h2>
          <p>
            Update your profile, practice preferences, and account
            settings from one place.
          </p>
        </div>

        <section className="profile-card">
          <div className="profile-large-avatar">
            MA
          </div>

          <div className="profile-card-info">
            <span>HIFZ STUDENT</span>
            <h2>{name}</h2>
            <p>{email}</p>
          </div>

          <div className="profile-status">
            <span></span>
            Active
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <span>PROFILE INFORMATION</span>
            <h2>Personal Details</h2>
          </div>

          <div className="settings-form-grid">
            <div className="settings-field">
              <label>FULL NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="settings-field">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <span>HIFZ PREFERENCES</span>
            <h2>Practice Settings</h2>
          </div>

          <div className="settings-field settings-target-field">
            <label>DAILY AYAH TARGET</label>
            <div className="target-input-wrapper">
              <input
                type="number"
                min="1"
                max="100"
                value={dailyTarget}
                onChange={(e) => setDailyTarget(e.target.value)}
              />
              <span>Ayahs per day</span>
            </div>
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Practice Notifications</strong>
              <p>
                Receive reminders for your daily Hifz practice.
              </p>
            </div>

            <button
              className={
                notifications
                  ? "settings-toggle active"
                  : "settings-toggle"
              }
              onClick={() => setNotifications(!notifications)}
            >
              <span></span>
            </button>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <span>ACCOUNT</span>
            <h2>Account Actions</h2>
          </div>

          <div className="settings-action-row">
            <div>
              <strong>Sign out of your account</strong>
              <p>
                You will return to the sign-in screen.
              </p>
            </div>

            <button
              className="settings-logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </section>

        <div className="settings-save-area">
          {saved && (
            <div className="settings-saved-message">
              ✓ Settings saved successfully
            </div>
          )}

          <button
            className="settings-save-btn"
            onClick={saveSettings}
          >
            Save Changes →
          </button>
        </div>
      </main>
    </div>
  );
}

export default Settings;