export default function Menu({ open }) {
  const menuItems = ["SOLO", "MULTI", "OPTIONS", "EXIT"];
  const getWidth = (i) => ["460px", "540px", "540px", "460px"][i];
  const getIcon = (item) =>
    ({ SOLO: "🔘", MULTI: "👥", OPTIONS: "⚙️", EXIT: "🚪" })[item];
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        marginLeft: "-180px",
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        zIndex: 5,
        pointerEvents: open ? "all" : "none",
        opacity: open ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {menuItems.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === menuItems.length - 1;

        return (
          <div
            key={item}
            className="menu-btn"
            style={{
              height: "90px",
              width: getWidth(index),
              background: "linear-gradient(90deg, #8662d0 0%, #4d3a91 100%)",
              backgroundImage: `url('/src/assets/textures/osu!triangles-tile-333.png')`,
              backgroundSize: "40%",
              backgroundBlendMode: "soft-light",
              borderLeft: "8px solid #b3a1ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 60px 0 150px",
              color: "white",
              cursor: "pointer",

              transition:
                "transform 0.5s cubic-bezier(0.13, 0.71, 0.3, 1.25), opacity 0.3s",
              transitionDelay: open ? `${0.2 + index * 0.08}s` : "0s",
              transform: open
                ? `translateX(${index * 15}px) skewX(-15deg)`
                : "translateX(-150px) skewX(-15deg)",

              opacity: open ? 1 : 0,

              borderRadius: `0 ${isFirst ? "50px" : "0"} ${isLast ? "50px" : "0"} 0`,
            }}
          >
            <span
              style={{
                transform: "skewX(15deg)",
                fontSize: "40px",
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              {item}
            </span>
            <div style={{ transform: "skewX(15deg)", fontSize: "32px" }}>
              {getIcon(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
