import React from "react";
import InstructorWorkingDatesHoursStyles from "./instructor_working_datesTimes.module.css";
import dateTimeSessionImage from "../../assets/images/dateTimeSessions.png";
const InstructorWorkingDatesHours = ({ selectedInstructorData }) => {
  let workingHoursArr = [
    ["8:00 am", "10:00 pm"],
    ["10:00 am", "12:00 pm"],
    ["12:00 pm", "2:00 pm"],
    ["2:00 pm", "4:00 pm"],
    ["4:00 pm", "6:00 pm"],
    ["6:00 pm", "8:00 pm"],
    ["8:00 pm", "10:00 pm"],
    ["10:00 pm", "12:00 am"],
  ];
  let days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return (
    <>
      <div className={InstructorWorkingDatesHoursStyles["working-days"]}>
        <div className={InstructorWorkingDatesHoursStyles["table-wrapper"]}>
          <table
            className={
              InstructorWorkingDatesHoursStyles[
                "instructor-working-date-time-table"
              ]
            }
          >
            <thead>
              <tr>
                {days.map((wDays,index) => (
                  <th key={index}>{wDays}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {selectedInstructorData.prefs.working_days !== null &&
                selectedInstructorData.prefs.working_days !== undefined
                  ? selectedInstructorData.prefs.working_days.map(
                      (sessionDay, index) => (
                        <td key={index}>
                          {sessionDay === index ? (
                            <img
                            className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']}
                              src={dateTimeSessionImage}
                              alt="correctDateTimeSession"
                            />
                          ) : (
                            ""
                          )}
                        </td>
                      )
                    )
                  : null}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={InstructorWorkingDatesHoursStyles["working-hours"]}>
        <div className={InstructorWorkingDatesHoursStyles["table-wrapper"]}>
          <table
            className={
              InstructorWorkingDatesHoursStyles[
                "instructor-working-date-time-table"
              ]
            }
          >
            <thead>
              <tr>
                <th> 8:00 am : 10:00 pm</th>
                <th> 10:00 am : 12:00 pm</th>
                <th> 12:00 pm : 2:00 pm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              {selectedInstructorData.prefs.working_hours[0][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              {selectedInstructorData.prefs.working_hours[1][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              {selectedInstructorData.prefs.working_hours[2][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>2:00 pm : 4:00 pm</td>
                <td>4:00 pm : 6:00 pm</td>
                <td>6:00 pm :  8:00 pm</td>
              </tr>
              <tr>
              {selectedInstructorData.prefs.working_hours[3][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              {selectedInstructorData.prefs.working_hours[4][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              {selectedInstructorData.prefs.working_hours[5][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>8:00 pm : 10:00 pm</td>
                <td>10:00 pm : 12:00 am</td>
              </tr>
              <tr>
              {selectedInstructorData.prefs.working_hours[6][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              {selectedInstructorData.prefs.working_hours[7][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default InstructorWorkingDatesHours;
