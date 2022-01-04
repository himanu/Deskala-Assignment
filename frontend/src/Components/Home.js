import DeleteBtn from './Util/DeleteBtn';
import EditBtn from './Util/EditBtn';
import CreateCandidate from './Createcandidate';
import { useEffect, useState } from 'react';
import { deleteReq, getRequest, postRequest, putRequest } from './api';
const Home = ({username='Himanshu'})=> {
    const [hideModal, setHideModal] = useState(true);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState({});
    const [candidates, setCandidates] = useState([]);

    useEffect(()=>{
        getRequest(`http://localhost:4000/candidate/${username}`)
            .then((res)=> res.json())
            .then((res)=>{
                if(res.error) {
                    console.log("Error occured on server")
                } else {
                    setCandidates(res.candidates);
                }
                setLoading(false);
            }).catch((err)=> {
                setLoading(false);
                console.log("Client error ", err);
            })
    },[]);

    useEffect(()=>{
        console.log("Selected user ", selectedUser);
        console.log("candidates ", candidates);
    });
    
    function addNewCandidate(name, address, dob, state, age, pin) {
        if(Object.keys(selectedUser).length === 0) {
            postRequest('http://localhost:4000/candidate', {
                username, name, address, dob, state, age, pin
            })
                .then((res)=> res.json())
                .then((res)=> {
                    if(res.success) {
                        setCandidates((prevValue)=>{
                            return [...prevValue, {name, address, dob, state, age, pin}];
                        })
                    } else if(res.error) {
                        console.log("Not able to add candidate, server error");
                    }
                })
                .catch((err)=>{
                    console.log("Client error ",err);
                })
        } else {
            putRequest('http://localhost:4000/candidate',{
                id: selectedUser.id,
                username, name, address, dob, state, age, pin
            })
                .then((res)=> res.json())
                .then((res)=> {
                    if(res.success) {
                        setCandidates((prevValue)=>{
                            return prevValue.map((candidate)=>{
                                if(candidate.id === selectedUser.id) {
                                    return {
                                        ...selectedUser, name, address, dob, state, age, pin
                                    }
                                } else {
                                    return candidate
                                }
                            })
                        })
                    } else if(res.error) {
                        console.log("Not able to update candidate, server error");
                    }
                })
                .catch((err)=>{
                    console.log("Client error ",err);
                })
        }
    }
    function removeCandidate(id) {
        deleteReq('http://localhost:4000/candidate',{
            id,
            username
        })
            .then((res)=> res.json())
            .then((res)=> {
                if(res.success) {
                    setCandidates((prevValue)=>{
                        return prevValue.filter((candidate)=>candidate.id !== id)
                    })
                } else if(res.error) {
                    console.log("Not able to delete candidate, server error");
                }
            })
            .catch((err)=>{
                console.log("Client error ",err);
            })
    }

    if(loading) {
        return (
            <h1> Loading </h1>
        )
    }
    return(
        <div className="HomeContainer">
            <div>
                Candidate List {candidates.length}
            </div>
            <table className='table'>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Email</th>
                        <th>Result</th>
                    </tr>
                    {candidates.map((candidate, index)=>{
                        return (
                            <tr key={candidate.id}>
                                <td>{index + 1}. {candidate.name}</td>
                                <td> {candidate.dob} </td>
                                <td> {username} </td>
                                <td className='result' style={{display: "flex", justifyContent: "space-between"}}> 
                                    <div className="status">
                                        <select>
                                            <option> Shortlist </option>
                                            <option> Pending </option>
                                        </select>
                                    </div>
                                    <div className="btn">
                                        <EditBtn handleClick={ ()=>{setHideModal(!hideModal); setSelectedUser(candidate)} }/>
                                        <DeleteBtn onDelete={()=>removeCandidate(candidate.id)}/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    {candidates.length === 0 && <tr> <td>Candidate list is empty</td></tr>}
                </tbody>
            </table>
            <div style={{cursor: "pointer", color: "#0dcaf0"}} onClick={()=>{setHideModal(!hideModal); setSelectedUser({})}}> + Add new candidate</div>
            {!hideModal && <CreateCandidate user={selectedUser} onEdit={addNewCandidate} hide={hideModal}  shuffleEditModal={()=> setHideModal(!hideModal)}/>}
        </div>
    )
}
export default Home;