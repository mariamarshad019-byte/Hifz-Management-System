import { useEffect, useState } from "react";
import "../App.css";
import { supabase } from "../supabaseClient";

function Revision({ onBack }) {
  const [selectedSurah, setSelectedSurah] = useState("Al-Fatihah");
  const [selectedJuz, setSelectedJuz] = useState("Juz 1");
  const [isRevisionStarted, setIsRevisionStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [revisionHistory, setRevisionHistory] = useState([]);

useEffect(() => {
  loadRevisionHistory();
}, []);

const loadRevisionHistory = async () => {
  const { data, error } = await supabase
    .from("revision_progress")
    .select("*")
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("Revision history error:", error);
    return;
  }

  setRevisionHistory(data || []);
};

  const startRevision = () => {
    setIsRevisionStarted(true);
    setCompleted(false);
  };

const completeRevision = async () => {
  const juzNumber = Number(selectedJuz.replace("Juz ", ""));

  const { error } = await supabase
    .from("revision_progress")
    .insert([
      {
        juz_number: juzNumber,
        surah_name: selectedSurah,
        status: "completed",
        completed_at: new Date().toISOString(),
      },
    ]);

  if (error) {
    console.error("Revision save error:", error);
    alert("Revision could not be saved.");
    return;
  }

  setIsRevisionStarted(false);
  setCompleted(true);
};

  return (
    <div className="revision-page">

      <header className="revision-header">

        <button className="revision-back-btn" onClick={onBack}>
          ← Dashboard
        </button>

        <div className="revision-title">
          <span>HIFZ REVISION</span>
          <h1>Revise & Strengthen</h1>
        </div>

        <div className="revision-header-icon">
          🔄
        </div>

      </header>

      <main className="revision-content">

        <div className="revision-intro">
          <span>REVISION PRACTICE</span>

          <h2>
            Strengthen what you have memorized.
          </h2>

          <p>
            Regular revision helps you keep your memorized
            Ayahs strong and consistent.
          </p>
        </div>

        {!isRevisionStarted && !completed && (
          <section className="revision-selection-card">

            <div className="revision-card-heading">
              <span>START A REVISION SESSION</span>
              <h2>Choose what you want to revise</h2>
            </div>

            <div className="revision-select-grid">

              <div className="revision-field">
                <label>JUZ</label>

                <select
                  value={selectedJuz}
                  onChange={(e) => setSelectedJuz(e.target.value)}
                >
<option>Juz 1</option>
<option>Juz 2</option>
<option>Juz 3</option>
<option>Juz 4</option>
<option>Juz 5</option>
<option>Juz 6</option>
<option>Juz 7</option>
<option>Juz 8</option>
<option>Juz 9</option>
<option>Juz 10</option>
<option>Juz 11</option>
<option>Juz 12</option>
<option>Juz 13</option>
<option>Juz 14</option>
<option>Juz 15</option>
<option>Juz 16</option>
<option>Juz 17</option>
<option>Juz 18</option>
<option>Juz 19</option>
<option>Juz 20</option>
<option>Juz 21</option>
<option>Juz 22</option>
<option>Juz 23</option>
<option>Juz 24</option>
<option>Juz 25</option>
<option>Juz 26</option>
<option>Juz 27</option>
<option>Juz 28</option>
<option>Juz 29</option>
<option>Juz 30</option>
                </select>
              </div>

              <div className="revision-field">
                <label>SURAH</label>

                <select
                  value={selectedSurah}
                  onChange={(e) => setSelectedSurah(e.target.value)}
                >
<option>Al-Fatihah</option>
<option>Al-Baqarah</option>
<option>Ali 'Imran</option>
<option>An-Nisa</option>
<option>Al-Ma'idah</option>
<option>Al-An'am</option>
<option>Al-A'raf</option>
<option>Al-Anfal</option>
<option>At-Tawbah</option>
<option>Yunus</option>
<option>Hud</option>
<option>Yusuf</option>
<option>Ar-Ra'd</option>
<option>Ibrahim</option>
<option>Al-Hijr</option>
<option>An-Nahl</option>
<option>Al-Isra</option>
<option>Al-Kahf</option>
<option>Maryam</option>
<option>Ta-Ha</option>
<option>Al-Anbiya</option>
<option>Al-Hajj</option>
<option>Al-Mu'minun</option>
<option>An-Nur</option>
<option>Al-Furqan</option>
<option>Ash-Shu'ara</option>
<option>An-Naml</option>
<option>Al-Qasas</option>
<option>Al-Ankabut</option>
<option>Ar-Rum</option>
<option>Luqman</option>
<option>As-Sajdah</option>
<option>Al-Ahzab</option>
<option>Saba</option>
<option>Fatir</option>
<option>Ya-Sin</option>
<option>As-Saffat</option>
<option>Sad</option>
<option>Az-Zumar</option>
<option>Ghafir</option>
<option>Fussilat</option>
<option>Ash-Shura</option>
<option>Az-Zukhruf</option>
<option>Ad-Dukhan</option>
<option>Al-Jathiyah</option>
<option>Al-Ahqaf</option>
<option>Muhammad</option>
<option>Al-Fath</option>
<option>Al-Hujurat</option>
<option>Qaf</option>
<option>Adh-Dhariyat</option>
<option>At-Tur</option>
<option>An-Najm</option>
<option>Al-Qamar</option>
<option>Ar-Rahman</option>
<option>Al-Waqi'ah</option>
<option>Al-Hadid</option>
<option>Al-Mujadilah</option>
<option>Al-Hashr</option>
<option>Al-Mumtahanah</option>
<option>As-Saff</option>
<option>Al-Jumu'ah</option>
<option>Al-Munafiqun</option>
<option>At-Taghabun</option>
<option>At-Talaq</option>
<option>At-Tahrim</option>
<option>Al-Mulk</option>
<option>Al-Qalam</option>
<option>Al-Haqqah</option>
<option>Al-Ma'arij</option>
<option>Nuh</option>
<option>Al-Jinn</option>
<option>Al-Muzzammil</option>
<option>Al-Muddaththir</option>
<option>Al-Qiyamah</option>
<option>Al-Insan</option>
<option>Al-Mursalat</option>
<option>An-Naba</option>
<option>An-Nazi'at</option>
<option>Abasa</option>
<option>At-Takwir</option>
<option>Al-Infitar</option>
<option>Al-Mutaffifin</option>
<option>Al-Inshiqaq</option>
<option>Al-Buruj</option>
<option>At-Tariq</option>
<option>Al-A'la</option>
<option>Al-Ghashiyah</option>
<option>Al-Fajr</option>
<option>Al-Balad</option>
<option>Ash-Shams</option>
<option>Al-Layl</option>
<option>Ad-Duha</option>
<option>Ash-Sharh</option>
<option>At-Tin</option>
<option>Al-Alaq</option>
<option>Al-Qadr</option>
<option>Al-Bayyinah</option>
<option>Az-Zalzalah</option>
<option>Al-Adiyat</option>
<option>Al-Qari'ah</option>
<option>At-Takathur</option>
<option>Al-Asr</option>
<option>Al-Humazah</option>
<option>Al-Fil</option>
<option>Quraysh</option>
<option>Al-Ma'un</option>
<option>Al-Kawthar</option>
<option>Al-Kafirun</option>
<option>An-Nasr</option>
<option>Al-Masad</option>
<option>Al-Ikhlas</option>
<option>Al-Falaq</option>
<option>An-Nas</option>
                </select>
              </div>

            </div>

            <div className="revision-selected">

              <div className="revision-selected-icon">
                🔄
              </div>

              <div>
                <span>READY FOR REVISION</span>

                <h3>
                  {selectedJuz} • {selectedSurah}
                </h3>

                <p>
                  Review your memorized Ayahs carefully.
                </p>
              </div>

            </div>

            <button
              className="start-revision-btn"
              onClick={startRevision}
            >
              🔄 Start Revision
            </button>

          </section>
        )}

        {isRevisionStarted && (
          <section className="revision-session-card">

            <div className="revision-session-icon">
              🔄
            </div>

            <span>REVISION SESSION</span>

            <h2>
              {selectedSurah}
            </h2>

            <p>
              {selectedJuz} • Take your time and recite from memory.
            </p>

            <div className="revision-session-box">

              <div>
                <span>STATUS</span>
                <strong>In Progress</strong>
              </div>

              <div>
                <span>SURAH</span>
                <strong>{selectedSurah}</strong>
              </div>

              <div>
                <span>JUZ</span>
                <strong>{selectedJuz}</strong>
              </div>

            </div>

            <button
              className="complete-revision-btn"
              onClick={completeRevision}
            >
              ✓ Complete Revision
            </button>

          </section>
        )}

        {completed && (
          <section className="revision-complete-card">

            <div className="revision-complete-icon">
              ✓
            </div>

            <span>REVISION COMPLETED</span>

            <h2>
              MashaAllah! Well done.
            </h2>

            <p>
              You completed your revision session for
              <strong> {selectedSurah}</strong>.
            </p>

            <button
              className="start-another-revision-btn"
              onClick={() => setCompleted(false)}
            >
              🔄 Start Another Revision
            </button>

          </section>
        )}

{revisionHistory.length > 0 && (
  <div className="revision-history-card">
    <div className="revision-history-header">
      <span>📚</span>
      <div>
        <h2>Revision History</h2>
        <p>Your completed revision sessions</p>
      </div>
    </div>

    <div className="revision-history-list">
      {revisionHistory.map((revision) => (
        <div className="revision-history-item" key={revision.id}>
          <div>
            <strong>{revision.surah_name}</strong>
            <span>Juz {revision.juz_number}</span>
          </div>

          <span className="revision-history-status">
            ✓ Completed
          </span>
        </div>
      ))}
    </div>
  </div>
)}

        <section className="revision-tip-card">

          <div className="revision-tip-icon">
            💡
          </div>

          <div>
            <span>REVISION TIP</span>

            <h2>
              Consistency is the key.
            </h2>

            <p>
              Try to revise your previously memorized Ayahs
              regularly instead of waiting until you forget them.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Revision;