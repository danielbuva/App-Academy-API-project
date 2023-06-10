import Nav from "./Nav";

function Layout({ children }) {
  return (
    <div id="layout">
      <Nav />
      <div id="page">{children}</div>
    </div>
  );
}

export default Layout;
