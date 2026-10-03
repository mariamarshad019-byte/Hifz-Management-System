import { useEffect, useState } from "react";
import "../App.css";
const surahs = [
  { name: "Al-Fatihah", type: "Makki", ayahs: 7 },
  { name: "Al-Baqarah", type: "Madani", ayahs: 286 },
  { name: "Ali 'Imran", type: "Madani", ayahs: 200 },
  { name: "An-Nisa", type: "Madani", ayahs: 176 },
  { name: "Al-Ma'idah", type: "Madani", ayahs: 120 },
  { name: "Al-An'am", type: "Makki", ayahs: 165 },
  { name: "Al-A'raf", type: "Makki", ayahs: 206 },
  { name: "Al-Anfal", type: "Madani", ayahs: 75 },
  { name: "At-Tawbah", type: "Madani", ayahs: 129 },
  { name: "Yunus", type: "Makki", ayahs: 109 },
  { name: "Hud", type: "Makki", ayahs: 123 },
  { name: "Yusuf", type: "Makki", ayahs: 111 },
  { name: "Ar-Ra'd", type: "Madani", ayahs: 43 },
  { name: "Ibrahim", type: "Makki", ayahs: 52 },
  { name: "Al-Hijr", type: "Makki", ayahs: 99 },
  { name: "An-Nahl", type: "Makki", ayahs: 128 },
  { name: "Al-Isra", type: "Makki", ayahs: 111 },
  { name: "Al-Kahf", type: "Makki", ayahs: 110 },
  { name: "Maryam", type: "Makki", ayahs: 98 },
  { name: "Ta-Ha", type: "Makki", ayahs: 135 },
  { name: "Al-Anbiya", type: "Makki", ayahs: 112 },
  { name: "Al-Hajj", type: "Madani", ayahs: 78 },
  { name: "Al-Mu'minun", type: "Makki", ayahs: 118 },
  { name: "An-Nur", type: "Madani", ayahs: 64 },
  { name: "Al-Furqan", type: "Makki", ayahs: 77 },
  { name: "Ash-Shu'ara", type: "Makki", ayahs: 227 },
  { name: "An-Naml", type: "Makki", ayahs: 93 },
  { name: "Al-Qasas", type: "Makki", ayahs: 88 },
  { name: "Al-Ankabut", type: "Makki", ayahs: 69 },
  { name: "Ar-Rum", type: "Makki", ayahs: 60 },
  { name: "Luqman", type: "Makki", ayahs: 34 },
  { name: "As-Sajdah", type: "Makki", ayahs: 30 },
  { name: "Al-Ahzab", type: "Madani", ayahs: 73 },
  { name: "Saba", type: "Makki", ayahs: 54 },
  { name: "Fatir", type: "Makki", ayahs: 45 },
  { name: "Ya-Sin", type: "Makki", ayahs: 83 },
  { name: "As-Saffat", type: "Makki", ayahs: 182 },
  { name: "Sad", type: "Makki", ayahs: 88 },
  { name: "Az-Zumar", type: "Makki", ayahs: 75 },
  { name: "Ghafir", type: "Makki", ayahs: 85 },
  { name: "Fussilat", type: "Makki", ayahs: 54 },
  { name: "Ash-Shura", type: "Makki", ayahs: 53 },
  { name: "Az-Zukhruf", type: "Makki", ayahs: 89 },
  { name: "Ad-Dukhan", type: "Makki", ayahs: 59 },
  { name: "Al-Jathiyah", type: "Makki", ayahs: 37 },
  { name: "Al-Ahqaf", type: "Makki", ayahs: 35 },
  { name: "Muhammad", type: "Madani", ayahs: 38 },
  { name: "Al-Fath", type: "Madani", ayahs: 29 },
  { name: "Al-Hujurat", type: "Madani", ayahs: 18 },
  { name: "Qaf", type: "Makki", ayahs: 45 },
  { name: "Adh-Dhariyat", type: "Makki", ayahs: 60 },
  { name: "At-Tur", type: "Makki", ayahs: 49 },
  { name: "An-Najm", type: "Makki", ayahs: 62 },
  { name: "Al-Qamar", type: "Makki", ayahs: 55 },
  { name: "Ar-Rahman", type: "Madani", ayahs: 78 },
  { name: "Al-Waqi'ah", type: "Makki", ayahs: 96 },
  { name: "Al-Hadid", type: "Madani", ayahs: 29 },
  { name: "Al-Mujadilah", type: "Madani", ayahs: 22 },
  { name: "Al-Hashr", type: "Madani", ayahs: 24 },
  { name: "Al-Mumtahanah", type: "Madani", ayahs: 13 },
  { name: "As-Saff", type: "Madani", ayahs: 14 },
  { name: "Al-Jumu'ah", type: "Madani", ayahs: 11 },
  { name: "Al-Munafiqun", type: "Madani", ayahs: 11 },
  { name: "At-Taghabun", type: "Madani", ayahs: 18 },
  { name: "At-Talaq", type: "Madani", ayahs: 12 },
  { name: "At-Tahrim", type: "Madani", ayahs: 12 },
  { name: "Al-Mulk", type: "Makki", ayahs: 30 },
  { name: "Al-Qalam", type: "Makki", ayahs: 52 },
  { name: "Al-Haqqah", type: "Makki", ayahs: 52 },
  { name: "Al-Ma'arij", type: "Makki", ayahs: 44 },
  { name: "Nuh", type: "Makki", ayahs: 28 },
  { name: "Al-Jinn", type: "Makki", ayahs: 28 },
  { name: "Al-Muzzammil", type: "Makki", ayahs: 20 },
  { name: "Al-Muddaththir", type: "Makki", ayahs: 56 },
  { name: "Al-Qiyamah", type: "Makki", ayahs: 40 },
  { name: "Al-Insan", type: "Madani", ayahs: 31 },
  { name: "Al-Mursalat", type: "Makki", ayahs: 50 },
  { name: "An-Naba", type: "Makki", ayahs: 40 },
  { name: "An-Nazi'at", type: "Makki", ayahs: 46 },
  { name: "Abasa", type: "Makki", ayahs: 42 },
  { name: "At-Takwir", type: "Makki", ayahs: 29 },
  { name: "Al-Infitar", type: "Makki", ayahs: 19 },
  { name: "Al-Mutaffifin", type: "Makki", ayahs: 36 },
  { name: "Al-Inshiqaq", type: "Makki", ayahs: 25 },
  { name: "Al-Buruj", type: "Makki", ayahs: 22 },
  { name: "At-Tariq", type: "Makki", ayahs: 17 },
  { name: "Al-A'la", type: "Makki", ayahs: 19 },
  { name: "Al-Ghashiyah", type: "Makki", ayahs: 26 },
  { name: "Al-Fajr", type: "Makki", ayahs: 30 },
  { name: "Al-Balad", type: "Makki", ayahs: 20 },
  { name: "Ash-Shams", type: "Makki", ayahs: 15 },
  { name: "Al-Layl", type: "Makki", ayahs: 21 },
  { name: "Ad-Duha", type: "Makki", ayahs: 11 },
  { name: "Ash-Sharh", type: "Makki", ayahs: 8 },
  { name: "At-Tin", type: "Makki", ayahs: 8 },
  { name: "Al-Alaq", type: "Makki", ayahs: 19 },
  { name: "Al-Qadr", type: "Makki", ayahs: 5 },
  { name: "Al-Bayyinah", type: "Madani", ayahs: 8 },
  { name: "Az-Zalzalah", type: "Madani", ayahs: 8 },
  { name: "Al-Adiyat", type: "Makki", ayahs: 11 },
  { name: "Al-Qari'ah", type: "Makki", ayahs: 11 },
  { name: "At-Takathur", type: "Makki", ayahs: 8 },
  { name: "Al-Asr", type: "Makki", ayahs: 3 },
  { name: "Al-Humazah", type: "Makki", ayahs: 9 },
  { name: "Al-Fil", type: "Makki", ayahs: 5 },
  { name: "Quraysh", type: "Makki", ayahs: 4 },
  { name: "Al-Ma'un", type: "Makki", ayahs: 7 },
  { name: "Al-Kawthar", type: "Makki", ayahs: 3 },
  { name: "Al-Kafirun", type: "Makki", ayahs: 6 },
  { name: "An-Nasr", type: "Madani", ayahs: 3 },
  { name: "Al-Masad", type: "Makki", ayahs: 5 },
  { name: "Al-Ikhlas", type: "Makki", ayahs: 4 },
  { name: "Al-Falaq", type: "Makki", ayahs: 5 },
  { name: "An-Nas", type: "Makki", ayahs: 6 },
];

