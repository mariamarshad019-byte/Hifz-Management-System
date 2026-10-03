import { useState } from "react";
import "../App.css";
import { supabase } from "../supabaseClient";

function SignUp({ onBack, onSignIn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
data: {
  full_name: name,
  role: role,
},
      },
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created successfully. Please check your email.");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <button className="auth-back-btn" onClick={onBack}>
          ← Back
        </button>

        <div className="auth-heading">
          <span>HIFZ MANAGEMENT SYSTEM</span>
          <h1>Create Account</h1>
          <p>Start your memorization journey.</p>
        </div>

        <form className="auth-form" onSubmit={handleSignUp}>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

<label>Password</label>
<input
  type="password"
  placeholder="Create a password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  minLength="6"
  required
/>

<label>Account Type</label>

<select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  required
>
  <option value="student">Student</option>
  <option value="teacher">Teacher</option>
  <option value="parent">Parent</option>
</select>

          <button type="submit" className="auth-submit-btn">
            Create Account
          </button>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button type="button" onClick={onSignIn}>
            Sign In
          </button>
        </p>

      </div>
    </div>
  );
}

export default SignUp;