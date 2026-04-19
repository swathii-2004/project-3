import { useState } from 'react'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .nav-root {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    font-family: 'DM Sans', sans-serif;
    box-sizing: border-box;
    width: 100%;
  }

  .nav-bar {
    margin: 12px auto;
    max-width: 1100px;
    width: calc(100% - 48px);
    padding: 0 20px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 18px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: relative;
  }

  .nav-bar::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(124,77,255,0.06) 0%, rgba(0,200,150,0.04) 100%);
    pointer-events: none;
  }

  /* ── Brand ── */
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 9px;
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav-brand-icon {
    width: 32px; height: 32px;
    border-radius: 9px;
    background: linear-gradient(135deg, #7c4dff, #00c896);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    color: #fff;
  }

  .nav-brand-name {
    font-family: 'DM Serif Display', serif;
    font-size: 19px;
    color: #fff;
    letter-spacing: -0.3px;
  }

  /* ── Desktop links ── */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
    list-style: none;
  }

  .nav-links a {
    display: block;
    padding: 7px 14px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    border-radius: 10px;
    transition: color 0.2s, background 0.2s;
    position: relative;
  }

  .nav-links a:hover {
    color: rgba(255,255,255,0.9);
    background: rgba(255,255,255,0.06);
  }

  .nav-links a.active {
    color: #fff;
    background: rgba(124,77,255,0.15);
  }

  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: 5px; left: 50%; transform: translateX(-50%);
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #7c4dff;
  }

  /* ── Right actions ── */
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .nav-btn-ghost {
    padding: 8px 16px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 11px;
    color: rgba(255,255,255,0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    white-space: nowrap;
  }

  .nav-btn-ghost:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.22);
    color: #fff;
  }

  .nav-btn-primary {
    padding: 8px 18px;
    background: linear-gradient(135deg, #7c4dff 0%, #00c896 100%);
    border: none;
    border-radius: 11px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    white-space: nowrap;
  }

  .nav-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .nav-btn-primary:active { transform: translateY(0); }

  /* ── Avatar / profile ── */
  .nav-avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c4dff, #00c896);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    border: 2px solid rgba(255,255,255,0.12);
    transition: border-color 0.2s;
    flex-shrink: 0;
  }

  .nav-avatar:hover { border-color: rgba(124,77,255,0.6); }

  /* ── Hamburger (mobile) ── */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .nav-hamburger:hover { background: rgba(255,255,255,0.07); }

  .nav-hamburger span {
    display: block;
    width: 22px; height: 2px;
    background: rgba(255,255,255,0.7);
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Mobile drawer ── */
  .nav-drawer {
    margin: 0 auto;
    max-width: 1100px;
    width: calc(100% - 48px);
    border: 1px solid rgba(255,255,255,0.08);
    border-top: none;
    border-radius: 0 0 18px 18px;
    background: rgba(13,13,13,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.35s ease, padding 0.3s ease;
    padding: 0 16px;
  }

  .nav-drawer.open {
    max-height: 400px;
    padding: 12px 16px 20px;
  }

  .nav-drawer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 16px;
  }

  .nav-drawer-links a {
    display: block;
    padding: 11px 14px;
    font-size: 15px;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    border-radius: 10px;
    transition: background 0.2s, color 0.2s;
  }

  .nav-drawer-links a:hover,
  .nav-drawer-links a.active {
    background: rgba(255,255,255,0.06);
    color: #fff;
  }

  .nav-drawer-actions {
    display: flex;
    gap: 10px;
  }

  .nav-drawer-actions button { flex: 1; }

  /* ── Responsive ── */
  @media (max-width: 680px) {
    .nav-links { display: none; }
    .nav-actions { display: none; }
    .nav-hamburger { display: flex; }
    .nav-bar { width: calc(100% - 28px); padding: 0 16px; }
    .nav-drawer { width: calc(100% - 28px); }
  }
`

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
]

type NavbarProps = {
    /** Pass 'loggedIn' to show avatar instead of auth buttons */
    variant?: 'default' | 'loggedIn'
    /** User initials when logged in */
    initials?: string
    activeLink?: string
}

export default function Navbar({
    variant = 'default',
    initials = 'JD',
    activeLink = 'Home',
}: NavbarProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <style>{styles}</style>
            <nav className="nav-root" aria-label="Main navigation">

                {/* ── Main bar ── */}
                <div className="nav-bar">

                    {/* Brand */}
                    <a href="#" className="nav-brand">
                        <div className="nav-brand-icon">✦</div>
                        <span className="nav-brand-name">Antigravity</span>
                    </a>

                    {/* Desktop links */}
                    <ul className="nav-links">
                        {NAV_LINKS.map(link => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className={activeLink === link.label ? 'active' : ''}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop actions */}
                    <div className="nav-actions">
                        {variant === 'loggedIn' ? (
                            <div className="nav-avatar" title="Profile">{initials}</div>
                        ) : (
                            <>
                                <button className="nav-btn-ghost">Sign In</button>
                                <button className="nav-btn-primary">Get Started</button>
                            </>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button
                        className={`nav-hamburger ${open ? 'open' : ''}`}
                        onClick={() => setOpen(v => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={open}
                    >
                        <span /><span /><span />
                    </button>
                </div>

                {/* ── Mobile drawer ── */}
                <div className={`nav-drawer ${open ? 'open' : ''}`}>
                    <ul className="nav-drawer-links">
                        {NAV_LINKS.map(link => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className={activeLink === link.label ? 'active' : ''}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    {variant !== 'loggedIn' && (
                        <div className="nav-drawer-actions">
                            <button className="nav-btn-ghost">Sign In</button>
                            <button className="nav-btn-primary">Get Started</button>
                        </div>
                    )}
                </div>

            </nav>
        </>
    )
}