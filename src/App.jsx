import { useState, useEffect } from "react";
import Circle from "./components/Circle";
import Menu from "./components/Menu";
import PortfolioPanel from "./components/PortfolioPanel";

export default function App() {
  const [open, setOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showInfo, setShowInfo] = useState(false); // New State
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div style={styles.mobileWarning}>
        <h1 style={{ fontStyle: "normal" }}>Portfolio</h1>
        <p>This experience is optimized for Desktop only.</p>
        <p style={{ fontSize: "12px", marginTop: "10px", opacity: 0.7 }}>
          Please switch to a PC.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {showPortfolio ? (
        <PortfolioPanel onClose={() => setShowPortfolio(false)} />
      ) : (
        <>
          <Circle open={open} setOpen={setOpen} />
          {}
          <Menu
            open={open}
            setShowPortfolio={setShowPortfolio}
            setShowInfo={setShowInfo}
          />

          {}
          {showInfo && (
            <div style={styles.infoOverlay} onClick={() => setShowInfo(false)}>
              <div style={styles.infoBox} onClick={(e) => e.stopPropagation()}>
                <button
                  style={styles.closeBtn}
                  onClick={() => setShowInfo(false)}
                >
                  ✕
                </button>
                <h2 style={styles.infoTitle}>INFORMATION</h2>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "rgba(255,255,255,0.2)",
                    margin: "1vw 0",
                  }}
                />
                <p style={styles.infoText}>
                  This portfolio is inspired by the <strong>osu!</strong>{" "}
                  interface. It also has a mobile only view. Please look at the GitHub for any additional info.
                  <br />
                  Developed by <strong>godkama</strong>.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/textures/osu-main-menu.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  mobileWarning: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#EE3399",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Aller, sans-serif",
    padding: "20px",
  },
  infoOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    backdropFilter: "blur(4px)",
  },
  infoBox: {
    width: "30vw",
    background: "linear-gradient(135deg, #4d3a91 0%, #2b1f54 100%)",
    borderLeft: "0.5vw solid #ff66aa",
    padding: "2vw",
    color: "white",
    position: "relative",
    transform: "skewX(-10deg)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  },
  closeBtn: {
    position: "absolute",
    top: "1vw",
    right: "1vw",
    background: "none",
    border: "none",
    color: "#ff66aa",
    fontSize: "2vw",
    cursor: "pointer",
    transform: "skewX(10deg)", // Counter-skew
  },
  infoTitle: {
    fontSize: "2.2vw",
    color: "#ff66aa",
    fontWeight: 900,
    fontStyle: "italic",
    transform: "skewX(10deg)",
  },
  infoText: {
    fontSize: "1.1vw",
    lineHeight: "1.6",
    transform: "skewX(10deg)",
    marginTop: "1vw",
  },
};
