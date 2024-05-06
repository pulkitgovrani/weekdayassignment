import { useState } from "react";
import "./details.css";
function Details({
  options,
  placeholder = "",
  onChange,
  selectedKey,
  open,
  setOpen,
}) {
  const [inputValue, setInputValue] = useState("");
  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onItemSelected = (selectedOption) => {
      onChange !==undefined && onChange(selectedOption.key);
      onChange !==undefined && setInputValue(selectedOption.value);
      setOpen(false);
  };

  const clearDropdown=()=>{
    setInputValue("");
    onChange("");
  }
  const onInputClick=()=>{
    console.log("Working");
    setOpen((prev)=>!prev);
    console.log(open);
  }
  return (
    <div className="dropdown-container">
      <div className="input-container" onClick={onInputClick}>
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        <div className="input-arrow-container">
          <i className="input-arrow"></i>
        </div>

        {selectedKey || inputValue ? <div className="input-clear-container" onClick={clearDropdown}>
          x
        </div>:null}
        
      </div>
      <div className={`dropdown ${open ? 'visible': ''}`}>
        {options.filter((item)=>{
          const searchItem=inputValue.toLowerCase();
          const v=item.value.toLowerCase();
          if(!searchItem) return true;
          return v.startsWith(searchItem);
        }).map((op) => (
          <div
            key={op.key}
            onClick={() => onItemSelected(op)}
            className="option"
          >
            {op.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
