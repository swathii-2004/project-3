import { useState } from 'react'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .auth-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0d0d0d;
    background-image:
      radial-gradient(ellipse 80% 60% at 20% 20%, rgba(99,60,180,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 80%, rgba(20,120,100,0.15) 0%, transparent 55%);
    font-family: 'DM Sans', sans-serif;
    padding: 24px;
  }

  .auth-card {
    width: 100%;
    max-width: 440px;
    background: rgba(255,255,255,0.035);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 40px 36px 36px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: relative;
    overflow: hidden;
  }

  .auth-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }

  .brand-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #7c4dff, #00c896);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }

  .brand-name {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .tab-row {
    display: flex;
    background: rgba(255,255,255,0.05);
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 32px;
    gap: 4px;
  }

  .tab-btn {
    flex: 1;
    padding: 9px 0;
    border: none;
    border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    background: transparent;
    color: rgba(255,255,255,0.45);
  }

  .tab-btn.active {
    background: rgba(255,255,255,0.1);
    color: #fff;
    box-shadow: 0 1px 8px rgba(0,0,0,0.3);
  }

  .form-title {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    color: #fff;
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }

  .form-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    margin-bottom: 28px;
    font-weight: 300;
  }

  .field {
    margin-bottom: 16px;
    position: relative;
  }

  .field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .field-wrap {
    position: relative;
  }

  .field input {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255,255,255,0.055);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .field input::placeholder {
    color: rgba(255,255,255,0.2);
  }

  .field input:focus {
    border-color: rgba(124,77,255,0.6);
    background: rgba(124,77,255,0.07);
  }

  .field input.has-icon {
    padding-right: 44px;
  }

  .eye-btn {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255,255,255,0.3);
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }

  .eye-btn:hover { color: rgba(255,255,255,0.7); }

  .forgot {
    text-align: right;
    margin-top: -8px;
    margin-bottom: 16px;
  }

  .forgot a {
    font-size: 13px;
    color: rgba(124,77,255,0.8);
    text-decoration: none;
    transition: color 0.2s;
  }

  .forgot a:hover { color: #a07dff; }

  .submit-btn {
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #7c4dff 0%, #00c896 100%);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    transition: opacity 0.2s, transform 0.15s;
    letter-spacing: 0.2px;
  }

  .submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .submit-btn:active { transform: translateY(0); }

  .divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 24px 0;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }

  .divider span {
    font-size: 12px;
    color: rgba(255,255,255,0.25);
    font-weight: 300;
  }

  .social-row {
    display: flex;
    gap: 12px;
  }

  .social-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    color: rgba(255,255,255,0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }

  .social-btn:hover {
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,255,255,0.15);
    color: #fff;
  }

  .switch-text {
    text-align: center;
    margin-top: 24px;
    font-size: 13.5px;
    color: rgba(255,255,255,0.3);
  }

  .switch-text button {
    background: none;
    border: none;
    color: rgba(124,77,255,0.9);
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    padding: 0 2px;
    transition: color 0.2s;
  }

  .switch-text button:hover { color: #a07dff; }

  .slide-enter { animation: slideInRight 0.3s ease forwards; }
  .slide-exit  { animation: slideOutLeft 0.3s ease forwards; }
  .slide-enter-rev { animation: slideInLeft 0.3s ease forwards; }
  .slide-exit-rev  { animation: slideOutRight 0.3s ease forwards; }

  @keyframes slideInRight  { from { opacity:0; transform: translateX(28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideOutLeft  { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(-28px); } }
  @keyframes slideInLeft   { from { opacity:0; transform: translateX(-28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideOutRight { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(28px); } }

  @media (max-width: 480px) {
    .auth-card { padding: 28px 20px 24px; }
    .form-title { font-size: 22px; }
  }
`

// ── Icons (inline SVG, no external dep) ──────────────────────────────────────
const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
)

const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z" />
        <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z" />
        <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z" />
        <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z" />
    </svg>
)

const FacebookIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
)

// ── Password Field ────────────────────────────────────────────────────────────
function PasswordField({ id, label, placeholder }: { id: string; label: string; placeholder: string }) {
    const [show, setShow] = useState(false)
    return (
        <div className="field">
            <label htmlFor={id}>{label} <span style={{ color: '#7c4dff' }}>*</span></label>
            <div className="field-wrap">
                <input
                    id={id}
                    type={show ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="has-icon"
                    required
                />
                <button type="button" className="eye-btn" onClick={() => setShow(v => !v)} aria-label="Toggle password">
                    {show ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
        </div>
    )
}

// ── Login Form ────────────────────────────────────────────────────────────────
function LoginForm({ animClass }: { animClass: string }) {
    return (
        <div className={animClass} key="login">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in to continue your journey</p>

            <div className="field">
                <label htmlFor="login-email">Email <span style={{ color: '#7c4dff' }}>*</span></label>
                <input id="login-email" type="email" placeholder="you@example.com" required />
            </div>

            <PasswordField id="login-pass" label="Password" placeholder="Enter your password" />

            <div className="forgot"><a href="#">Forgot password?</a></div>

            <button type="submit" className="submit-btn">Sign In</button>

            <div className="divider">
                <div className="divider-line" />
                <span>or continue with</span>
                <div className="divider-line" />
            </div>

            <div className="social-row">
                <button type="button" className="social-btn"><GoogleIcon /> Google</button>
                <button type="button" className="social-btn"><FacebookIcon /> Facebook</button>
            </div>
        </div>
    )
}

// ── Signup Form ───────────────────────────────────────────────────────────────
function SignupForm({ animClass }: { animClass: string }) {
    return (
        <div className={animClass} key="signup">
            <h2 className="form-title">Create account</h2>
            <p className="form-subtitle">Join us — it only takes a minute</p>

            <div className="field">
                <label htmlFor="signup-name">Full name <span style={{ color: '#7c4dff' }}>*</span></label>
                <input id="signup-name" type="text" placeholder="Jane Doe" required />
            </div>

            <div className="field">
                <label htmlFor="signup-email">Email <span style={{ color: '#7c4dff' }}>*</span></label>
                <input id="signup-email" type="email" placeholder="you@example.com" required />
            </div>

            <PasswordField id="signup-pass" label="Password" placeholder="Create a password" />
            <PasswordField id="signup-confirm" label="Confirm password" placeholder="Repeat your password" />

            <button type="submit" className="submit-btn">Create Account</button>

            <div className="divider">
                <div className="divider-line" />
                <span>or sign up with</span>
                <div className="divider-line" />
            </div>

            <div className="social-row">
                <button type="button" className="social-btn"><GoogleIcon /> Google</button>
                <button type="button" className="social-btn"><FacebookIcon /> Facebook</button>
            </div>
        </div>
    )
}

// ── Main AuthPage ─────────────────────────────────────────────────────────────
export default function AuthPage() {
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [animClass, setAnimClass] = useState('slide-enter')

    const switchTo = (next: 'login' | 'signup') => {
        if (next === mode) return
        const toRight = next === 'signup'
        setAnimClass(toRight ? 'slide-enter' : 'slide-enter-rev')
        setMode(next)
    }

    return (
        <>
            <style>{styles}</style>
            <div className="auth-root">
                <div className="auth-card">
                    <div className="brand">
                        <div className="brand-icon">✦</div>
                        <span className="brand-name">Antigravity</span>
                    </div>

                    <div className="tab-row">
                        <button className={`tab-btn ${mode === 'login' ? 'active' : ''}`} onClick={() => switchTo('login')}>
                            Sign In
                        </button>
                        <button className={`tab-btn ${mode === 'signup' ? 'active' : ''}`} onClick={() => switchTo('signup')}>
                            Sign Up
                        </button>
                    </div>

                    {mode === 'login'
                        ? <LoginForm animClass={animClass} />
                        : <SignupForm animClass={animClass} />
                    }

                    <p className="switch-text">
                        {mode === 'login'
                            ? <>Don't have an account?<button onClick={() => switchTo('signup')}>Sign up free</button></>
                            : <>Already have an account?<button onClick={() => switchTo('login')}>Sign in</button></>
                        }
                    </p>
                </div>
            </div>
        </>
    )
}