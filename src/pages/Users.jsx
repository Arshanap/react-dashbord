import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchInput from "../components/SearchInput";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// New component for the styled table that will be used for PDF export
const UsersTable = ({ filteredUsers }) => (
  <div className="pdf-table-container">
    <table id="user-table-pdf" className="table table-striped table-bordered table-hover">
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
    // We now use the new, styled table for the PDF
    const el = document.getElementById("user-table-pdf");
    const canvas = await html2canvas(el, { scale: 2 }); // Increase scale for better quality
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("users.pdf");
  };

  return (
    <div className="container py-3">
      {/* Search and download with improved responsiveness */}
      <div className="d-flex flex-column flex-md-row align-items-md-center gap-2 mb-3">
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

      {/* Visually improved table for the UI */}
      <div className="table-responsive">
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

      {/* This table is only for generating the PDF. It's hidden from the UI. */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <UsersTable filteredUsers={filtered} />
      </div>
    </div>
  );
}

export default Users;