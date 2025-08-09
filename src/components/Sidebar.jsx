import { Link, useLocation } from "react-router-dom";

const Sidebar = ()=> {
  const location = useLocation();
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Tasks", path: "/tasks" },
  ];

  return (
    <aside className="bg-primary text-white p-3" style={{ width: "220px", minHeight: "100vh" }}>
      <nav>
        <ul className="nav flex-column gap-2">
          {links.map((link) => (
            <li key={link.path} className="nav-item">
              <Link
                to={link.path}
                className={`nav-link ${
                  location.pathname === link.path
                    ? "active bg-info text-white rounded"
                    : "text-white-50"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;