import { useState, useEffect } from "react";
import Circle from "./components/Circle";
import Menu from "./components/Menu";

export default function App() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  // Update state if the user resizes their window
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1. THE GUARD: If not desktop, show a message instead of the game
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

  // 2. THE MAIN APP: Only renders if isDesktop is true
  return (
    <div style={styles.container}>
      <Circle open={open} setOpen={setOpen} />
      <Menu open={open} />
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
    backgroundColor: "#EE3399", // osu! pink
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
