import { useEffect, useState } from "react";
import "../App.css";
import { supabase } from "../supabaseClient";

function Achievements({ onBack }) {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [giftClaimed, setGiftClaimed] = useState(false);
  const [giftClaimedDate, setGiftClaimedDate] = useState(null);
  const [hifzProgress, setHifzProgress] = useState([]);
  const [dailyPlans, setDailyPlans] = useState([]);
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "Student";

useEffect(() => {
  const fetchData = async () => {
    if (!userId) return;

    const { data: hifzData, error: hifzError } = await supabase
      .from("hifz_progress")
      .select("*")
      .eq("student_id", userId);

    if (hifzError) {
      console.error("Error fetching Hifz progress:", hifzError);
    } else {
      setHifzProgress(hifzData || []);
    }

    const { data: planData, error: planError } = await supabase
      .from("daily_hifz_plans")
      .select("*")
      .eq("student_id", userId)
      .eq("completed", true);

    if (planError) {
      console.error("Error fetching daily plans:", planError);
    } else {
      setDailyPlans(planData || []);
    }
const { data: giftData, error: giftError } = await supabase
  .from("achievement_gifts")
  .select("*")
  .eq("student_id", userId)
  .eq("achievement_title", "First Juz")
  .eq("claimed", true)
  .order("claimed_at", { ascending: false })
  .limit(1);

if (giftError) {
  console.error("Error fetching claimed gift:", giftError);
} else if (giftData && giftData.length > 0) {
  setGiftClaimed(true);
  setGiftClaimedDate(new Date(giftData[0].claimed_at));
}
  };


  fetchData();
}, [userId]);

const currentStreak = (() => {
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

  const achievements = [
    {
      icon: "🔥",
      title: "7 Day Streak",
      description: "Practice Hifz for 7 days in a row.",
      reward: "🌟 Consistency Star Badge",
      unlocked: currentStreak >= 7,
    },
    {
      icon: "📖",
      title: "First Juz",
      description: "Complete your first Juz.",
      reward: "📜 First Juz Completion Certificate",
      unlocked: hifzProgress.some(
(item) => item.status?.toLowerCase() === "completed"
),
    },
    {
      icon: "✨",
      title: "100 Ayahs",
      description: "Memorize 100 Ayahs.",
      reward: "🏅 100 Ayahs Badge",
 unlocked: hifzProgress.reduce(
(total, item) => total + Number(item.ayahs_memorized || 0),
0
) >= 100,
    },
    {
      icon: "🌙",
      title: "30 Day Streak",
      description: "Practice Hifz for 30 days in a row.",
      reward: "🏆 30-Day Hifz Champion Badge",
      unlocked: currentStreak >= 30,
    },
    {
      icon: "🏆",
      title: "10 Juz",
      description: "Complete 10 Juz.",
      reward: "👑 10 Juz Master Badge",
unlocked: new Set(
  hifzProgress
    .filter(
      (item) => item.status?.toLowerCase() === "completed"
    )
    .map((item) => item.juz_number)
).size >= 10,
    },
    {
      icon: "💎",
      title: "1000 Ayahs",
      description: "Memorize 1,000 Ayahs.",
      reward: "💎 1000 Ayahs Special Badge",
unlocked: hifzProgress.reduce(
  (total, item) =>
    total + Number(item.ayahs_memorized || 0),
  0
) >= 1000,
    },
  ];

  return (
    <div className="achievements-page">
      <header className="achievements-header">
        <button className="achievements-back-btn" onClick={onBack}>
          ← Dashboard
        </button>

        <div className="achievements-title">
          <span>YOUR ACHIEVEMENTS</span>
          <h1>Milestones & Rewards</h1>
        </div>

        <div className="achievements-header-icon">
          🏆
        </div>
      </header>

      <main className="achievements-content">
        <div className="achievements-intro">
          <span>KEEP GOING</span>
          <h2>Every milestone deserves to be celebrated.</h2>
          <p>
            Complete Hifz goals, build consistency, and unlock special
            rewards along your journey.
          </p>
        </div>

        <section className="achievement-summary">
          <div className="achievement-summary-card">
            <div className="achievement-summary-icon">🏆</div>
            <div>
              <span>UNLOCKED</span>
              <strong>{achievements.filter((achievement) => achievement.unlocked).length}</strong>
              <p>of 6 achievements</p>
            </div>
          </div>

          <div className="achievement-summary-card">
            <div className="achievement-summary-icon">🎁</div>
            <div>
              <span>GIFTS EARNED</span>
              <strong>{achievements.filter((achievement) => achievement.unlocked).length}</strong>
              <p>Rewards unlocked</p>
            </div>
          </div>

          <div className="achievement-summary-card">
            <div className="achievement-summary-icon">✨</div>
            <div>
              <span>NEXT MILESTONE</span>
<strong>
  {currentStreak < 7
    ? 7
    : currentStreak < 30
    ? 30
    : "—"}
</strong>

<p>
  {currentStreak < 7
    ? "7 Day Streak"
    : currentStreak < 30
    ? "30 Day Streak"
    : "Next milestone"}
</p>

            </div>
          </div>
        </section>

        <section className="achievements-section">
          <div className="achievements-section-heading">
            <div>
              <span>YOUR MILESTONES</span>
              <h2>Achievements</h2>
            </div>
          </div>
{giftClaimed && (
  <div className="achievement-gift-claimed">
    🎁 First Milestone Gift Claimed!
  </div>
)}

          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <button
                key={index}
                className={
                  achievement.unlocked
                    ? "achievement-card unlocked"
                    : "achievement-card locked"
                }
                onClick={() => setSelectedAchievement(achievement)}
              >
                <div className="achievement-icon">
                  {achievement.icon}
                </div>

                <div className="achievement-card-content">
                  <span>
                    {achievement.unlocked ? "UNLOCKED" : "LOCKED"}
                  </span>

                  <h3>{achievement.title}</h3>

                  <p>{achievement.description}</p>
{achievement.unlocked && (
  <small>{achievement.reward}</small>
)}
                </div>

                <div className="achievement-arrow">
                  →
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="achievement-gift-section">
          <div className="gift-icon">
            🎁
          </div>

          <div>
            <span>REWARDS</span>
            <h2>Complete goals. Unlock gifts.</h2>
            <p>
              Keep building your Hifz consistency to unlock more
              achievement rewards.
            </p>
          </div>
        </section>

        {selectedAchievement && (
          <div className="achievement-modal-overlay">
            <div className="achievement-modal">
              <button
                className="achievement-modal-close"
                onClick={() => setSelectedAchievement(null)}
              >
                ×
              </button>

              <div className="achievement-modal-icon">
                {selectedAchievement.icon}
              </div>

              <span>
                {selectedAchievement.unlocked
                  ? "ACHIEVEMENT UNLOCKED"
                  : "ACHIEVEMENT LOCKED"}
              </span>

              <h2>{selectedAchievement.title}</h2>

              <p>{selectedAchievement.description}</p>

              <div className="achievement-reward">
                <span>🎁 REWARD</span>
                <strong>{selectedAchievement.reward}</strong>
              </div>

<button
  className="achievement-modal-btn"
 onClick={async () => {
  const { error } = await supabase
    .from("achievement_gifts")
    .insert([
      {
        student_id: userId,
        achievement_title: selectedAchievement.title,
        gift_name: selectedAchievement.reward,
        claimed: true,
        claimed_at: new Date().toISOString(),
      },
    ]);

  if (error) {
    console.error("Error claiming gift:", error);
    return;
  }

 setGiftClaimed(true);
setGiftClaimedDate(new Date());
setSelectedAchievement(null);
}}
>
  Claim Gift
</button>
            </div>
          </div>
        )}

{giftClaimed && (
  <div className="achievement-modal-overlay">
    <div className="achievement-modal">
      <div className="achievement-modal-icon">
  📜
</div>

      <span>GIFT CLAIMED</span>

<div className="achievement-certificate">
  <div className="achievement-certificate-icon">
    📜
  </div>

  <h2 className="achievement-certificate-title">
    First Juz Completion Certificate
  </h2>

<p className="achievement-certificate-text">
  This certificate is proudly awarded to
</p>

<h3 className="achievement-certificate-title">
  {userName}
</h3>

<p className="achievement-certificate-text">
  for successfully completing the first Juz of the Holy Quran.
</p>

{giftClaimedDate && (
  <p className="achievement-certificate-text">
    Earned on: {giftClaimedDate.toLocaleDateString()}
  </p>
)}
</div>

      <button
        className="achievement-modal-btn"
        onClick={() => setGiftClaimed(false)}
      >
        Continue
      </button>
    </div>
  </div>
)}

      </main>
    </div>
  );
}

export default Achievements;