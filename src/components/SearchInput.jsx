const SearchInput = ({ value, onChange, placeholder })=> {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-control text-dark border-0 rounded-pill shadow-sm" // Changed 'text-light' to 'text-dark'
      style={{ maxWidth: "250px" }}
    />
  );
}

export default SearchInput;