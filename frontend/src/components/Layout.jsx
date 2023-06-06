import Nav from "./Nav";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Nav />
      {children}
    </div>
  );
}

export default Layout;
