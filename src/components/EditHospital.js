import React, { useState } from "react";
import HospitalService from "../services/HospitalService";

const showModalEdit = () => {
    const modal_container = document.querySelector('.modal--edit');
    console.log("open")
    modal_container.classList.add('show');
  };
  
  const closeModalEdit = (event) => {
    event.preventDefault();  
    const modal_container = document.querySelector('.modal--edit');
    console.log("close")
    modal_container.classList.remove('show');
  };

const EditHospital = () => {
    return (
        <>
        <button className="btn btn--primary"  onClick={()=>showModalEdit()}>Edit</button>
        <div className="modal modal--edit">
            <div className="modal__container">
                <div className="header">
                    Edit hospital
                </div>
                
                <div className="body">
                    <form className="form">
                        <div className="form-group">
                          <label>Id</label>
                          <input type="text"></input>
                        </div>
                        <div className="form-group">
                          <label>Name</label>
                          <input type="text"></input>
                        </div>
                        <div className="form-group">
                          <label>Address</label>
                          <input type="text"></input>
                        </div>
                        <div className="form-group">
                          <label>Fundation</label>
                          <input type="text"></input>
                        </div>
                        <div className="form-buttons">
                          <button className="btn btn--success" >Save</button>
                          <button className="btn btn--danger" onClick={(e)=>closeModalEdit(e)}> Cancel</button>
                        </div>
                    </form>
                </div> {/* end body*/ }
                
            </div>{/* end modal__container*/ }
        </div>
        </>
    )
}

export default EditHospital;