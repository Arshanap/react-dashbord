import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";

const Layout = ()=> {
  return (
    <div className="d-flex vh-100 "> 
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-grow-1 d-flex flex-column">
        <Header />
        <main className="p-4 flex-grow-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;