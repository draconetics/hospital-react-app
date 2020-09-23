import React , { useState, useEffect } from "react";
import HospitalService from "./services/HospitalService";
import AddHospital from "./components/AddHospital"

import './App.css';





function App() {

  const initialHospitalState = {
    id:0,
    name: "",
    address: "",
    createdAt: new Date()
  };

  const [hospital, setHospital] = useState(initialHospitalState);
  const [showHospitalModal, setShowHospitalModal] = useState("");
  const [editModeModal, setEditModeModal] = useState(false);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    retrieveHospitals();
  }, []);

  const retrieveHospitals = () => {
    HospitalService.getAll()
      .then(response => {
        setHospitals(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshHospitalList = ()=>{
      retrieveHospitals();
      setHospital(initialHospitalState);
  }

  const editHospital = (editHospital)=>{
      setHospital({ ...editHospital});
      setShowHospitalModal("show");
      setEditModeModal(true);
  }

  const deleteHospital = (id)=>{
      HospitalService.delete(id)
      .then(response => {
        console.log(response);
        refreshHospitalList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  
  return (
    <div className="App">
      
      <div className="container">
        <AddHospital 
            initialHospitalState={initialHospitalState} 
            hospital={hospital} 
            setHospital={setHospital}
            showHospitalModal={showHospitalModal}
            setShowHospitalModal={setShowHospitalModal} 
            editModeModal={editModeModal}
            setEditModeModal={setEditModeModal}
            refreshHospitalList={refreshHospitalList}
            >

        </AddHospital>
        <table className="hospital-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>FUNDATION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            
            
              { hospitals && hospitals.map((hosp, index)=>(
                  <tr key={index}>
                    <td>{hosp.id}</td>
                    <td>{hosp.name}</td>
                    <td>{hosp.address}</td>
                    <td>{hosp.createdAt}</td>
                    <td>
                        <button className="btn btn--danger" onClick={()=>editHospital(hosp)}>Edit</button>
                        <button className="btn btn--danger" onClick={()=>deleteHospital(hosp.id)}>Remove</button>
                    </td>
                  </tr>
                ))
              }
            
          </tbody>
        </table>





      </div>
    </div>
  );
}

export default App;
