import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchInput from "../components/SearchInput";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Users = ()=> {
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
    const el = document.getElementById("user-table");
    const canvas = await html2canvas(el);
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
      {/* Search and download */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <SearchInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search users..."
        />
        <button onClick={exportPDF} className="btn btn-success">
          Download PDF
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table id="user-table" className="table table-striped table-bordered table-hover">
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
    </div>
  );
}

export default Users;