import './index.css';
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="d-flex flex-grow-1">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
