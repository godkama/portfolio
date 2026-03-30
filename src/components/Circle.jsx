export default function Circle({ open, setOpen }) {
  return (
    <div
      onClick={() => setOpen(!open)}
      onMouseDown={(e) => (e.currentTarget.style.transform += " scale(0.95)")}
      style={{
        zIndex: 10,
        position: "relative",
        width: "40vw",
        height: "40vw",
        borderRadius: "50%",
        backgroundColor: open ? "#FF66AA" : "#EE3399",
        display: "flex",
        border: "2vw solid white",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('/src/assets/textures/osu!triangles-tile-light.png')`,
        backgroundSize: "35vw",
        backgroundBlendMode: "multiply",
        fontSize: "13vw",
        fontWeight: 700,
        fontStyle: "default",
        color: "white",
        cursor: "pointer",
        transition:
          "transform 0.5s cubic-bezier(0.13, 0.71, 0.3, 1.25), background 0.3s, box-shadow 0.3s",
        transform: open
          ? "scale(1.1) translateX(-15vw)"
          : "scale(1) translateX(0px)",
        boxShadow: open ? "0 0 60px #ff66aa" : "0 0 30px rgba(0,0,0,0.5)",
      }}
    >
      osu!
    </div>
  );
}
