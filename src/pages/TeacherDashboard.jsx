import { useEffect, useState } from "react";
import "../App.css";
import { supabase } from "../supabaseClient";

function TeacherDashboard({ onLogout, onBack }) {
  const [teacherName, setTeacherName] = useState("Teacher");
  const [students, setStudents] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentProgress, setStudentProgress] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [revisionProgress, setRevisionProgress] = useState([]);

  const [attendance, setAttendance] = useState({});
  const [feedback, setFeedback] = useState({});
  const [feedbackText, setFeedbackText] = useState("");
  const [planSurah, setPlanSurah] = useState("");
const [planJuz, setPlanJuz] = useState("");
const [planStartAyah, setPlanStartAyah] = useState("");
const [planEndAyah, setPlanEndAyah] = useState("");

  const loadTeacherData = async () => {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setTeacherName(
      user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Teacher"
    );

    const { data: connections, error } = await supabase
      .from("teacher_students")
      .select("student_id")
      .eq("teacher_id", user.id);

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (!connections || connections.length === 0) {
      setStudents([]);
      setLoading(false);
      return;
    }

    const studentIds = connections.map((item) => item.student_id);

    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", studentIds);

    if (profileError) {
      setMessage(profileError.message);
      setLoading(false);
      return;
    }

    setStudents(profiles || []);

    if (!selectedStudent && profiles?.length > 0) {
      setSelectedStudent(profiles[0]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTeacherData();
  }, []);

  const loadStudentDetails = async (student) => {
    setSelectedStudent(student);
    setMessage("");

    if (!student) return;

    const { data: progress } = await supabase
      .from("hifz_progress")
      .select("*")
      .eq("student_id", student.id)
      .order("created_at", { ascending: false });

    setStudentProgress(progress || []);

    const { data: quizzes } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("student_id", student.id)
      .order("created_at", { ascending: false });

    setQuizResults(quizzes || []);

    const { data: revisions } = await supabase
      .from("revision_progress")
      .select("*")
      .eq("user_id", student.id)
      .order("created_at", { ascending: false });

    setRevisionProgress(revisions || []);

    setFeedbackText(feedback[student.id] || "");
  };

  useEffect(() => {
    if (selectedStudent) {
      loadStudentDetails(selectedStudent);
    }
  }, [selectedStudent]);

  const addStudent = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!studentEmail.trim()) {
      setMessage("Please enter the student's email.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Teacher account not found.");
      return;
    }

    const { data: student, error } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .eq("email", studentEmail.trim())
      .eq("role", "student")
      .maybeSingle();

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!student) {
      setMessage("No student account found with this email.");
      return;
    }

    const alreadyConnected = students.some(
      (item) => item.id === student.id
    );

    if (alreadyConnected) {
      setMessage("This student is already connected.");
      return;
    }

    const { error: insertError } = await supabase
      .from("teacher_students")
      .insert({
        teacher_id: user.id,
        student_id: student.id,
      });

    if (insertError) {
      setMessage(insertError.message);
      return;
    }

    setStudentEmail("");
    setMessage("Student connected successfully.");
    await loadTeacherData();
  };

 const handleAssignPlan = async (e) => {
    e.preventDefault();

    if (!selectedStudent) {
      setMessage("Please select a student first.");
      return;
    }

    if (!planSurah || !planJuz || !planStartAyah || !planEndAyah) {
      setMessage("Please fill in all Hifz plan fields.");
      return;
    }

    if (Number(planStartAyah) > Number(planEndAyah)) {
      setMessage("Start Ayah cannot be greater than End Ayah.");
      return;
    }

    const targetAyahs =
      Number(planEndAyah) - Number(planStartAyah) + 1;

    const { error } = await supabase
      .from("daily_hifz_plans")
      .insert({
        student_id: selectedStudent.id,
        plan_date: new Date().toISOString().split("T")[0],
        surah_name: planSurah,
        juz_number: Number(planJuz),
        start_ayah: Number(planStartAyah),
        end_ayah: Number(planEndAyah),
        target_ayahs: targetAyahs,
        completed: false,
      });

    if (error) {
      setMessage(error.message);
      return;
    }

    setPlanSurah("");
    setPlanJuz("");
    setPlanStartAyah("");
    setPlanEndAyah("");

    setMessage("Hifz plan assigned successfully.");
  };

  const markAttendance = (status) => {
    if (!selectedStudent) return;

    setAttendance((previous) => ({
      ...previous,
      [selectedStudent.id]: status,
    }));
  };

  const saveFeedback = () => {
    if (!selectedStudent) return;

    setFeedback((previous) => ({
      ...previous,
      [selectedStudent.id]: feedbackText,
    }));

    setMessage("Teacher feedback saved.");
  };

  const completedJuz = studentProgress.filter(
    (item) => item.status?.toLowerCase() === "completed"
  ).length;

  const totalAyahs = studentProgress.reduce(
    (total, item) => total + Number(item.ayahs_memorized || 0),
    0
  );

  const completedRevisions = revisionProgress.filter(
    (item) => item.status?.toLowerCase() === "completed"
  ).length;

  return (
    <div className="teacher-dashboard-page">

      {/* HEADER */}
<div className="teacher-top-area">

  <button
    type="button"
    className="teacher-back-btn"
    onClick={onBack}
  >
    ← Back
  </button>

  <header className="teacher-header">

    <div className="teacher-header-title">
      <span>HIFZ MANAGEMENT SYSTEM</span>
      <h1>Teacher Dashboard</h1>
      <p>Manage students • Monitor progress • Guide Hifz</p>
    </div>

    <div className="teacher-header-actions">

      <button
        className="teacher-switch-btn"
        onClick={() => {
          window.dispatchEvent(new Event("switchPortal"));
        }}
      >
        Switch Portal
      </button>

      <button
        className="teacher-logout-btn"
        onClick={onLogout}
      >
        Logout
      </button>

    </div>

  </header>

</div>

      <main className="role-dashboard-content">

        {/* WELCOME */}
        <div className="role-welcome-card">
          <span>TEACHER PORTAL</span>

          <h2>Welcome, {teacherName}</h2>

          <p>
            Monitor your students and manage their Hifz
            journey from one place.
          </p>
        </div>

        {/* STATS */}
        <div className="role-stats-grid">

          <div className="role-stat-card">
            <span>STUDENTS</span>
            <strong>{students.length}</strong>
            <p>Connected students</p>
          </div>

          <div className="role-stat-card">
            <span>COMPLETED JUZ</span>
            <strong>{completedJuz}</strong>
            <p>Selected student</p>
          </div>

          <div className="role-stat-card">
            <span>REVISION</span>
            <strong>{completedRevisions}</strong>
            <p>Completed revisions</p>
          </div>

          <div className="role-stat-card">
            <span>AYAH MEMORIZED</span>
            <strong>{totalAyahs}</strong>
            <p>Total memorized</p>
          </div>

        </div>

        {/* CONNECT STUDENT */}
        <div className="role-section-card">

          <h2>Connect a Student</h2>

          <p>
            Enter the email address of a registered student
            to connect their account to your teacher portal.
          </p>

          <form
            onSubmit={addStudent}
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >

            <input
              type="email"
              placeholder="Student email address"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
              style={{
                flex: "1",
                minWidth: "240px",
                padding: "12px 14px",
                border: "1px solid #ddd5e8",
                borderRadius: "9px",
                fontSize: "14px",
              }}
            />

<button type="submit" className="teacher-connect-btn">
  + Connect Student
</button>

          </form>

          {message && (
            <p
              style={{
                marginTop: "15px",
                color: "#65459A",
                fontSize: "14px",
              }}
            >
              {message}
            </p>
          )}

        </div>

        {/* MY STUDENTS */}
        <div className="role-section-card">

          <h2>My Students</h2>

          {loading ? (
            <p>Loading students...</p>
          ) : students.length === 0 ? (
            <p>
              No students connected yet. Use the form above
              to connect a registered student.
            </p>
          ) : (
            <div className="teacher-students-grid">

              {students.map((student) => (
                <button
                  type="button"
                  key={student.id}
                  className={
                    selectedStudent?.id === student.id
                      ? "teacher-student-card selected"
                      : "teacher-student-card"
                  }
                  onClick={() => loadStudentDetails(student)}
                >
                  <strong>
                    {student.full_name || "Student"}
                  </strong>

                  <span>{student.email}</span>
                </button>
              ))}

            </div>
          )}

        </div>

        {/* SELECTED STUDENT */}
        {selectedStudent && (
          <>

            {/* STUDENT OVERVIEW */}
            <div className="role-section-card">

              <h2>Student Overview</h2>

              <p>
                Reviewing:{" "}
                <strong>
                  {selectedStudent.full_name || "Student"}
                </strong>
              </p>

              <div className="teacher-overview-grid">

                <div className="teacher-overview-item">
                  <span>HIFZ RECORDS</span>
                  <strong>{studentProgress.length}</strong>
                </div>

                <div className="teacher-overview-item">
                  <span>QUIZ RESULTS</span>
                  <strong>{quizResults.length}</strong>
                </div>

                <div className="teacher-overview-item">
                  <span>REVISIONS</span>
                  <strong>{completedRevisions}</strong>
                </div>

              </div>

            </div>

{/* ASSIGN DAILY HIFZ PLAN */}

<div className="teacher-assign-plan-card">

  <h2>Assign Daily Hifz Plan</h2>

  <p>
    Create a daily Hifz task for{" "}
    <strong>
      {selectedStudent.full_name || "Student"}
    </strong>
  </p>

<form
  className="teacher-plan-form"
  onSubmit={handleAssignPlan}
>

    <div className="teacher-plan-field">
      <label>Surah</label>

    <select
  value={planSurah}
  onChange={(e) => setPlanSurah(e.target.value)}
>  
        <option value="">Select Surah</option>
        <option value="Al-Fatihah">Al-Fatihah</option>
        <option value="Al-Baqarah">Al-Baqarah</option>
        <option value="Aal-E-Imran">Aal-E-Imran</option>
        <option value="An-Nisa">An-Nisa</option>
        <option value="Al-Maidah">Al-Maidah</option>
        <option value="Al-Anam">Al-Anam</option>
        <option value="Al-Araf">Al-Araf</option>
        <option value="Al-Anfal">Al-Anfal</option>
        <option value="At-Tawbah">At-Tawbah</option>
        <option value="Yunus">Yunus</option>
      </select>
    </div>

    <div className="teacher-plan-field">
      <label>Juz Number</label>

<input
  type="number"
  min="1"
  max="30"
  placeholder="1 - 30"
  value={planJuz}
  onChange={(e) => setPlanJuz(e.target.value)}
/>
    </div>

    <div className="teacher-plan-field">
      <label>Start Ayah</label>

<input
  type="number"
  min="1"
  placeholder="Starting Ayah"
  value={planStartAyah}
  onChange={(e) => setPlanStartAyah(e.target.value)}
/>
    </div>

    <div className="teacher-plan-field">
      <label>End Ayah</label>

<input
  type="number"
  min="1"
  placeholder="Ending Ayah"
  value={planEndAyah}
  onChange={(e) => setPlanEndAyah(e.target.value)}
/>
    </div>

    <button
      type="submit"
      className="teacher-plan-submit"
    >
      Assign Hifz Plan
    </button>

  </form>

</div>

            {/* HIFZ RESULTS */}
            <div className="role-section-card">

              <h2>Student Hifz Results</h2>

              {studentProgress.length === 0 ? (
                <p>No Hifz progress has been recorded yet.</p>
              ) : (
                <div className="teacher-result-list">

                  {studentProgress.slice(0, 8).map((item) => (
                    <div
                      className="teacher-result-row"
                      key={item.id}
                    >
                      <div>
                        <strong>
                          {item.surah_name || "Surah"}
                        </strong>

                        <p>
                          Juz {item.juz_number || "-"} ·{" "}
                          {item.ayahs_memorized || 0} ayahs
                        </p>
                      </div>

                      <span>
                        {item.status || "In Progress"}
                      </span>
                    </div>
                  ))}

                </div>
              )}

            </div>



            {/* QUIZ RESULTS */}
            <div className="role-section-card">

              <h2>Quiz Results</h2>

              {quizResults.length === 0 ? (
                <p>No quiz results available yet.</p>
              ) : (
                <div className="teacher-result-list">

                  {quizResults.slice(0, 8).map((quiz) => (
                    <div
                      className="teacher-result-row"
                      key={quiz.id}
                    >
                      <div>
                        <strong>
                          {quiz.quiz_name ||
                            quiz.quiz_title ||
                            "Hifz Quiz"}
                        </strong>

                        <p>
                          Score:{" "}
                          {quiz.score ??
                            quiz.result ??
                            quiz.percentage ??
                            "Not available"}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* ATTENDANCE */}
            <div className="role-section-card">

              <h2>Student Attendance</h2>

              <p>
                Mark attendance for the selected student.
              </p>

              <div className="teacher-attendance-actions">

                <button
                  type="button"
                  className={
                    attendance[selectedStudent.id] === "Present"
                      ? "attendance-btn active"
                      : "attendance-btn"
                  }
                  onClick={() => markAttendance("Present")}
                >
                  ✓ Present
                </button>

                <button
                  type="button"
                  className={
                    attendance[selectedStudent.id] === "Absent"
                      ? "attendance-btn active"
                      : "attendance-btn"
                  }
                  onClick={() => markAttendance("Absent")}
                >
                  ✕ Absent
                </button>

              </div>

              {attendance[selectedStudent.id] && (
                <p className="attendance-status">
                  Today's attendance:{" "}
                  {attendance[selectedStudent.id]}
                </p>
              )}

            </div>

            {/* TEACHER FEEDBACK */}
            <div className="role-section-card">

              <h2>Teacher Feedback</h2>

              <p>
                Write feedback or guidance for the selected
                student.
              </p>

              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Write your feedback for this student..."
                rows="5"
                className="teacher-feedback-input"
              />

              <button
                type="button"
                className="teacher-save-feedback-btn"
                onClick={saveFeedback}
              >
                Save Feedback
              </button>

              {feedback[selectedStudent.id] && (
                <div className="teacher-feedback-display">

                  <strong>Latest Feedback</strong>

                  <p>
                    {feedback[selectedStudent.id]}
                  </p>

                </div>
              )}

            </div>

          </>
        )}

      </main>
    </div>
  );
}

export default TeacherDashboard;