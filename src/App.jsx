import { useState, useEffect } from "react";
import Circle from "./components/Circle";
import Menu from "./components/Menu";
import PortfolioPanel from "./components/PortfolioPanel";

export default function App() {
  const [open, setOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
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

  // Toggle view based on showPortfolio state
  return (
    <div style={styles.container}>
      {showPortfolio ? (
        <PortfolioPanel onClose={() => setShowPortfolio(false)} />
      ) : (
        <>
          <Circle open={open} setOpen={setOpen} />
          <Menu open={open} setShowPortfolio={setShowPortfolio} />
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
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/src/assets/textures/osu-main-menu.jpg')`,
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
};
