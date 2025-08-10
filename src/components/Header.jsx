const Header = () => {
  return (
    <header className="text-primary shadow-sm py-3 px-4 d-flex align-items-center justify-content-between"
    style={{ marginTop: "10px", 
      borderRadius: "5px",
          background: "#89aade49" }}>
      <h1 className="header-title mb-0 fw-bold">React Dashboard</h1>
      <style>
        {`
          .header-title {
            font-size: 1.25rem; /* default for small screens */
          }

          @media (min-width: 768px) {
            
            .header-title {
              font-size: 1.5rem; /* bigger title on md+ */
            }
          }

          @media (min-width: 1200px) {
            .header-title {
              font-size: 1.75rem; /* even bigger for large screens */
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
