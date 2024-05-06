import { useState } from "react";
import "./App.css";
import Details from "./components/details/Details";
const option = [{ key: 1, value: "Frontend" }, 
  {key:2,value:"Backend"},{key:3,value:"Design"},{
    key:4,value:"Sales"
  }];
function App() {
  const [selectedrole,setSelectedRole]=useState("");
  const [open,setOpen]=useState(false);
  return (
    <>
      <h1>My DropDown</h1>
      <Details options={option} onChange={(item)=>{
        console.log(item);
        setSelectedRole(item)
      }}
        selectedKey={selectedrole}
      placeholder="Roles" open={open} setOpen={setOpen}
      />
      <p>${selectedrole}</p>
    </>
  );
}

export default App;
