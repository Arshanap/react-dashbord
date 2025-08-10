import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchInput from "../components/SearchInput";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const UsersTable = ({ filteredUsers }) => (
  <div className="pdf-table-container">
    <table
      id="user-table-pdf"
      className="table table-striped table-bordered table-hover"
    >
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.company.name}</td>
            <td>{u.address.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  const filtered = useMemo(
    () =>
      users.filter((u) => {
        const lower = q.toLowerCase();
        return (
          u.name.toLowerCase().includes(lower) ||
          u.company.name.toLowerCase().includes(lower) ||
          u.address.city.toLowerCase().includes(lower)
        );
      }),
    [users, q]
  );

  const exportPDF = async () => {
    const el = document.getElementById("user-table-pdf");
    const canvas = await html2canvas(el, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("users.pdf");
  };

  return (
    <div className="container py-3 users-container">
      <style>{`
        .users-list-mobile {
          display: none;
        }
        @media (max-width: 786px) {
          .users-container {
            padding: 10px;
          }
          .users-container .btn {
            font-size: 14px;
            padding: 6px 10px;
          }
          input[type="text"], .form-control {
            font-size: 14px;
            padding: 6px;
          }
          .users-table-desktop {
            display: none;
          }
          .users-list-mobile {
            display: block;
          }
          .user-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px;
            margin-bottom: 10px;
            background: #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1);
            font-size: 14px;
            overflow-wrap: break-word;
          }
          .user-card p {
            margin: 4px 0;
          }
          .search-bar {
          color: red;
          }
        }
      `}</style>

      <div className="search-bar d-flex flex-column flex-md-row align-items-md-center gap-2 mb-3">
        <div className="flex-grow-1">
          <SearchInput
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users..."
          />
        </div>
        <button onClick={exportPDF} className="btn btn-success flex-shrink-0">
          Download PDF
        </button>
      </div>

      <div className="table-responsive users-table-desktop">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.company.name}</td>
                <td>{u.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="users-list-mobile">
        {filtered.map((u) => (
          <div key={u.id} className="user-card">
            <p><strong>Name:</strong> {u.name}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Company:</strong> {u.company.name}</p>
            <p><strong>City:</strong> {u.address.city}</p>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: "-9999px" }}>
        <UsersTable filteredUsers={filtered} />
      </div>
    </div>
  );
};

export default Users;
