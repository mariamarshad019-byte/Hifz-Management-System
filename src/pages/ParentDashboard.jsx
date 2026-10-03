import "../App.css";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ParentDashboard({ onLogout, onBack }) {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedJuz, setCompletedJuz] = useState(0);

  useEffect(() => {
  const loadChildren = async () => {
    const parentId = localStorage.getItem("userId");
    console.log("Parent ID:", parentId);


    if (!parentId) {
      setLoading(false);
      return;
    }

 const { data, error } = await supabase
  .from("profiles")
  .select("id, full_name, email, role, parent_id")
  .eq("parent_id", parentId);

console.log("Children data:", data);
console.log("Children error:", error);


    if (error) {
      console.error("Could not load children:", error);
      setLoading(false);
      return;
    }

    setChildren(data || []);
    setSelectedChild(data?.[0] || null);
    setLoading(false);
  };

  loadChildren();
}, []);

useEffect(() => {
  const loadCompletedJuz = async () => {
    if (!selectedChild) return;

    const { data, error } = await supabase
      .from("hifz_progress")
      .select("juz_number, status")
      .eq("student_id", selectedChild.id)
      .eq("status", "completed");

    if (error) {
      console.error("Could not load completed Juz:", error);
      return;
    }

    const uniqueJuz = new Set(
      (data || []).map((item) => item.juz_number)
    );

    setCompletedJuz(uniqueJuz.size);
  };

  loadCompletedJuz();
}, [selectedChild]);

  return (
    <div className="role-dashboard">
<header className="role-dashboard-header">
<button
  type="button"
  className="teacher-back-btn"
  onClick={onBack}
>
  ← Back
</button>
  <div>
    <span>HIFZ MANAGEMENT SYSTEM</span>
    <h1>Parent Dashboard</h1>
  </div>

  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <button
      onClick={() => {
        window.dispatchEvent(new Event("switchPortal"));
      }}
    >
      Switch Portal
    </button>

    <button onClick={onLogout}>Logout</button>
  </div>
</header>

      <main className="role-dashboard-content">
        <div className="role-welcome-card">
          <span>PARENT PORTAL</span>
          <h2>Follow your child's Hifz journey</h2>
          <p>
            Keep track of memorization progress, revision activity, and
            achievements.
          </p>
        </div>

        <div className="role-stats-grid">
          <div className="role-stat-card">
            <span>CHILDREN</span>
            <strong>{children.length}</strong>
            <p>Connected students</p>
          </div>

          <div className="role-stat-card">
            <span>COMPLETED JUZ</span>
            <strong>{completedJuz}</strong>
            <p>Memorization progress</p>
          </div>

          <div className="role-stat-card">
            <span>REVISION</span>
            <strong>0</strong>
            <p>Reviews completed</p>
          </div>
        </div>

       <div className="role-section-card">
  <h2>My Children</h2>

  {loading ? (
    <p>Loading children...</p>
  ) : children.length === 0 ? (
    <p>No children connected yet.</p>
  ) : (
    <div className="teacher-students-grid">
      {children.map((child) => (
        <button
          type="button"
          key={child.id}
          className={
            selectedChild?.id === child.id
              ? "teacher-student-card selected"
              : "teacher-student-card"
          }
          onClick={() => setSelectedChild(child)}
        >
          <strong>{child.full_name || "Student"}</strong>
          <span>{child.email || "No email available"}</span>
          <span>Role: {child.role}</span>
        </button>
      ))}
    </div>
  )}
</div>
      </main>
    </div>
  );
}

export default ParentDashboard;
