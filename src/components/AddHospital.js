import React, { useState } from "react";
import HospitalService from "../services/HospitalService";
import EditHospital from "./EditHospital";



const AddHospital = (props) => {
      console.log(props);
      const initialHospitalState = props.initialHospitalState;
      const showHospitalModal = props.showHospitalModal;
      const setShowHospitalModal = props.setShowHospitalModal;
      const editModeModal = props.editModeModal;
      const setEditModeModal = props.setEditModeModal;
      const hospital = props.hospital;
      const setHospital = props.setHospital;
      const refreshHospitalList = props.refreshHospitalList;
      
      const [submitted, setSubmitted] = useState(false);
    
      const handleInputChange = event => {
          
        const { name, value } = event.target;
        setHospital({ ...hospital, [name]: value });
      };
    
      const saveHospital = () => {
        var data =  {
            name: hospital.name,
            address: hospital.address,
            createdAt: "12/07/2020"
          };
          
          if(editModeModal){
              console.log("save edited hospital")
              saveEditedHospital(data);
          }else{
              console.log("save created hospital")
              saveCreatedHospital(data);
          }
          
      };

      const saveCreatedHospital = (data)=>{
        HospitalService.create(data)
          .then(response => {
            setSubmitted(true);
            console.log(response);
            setShowHospitalModal("");
            refreshHospitalList();
          })
          .catch(e => {
            console.log(e);
          });
      }

      const saveEditedHospital = (data)=>{
        console.log(hospital)
        HospitalService.update(hospital.id, data)
          .then(response => {
            setSubmitted(true);
            console.log(response);
            setShowHospitalModal("");
            refreshHospitalList();
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      const newHospital = () => {
        setHospital(initialHospitalState);
        setSubmitted(false);
        setShowHospitalModal("show");
        setEditModeModal(false);
      };
    


    return (
        <>

        <button className="btn btn--success" onClick={newHospital}>Create</button>
        {submitted? <div className="msg msg--success">Correctly Saved</div>: null }
        <div className={"modal modal--create " + showHospitalModal}>
        <div className="modal__container">
            <div className="header">
                { editModeModal?"edit mode":"create mode"}
            </div>
            
            <div className="body">
                <form className="form">
                    
                    <div className="form-group">
                        <label>Name</label>
                        <input  type="text" 
                                onChange={(e)=>handleInputChange(e)}
                                name="name"
                                value={hospital.name}
                                required
                                >
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" 
                                onChange={(e)=>handleInputChange(e)}
                                name="address"
                                value={hospital.address}
                                required>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Fundation</label>
                        <input type="text" value="12/12/1990" readOnly></input>
                    </div>
                    <div className="form-buttons">
                      <button type="button" className="btn btn--success" onClick={saveHospital}>Save</button>
                      <button type="button" className="btn btn--danger" onClick={(e)=>setShowHospitalModal("")}> Cancel</button>
                    </div>
                </form>
            </div> {/* end body*/ }
            
        </div>{/* end modal__container*/ }
        </div>
        </>
    );
}

export default AddHospital;