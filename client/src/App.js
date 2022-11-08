import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3300/");
      setData(res.data);
      console.log(res.data);
    };
    fetchData();
  }, []);
  const refreshDataHandler = async () => {
    const res = await axios.get("http://localhost:3300/");
    setData(res.data);
    console.log(res.data);
  };

  return (
    <React.Fragment>
      <button
        className=" m-5 p-1 rounded bg-[#343434] hover:brightness-125 text-[white]"
        onClick={refreshDataHandler}
      >
        Refresh Data
      </button>
      <div className="flex flex-col items-center">
        {data.map((res) => {
          return (
            <div className="text-[2rem] " key={res.patient_id}>
              {res.name}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default App;
