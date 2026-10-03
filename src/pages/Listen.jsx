import { useEffect, useRef, useState } from "react";
import "../App.css";

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

function Listen({ onBack, onPractice }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isMuted, setIsMuted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [surahNumber, setSurahNumber] = useState(1);
  const [reciter, setReciter] = useState("ar.alafasy");
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
   const audio =
  reciter === "ar.alafasy"
    ? `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`
    : `https://server7.mp3quran.net/shur/${String(surahNumber).padStart(3, "0")}.mp3`;
    setAudioUrl(audio);
  }, [surahNumber, reciter]);

  useEffect(() => {
    if (!audioRef.current || !audioUrl) return;

    audioRef.current.pause();
    audioRef.current.src = audioUrl;
    audioRef.current.load();

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Audio play error:", error);
          setIsPlaying(false);
        });
    }
  };

  const changeSurah = (number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSurahNumber(number);
    setIsPlaying(false);
  };

  return (
    <div className="listen-page">
      <header className="listen-header">
        <button className="listen-back-btn" onClick={onBack}>
          ← Dashboard
        </button>

        <div className="listen-title">
          <span>QURAN AUDIO</span>
          <h1>Listen & Learn</h1>
        </div>

        <div className="listen-header-icon">🎧</div>
      </header>

      <main className="listen-content">
        <div className="listen-intro">
          <span>LISTENING PRACTICE</span>

          <h2>Improve your memorization through listening.</h2>

          <p>
            Listen carefully, repeat the Ayahs, and strengthen your Hifz
            through regular practice.
          </p>
        </div>

        <section className="audio-surah-card">
          <div className="audio-surah-top">
            <div className="audio-surah-number">{surahNumber}</div>

            <div>
              <span>SURAH</span>
              <h2>{surahs[surahNumber - 1]}</h2>
              <p>Quran Recitation</p>
            </div>

            <button
              className="favorite-btn"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>

          <audio
            ref={audioRef}
            src={audioUrl || undefined}
            onLoadedMetadata={() => {
              setDuration(audioRef.current?.duration || 0);
            }}
            onTimeUpdate={() => {
              setCurrentTime(audioRef.current?.currentTime || 0);
            }}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
            onError={() => {
              console.log("Audio failed:", audioRef.current?.error);
            }}
          />

          <div className="audio-player">
            <button className="audio-play-btn" onClick={togglePlay}>
              {isPlaying ? "❚❚" : "▶"}
            </button>

            <div className="audio-player-content">
              <div className="audio-time">
                <span>
                  {Math.floor(currentTime / 60)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {Math.floor(currentTime % 60)
                    .toString()
                    .padStart(2, "0")}
                </span>

                <span>
                  {Math.floor(duration / 60)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {Math.floor(duration % 60)
                    .toString()
                    .padStart(2, "0")}
                </span>
              </div>

              <div
                className="audio-progress"
                onClick={(e) => {
                  if (!audioRef.current || !duration) return;

                  const rect =
                    e.currentTarget.getBoundingClientRect();

                  const clickPosition = e.clientX - rect.left;
                  const percentage = clickPosition / rect.width;

                  audioRef.current.currentTime =
                    percentage * duration;
                }}
              >
                <div
                  className="audio-progress-fill"
                  style={{
                    width: duration
                      ? `${(currentTime / duration) * 100}%`
                      : "0%",
                  }}
                ></div>
              </div>

              <div className="audio-controls">
                <button
                  onClick={() => {
                    if (surahNumber > 1) {
                      changeSurah(surahNumber - 1);
                    }
                  }}
                >
                  ⏮
                </button>

                <button
                  onClick={() => {
                    if (surahNumber < 114) {
                      changeSurah(surahNumber + 1);
                    }
                  }}
                >
                  ⏭
                </button>
              </div>
            </div>

            <button
              className="volume-btn"
              onClick={() => {
                if (!audioRef.current) return;

                const newMutedState = !isMuted;

                audioRef.current.muted = newMutedState;
                setIsMuted(newMutedState);
              }}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
        </section>

        <section className="recitation-section">
          <div className="listen-section-heading">
            <div>
              <span>RECITATION</span>
              <h2>Choose a Reciter</h2>
            </div>
          </div>

          <div className="reciter-grid">
            <button
              className={`reciter-card ${
                reciter === "ar.alafasy" ? "active" : ""
              }`}
              onClick={() => setReciter("ar.alafasy")}
            >
              <div className="reciter-avatar">🎙️</div>

              <div>
                <h3>Mishary Alafasy</h3>
                <p>Beautiful recitation</p>
              </div>

              <span>
                {reciter === "ar.alafasy" ? "✓" : "○"}
              </span>
            </button>

            <button
              className={`reciter-card ${
                reciter === "ar.shuraim" ? "active" : ""
              }`}
              onClick={() => setReciter("ar.shuraim")}
            >
              <div className="reciter-avatar">🎙️</div>

              <div>
                <h3>Saud Al-Shuraim</h3>
                <p>Slow & clear</p>
              </div>

              <span>
                {reciter === "ar.shuraim" ? "✓" : "○"}
              </span>
            </button>
          </div>
        </section>

        <section className="listening-practice-card">
          <div className="practice-icon">🎯</div>

          <div>
            <span>HIFZ PRACTICE</span>

            <h2>Listen • Repeat • Memorize</h2>

            <p>
              Listen to an Ayah several times, then try reciting it
              yourself without looking.
            </p>
          </div>

<button
  className="practice-btn"
  onClick={onPractice}
>
  Start Practice →
</button>

        </section>
      </main>
    </div>
  );
}

export default Listen;