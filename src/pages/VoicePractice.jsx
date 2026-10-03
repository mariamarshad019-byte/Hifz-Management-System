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

const ayahCounts = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109,
  123, 111, 43, 52, 99, 128, 111, 110, 98, 135,
  112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
  34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
  54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
  60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
  14, 11, 11, 18, 12, 12, 30, 52, 52, 44,
  28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
  29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
  15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
  11, 8, 3, 9, 5, 4, 7, 3, 6, 3,
  5, 4, 5, 6, 3, 6
];


function VoicePractice({ onBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState("Al-Fatihah");
  const [audioUrl, setAudioUrl] = useState("");

useEffect(() => {
  if (audioUrl) {
    URL.revokeObjectURL(audioUrl);
  }

  setAudioUrl("");
  setRecordingTime(0);
  setError("");
}, [selectedSurah]);

  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState("");

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();

      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((time) => time + 1);
      }, 1000);
    } catch (err) {
      setError("Please allow microphone access to record your voice.");
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
    }

    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl("");
    setRecordingTime(0);
    chunksRef.current = [];
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(remainingSeconds).padStart(2, "0")
    );
  };

  return (
    <div className="voice-practice-page">

      <header className="voice-header">

        <button className="voice-back-btn" onClick={onBack}>
          ← Dashboard
        </button>

        <div className="voice-title">
          <span>VOICE PRACTICE</span>
          <h1>Recite & Improve</h1>
        </div>

        <div className="voice-header-icon">
          🎙️
        </div>

      </header>

      <main className="voice-content">

        <div className="voice-intro">
          <span>RECITATION PRACTICE</span>

          <h2>
            Record your own recitation.
          </h2>

          <p>
            Recite the Ayahs from memory, record your voice,
            and listen back to improve your Hifz.
          </p>
        </div>

        <section className="voice-surah-card">

          <div>
            <span>SELECT SURAH</span>

            <h2>{selectedSurah}</h2>

<p>
  {selectedSurah} • {ayahCounts[surahs.indexOf(selectedSurah)]} Ayahs
</p>
          </div>

<select
  value={selectedSurah}
  onChange={(e) => setSelectedSurah(e.target.value)}
>
  {surahs.map((surah) => (
    <option key={surah} value={surah}>
      {surah}
    </option>
  ))}
</select>

        </section>

        <section className="recording-card">

          <div className="recording-top">

            <div>
              <span>YOUR RECITATION</span>

              <h2>
                {isRecording ? "Recording..." : "Ready to Recite?"}
              </h2>
            </div>

            <div
              className={
                isRecording
                  ? "recording-status active"
                  : "recording-status"
              }
            >
              <span></span>

              {isRecording ? "Recording" : "Ready"}
            </div>

          </div>

          <div className="recording-circle-area">

            <div
              className={
                isRecording
                  ? "recording-circle recording"
                  : "recording-circle"
              }
            >
              🎙️
            </div>

            <strong className="recording-time">
              {formatTime(recordingTime)}
            </strong>

            <p>
              {isRecording
                ? "Recite clearly and calmly..."
                : "Press the button below to start recording"}
            </p>

          </div>

          {error && (
            <div className="recording-error">
              {error}
            </div>
          )}

          {!isRecording ? (
            <button
              className="start-recording-btn"
              onClick={startRecording}
            >
              🎙️ Start Recording
            </button>
          ) : (
            <button
              className="stop-recording-btn"
              onClick={stopRecording}
            >
              ■ Stop Recording
            </button>
          )}

          {audioUrl && !isRecording && (
            <div className="recording-preview">

              <div>
                <span>RECORDING READY</span>

                <h3>
                  Listen to your recitation
                </h3>
              </div>

              <audio
                controls
                src={audioUrl}
              ></audio>

              <button
                className="delete-recording-btn"
                onClick={deleteRecording}
              >
                🗑 Delete
              </button>

            </div>
          )}

        </section>

        <section className="voice-tips-card">

          <div className="voice-tip-icon">
            💡
          </div>

          <div>
            <span>HIFZ TIP</span>

            <h2>
              Listen to yourself
            </h2>

            <p>
              After recording, listen carefully to your
              recitation and revise any Ayahs where you hesitate.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default VoicePractice;