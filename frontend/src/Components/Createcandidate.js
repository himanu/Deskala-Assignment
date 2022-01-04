import { useEffect, useState } from "react";
import "./CreateCandidate.css";

const EditModal = ({ user, onEdit, hide, shuffleEditModal }) => {
  const [name, setName] = useState(user.name?user.name:'');
  const [address, setAddress] = useState(user.address?user.address:'');
  const [dob, setDob] = useState(user.dob?user.dob:'');
  const [state, setState] = useState(user.state?user.state:'');
  const [age, setAge] = useState(user.age?user.age:'');
  const [pin, setPin] = useState(user.pin?user.pin:'');
  useEffect(()=>{
    // setName(user.name);
    // setAddress(user.address);
    // setDob(user.dob);
    // setAge(user.age);
    // setPin(user.pin);
  }, []);
  return (
    <div className={"editModal "+ (!hide?"expandEditModal":"")} onClick={(e)=>{if(e.target === e.currentTarget)shuffleEditModal();}}>
      <div
      className="modalContainer ">
      <div className="modalContainerHeader">
        <div className="modalHeading">Create Candidate</div>
        <div className="closeModal" style={{cursor: "pointer"}} onClick={shuffleEditModal}>
          <i
            aria-label="icon: close">
            <svg
              viewBox="64 64 896 896"
              data-icon="close"
              width="1em"
              height="1em"
              fill="rgba(0,0,0,0.65)"
              aria-hidden="true">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
            </svg>
          </i>
        </div>
      </div>
      <div className="modalContainerBody">
        <div className="nameInput">
          <label className="label" htmlFor="name">Name: </label>
          <input 
            id="name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="addressInput">
          <label className="label" htmlFor="address">address: </label>
          <input 
            id="address"
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="dobInput">
          <label className="label" htmlFor="dob">dob: </label>
          <input 
            id="dob"
            value={dob}
            type="date"
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="stateInput">
          <label className="label" htmlFor="state">state: </label>
          <input 
            id="state"
            value={state}
            type="text"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="ageInput">
          <label className="label" htmlFor="age">age: </label>
          <input 
            id="age"
            value={age}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="pinInput">
          <label className="label" htmlFor="pin">pin: </label>
          <input 
            id="pin"
            value={pin}
            type="text"
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="modalContainerFooter">
        <button className="cancelBtn" onClick={shuffleEditModal}>Cancel</button>
        <button
          className="okBtn"
          onClick={() =>{ 
            onEdit(name, address, dob, state, age, pin); 
            shuffleEditModal()}}>
          Ok
        </button>
      </div>
    </div>
    </div>
  );
};
export default EditModal;
