import React, { useState } from "react";
import "../styles.css";

const SOCIALS = [
  {
    name: "Google",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C34.7 32.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6-6C33.5 6.3 28.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-3.5z"/><path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.8 13 24 13c2.7 0 5.2.9 7.2 2.4l6-6C33.5 6.3 28.1 4 24 4c-7.7 0-14.2 4.4-17.7 10.7z"/><path fill="#FBBC05" d="M24 44c5.8 0 10.7-1.9 14.3-5.2l-6.6-5.4C29.8 39.1 27 40 24 40c-5.7 0-10.6-3.8-12.3-9.1l-6.6 5.1C9.8 41.6 16.4 44 24 44z"/><path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-4.3 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6-6C33.5 6.3 28.1 4 24 4c-7.7 0-14.2 4.4-17.7 10.7z" opacity=".3"/></g></svg>
    ),
    handler: (onAuth) => setTimeout(() => onAuth({ name: "Google User", email: "google@user.com" }), 600),
  },
  {
    name: "GitHub",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#222" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48A10.025 10.025 0 0 0 22 12.021C22 6.484 17.523 2 12 2Z"/></svg>
    ),
    handler: (onAuth) => setTimeout(() => onAuth({ name: "GitHub User", email: "github@user.com" }), 600),
  },
];

const AuthScreen = ({ onAuth }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [reset, setReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reset) {
      if (!email) {
        setError("Enter your email to reset password.");
        return;
      }
      setError("");
      setResetSent(true);
      setTimeout(() => setResetSent(false), 2500);
      return;
    }
    if (!email || !password || (mode === "signup" && !name)) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    setTimeout(() => onAuth({ name: name || "User", email }), 600);
  };

  return (
    <div className="auth-split-bg">
      <div className="auth-split-container">
        {/* Left: Form */}
        <div className="auth-split-left">
          <div className="auth-brand">ReactFlow Builder</div>
          <div className="auth-form-title">
            {reset
              ? "Reset Password"
              : mode === "login"
              ? "Sign In"
              : "Sign Up"}
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "signup" && !reset && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="auth-input"
                autoFocus
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="auth-input"
              autoFocus={mode !== "signup"}
            />
            {!reset && (
              <div className="auth-pw-row">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="auth-input"
                />
                <button
                  type="button"
                  className="auth-pw-toggle"
                  tabIndex={-1}
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
            )}
            {error && <div className="auth-error">{error}</div>}
            {resetSent && (
              <div className="auth-error" style={{ color: '#38a169', background: 'rgba(56,161,105,0.09)' }}>
                Password reset link sent!
              </div>
            )}
            {reset ? (
              <button className="auth-btn" type="submit">Send Reset Link</button>
            ) : (
              <button className="auth-btn" type="submit">
                {mode === "login" ? "Login" : "Sign Up"}
              </button>
            )}
            {!reset && (
              <div className="auth-social-row">
                {SOCIALS.map((s) => (
                  <button
                    key={s.name}
                    className="auth-social-btn"
                    type="button"
                    onClick={() => s.handler(onAuth)}
                  >
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            )}
            {!reset && (
              <span
                className="auth-forgot"
                onClick={() => {
                  setReset(true);
                  setError("");
                  setResetSent(false);
                }}
              >Forgot password?</span>
            )}
            {reset && (
              <span
                className="auth-forgot"
                onClick={() => {
                  setReset(false);
                  setError("");
                }}
              >Back to login</span>
            )}
            <div className="auth-switch">
              {!reset && (mode === "login" ? (
                <>
                  Don't have an account?
                  <span onClick={() => { setMode("signup"); setError(""); }}>
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?
                  <span onClick={() => { setMode("login"); setError(""); }}>
                    Login
                  </span>
                </>
              ))}
            </div>
          </form>
        </div>
        {/* Right: Info/Features/Card */}
        <div className="auth-split-right">
          <div className="auth-split-right-card">
            <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>
              Welcome to ReactFlow Builder
            </div>
            <div style={{ fontSize: '0.98rem', opacity: 0.93 }}>
              Build beautiful web pages visually.<br />
              Drag, drop, and export clean code.
            </div>
            <div style={{ margin: '18px 0 0 0', fontSize: '2.1rem' }}>⚡</div>
          </div>
          <ul className="auth-feature-list">
            <li>Visual drag-and-drop builder</li>
            <li>Export HTML & CSS instantly</li>
            <li>Responsive device preview</li>
            <li>Modern, professional UI</li>
            <li>Social login & password reset</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
