import { useState, useRef, useEffect } from "react";

export default function PortfolioPanel({ onClose }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Portfolio",
      desc: "The current portfolio you are using. Built with React and inspired by the osu!lazer interface.",
      links: [
        { label: "GITHUB 🔗", url: "https://github.com/godkama/portfolio" },
        { label: "JS" },
        { label: "React" },
      ],
    },
    {
      id: 2,
      title: "o!Scrims",
      desc: "osu! Matchmaking Service. The service however is down since November 2025, and all projects are private.",
      links: [
        { label: "GITHUB 🔗", url: "https://github.com/o-sc/" },
        { label: "JS" },
      ],
    },
    {
      id: 3,
      title: "o!manager",
      desc: "osu! Configuration Switcher. This tool seamlessly allows players to save their OpenTabletDriver and osu! configuration, load it, rename it or select another configuration, while keeping backups.",
      links: [
        { label: "GITHUB 🔗", url: "https://github.com/godkama/o-manager" },
        { label: "C#" },
      ],
    },
    {
      id: 4,
      title: "Tourney Manager",
      desc: "Tool that allows referees to easily watch over their matches, with mappool integrations, Challonge extension and automatic referee. The project was abandoned due to similar and more feature-complete tools already existing.",
      links: [
        {
          label: "GITHUB 🔗",
          url: "https://github.com/godkama/tourneymanager",
        },
        { label: "HTML" },
        { label: "JS" },
        { label: "Express" },
        { label: "Node.JS" },
      ],
    },
    {
      id: 5,
      title: "Arzerox",
      desc: "Arzerox was a multi-purpose Discord bot. It reached end-of-service in 2023",
      links: [
        {
          label: "GITHUB 🔗",
          url: "https://github.com/godkama/tourneymanager",
        },
        { label: "JS" },
        { label: "Node.JS" },
      ],
    },
    {
      id: 6,
      title: "arzeroxjs",
      desc: "arzeroxjs was a node package working in the continuity of Arzerox, with the main goal of providing users easier ways to setup Discord bots, and run it. It reached end-of-support in 2023, and end-of-service in 2024, when Discord officially retired discord.js@13 . A semi-working update to discord.js@14 was produced later that year. ",
      links: [
        { label: "GITHUB 🔗", url: "https://github.com/godkama/arzeroxjs" },
        { label: "JS" },
        { label: "Node.JS" },
      ],
    },
  ];

  const loopProjects = [...projects, ...projects, ...projects];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const itemHeight = window.innerWidth * 0.08;
    const totalContentHeight = projects.length * itemHeight;

    el.scrollTop = totalContentHeight * 2;

    const handleScroll = () => {
      const currentScroll = el.scrollTop;
      if (currentScroll < totalContentHeight) {
        el.scrollTop = currentScroll + totalContentHeight * 2;
      } else if (currentScroll > totalContentHeight * 4) {
        el.scrollTop = currentScroll - totalContentHeight * 2;
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [projects.length]);

  return (
    <div style={styles.overlay}>
      <div style={styles.leftPane}>
        <div style={styles.infoBox}>
          {selectedProject ? (
            <div className="fade-in" key={selectedProject.id}>
              <h2 style={styles.infoTitle}>{selectedProject.title}</h2>
              <p style={styles.infoDesc}>{selectedProject.desc}</p>

              {}
              {selectedProject.links && (
                <div style={styles.linkContainer}>
                  {selectedProject.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                      style={styles.projectLinkBtn}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={styles.instructionBox}>
              <p style={styles.instructionText}>
                <span style={{ color: "#ff66aa", fontWeight: 900 }}>CLICK</span>{" "}
                A PANEL ON THE RIGHT
                <br />
                TO VIEW PROJECT DETAILS
              </p>
            </div>
          )}
        </div>

        <button onClick={onClose} className="back-btn" style={styles.backBtn}>
          <span style={{ transform: "skewX(15deg)" }}>BACK</span>
        </button>
      </div>

      <div ref={scrollRef} className="no-scrollbar" style={styles.rightPane}>
        {loopProjects.map((p, i) => (
          <ProjectItem
            key={`${i}-${p.id}`}
            project={p}
            scrollRef={scrollRef}
            onClick={() => setSelectedProject(p)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectItem({ project, onClick, scrollRef }) {
  const itemRef = useRef(null);
  const [proximity, setProximity] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      if (!itemRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const itemCenter = rect.top + rect.height / 2;

      const dist = Math.abs(viewportCenter - itemCenter);
      const range = window.innerHeight * 0.4;
      const p = Math.max(0, 1 - dist / range);
      setProximity(p);
    };

    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, [scrollRef]);

  const dynamicScale = 1 + Math.pow(proximity, 2) * 0.3;

  return (
    <div
      ref={itemRef}
      className="portfolio-item"
      onClick={onClick}
      style={{
        ...styles.projectItem,
        width: `${25 + proximity * 12}vw`,
        "--base-scale": dynamicScale,
        transform: `skewX(-15deg) scale(${dynamicScale})`,
        filter: `brightness(${0.5 + proximity * 0.7})`,
        zIndex: Math.round(proximity * 10),
      }}
    >
      <span
        style={{
          transform: "skewX(15deg)",
          fontSize: "2.2vw",
          fontWeight: 900,
        }}
      >
        {project.title}
      </span>
    </div>
  );
}

const styles = {
  overlay: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "black",
    display: "flex",
    overflow: "hidden",
  },
  leftPane: {
    width: "40vw",
    padding: "5vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "black",
    zIndex: 20,
  },
  instructionBox: {
    borderLeft: "4px solid rgba(255, 102, 170, 0.4)",
    paddingLeft: "1.5vw",
    marginTop: "2vw",
  },
  instructionText: {
    fontSize: "1.2vw",
    color: "white",
    opacity: 0.6,
    lineHeight: "1.8",
    letterSpacing: "0.05vw",
  },
  linkContainer: {
    display: "flex",
    gap: "1vw",
    marginTop: "2vw",
    flexWrap: "wrap",
    transform: "skewX(0deg)",
  },
  projectLinkBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    padding: "0.8vw 1.5vw",
    borderRadius: "2vw",
    fontSize: "1vw",
    fontWeight: 700,
    textDecoration: "none",
    transition: "all 0.2s ease",
    display: "inline-block",
  },
  rightPane: {
    flex: 1,
    overflowY: "scroll",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingTop: "20vh",
    paddingBottom: "20vh",
    scrollSnapType: "y proximity",
  },
  projectItem: {
    height: "8vw",
    flexShrink: 0,
    background: "linear-gradient(90deg, #fd67ae 0%, #ee349a 100%)",
    borderLeft: "0.6vw solid white",
    color: "white",
    display: "flex",
    alignItems: "center",
    paddingLeft: "5vw",
    cursor: "pointer",
    transition: "width 0.1s, filter 0.2s",
    scrollSnapAlign: "center",
    margin: "0",
  },
  backBtn: {
    width: "12vw",
    height: "5vw",
    background: "#ff66aa",
    borderLeft: "0.5vw solid white",
    color: "white",
    fontSize: "1.5vw",
    fontWeight: 700,
    cursor: "pointer",
    transform: "skewX(-15deg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
  infoTitle: {
    fontSize: "4vw",
    color: "#ff66aa",
    fontStyle: "italic",
    fontWeight: 900,
  },
  infoDesc: {
    fontSize: "1.4vw",
    lineHeight: 1.6,
    color: "white",
    marginTop: "1vw",
  },
};
