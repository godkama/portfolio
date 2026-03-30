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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Circle open={open} setOpen={setOpen} />
      <Menu open={open} />
    </div>
  );
}
