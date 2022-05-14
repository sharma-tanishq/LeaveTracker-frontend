import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DateCard from './DateCard';


function Dates() {
    let navigate = useNavigate();
    //states
    const [dates, setDates] = useState([]);
    const [facultyID, setFacultyID] = useState("abcd");
    const [facultyNameArray, setFacultyNameArray] = useState([]);
    const [facultyIDArray, setFacultyIDArray] = useState([]);
    const [type, setType] = useState("");


    const currentDate = new Date();
    const dateString = currentDate.toISOString().split("T")[0];
    // const [dateArray,setDateArray]=useState([]);
    let dateArray = [];
    for (let i = 0; i < 14; i++) {
        let tempDate = new Date(currentDate.getTime() + 86400000 * i);
        let present = true;
        let tempDateString = tempDate.toISOString().split("T")[0];
        if(dates){
            if (dates.includes(tempDateString)) { present = false }
        }
        else{
        }
        dateArray.push({ date: tempDate.toISOString().split("T")[0], present: present });
    }
    //api calls
    const deleteLeave = async (propDate) => {
        const response = await fetch("http://localhost:5000/api/leave/deleteleave", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth_token')
            },
            body: JSON.stringify({
                "facultyID": facultyID,
                "date": propDate
            })
        });
        const json = await response.json();
        if (!json.success) { toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        else if (json.success) {
            toast.success("Updated Succesfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });
            setDates(json.dates);
        }
    }
    const addLeave = async (propDate) => {
        const response = await fetch("http://localhost:5000/api/leave/addleave", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth_token')
            },
            body: JSON.stringify({
                "facultyID": facultyID,
                "date": propDate
            })
        });
        const json = await response.json();
        if (!json.success) { toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        else if (json.success) {
            toast.success("Updated Succesfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });
            setDates(json.dates);
        }
    }
    const getLeaves = async () => {
        const response = await fetch("http://localhost:5000/api/leave/getleave", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth_token')
            },
            body: JSON.stringify({
                "facultyID": facultyID
            })
        });

        const json = await response.json();
        if (!json.success) {
            toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });
            setType(json.type);
            setDates(json.dates);
        }
        else {
            setDates(json.dates);
            console.log(json.dates);
            toast.success("Data Updated");
            setType(json.type);
            // const newDates=dates.filter((date)=>{return date.getdate()>=currentDate.getDate()});
            // setDates(newDates);
        }


    }

    const updateDates = () => {

    }

    const getFacultydata=async()=>{
        const response = await fetch("http://localhost:5000/api/leave/getfacultydata", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth_token')
            }
        });
        const json = await response.json();
        if (!json.success) { toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        else if (json.success) {
            setFacultyIDArray(json.facultyIDs);
            setFacultyNameArray(json.facultyNames);
        }
        }


    
    useEffect(() => {
         getLeaves();
        getFacultydata();
    },[facultyID])

    return (
        <div>
            <div className="flex justify-center" >
                <div className="mb-3 xl:w-96" hidden={type==="faculty"?true:false}>
                    <select  onChange={e=>{console.log(e.target.value);setFacultyID(e.target.value);console.log(facultyID)}}  className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding  bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white :border-indigo-500 focus:outline-none" aria-label="Default select example"  >
                        <option selected>Please select Faculty</option>
                        {/* <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                        {
                            facultyIDArray.map((facultyIDe,index)=>{ return <option key={facultyIDe} value={facultyIDe}>{`${facultyNameArray[index]} | ${facultyIDe}`}</option>})
                        }
                    </select>
                </div>
            </div>
            <div className='flex flex-wrap'>
                {
                    dateArray.map((dateItem) => { return <DateCard deleteLeave={deleteLeave} addLeave={addLeave} type={type} key={dateItem.date} present={dateItem.present} date={dateItem.date} /> })
                }
                <ToastContainer />
            </div>
        </div>
    )

}

export default Dates;