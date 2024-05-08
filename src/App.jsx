import { useEffect, useState } from "react";
import "./App.css";
import Details from "./components/details/Details";
import InfiniteScroll from "react-infinite-scroll-component";
const jobRoles = ["frontend", "backend", "tech lead", "ios", "android"];

const noOfEmployees = ["1-10", "11-20", "21-50", "51-100", "101-200"];
const Experience = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const jobLocation = ["delhi ncr", "mumbai", "chennai", "bengaluru", "pune"];
const techStack = ["C++", "Java", "Python", "R", "Rust"];
const minimumSalary = [
  "0L",
  "10L",
  "20L",
  "30L",
  "40L",
  "50L",
  "60L",
  "70L",
  "80L",
  "90L",
];

function App() {
  const [selectedfilter, setSelectedFilter] = useState([]);
  function changeSelectedState(categoryvalue, newvalue) {

    if (newvalue === "") {
      let tempfilterarr = [];
      for (let i = 0; i < selectedfilter.length; i++) {
        if (selectedfilter[i].category === categoryvalue) {
          //console.log("Do Nothing");
        } else {
          tempfilterarr.push(selectedfilter[i]);
        }
      }
      setSelectedFilter(tempfilterarr);
    } else {
      setSelectedFilter([
        ...selectedfilter,
        { category: categoryvalue, filtername: newvalue },
      ]);
    }
  }
  const [selectedrole, setSelectedRole] = useState("");
  const [alljobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const myHeaders = new Headers();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  function fetchmoredata() {
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: limit,
      offset: offset,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setAllJobs([...alljobs,...result.jdList]);
        setFilteredJobs([...filteredJobs,...result.jdList]);
        //console.log(result.jdList);
      })
      .catch((error) => console.error(error));

    setLimit((prev) => prev + 10);
    setOffset((prev) => prev + 10);
    //console.log(limit);
    //console.log(offset);
  }

  useEffect(() => {
    fetchmoredata();
  }, []);

  useEffect(() => {
    // Define the filter function
    const filterJobsByRole = (jobs, slf) => {
      //Here slf basically represents the selectedfilter
      console.log(jobs, slf);
      if (slf.length === 0) {
        return jobs;
      }
      const myfilterjobs = jobs.filter((job) => {
        let res = true;
        for (let i = 0; i < slf.length; i++) {
          if (slf[i].category === "jobRoles") {
            if (job.jobRole !== slf[i].filtername) {
              res = false;
              break;
            }
          } else if (slf[i].category === "jobLocation") {
            if (job.location !== slf[i].filtername) {
              res = false;
              break;
            }
          }
        }
        return res;
      });

      return myfilterjobs;
    };

    const updatedFilteredJobs = filterJobsByRole(alljobs, selectedfilter);
    console.log("updated selected filter", selectedfilter);
    console.log("These are updated filtered jobs", updatedFilteredJobs);
    // setFilteredJobs(updatedFilteredJobs);
    setFilteredJobs(updatedFilteredJobs);
    // Log the filtered jobs
    //console.log(updatedFilteredJobs);
  }, [selectedfilter]);
  return (
    <>
      <div className="navbar">
        <Details
          options={jobRoles}
          onChange={(item) => {
            //console.log(item);
            setSelectedRole(item);
          }}
          selectedKey={selectedrole}
          placeholder="Roles"
          changeSelectedState={changeSelectedState}
          className="single-dropdown"
          category="jobRoles"
        />
        <Details
          options={noOfEmployees}
          onChange={(item) => {
            //console.log(item);
            setSelectedRole(item);
          }}
          selectedKey={selectedrole}
          placeholder="No Of Employees"
          changeSelectedState={changeSelectedState}
          className="single-dropdown"
          category="noOfEmployees"
        />
        <Details
          options={Experience}
          onChange={(item) => {
            //console.log(item);
            setSelectedRole(item);
          }}
          selectedKey={selectedrole}
          placeholder="Experience"
          changeSelectedState={changeSelectedState}
          className="single-dropdown"
          category="Experience"
        />
        <Details
          options={jobLocation}
          onChange={(item) => {
            //console.log(item);
            setSelectedRole(item);
          }}
          selectedKey={selectedrole}
          placeholder="Location"
          changeSelectedState={changeSelectedState}
          className="single-dropdown"
          category="jobLocation"
        />
        <Details
          options={techStack}
          onChange={(item) => {
            //console.log(item);
            setSelectedRole(item);
          }}
          selectedKey={selectedrole}
          placeholder="Tech Stack"
          changeSelectedState={changeSelectedState}
          className="single-dropdown"
          category="techStack"
        />
      </div>
      <InfiniteScroll
        dataLength={filteredJobs.length} //This is important field to render the next data
        next={fetchmoredata}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        className="alljobs"
      >
        <div className="onejobsection">
          {filteredJobs &&
            filteredJobs.length > 0 &&
            filteredJobs.map((job) => {
              console.log(job);
              return (
                <div key={job.jdUid} className="jobcontainer">
                  <div className="jobdetailstop">
                    <img src={job.logoUrl} alt="" className="companylogo" />
                    <div className="companyhead">
                      <p>{job.companyName}</p>
                      <p>Job Role: {job.jobRole}</p>
                    </div>
                  </div>
                  <div className="jobdescription">
                    {job.jobDetailsFromCompany}
                  </div>
                  <div>Minimum Experience: {job.minExp?job.minExp:"0"}</div>
                  <div className="applycontainer">
                  <button onClick={()=>{
                    window.open(`${job.jdLink
                    }`,'_blank');
                  }}>Go to Google</button>
                  </div>
                </div>
              );
            })}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default App;
