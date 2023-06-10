import Nav from "./Nav";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        overflowX: "none",
      }}
    >
      <Nav />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
