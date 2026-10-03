import "../App.css";

function RoleSelection({
  onStudent,
  onTeacher,
  onParent,
  onBack,
}) {
  return (
    <div className="role-selection-page">
      <div className="role-selection-header">
        <button className="role-back-btn" onClick={onBack}>
          ← Back
        </button>

        <span>HIFZ MANAGEMENT SYSTEM</span>

        <h1>Choose Your Portal</h1>
        <p>Select how you want to continue.</p>
      </div>

      <div className="role-cards">
        <div className="role-choice-card">
          <div className="role-choice-icon">👨‍🎓</div>

          <h2>Student</h2>

          <p>
            Memorize Quran, practice ayahs, listen to recitation,
            revise, and track your Hifz progress.
          </p>

          <button onClick={onStudent}>
            Continue as Student →
          </button>
        </div>

        <div className="role-choice-card">
          <div className="role-choice-icon">👨‍🏫</div>

          <h2>Teacher</h2>

          <p>
            Manage students, monitor memorization progress,
            revision activity, and performance.
          </p>

          <button onClick={onTeacher}>
            Continue as Teacher →
          </button>
        </div>

        <div className="role-choice-card">
          <div className="role-choice-icon">👨‍👩‍👧</div>

          <h2>Parent</h2>

          <p>
            Follow your child's Hifz journey, progress,
            revision activity, and achievements.
          </p>

          <button onClick={onParent}>
            Continue as Parent →
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
