import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DateCard(props) {
    
    //state
    const weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday']
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    const splitDate = props.date.split("-");
    
    const newDate = new Date(splitDate[0], splitDate[1], splitDate[2]);
    
    const day = weekDays[newDate.getDay()];
    const month = months[newDate.getMonth()];
    const date = newDate.getDate();
    let present = "Present"
    if (props.present === false) {present = "On Leave"}
    
    return (
        <div className=' w-1/6  m-1'>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -mx-4 -my-8">
                        <div className="py-8 px-4 lg:w-auto ">
                            <div className="h-full flex items-start ">
                                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{month}</span>
                                    <span className="font-medium text-lg text-gray-800 title-font leading-none">{date}</span>
                                </div>
                                <div className="flex-grow pl-6">
                                    <h2 className={`tracking-widest text-xs title-font font-medium ${props.present === true ? "text-green-500" : "text-red-500"} mb-1`}>{present}</h2>
                                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{day}</h1>
                                    <div  className='flex flex-wrap'>
                                        <h2 hidden={props.type==="student"||""?true:false} onClick={()=>props.deleteLeave(props.date)} style={{ cursor: "pointer" }} className={`tracking-widest text-xs title-font font-medium text-green-500 mx-1`}>Present</h2>
                                        <h2 hidden={props.type==="student"||""?true:false} onClick={()=>props.addLeave(props.date)} style={{ cursor: "pointer" }} className={`tracking-widest text-xs title-font font-medium text-red-500 mx-1`}>On Leave</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default DateCard;
