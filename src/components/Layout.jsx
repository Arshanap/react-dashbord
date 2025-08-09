import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";

const Layout = ()=> {
  return (
    <div className="d-flex min-vh-100 bg-secondary"> {/* Full height screen */}
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="p-4 flex-grow-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;