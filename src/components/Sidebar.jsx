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

  // Detect screen resize to switch between mobile & desktop
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 425;
      setIsMobile(mobileView);
      if (!mobileView) {
        setIsOpen(true); // Always open on desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Toggle button only for mobile */}
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
                  {isOpen ? link.name : link.name.charAt(0)} {/* Icon mode */}
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
