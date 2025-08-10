const SearchInput = ({ value, onChange, placeholder })=> {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-control text-dark border-0 border border-dark rounded-pill shadow-sm"
      style={{ maxWidth: "250px" }}
    />
  );
}

export default SearchInput;