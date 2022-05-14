import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
    let navigate=useNavigate();
    const [form, setForm] = useState(0);
    const [credential, setCredential] = useState({ studentEnrollNo: "",studentPassword:"",facultyID:"",facultyPassword:"",adminUsername:"",adminPassword:"" });

    const changeCred = (e) => {
        
        setCredential({...credential,[e.target.id]:e.target.value})
    }

    const studentSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/loginstudent',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "enrollNo":credential.studentEnrollNo,
                "password":credential.studentPassword
            })
        });

        const json = await response.json();
        if(!json.success){toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });}
        else{
            toast.success("Logged In Successfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });  
            localStorage.setItem('auth_token', json.authToken);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }

    const facultySubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/loginfaculty',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "facultyID":credential.facultyID,
                "password":credential.facultyPassword
            })
        });

        const json = await response.json();
        if(!json.success){toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });}
        else{
            toast.success("Logged In Successfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });  
            localStorage.setItem('auth_token', json.authToken);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }

    const adminSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/loginadmin',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username":credential.adminUsername,
                "password":credential.adminPassword
            })
        });

        const json = await response.json();
        if(!json.success){toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });}
        else{
            toast.success("Logged In Successfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });  
            localStorage.setItem('auth_token', json.authToken);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }

    return (
        <div>            
            
            {/* Buttons for selecting Loginforms */}
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap justify-center">
                    <div className="xl:w-1/4 md:w-1/2 p-4">
                        <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" onClick={() => { setForm(0) }}>Login as Student</button>
                    </div>
                    <div className="xl:w-1/4 md:w-1/2 p-4">
                        <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" onClick={() => { setForm(1) }}>Login as Faculty</button>
                    </div>
                    <div className="xl:w-1/4 md:w-1/2 p-4">
                        <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" onClick={() => { setForm(2) }}>Login as Admin</button>
                    </div>
                </div>
            </div>


            {/* // Student Login page */}
            <div hidden={form === 0 ? false : true}>

                <div className="lg:w-2/6 lg:m-auto md:w-1/2 md:m-auto bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Log In</h2>
                    {/* //Enroll No */}
                    <div className="relative mb-4">
                        <label htmlFor="enrollNo" className="leading-7 text-sm text-gray-600">Enrollment Number</label>
                        <input onChange={changeCred} type="text" value={credential.studentEnrollNo} id="studentEnrollNo" name="enrollNo" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    {/* //password */}
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input onChange={changeCred} type="password" id="studentPassword" value={credential.studentPassword} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <button onClick={studentSubmit} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Log In</button>
                </div>
            </div>

            {/* //Faculty login form */}
            <div hidden={form === 1 ? false : true}>
                <div className="lg:w-2/6 lg:m-auto md:w-1/2 md:m-auto bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Log In</h2>

                    {/* //fauclty ID */}
                    <div className="relative mb-4">
                        <label htmlFor="Faculty ID" className="leading-7 text-sm text-gray-600">Faculty ID</label>
                        <input onChange={changeCred} value={credential.facultyID} type="text"  id="facultyID" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    {/* //Password */}
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input onChange={changeCred} value={credential.facultyPassword} type="password" id="facultyPassword" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <button onClick={facultySubmit} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Log In</button>
                </div>
            </div>

            
            {/* //Admin Login Form */}
            <div hidden={form === 2 ? false : true}>
                <div className="lg:w-2/6 lg:m-auto md:w-1/2 md:m-auto bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Log In</h2>
                    {/* //username */}
                    <div className="relative mb-4">
                        <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
                        <input onChange={changeCred} value={credential.adminUsername} type="text" id="adminUsername" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    {/* //password */}
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input onChange={changeCred} value={credential.adminPassword} type="password" id="adminPassword" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <button onClick={adminSubmit} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Log In</button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default LoginForm
