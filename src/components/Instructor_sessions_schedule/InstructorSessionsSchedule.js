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
      const SessionsTimes = [
         "8:00",
        "10:00",
        "12:00",
        "2:00",
        "4:00",
        "6:00",
        "8:00",
        "10:00",
    ]
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
                         let sessionStartTime = `${SessionsTimes[hourIndex]}:00`;
                         let sessionStartTimeParts = sessionStartTime.split(/:/);
                         let startTimeMillis = (parseInt(sessionStartTimeParts[0], 10) * 60 * 60 * 1000) +
                         (parseInt(sessionStartTimeParts[1], 10) * 60 * 1000) + 
                         (parseInt(sessionStartTimeParts[2], 10) * 1000);
                         let timePeriod = "01:59:59"; 
                         let dateNow = new Date();
  
                         let parts = timePeriod.split(/:/);
                         let timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                                                (parseInt(parts[1], 10) * 60 * 1000) + 
                                                (parseInt(parts[2], 10) * 1000);
                         let sessionEndTimeMillis = dateNow.setTime(startTimeMillis +timePeriodMillis );
    
                         let timeMillis = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000;
                         if(new Date().getDay()+1 === Number(key)){
                            if( timeMillis >= startTimeMillis && timeMillis < sessionEndTimeMillis){
                                scheduleDayDetails['sessionTime'] = true;
                             }
                            
                         }
                       
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
           <section className={InstructorSessionsScheduleStyles['sessions-schedule-main']} style={{direction:t("us")=== t("Us")?'ltr':'rtl'}}>
            {scheduleDate !== undefined || scheduleDate.length !== 0?scheduleDate.map((sch,index)=>(
             <section key={index}>
                <div className={InstructorSessionsScheduleStyles['days-times']}>
                <span style={{background:Number(sch.day) === new Date().getDay()+1?'rgb(255, 193, 7)':'rgb(25, 135, 84)'}}>{days[sch.day]}</span>
                <div>
                {sch.hours_stu.map((h_stu)=>(
                    <>
                    <div>
                    <span key={h_stu.hourIndex} className={InstructorSessionsScheduleStyles['session-time']} style={{background:h_stu.sessionTime !== undefined && h_stu.sessionTime?'rgb(255, 193, 7)':'rgb(25, 135, 84)'}}>{times[h_stu.hourIndex]}</span>
                    <section className={InstructorSessionsScheduleStyles['sessions-members']}>
                    <div>
                        <span className={InstructorSessionsScheduleStyles['session-student-members']}>{h_stu.students.map((st)=>(
                            <><span key={st._id} >{st.name}</span></>
                        ))}</span>
                      </div>
                      </section></div></>
                ))}
                </div>
                </div>

            </section>
            )):<img src={EmptyDataImage} className={InstructorSessionsScheduleStyles['empty-data-img']} alt="Empty" />}
                 
        </section>
        </>
    )
 }
 export default InstructorSessionsSchedule;