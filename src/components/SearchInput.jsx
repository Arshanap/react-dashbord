const SearchInput = ({ value, onChange, placeholder })=> {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-control bg-dark text-light border-0 rounded-pill shadow-sm"
      style={{ maxWidth: "250px" }}
    />
  );
}

export default SearchInput;