function QuranReader({ onBack }) {
const [surahIndex, setSurahIndex] = useState(0);
const [ayahs, setAyahs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [largeArabic, setLargeArabic] = useState(false);
const [showReaderSettings, setShowReaderSettings] = useState(false);
const [showEnglish, setShowEnglish] = useState(true);
const [showUrdu, setShowUrdu] = useState(true);

const [bookmarkedAyahs, setBookmarkedAyahs] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("quranBookmarks")) || [];
  } catch {
    return [];
  }
});

const [playingAyah, setPlayingAyah] = useState(null);
const [audio, setAudio] = useState(null);

const [surahSearch, setSurahSearch] = useState("");
const [surahFilter, setSurahFilter] = useState("All");
const [ayahSearch, setAyahSearch] = useState("");
const playAyah = (ayah) => {
  const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.globalNumber}.mp3`;

  if (audio) {
    audio.pause();
  }

  const newAudio = new Audio(audioUrl);

  setAudio(newAudio);
  setPlayingAyah(`${surahIndex + 1}-${ayah.number}`);

  newAudio.play().catch(() => {
    setPlayingAyah(null);
  });

  newAudio.onended = () => {
    setPlayingAyah(null);
  };
};

  const currentSurah = surahs[surahIndex].name;

  useEffect(() => {
  const loadSurah = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
       `https://api.alquran.cloud/v1/surah/${surahIndex + 1}/editions/quran-uthmani,en.sahih,ur.jalandhry`
      );

      if (!response.ok) {
        throw new Error("Unable to load Quran data.");
      }

      const data = await response.json();

