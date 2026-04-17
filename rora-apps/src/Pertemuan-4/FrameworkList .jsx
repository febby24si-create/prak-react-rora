import { useEffect, useRef } from "react";
import frameworkData from "./framework.json";

const icons = ["⚡", "🌐", "🔷", "🟢", "🔵", "🔶", "🛠", "🌀", "🚀", "💡"];

export default function FrameworkList() {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 80);
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0f;
          --card-bg: rgba(255,255,255,0.04);
          --card-border: rgba(255,255,255,0.08);
          --accent-1: #6c63ff;
          --accent-2: #00e5ff;
          --accent-3: #ff6b9d;
          --text-primary: #f0f0f8;
          --text-muted: rgba(240,240,248,0.5);
          --tag-bg: rgba(108,99,255,0.15);
          --tag-border: rgba(108,99,255,0.3);
        }

        .fw-page {
          background: var(--bg);
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
          min-height: 100vh;
          padding: 2.5rem 1.25rem;
          position: relative;
          overflow-x: hidden;
        }

        /* Background orbs */
        .fw-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
          pointer-events: none;
          z-index: 0;
        }
        .fw-orb-1 { width:400px; height:400px; background:var(--accent-1); top:-100px; right:-100px; }
        .fw-orb-2 { width:300px; height:300px; background:var(--accent-2); bottom:10%; left:-80px; }
        .fw-orb-3 { width:250px; height:250px; background:var(--accent-3); bottom:30%; right:5%; }

        .fw-wrapper { position: relative; z-index: 1; }

        /* Header */
        .fw-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .fw-header h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-2), var(--accent-1), var(--accent-3));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .fw-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-top: 0.6rem;
          font-weight: 300;
        }
        .fw-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-2);
          box-shadow: 0 0 10px var(--accent-2);
          animation: fw-pulse 2s infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes fw-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }

        /* Grid */
        .fw-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Card */
        .fw-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.4s ease,
            transform 0.4s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
          cursor: default;
        }
        .fw-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          opacity: 0;
          background: linear-gradient(135deg, rgba(108,99,255,0.08), rgba(0,229,255,0.05));
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .fw-card:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(108, 99, 255, 0.4);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(108,99,255,0.2);
        }
        .fw-card:hover::before { opacity: 1; }

        /* Neon top accent bar */
        .fw-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 20px 20px 0 0;
        }
        .fw-card:hover .fw-card-accent { opacity: 1; }

        /* Card top row */
        .fw-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .fw-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(108,99,255,0.25), rgba(0,229,255,0.15));
          border: 1px solid rgba(108,99,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
        }
        .fw-year {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 3px 9px;
          border-radius: 99px;
          white-space: nowrap;
        }

        /* Card content */
        .fw-card h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 0.25rem;
        }
        .fw-dev {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.85rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .fw-dev span { color: rgba(0,229,255,0.8); font-weight: 500; }
        .fw-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
          font-weight: 300;
        }

        /* Tags */
        .fw-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.1rem; }
        .fw-tag {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 3px 10px;
          border-radius: 99px;
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          color: rgba(108,99,255,0.9);
          transition: background 0.2s, border-color 0.2s;
        }
        .fw-card:hover .fw-tag {
          background: rgba(108,99,255,0.22);
          border-color: rgba(108,99,255,0.5);
        }

        /* Footer */
        .fw-footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .fw-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--accent-2);
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: gap 0.2s ease, opacity 0.2s;
        }
        .fw-link:hover { gap: 9px; opacity: 0.8; }
        .fw-link svg {
          width: 13px; height: 13px;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .fw-link:hover svg { transform: translate(2px, -2px); }
        .fw-id {
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 3px 9px;
          border-radius: 99px;
        }
      `}</style>

      <div className="fw-page">
        {/* Background orbs */}
        <div className="fw-orb fw-orb-1" />
        <div className="fw-orb fw-orb-2" />
        <div className="fw-orb fw-orb-3" />

        <div className="fw-wrapper">
          {/* Header */}
          <div className="fw-header">
            <h1>Framework Explorer</h1>
            <p>
              <span className="fw-dot" />
              Modern web development stacks
            </p>
          </div>

          {/* Grid */}
          <div className="fw-grid">
            {frameworkData.map((item, i) => (
              <div
                key={item.id}
                className="fw-card"
                ref={(el) => (cardRefs.current[i] = el)}
              >
                <div className="fw-card-accent" />

                <div className="fw-card-top">
                  <div className="fw-icon">{icons[i % icons.length]}</div>
                  <span className="fw-year">{item.details.releaseYear}</span>
                </div>

                <h2>{item.name}</h2>

                <div className="fw-dev">
                  by <span>{item.details.developer}</span>
                </div>

                <p className="fw-desc">{item.description}</p>

                <div className="fw-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="fw-tag">{tag}</span>
                  ))}
                </div>

                <div className="fw-footer">
                  <a
                    href={item.details.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fw-link"
                  >
                    Visit Website
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                  <span className="fw-id">#{String(item.id).padStart(2, "0")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}