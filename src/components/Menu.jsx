export default function Menu({ open }) {
  const menuItems = ["PORTFOLIO", "GITHUB", "REPO"];
  const getWidth = (i) => ["35vw", "32vw", "29vw"][i];
  const getIcon = (item) =>
    ({ PORTFOLIO: "🔘", GITHUB: "👥", REPO: "⚙️" })[item];

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        marginLeft: "-5vw",
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
              height: "7vw", // Slightly smaller for better balance
              width: getWidth(index),
              background: "linear-gradient(90deg, #8662d0 0%, #4d3a91 100%)",
              borderLeft: "0.5vw solid #b3a1ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 4vw 0 10vw",
              color: "white",
              cursor: "pointer",
              position: "relative",

              // Overlap by 1px to kill the sub-pixel gap line
              marginTop: isFirst ? "0" : "-1px",

              // Entry animation (Slow & Elastic)
              transition:
                "transform 0.5s cubic-bezier(0.13, 0.71, 0.3, 1.25), opacity 0.3s",
              transitionDelay: open ? `${0.2 + index * 0.08}s` : "0s",

              transform: open
                ? `translateX(${index * 1.5}vw) skewX(-15deg)`
                : `translateX(-15vw) skewX(-15deg)`,

              opacity: open ? 1 : 0,
              borderRadius: `0 ${isFirst ? "3vw" : "0"} ${isLast ? "3vw" : "0"} 0`,
            }}
          >
            <span
              style={{
                transform: "skewX(15deg)",
                fontSize: "2.5vw",
                fontWeight: 700,
              }}
            >
              {item}
            </span>
            <div style={{ transform: "skewX(15deg)", fontSize: "2.2vw" }}>
              {getIcon(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
