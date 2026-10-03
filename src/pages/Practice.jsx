import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";

function Practice({ onBack }) {

 const [showAyah, setShowAyah] = useState(false);
const [completed, setCompleted] = useState(false);
const [dailyPlan, setDailyPlan] = useState(null);

  const surahs = [
  "Al-Fatihah",
  "Al-Baqarah",
  "Ali 'Imran",
  "An-Nisa",
  "Al-Ma'idah",
  "Al-An'am",
  "Al-A'raf",
  "Al-Anfal",
  "At-Tawbah",
  "Yunus",
  "Hud",
  "Yusuf",
  "Ar-Ra'd",
  "Ibrahim",
  "Al-Hijr",
  "An-Nahl",
  "Al-Isra",
  "Al-Kahf",
  "Maryam",
  "Ta-Ha",
  "Al-Anbiya",
  "Al-Hajj",
  "Al-Mu'minun",
  "An-Nur",
  "Al-Furqan",
  "Ash-Shu'ara",
  "An-Naml",
  "Al-Qasas",
  "Al-Ankabut",
  "Ar-Rum",
  "Luqman",
  "As-Sajdah",
  "Al-Ahzab",
  "Saba",
  "Fatir",
  "Ya-Sin",
  "As-Saffat",
  "Sad",
  "Az-Zumar",
  "Ghafir",
  "Fussilat",
  "Ash-Shura",
  "Az-Zukhruf",
  "Ad-Dukhan",
  "Al-Jathiyah",
  "Al-Ahqaf",
  "Muhammad",
  "Al-Fath",
  "Al-Hujurat",
  "Qaf",
  "Adh-Dhariyat",
  "At-Tur",
  "An-Najm",
  "Al-Qamar",
  "Ar-Rahman",
  "Al-Waqi'ah",
  "Al-Hadid",
  "Al-Mujadilah",
  "Al-Hashr",
  "Al-Mumtahanah",
  "As-Saff",
  "Al-Jumu'ah",
  "Al-Munafiqun",
  "At-Taghabun",
  "At-Talaq",
  "At-Tahrim",
  "Al-Mulk",
  "Al-Qalam",
  "Al-Haqqah",
  "Al-Ma'arij",
  "Nuh",
  "Al-Jinn",
  "Al-Muzzammil",
  "Al-Muddaththir",
  "Al-Qiyamah",
  "Al-Insan",
  "Al-Mursalat",
  "An-Naba",
  "An-Nazi'at",
  "Abasa",
  "At-Takwir",
  "Al-Infitar",
  "Al-Mutaffifin",
  "Al-Inshiqaq",
  "Al-Buruj",
  "At-Tariq",
  "Al-A'la",
  "Al-Ghashiyah",
  "Al-Fajr",
  "Al-Balad",
  "Ash-Shams",
  "Al-Layl",
  "Ad-Duha",
  "Ash-Sharh",
  "At-Tin",
  "Al-Alaq",
  "Al-Qadr",
  "Al-Bayyinah",
  "Az-Zalzalah",
  "Al-Adiyat",
  "Al-Qari'ah",
  "At-Takathur",
  "Al-Asr",
  "Al-Humazah",
  "Al-Fil",
  "Quraysh",
  "Al-Ma'un",
  "Al-Kawthar",
  "Al-Kafirun",
  "An-Nasr",
  "Al-Masad",
  "Al-Ikhlas",
  "Al-Falaq",
  "An-Nas",
];

const [surahIndex, setSurahIndex] = useState(() => {
  const savedSurah = localStorage.getItem("practiceSurahIndex");
  return savedSurah !== null ? Number(savedSurah) : 0;
});

const [ayahNumber, setAyahNumber] = useState(1);
const surahName = surahs[surahIndex];

useEffect(() => {
  if (!dailyPlan) return;

  const assignedSurahIndex = surahs.findIndex(
    (surah) => surah === dailyPlan.surah_name
  );

  if (assignedSurahIndex !== -1) {
    setSurahIndex(assignedSurahIndex);
    setAyahNumber(Number(dailyPlan.start_ayah));
  }
}, [dailyPlan]);

useEffect(() => {
  localStorage.setItem("practiceSurahIndex", surahIndex);
}, [surahIndex]);

useEffect(() => {
  const loadDailyPlan = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

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
      console.error("Could not load today's Daily Hifz Plan:", error);
      return;
    }

    setDailyPlan(data || null);
  };

  loadDailyPlan();
}, []);



