import { useState } from "react";
import "./details.css";
function Details({
  options,
  placeholder = "",
  onChange,
  selectedKey,
  changeSelectedState,
  category
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onItemSelected = (selectedOption) => {
      onChange !==undefined && onChange(selectedOption);
      onChange !==undefined && setInputValue(selectedOption);
      onChange !==undefined && changeSelectedState(category,selectedOption);
      //console.log(selectedOption.value);
      setOpen(false);
      
  };

  const clearDropdown=()=>{
    setInputValue("");
    onChange("");
    changeSelectedState(category,"");

  }
  const onInputClick=()=>{
    console.log("Working");
    setOpen((prev)=>!prev);
    //console.log(open);
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
        {open && options.filter((item)=>{
          const searchItem=inputValue.toLowerCase();
          const v=item.toLowerCase();
          if(!searchItem) return true;
          return v.startsWith(searchItem);
        }).map((op,ind) => (
          <div
           key={ind}
            onClick={() => onItemSelected(op)}
            className="option"
          >
            {op}

           
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
