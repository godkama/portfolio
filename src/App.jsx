import { useState } from "react";
import Circle from "./components/Circle";
import Menu from "./components/Menu";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // --- BACKGROUND IMAGE SETUP ---
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/src/assets/textures/osu-main-menu.jpg')`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Circle open={open} setOpen={setOpen} />
      <Menu open={open} />
    </div>
  );
}
