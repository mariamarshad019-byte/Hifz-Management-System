import "../App.css";
import { supabase } from "../supabaseClient";

function SignIn({ onSignIn, onSignUp, onBack, selectedRole }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="auth-back" onClick={onBack}>
          ← Back
        </button>

        <div className="auth-logo">
          <div className="auth-logo-icon">☾</div>
          <div>
            <h2>HIFZ</h2>
            <span>MANAGEMENT SYSTEM</span>
          </div>
        </div>

        <div className="auth-heading">
          <span>WELCOME BACK</span>
          <h1>Continue your Hifz journey.</h1>
          <p>
            Sign in to access your Quran memorization and revision dashboard.
          </p>
        </div>

        <form
          className="auth-form"
         onSubmit={async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (resendError) {
        alert(resendError.message);
      } else {
        alert("Confirmation email sent. Please check your inbox.");
      }

      return;
    }

    alert(error.message);
    return;
  }

  const user = data.user;

localStorage.setItem("userId", user.id);
console.log("Signed-in User ID:", user.id);
console.log("Signed-in Role:", user.user_metadata?.role || selectedRole);
localStorage.setItem(
  "userRole",
  user.user_metadata?.role || selectedRole
);

localStorage.setItem(
  "userName",
  user.user_metadata?.full_name || user.email
);

onSignIn();
 
}}
>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <div className="forgot-row">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" className="forgot-btn">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="auth-submit">
            Sign In →
          </button>
        </form>

<p className="auth-switch">
  Don't have an account?{" "}
  <button type="button" onClick={onSignUp}>
   Create Account
  </button>
</p>
      </div>

      <div className="auth-side">
        <div className="auth-side-content">
          <span>YOUR HIFZ • YOUR PROGRESS • YOUR JOURNEY</span>

          <div className="auth-quran-symbol">﷽</div>

          <h2>
            One Ayah.
            <br />
            One Step.
            <br />
            Every Day.
          </h2>

          <p>
            Keep your memorization organized, stay consistent, and make every
            day count.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;