const [practiceAyahs, setPracticeAyahs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [isPlaying, setIsPlaying] = useState(false);
const audioRef = useRef(null);
useEffect(() => {
  const loadSurah = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahIndex + 1}/quran-uthmani`
      );

      if (!response.ok) {
        throw new Error("Unable to load Quran data.");
      }

      const data = await response.json();

      setPracticeAyahs(data.data.ayahs);
      setAyahNumber(1);
      setCompleted(false);
      setShowAyah(false);
    } catch (err) {
      setError("Unable to load this Surah. Please try again.");
      setPracticeAyahs([]);
    } finally {
      setLoading(false);
    }
  };

  loadSurah();
}, [surahIndex]);

const totalAyahs = practiceAyahs.length;
const currentAyah = practiceAyahs[ayahNumber - 1];

const audioUrl = currentAyah
  ? `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${currentAyah.number}.mp3`
  : "";

const handlePracticeComplete = async () => {
  setCompleted(true);

  const userId = localStorage.getItem("userId");
  if (!userId || !currentAyah) return;

  const today = new Date();
const localToday = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const { data: dailyPlan, error: dailyPlanError } = await supabase
  .from("daily_hifz_plans")
  .select("*")
  .eq("student_id", userId)
  .eq("plan_date", localToday)
  .maybeSingle();

if (dailyPlanError) {
  console.error("Could not find today's Daily Plan:", dailyPlanError);
}

if (dailyPlan) {
  const completedAyahs = Math.min(
    Math.max(
      currentAyah.number - dailyPlan.start_ayah + 1,
      0
    ),
    dailyPlan.target_ayahs
  );

  const planCompleted =
    completedAyahs >= dailyPlan.target_ayahs;
const { error: updatePlanError } = await supabase
  .from("daily_hifz_plans")
  .update({
    completed: planCompleted,
  })
  .eq("id", dailyPlan.id);
  
  if (updatePlanError) {
    console.error(
      "Could not update Daily Plan:",
      updatePlanError
    );
  }
}

if (!dailyPlan) {
  const { data: newPlan, error: createPlanError } = await supabase
    .from("daily_hifz_plans")
    .insert({
      student_id: userId,
      plan_date: localToday,
      surah_name: surahName,
      juz_number: currentAyah.juz,
      start_ayah: ayahNumber,
      end_ayah: ayahNumber,
      target_ayahs: 1,
      completed: true,
    })
    .select()
    .single();

  if (createPlanError) {
    console.error(
      "Could not create today's Daily Plan:",
      createPlanError
    );
  } else {
    console.log("Today's Daily Plan created:", newPlan);
  }
}

  const { data: existingRecord, error: findError } = await supabase
    .from("hifz_progress")
    .select("*")
    .eq("student_id", userId)
    .eq("surah_name", surahName)
    .maybeSingle();

  if (findError) {
    console.error("Could not find Hifz progress:", findError);
    return;
  }

  if (existingRecord) {
    const { error } = await supabase
      .from("hifz_progress")
      .update({
        ayahs_memorized: Math.max(
          Number(existingRecord.ayahs_memorized || 0),
          ayahNumber
        ),
        status:
          ayahNumber === totalAyahs ? "Completed" : "In Progress",
      })
      .eq("id", existingRecord.id);

    if (error) {
      console.error("Could not update Hifz progress:", error);
    }
  } else {
    const { error } = await supabase
      .from("hifz_progress")
      .insert({
        student_id: userId,
        juz_number: currentAyah.juz,
        surah_name: surahName,
        ayahs_memorized: ayahNumber,
        total_ayahs: totalAyahs,
        status:
          ayahNumber === totalAyahs ? "Completed" : "In Progress",
      });

    if (error) {
      console.error("Could not save Hifz progress:", error);
    }
  }
};

const handleNextAyah = () => {
 if (dailyPlan && ayahNumber < Number(dailyPlan.end_ayah)) {
  setAyahNumber((prev) => prev + 1);
  setShowAyah(false);
  setCompleted(false);
} else if (!dailyPlan && ayahNumber < totalAyahs) {
  setAyahNumber((prev) => prev + 1);
  setShowAyah(false);
  setCompleted(false);
} else if (surahIndex < surahs.length - 1) {
  setSurahIndex((prev) => prev + 1);
  setAyahNumber(1);
  setShowAyah(false);
  setCompleted(false);
}
};
  return (
    <div className="practice-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Listen
      </button>

      <div className="practice-header">
        <span>HIFZ PRACTICE</span>
        <h1>Practice Your Hifz</h1>
        <p>
          Listen, recall, and recite the Ayah from memory.
        </p>
      </div>

<div className="practice-your-verses">
  <div>
    <span>PRACTICE YOUR VERSES</span>
    <h2>Choose a Surah to Practice</h2>
    <p>Select the Surah and Ayah you want to practice.</p>
  </div>

  <select
    value={surahIndex}
    onChange={(e) => {
      setSurahIndex(Number(e.target.value));
      setAyahNumber(1);
      setCompleted(false);
      setShowAyah(false);
    }}
  >
    {surahs.map((surah, index) => (
      <option key={index} value={index}>
        {surah}
      </option>
    ))}
  </select>

  <select
    value={ayahNumber}
    onChange={(e) => {
      setAyahNumber(Number(e.target.value));
      setCompleted(false);
      setShowAyah(false);
    }}
    disabled={loading || totalAyahs === 0}
  >
    {Array.from({ length: totalAyahs }, (_, index) => (
      <option key={index + 1} value={index + 1}>
        Start from Ayah {index + 1}
      </option>
    ))}
  </select>

<button
  type="button"
  className="start-practice-selection-btn"
  onClick={() => {
    setCompleted(false);
    setShowAyah(false);
    setAyahNumber(ayahNumber);
  }}
>
  Start Practice →
</button>
</div>

      <div className="practice-progress-card">
        <div>
          <span>SESSION PROGRESS</span>

<strong>
  {ayahNumber - 1 + (completed ? 1 : 0)} / {totalAyahs} Ayahs
</strong>

        </div>

        <div className="practice-progress-bar">
          <div
            className="practice-progress-fill"

style={{
  width: `${((ayahNumber - 1 + (completed ? 1 : 0)) / totalAyahs) * 100}%`,
}}

          ></div>
        </div>
      </div>

      <div className="ayah-practice-card">
        <div className="ayah-top">
          <div>
            <span>SURAH</span>
            <h2>{surahName}</h2>
          </div>
        </div>

        <div className="ayah-box">
{loading ? (
  <div className="hidden-ayah">
    <p>Loading Ayah...</p>
  </div>
) : error ? (
  <div className="hidden-ayah">
    <p>{error}</p>
  </div>
) : showAyah ? (
  <p className="ayah-text">
    {currentAyah?.text}
  </p>
) : (
  <div className="hidden-ayah">
    <span>••••••••••••••••</span>
    <p>Try to recall the Ayah from memory</p>
  </div>
)}
        </div>

<audio
  ref={audioRef}
  src={audioUrl}
  onEnded={() => setIsPlaying(false)}
  onError={() => {
    console.error("Ayah audio failed to load.");
    setIsPlaying(false);
  }}
/>

        <div className="practice-actions">
         <button
  className={`listen-ayah-btn ${isPlaying ? "playing" : ""}`}
  onClick={() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Ayah audio play error:", error);
          setIsPlaying(false);
        });
    }
  }}
>
  {isPlaying ? "❚❚ Pause" : "🔊 Listen"}
</button>

          <button
            className="reveal-btn"
            onClick={() => setShowAyah(!showAyah)}
          >
            {showAyah ? "🙈 Hide Ayah" : "👁️ Reveal Ayah"}
          </button>
        </div>

        {!completed ? (
          <button
            className="complete-practice-btn"
            onClick={handlePracticeComplete}
          >
            ✓ Mark as Practiced
          </button>
        ) : (
          <div className="practice-success">
            <div className="success-icon">✓</div>

            <h3>Ayah Practiced Successfully!</h3>

            <p>
              Great work! Keep going and strengthen your Hifz.
            </p>

<button
  className="next-ayah-btn"
  onClick={handleNextAyah}
>
  {ayahNumber === totalAyahs && surahIndex < surahs.length - 1
    ? "Next Surah →"
    : "Next Ayah →"}
</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Practice;