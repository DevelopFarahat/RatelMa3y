import React, { useEffect, useState } from "react";
import InstructorSessionsScheduleStyles from "./InstructorSessionsSchedule.module.css"
import { useTranslation } from "react-i18next";
import EmptyDataImage from "../../assets/images/empty.png";
 const InstructorSessionsSchedule = ({selectedInstructorData})=>{
    const { t } = useTranslation();
    const [scheduleDate,setScheduleData] = useState([]);
    const days = [
        t("Saturday"),
        t("Sunday"),
        t("Monday"),
        t("Tuesday"),
        t("Wednesday"),
        t("Thursday"),
        t("Friday"),
      ];
      const times = [
        `8:00 ${t("AM")}`,
        `10:00 ${t("AM")}`,
        `12:00 ${t("PM")}`,
        `2:00 ${t("PM")}`,
        `4:00 ${t("PM")}`,
        `6:00 ${t("PM")}`,
        `8:00 ${t("PM")}`,
        `10:00 ${t("PM")}`,
      ];
    useEffect(()=>{
       
        let scheduleDetailsArr = [];
        if(selectedInstructorData !== undefined){

            for(let [key,value] of Object.entries(selectedInstructorData.busy)){
                if(value.length !== 0){
                    let sessionsDayTimesScheduleDetails = {};
                    let SessionsTimesInEachDay = [];
                    for(let hourIndex = 0 ; hourIndex < value.length;hourIndex++){                  
                        if(typeof value[hourIndex]  === 'object' && !Array.isArray( value[hourIndex])){
                         let students =   selectedInstructorData.students.filter((std)=>value[hourIndex]['stdIds'].includes(std._id));
                         let scheduleDayDetails = {};
                         scheduleDayDetails['hourIndex'] = hourIndex;
                         scheduleDayDetails['students'] = students;
                         SessionsTimesInEachDay.push(scheduleDayDetails);
                        }
                    }
                    sessionsDayTimesScheduleDetails['day'] = key
                    sessionsDayTimesScheduleDetails['hours_stu'] = SessionsTimesInEachDay;
                    scheduleDetailsArr.push(sessionsDayTimesScheduleDetails);
                }
            }
            setScheduleData(scheduleDetailsArr);
        }
    },[selectedInstructorData])
    console.log(scheduleDate)
    return(
        <>
           <section className={InstructorSessionsScheduleStyles['sessions-schedule-main']}>
            {scheduleDate !== undefined || scheduleDate.length !== 0?scheduleDate.map((sch,index)=>(
             <section key={index}>
                <span style={{background:Number(sch.day) === new Date().getDay()+1?'rgb(255, 193, 7)':'rgb(25, 135, 84)'}}>{days[sch.day]}</span>
                {sch.hours_stu.map((h_stu)=>(
                    <>
                    <span key={Math.floor(Math.random()*1000000000000000)} className={InstructorSessionsScheduleStyles['session-time']}>{times[h_stu.hourIndex]}</span>
                    <span className={InstructorSessionsScheduleStyles['session-student-members']}>{h_stu.students.map((st)=>(
                        <span key={st._id} >{st.name}</span>
                    ))}</span>
                    </>
                ))}
                        </section>
            )):<img src={EmptyDataImage} className={InstructorSessionsScheduleStyles['empty-data-img']} alt="Empty" />}
                 
        </section>
        </>
    )
 }
 export default InstructorSessionsSchedule;