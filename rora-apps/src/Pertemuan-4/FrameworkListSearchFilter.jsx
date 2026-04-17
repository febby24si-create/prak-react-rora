import { useEffect, useRef, useState, useMemo } from "react";
import frameworkData from "./framework.json";

const icons = ["⚡", "🌐", "🔷", "🟢", "🔵", "🔶", "🛠", "🌀", "🚀", "💡"];

export default function FrameworkListSearchFilter() {
  // 1. Inisialisasi State dalam satu objek
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
  });

  const cardRefs = useRef([]);

  // 2. Handle perubahan nilai input secara dinamis
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Logic Search & Filter (useMemo untuk performa)
  const filteredFrameworks = useMemo(() => {
    const term = dataForm.searchTerm.toLowerCase();
    return frameworkData.filter((fw) => {
      const matchesSearch =
        fw.name.toLowerCase().includes(term) ||
        fw.description.toLowerCase().includes(term);
      const matchesTag = dataForm.selectedTag 
        ? fw.tags.includes(dataForm.selectedTag) 
        : true;
      return matchesSearch && matchesTag;
    });
  }, [dataForm.searchTerm, dataForm.selectedTag]);

  // 4. Ambil unique tags untuk dropdown
  const allTags = useMemo(() => {
    return [...new Set(frameworkData.flatMap((fw) => fw.tags))];
  }, []);

  // 5. Animasi Staggered yang lebih aman
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, filteredFrameworks.length);
    
    const timeouts = cardRefs.current.map((card, i) => {
      if (!card) return null;
      
      // Initial state
      card.style.transition = "none";
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";

      // Trigger animasi dengan sedikit delay (stagger)
      return setTimeout(() => {
        card.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 50);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [filteredFrameworks]);

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
        .fw-orb { position: fixed; border-radius: 50%; filter: blur(80px); opacity: 0.12; pointer-events: none; z-index: 0; }
        .fw-orb-1 { width:400px; height:400px; background:var(--accent-1); top:-100px; right:-100px; }
        .fw-orb-2 { width:300px; height:300px; background:var(--accent-2); bottom:10%; left:-80px; }
        .fw-orb-3 { width:250px; height:250px; background:var(--accent-3); bottom:30%; right:5%; }
        .fw-wrapper { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; }
        .fw-header { text-align: center; margin-bottom: 3rem; }
        .fw-header h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-2), var(--accent-1), var(--accent-3));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }
        .fw-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .fw-input, .fw-select {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          color: white;
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .fw-input:focus, .fw-select:focus { border-color: var(--accent-1); }
        .fw-input { flex: 2; min-width: 250px; }
        .fw-select { flex: 1; min-width: 150px; cursor: pointer; }
        .fw-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }
        .fw-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 1.5rem;
          position: relative;
          backdrop-filter: blur(12px);
          opacity: 0;
          transform: translateY(20px);
          display: flex;
          flex-direction: column;
        }
        .fw-card:hover {
          border-color: rgba(108, 99, 255, 0.4);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
        }
        .fw-card-top { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .fw-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,229,255,0.1));
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
        }
        .fw-year {
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255,255,255,0.05);
          padding: 4px 10px;
          border-radius: 99px;
          height: fit-content;
        }
        .fw-card h2 { font-family: 'Syne', sans-serif; margin-bottom: 0.2rem; }
        .fw-dev { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; }
        .fw-dev span { color: var(--accent-2); }
        .fw-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.2rem; flex-grow: 1; }
        .fw-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5rem; }
        .fw-tag {
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 99px;
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          color: #a29dff;
          text-transform: uppercase;
        }
        .fw-footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .fw-link { color: var(--accent-2); text-decoration: none; font-size: 0.85rem; font-weight: 500; display: flex; align-items: center; gap: 4px; }
        .fw-id { font-size: 10px; color: var(--text-muted); opacity: 0.5; }
      `}</style>

      <div className="fw-page">
        <div className="fw-orb fw-orb-1" />
        <div className="fw-orb fw-orb-2" />
        <div className="fw-orb fw-orb-3" />

        <div className="fw-wrapper">
          <header className="fw-header">
            <h1>Framework Explorer</h1>
            <p>Modern web development stacks</p>
          </header>

          <div className="fw-controls">
            <input
              type="text"
              name="searchTerm" // HARUS Sesuai dengan key di dataForm
              placeholder="Search framework..."
              className="fw-input"
              value={dataForm.searchTerm}
              onChange={handleChange}
            />

            <select
              name="selectedTag" // HARUS Sesuai dengan key di dataForm
              className="fw-select"
              value={dataForm.selectedTag}
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <div className="fw-grid">
            {filteredFrameworks.length > 0 ? (
              filteredFrameworks.map((item, i) => (
                <div
                  key={item.id}
                  className="fw-card"
                  ref={(el) => (cardRefs.current[i] = el)}
                >
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
                      Explore Docs ↗
                    </a>
                    <span className="fw-id">#{String(item.id).padStart(2, "0")}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1/-1', opacity: 0.5 }}>
                No frameworks found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}