const arabicData = data.data[0].ayahs;
const englishData = data.data[1].ayahs;
const urduData = data.data[2].ayahs;

const combinedAyahs = arabicData.map((ayah, index) => ({
number: ayah.numberInSurah,
globalNumber: ayah.number,
arabic: ayah.text,
english: englishData[index].text,
urdu: urduData[index].text,
}));

      setAyahs(combinedAyahs);
    } catch (err) {
      setError("Unable to load this Surah. Please try again.");
      setAyahs([]);
    } finally {
      setLoading(false);
    }
  };

  loadSurah();
}, [surahIndex]);

  const goPrevious = () => {
    if (surahIndex > 0) {
      setSurahIndex(surahIndex - 1);
    }
  };

  const goNext = () => {
    if (surahIndex < surahs.length - 1) {
      setSurahIndex(surahIndex + 1);
    }
  };

  return (
    <div className="quran-reader-page">

      <header className="quran-reader-header">

        <button className="reader-back-btn" onClick={onBack}>
          ← Dashboard
        </button>

        <div className="reader-title">
          <span>QURAN READER</span>
          <h1>Read & Memorize</h1>
        </div>

<div className="reader-settings">
  <button
  className={largeArabic ? "active-reader-setting" : ""}
  onClick={() => setLargeArabic(!largeArabic)}
>
  🔤
</button>

<button onClick={() => setShowReaderSettings(!showReaderSettings)}>
  ⚙
</button>

</div>

      </header>

{showReaderSettings && (
  <div className="reader-settings-panel">
    <h3>Reader Settings</h3>

    <div className="reader-setting-row">
      <span>Arabic Text Size</span>
      <button
        onClick={() => setLargeArabic(!largeArabic)}
      >
        {largeArabic ? "Large" : "Normal"}
      </button>
    </div>

<div className="reader-setting-row">
  <span>English Translation</span>
  <button onClick={() => setShowEnglish(!showEnglish)}>
    {showEnglish ? "ON" : "OFF"}
  </button>
</div>

<div className="reader-setting-row">
  <span>Urdu Translation</span>
  <button onClick={() => setShowUrdu(!showUrdu)}>
    {showUrdu ? "ON" : "OFF"}
  </button>
</div>

<div className="reader-setting-row">
  <span>Reset Settings</span>
  <button
    onClick={() => {
      setLargeArabic(false);
      setShowEnglish(true);
      setShowUrdu(true);
    }}
  >
    Reset
  </button>
</div>

  </div>
)}

      <main className="quran-reader-content">

<div className="surah-selector">
  <div className="surah-selector-info">
    <span>SELECT SURAH</span>
    <h2>{currentSurah}</h2>
    <p>
      Surah {surahIndex + 1} • {surahs[surahIndex].type} •{" "}
      {surahs[surahIndex].ayahs} Ayahs
    </p>
  </div>

  <div className="surah-search-area">
    <input
      type="text"
      placeholder="🔍 Search Surah..."
      value={surahSearch}
      onChange={(e) => setSurahSearch(e.target.value)}
      className="surah-search-input"
    />

    <div className="surah-filter-buttons">
      {["All", "Makki", "Madani"].map((filter) => (
        <button
          key={filter}
          className={surahFilter === filter ? "active-filter" : ""}
          onClick={() => setSurahFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>

    <select
      value={currentSurah}
      onChange={(e) => {
        const selectedIndex = surahs.findIndex(
          (surah) => surah.name === e.target.value
        );

        if (selectedIndex !== -1) {
          setSurahIndex(selectedIndex);
        }
      }}
    >
      {surahs
        .filter((surah) => {
          const matchesSearch = surah.name
            .toLowerCase()
            .includes(surahSearch.toLowerCase());

          const matchesFilter =
            surahFilter === "All" || surah.type === surahFilter;

          return matchesSearch && matchesFilter;
        })
        .map((surah) => (
          <option key={surah.name} value={surah.name}>
            {surahs.indexOf(surah) + 1}. {surah.name}
          </option>
        ))}
    </select>
  </div>
</div>

        <div className="quran-reading-card">

<div className="surah-heading">
  <span>QURAN</span>

  <h2>{currentSurah}</h2>

  <p>
    Surah {surahIndex + 1} of 114 •{" "}
    {surahs[surahIndex].type} •{" "}
    {surahs[surahIndex].ayahs} Ayahs
  </p>

  <div className="surah-info-badges">
    <span>{surahs[surahIndex].type}</span>
    <span>{surahs[surahIndex].ayahs} Ayahs</span>
  </div>
</div>

{loading ? (
  <div className="ayah">
    <p className="translation">
      Loading Quran...
    </p>
  </div>
) : error ? (
  <div className="ayah">
    <p className="translation">
      {error}
    </p>
  </div>
) : (
  <>
    {surahIndex !== 8 && (
      <div className="bismillah">
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </div>
    )}

<div className="ayah-search-area">
  <input
    type="text"
    placeholder="🔍 Search Ayah or translation..."
    value={ayahSearch}
    onChange={(e) => setAyahSearch(e.target.value)}
    className="ayah-search-input"
  />
</div>

{ayahs
  .filter((ayah) => {
    const search = ayahSearch.toLowerCase();

    return (
      ayah.number.toString().includes(search) ||
      ayah.english.toLowerCase().includes(search) ||
      ayah.urdu.toLowerCase().includes(search)
    );
  })
  .map((ayah) => (

      <div className="ayah" key={ayah.number}>
 <button
  className="ayah-bookmark-btn"
  onClick={() => {
    const bookmarkKey = `${surahIndex + 1}-${ayah.number}`;

setBookmarkedAyahs((prev) => {
  const updated = prev.includes(bookmarkKey)
    ? prev.filter((item) => item !== bookmarkKey)
    : [...prev, bookmarkKey];

  localStorage.setItem("quranBookmarks", JSON.stringify(updated));

  return updated;
});
  }}
>
  {bookmarkedAyahs.includes(`${surahIndex + 1}-${ayah.number}`)
    ? "♥"
    : "♡"}
</button>

<button
  className="ayah-listen-btn"
  onClick={() => {
    const ayahKey = `${surahIndex + 1}-${ayah.number}`;

    if (playingAyah === ayahKey) {
      if (audio) {
        audio.pause();
      }
      setPlayingAyah(null);
    } else {
      playAyah(ayah);
    }
  }}
>
  {playingAyah === `${surahIndex + 1}-${ayah.number}` ? "⏸" : "🔊"}
</button>

        <div className="ayah-number">
          {ayah.number}
        </div>

<p className={`arabic-text ${largeArabic ? "large-arabic" : ""}`}>
  {ayah.arabic}
</p>

{showUrdu && (
  <p className="urdu-text">{ayah.urdu}</p>
)}

{showEnglish && (
  <p className="translation">{ayah.english}</p>
)}

      </div>
    ))}
  </>
)}

        </div>

        <div className="reader-bottom">

          <button
            className="reader-control-btn"
            onClick={goPrevious}
            disabled={surahIndex === 0}
          >
            ← Previous
          </button>

          <span>
            {surahIndex + 1} / 114
          </span>

          <button
            className="reader-control-btn"
            onClick={goNext}
            disabled={surahIndex === surahs.length - 1}
          >
            Next →
          </button>

        </div>

      </main>

    </div>
  );
}

export default QuranReader;