import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Tasks", path: "/tasks" },
  ];

  useEffect(() => {
  const checkMobile = () => {
    const mobileView = window.innerWidth <= 425;
    setIsMobile(mobileView);

    setIsOpen((prevOpen) => {
      if (!mobileView && isMobile) return true;
      return prevOpen;
    });
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () => window.removeEventListener("resize", checkMobile);
}, [location.pathname, isMobile]);


  return (
    <>
      {isMobile && (
        <div className="bg-primary text-white p-2">
          <button
            className="btn btn-sm btn-light"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars />
          </button>
        </div>
      )}

      <aside
        className="bg-primary text-white p-2 p-md-3 h-100"
        style={{
          width: isMobile ? (isOpen ? "160px" : "50px") : "220px",
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
      >
        <nav>
          <ul className="nav flex-column gap-2">
            {links.map((link) => (
              <li key={link.path} className="nav-item">
                <Link
                  to={link.path}
                  className={`nav-link fw-semibold ${
                    location.pathname === link.path
                      ? "active bg-info text-white rounded"
                      : "text-white-50"
                  }`}
                  style={{
                    fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
                    padding: "0.4rem 0.8rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isOpen ? link.name : link.name.charAt(0)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
