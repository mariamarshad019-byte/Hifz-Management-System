import { useEffect, useState } from "react";
import "../App.css";
import { supabase } from "../supabaseClient";

function Dashboard({
  onLogout,
  onQuranReader,
  userName,
  userId,
  onPractice,
  onListen,
  onVoicePractice,
  onRevision,
  onAchievements,
  onSubscription,
  onSettings,
  onHifzQuiz,
}) {

  const [hifzProgress, setHifzProgress] = useState([]);
  const [dailyPlan, setDailyPlan] = useState(null);
  const [dailyPlans, setDailyPlans] = useState([]);

const dailyStreak = (() => {
  if (dailyPlans.length === 0) return 0;

  const dates = new Set(
    dailyPlans.map((plan) => plan.plan_date)
  );

  const today = new Date();

  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const yesterdayString = `${yesterday.getFullYear()}-${String(
    yesterday.getMonth() + 1
  ).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

  let streak = 0;
  let checkDate = new Date(today);

  if (!dates.has(todayString)) {
    if (dates.has(yesterdayString)) {
      checkDate = yesterday;
    } else {
      return 0;
    }
  }

  for (let i = 0; ; i++) {
    const dateString = `${checkDate.getFullYear()}-${String(
      checkDate.getMonth() + 1
    ).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;

    if (dates.has(dateString)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
})();

const dailyGoalProgress = dailyPlan
  ? Math.min(
      Math.round(
        (Number(dailyPlan.target_ayahs || 0) > 0
          ? (hifzProgress.reduce(
              (total, item) =>
                total + Number(item.ayahs_memorized || 0),
              0
            ) /
              Number(dailyPlan.target_ayahs)) *
            100
          : 0)
      ),
      100
    )
  : 0;

const achievementCount = [
  dailyStreak >= 7,

  new Set(
    hifzProgress
      .filter(
        (item) => item.status?.toLowerCase() === "completed"
      )
      .map((item) => item.juz_number)
  ).size >= 1,

  hifzProgress.reduce(
    (total, item) =>
      total + Number(item.ayahs_memorized || 0),
    0
  ) >= 100,

  dailyStreak >= 30,

  new Set(
    hifzProgress
      .filter(
        (item) => item.status?.toLowerCase() === "completed"
      )
      .map((item) => item.juz_number)
  ).size >= 10,

  hifzProgress.reduce(
    (total, item) =>
      total + Number(item.ayahs_memorized || 0),
    0
  ) >= 1000,
].filter(Boolean).length;
  useEffect(() => {
    if (!userId) return;

    const fetchHifzProgress = async () => {
      const { data, error } = await supabase
        .from("hifz_progress")
        .select("*")
        .eq("student_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Hifz progress error:", error);
        return;
      }

      setHifzProgress(data || []);
console.log("Logged-in user ID:", userId);
console.log("Hifz records from Supabase:", data);
    };

    fetchHifzProgress();
  }, [userId]);

  useEffect(() => {
  if (!userId) return;

  const fetchDailyPlan = async () => {
    const today = new Date();

const localToday = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const { data, error } = await supabase
  .from("daily_hifz_plans")
  .select("*")
  .eq("student_id", userId)
  .eq("plan_date", localToday)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();

    if (error) {
      console.error("Daily plan error:", error);
      return;
    }

    setDailyPlan(data || null);
    console.log("TODAY PLAN DATA:", JSON.stringify(data, null, 2));
  };

  fetchDailyPlan();
}, [userId]);

useEffect(() => {
  if (!userId) return;

  const fetchDailyPlans = async () => {
    const { data, error } = await supabase
      .from("daily_hifz_plans")
      .select("*")
      .eq("student_id", userId)
      .eq("completed", true)
      .order("plan_date", { ascending: false });

    if (error) {
console.error("Daily plan error:", error.message, error.details, error.hint);
      return;
    }

    setDailyPlans(data || []);

    console.log("COMPLETED DAILY PLANS:", data);
  };

  fetchDailyPlans();
}, [userId]);

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">☾</div>
          <div>
            <h2>HIFZ</h2>
            <span>MANAGEMENT SYSTEM</span>
          </div>
        </div>

        <nav className="dashboard-nav">

<button
  className="dashboard-nav-item"
  onClick={() => {
    localStorage.removeItem("hifzLoggedIn");
    onLogout();
  }}
>
  <span>⌂</span>
  Home
</button>

          <button className="dashboard-nav-item active">
            <span>▦</span>
            Dashboard
          </button>


 <button className="dashboard-nav-item" onClick={onQuranReader}>
     <span>📖</span>
      Quran Reader
 </button>

 <button className="dashboard-nav-item" onClick={onListen}>
   <span>🎧</span>
     Listen
 </button>

  <button
     className="dashboard-nav-item"
     onClick={onVoicePractice}
  >
     <span>🎙️</span>
      Voice Practice
 </button>

 <button
  className="dashboard-nav-item"
  onClick={onRevision}
>
  <span>🔄</span>
  Revision
</button>

 <button
  className="dashboard-nav-item"
  onClick={onAchievements}
>
  <span>🏆</span>
  Achievements
</button>

<button
  className="dashboard-nav-item"
  onClick={onSubscription}
>
  <span>💎</span>
  Subscription
</button>

        </nav>

<div className="dashboard-sidebar-bottom">
  <div className="sidebar-account-label">
  ACCOUNT
</div>
  <button
    className="dashboard-nav-item portal-sidebar-btn"
    onClick={() => {
      window.dispatchEvent(new Event("switchPortal"));
    }}
  >
    <span>⇄</span>
    Switch Portal
  </button>

  <button
    className="dashboard-nav-item"
    onClick={onSettings}
  >
    <span>⚙</span>
    Settings
  </button>

  <button
    className="dashboard-nav-item logout-item"
    onClick={onLogout}
  >
    <span>↪</span>
    Logout
  </button>

</div>
 
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <span className="dashboard-small-label">YOUR HIFZ JOURNEY</span>
            <h1>Assalamu Alaikum 👋</h1>
            <p>Keep going. Every Ayah brings you one step closer.</p>
          </div>

<div className="dashboard-profile">
  <div className="profile-avatar">
  {userName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()}
</div>
  <div className="profile-info">
    <strong>{userName}</strong>
    <span>Hifz Student</span>
  </div>
</div>

        </header>

        {/* STATS */}
        <section className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="stat-icon">📖</div>
            <div>
              <span>JUZ COMPLETED</span>
<strong>
  {
    new Set(
      hifzProgress
        .filter(
          (item) =>
            item.status?.toLowerCase() === "completed"
        )
        .map((item) => item.juz_number)
    ).size
  }
</strong>
<p>of 30 Juz</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">✨</div>
            <div>
<span>AYAHS MEMORIZED</span>
<strong>
  {hifzProgress.reduce(
    (total, item) => total + Number(item.ayahs_memorized || 0),
    0
  )}
</strong>
<p>Keep progressing</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">🔥</div>
            <div>
              <span>DAILY STREAK</span>
              <strong>{dailyStreak}</strong>
              <p>Days in a row</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">🏆</div>
            <div>
              <span>ACHIEVEMENTS</span>
              <strong>{achievementCount}</strong>
              <p>Unlocked</p>
            </div>
          </div>

        </section>

{/* TODAY'S HIFZ OVERVIEW */}
<section className="student-overview-section">

  <div className="today-hifz-card">
    <div className="overview-card-header">
      <div>
        <span>TODAY'S HIFZ PROGRESS</span>
        <h2>Today's Progress</h2>
      </div>
<span className="overview-date">
  {new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}
</span>
    </div>

    <div className="today-progress-content">
      <div className="circular-progress">
        <div className="circular-progress-inner">
<strong>
  {dailyGoalProgress}%
</strong>
          <span>Completed</span>
        </div>
      </div>

      <div className="today-progress-details">
        <h3>Keep going! 🌿</h3>

<p>
  You have memorized{" "}
  {dailyPlan?.completed
    ? Number(dailyPlan.target_ayahs || 0)
    : 0}{" "}
  Ayahs today.
</p>

        <div className="mini-progress">
<div
  className="mini-progress-fill"
  style={{
    width: `${dailyGoalProgress}%`,
  }}
></div>
        </div>

        <div className="mini-progress-info">
  <span>
  {dailyPlan?.completed
  ? Number(dailyPlan.target_ayahs || 0)
  : 0}{" "}
Ayahs completed
</span>

<span>
  {dailyPlan
    ? dailyPlan.completed
      ? 0
      : Number(dailyPlan.target_ayahs || 0)
    : 0}{" "}
  remaining
</span>
        </div>
      </div>
    </div>
  </div>

  <div className="current-surah-card">
    <span className="overview-label">CURRENT SURAH</span>

    <div className="surah-card-icon">﷽</div>

<h2>
  {hifzProgress.length > 0
    ? hifzProgress[0].surah_name
    : "No Surah Yet"}
</h2>

<p>
  {hifzProgress.length > 0
    ? `Juz ${hifzProgress[0].juz_number} • ${hifzProgress[0].ayahs_memorized} Ayahs memorized`
    : "Start your Hifz journey"}
</p>

<button
  className="current-surah-quran-btn"
  onClick={onQuranReader}
>
  Open Quran →
</button>

    <div className="surah-progress">
      <div
  className="surah-progress-fill"
  style={{
    width: `${
      hifzProgress.length > 0
        ? Math.min(
            Math.round(
              (Number(hifzProgress[0].ayahs_memorized || 0) /
                Number(hifzProgress[0].total_ayahs || 1)) *
                100
            ),
            100
          )
        : 0
    }%`,
  }}
></div>
    </div>

    <div className="surah-progress-info">
     <span>
  {hifzProgress.length > 0
    ? `${hifzProgress[0].ayahs_memorized} Ayahs memorized`
    : "0 Ayahs memorized"}
</span>
  <span>
  {hifzProgress.length > 0
    ? hifzProgress[0].status
    : "Not Started"}
</span>
    </div>
  </div>

  <div className="next-revision-card">
    <span className="overview-label">NEXT REVISION</span>

    <div className="revision-overview-icon">🔄</div>

<h2>
  {hifzProgress.length > 0
    ? `Juz ${hifzProgress[0].juz_number}`
    : "No Juz Yet"}
</h2>

<p>
  {hifzProgress.length > 0
    ? hifzProgress[0].surah_name
    : "Start your Hifz journey"}
</p>

    <div className="revision-date">
      <span>📅</span>
<span>
  Due {new Date(Date.now() + 86400000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}
</span>
    </div>

    <button
      className="revision-start-btn"
      onClick={onRevision}
    >
      Start Revision →
    </button>
  </div>

</section>

<section className="recent-activity-section">
  <div className="recent-activity-card">
    <div className="overview-card-header">
      <div>
        <span>RECENT ACTIVITY</span>
        <h2>Your Hifz Journey</h2>
      </div>
      <span className="overview-date">Latest</span>
    </div>

    {hifzProgress.length > 0 ? (
      <div className="activity-list">
        {hifzProgress.slice(0, 5).map((item) => (
          <div className="activity-item" key={item.id}>
            <div className="activity-icon">📖</div>

            <div className="activity-details">
              <strong>{item.surah_name}</strong>
              <span>
                {item.ayahs_memorized} Ayahs memorized • Juz {item.juz_number}
              </span>
            </div>

            <span className="activity-status">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <div className="activity-empty">
        <span>📖</span>
        <p>No Hifz activity yet. Start memorizing today!</p>
      </div>
    )}
  </div>
</section>

<section className="daily-hifz-plan-section">
  <div className="daily-hifz-plan-card">
    <div className="overview-card-header">
      <div>
        <span>DAILY HIFZ PLAN</span>
        <h2>Today's Plan</h2>
      </div>

      <span className="overview-date">
        {new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>

    <div className="plan-progress">
      <div>

<strong>
  {dailyPlan
    ? dailyPlan.completed
      ? 100
      : 0
    : 0}
  %
</strong>

        <span>Daily Goal</span>
      </div>

<div className="plan-progress-bar">

  <div
    className="mini-progress-fill"
    style={{
      width: `${
        dailyPlan?.completed
          ? 100
          : dailyPlan?.target_ayahs
          ? Math.min(
              ((dailyPlan.completed_ayahs || 0) /
                dailyPlan.target_ayahs) *
                100,
              100
            )
          : 0
      }%`,
    }}
  ></div>

</div>
    </div>

    <div className="plan-task">
      <div className="plan-task-icon">📖</div>

      <div>
 <strong>
  {dailyPlan
    ? `Memorize ${dailyPlan.surah_name}`
    : "No Daily Plan"}
</strong>

<span>
  {dailyPlan
    ? `Ayahs ${dailyPlan.start_ayah}–${dailyPlan.end_ayah} • Target ${dailyPlan.target_ayahs} Ayahs`
    : "Create a daily plan to begin"}
</span>
      </div>

    </div>
  </div>
</section>

        {/* PROGRESS + DAILY TARGET */}
        <section className="dashboard-grid">

          <div className="progress-dashboard-card">
            <div className="dashboard-card-heading">
              <div>
                <span>OVERALL PROGRESS</span>
                <h2>Your Hifz Progress</h2>
              </div>

<strong>
  {hifzProgress.length > 0
    ? Math.round(
        (hifzProgress.reduce(
          (total, item) => total + Number(item.ayahs_memorized || 0),
          0
        ) /
          hifzProgress.reduce(
            (total, item) => total + Number(item.total_ayahs || 0),
            0
          )) *
          100
      )
    : 0}
  %
</strong>
            </div>

            <div className="large-progress-bar">

<div
  className="large-progress-fill"

style={{
  width: `${
    hifzProgress.length > 0
      ? Math.round(
          (hifzProgress.reduce(
            (total, item) =>
              total + Number(item.ayahs_memorized || 0),
            0
          ) /
            hifzProgress.reduce(
              (total, item) =>
                total + Number(item.total_ayahs || 0),
              0
            )) *
            100
        )
      : 0
  }%`,
}}

></div>
            </div>

<div className="progress-info">
  <span>
    {hifzProgress.reduce(
      (total, item) => total + Number(item.ayahs_memorized || 0),
      0
    )}{" "}
    Ayahs memorized
  </span>

  <span>6,236 Ayahs total</span>
</div>

            <p className="progress-message">
              MashaAllah! Keep your consistency and continue your journey.
            </p>
          </div>

          <div className="daily-target-card">
            <span>DAILY TARGET</span>
            <h2>Today's Goal</h2>

<div className="target-circle">
  {dailyPlan ? (
    <>
      <strong>
        {dailyPlan.completed
          ? Number(dailyPlan.target_ayahs || 0)
          : 0}
      </strong>

      <span>
        / {Number(dailyPlan.target_ayahs || 0)} Ayahs
      </span>
    </>
  ) : (
    <strong className="no-target">
      No Goal
    </strong>
  )}
</div>

<div className="target-progress">
  <div
    style={{
  width: `${dailyPlan?.completed ? 100 : 0}%`,
}}
  ></div>
</div>

<p>
  {dailyPlan
    ? dailyPlan.completed
      ? "Daily goal completed ✓"
      : `${Number(dailyPlan.target_ayahs || 0)} Ayahs remaining today`
    : "Create a daily plan to start"}
</p>

<button
  className="dashboard-primary-btn"
  onClick={onPractice}
>
  {dailyPlan?.completed ? "Daily Goal Completed ✓" : "Continue Memorizing →"}
</button>
        
          </div>

        </section>

{/* QUICK ACTIONS */}
<section className="quick-section">

  <div className="dashboard-section-heading">
    <div>
      <span>QUICK ACTIONS</span>
      <h2>Continue Your Journey</h2>
    </div>
  </div>

  <div className="quick-action-grid">

    <button
      className="quick-action-card"
      onClick={onQuranReader}
    >
      <div className="quick-action-icon">📖</div>
      <div>
        <h3>Read Quran</h3>
        <p>Continue reading</p>
      </div>
      <span>→</span>
    </button>

    <button
      className="quick-action-card"
      onClick={onListen}
    >
      <div className="quick-action-icon">🎧</div>
      <div>
        <h3>Listen</h3>
        <p>Practice with recitation</p>
      </div>
      <span>→</span>
    </button>

    <button
      className="quick-action-card"
      onClick={onVoicePractice}
    >
      <div className="quick-action-icon">🎙️</div>
      <div>
        <h3>Record</h3>
        <p>Practice your voice</p>
      </div>
      <span>→</span>
    </button>

    <button
      className="quick-action-card"
      onClick={onRevision}
    >
      <div className="quick-action-icon">🔄</div>
      <div>
        <h3>Revision</h3>
        <p>Review memorized Surahs</p>
      </div>
      <span>→</span>
    </button>

<button
  className="quick-action-card"
  onClick={onHifzQuiz}
>
  <div className="quick-action-icon">🧠</div>
  <div>
    <h3>Hifz Quiz</h3>
    <p>Test your Quran knowledge</p>
  </div>
  <span>→</span>
</button>
  </div>
</section>
      </main>
    </div>
  );
}

export default Dashboard;