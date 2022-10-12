import React from "react";
import InstructorWorkingDatesHoursStyles from "./instructor_working_datesTimes.module.css";
import dateTimeSessionImage from "../../assets/images/dateTimeSessions.png";
import { useTranslation } from "react-i18next";  
const InstructorWorkingDatesHours = ({ selectedInstructorData }) => {
  const [t, i18n] = useTranslation();
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
    t("Saturday"),
    t("Sunday"),
    t("Monday"),
    t("Tuesday"),
    t("Wednesday"),
    t("Thursday"),
    t("Friday"),
  ];

  return (
    <>
      <div className={InstructorWorkingDatesHoursStyles["working-days"]} style={{direction:t("us")=== t("Us")?'ltr':'rtl'}}>
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
      <div className={InstructorWorkingDatesHoursStyles["working-hours"]} style={{direction:t("us")=== t("Us")?'ltr':'rtl'}}>
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
                <th> {`8:00 ${t("AM")}`}</th>
                <th> {`10:00 ${t("AM")}`}</th>
                <th>{`12:00 ${t("PM")}`}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              {selectedInstructorData.prefs.working_hours[0][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              {selectedInstructorData.prefs.working_hours[1][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              {selectedInstructorData.prefs.working_hours[2][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>{`2:00 ${t("PM")}`}</td>
                <td>{`4:00 ${t("PM")}`}</td>
                <td>{`6:00 ${t("PM")}`}</td>
              </tr>
              <tr>
              {selectedInstructorData.prefs.working_hours[3][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              {selectedInstructorData.prefs.working_hours[4][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>}
              {selectedInstructorData.prefs.working_hours[5][1] !== 0?<td><img src={dateTimeSessionImage} className={InstructorWorkingDatesHoursStyles['instructor-working-days-hours-img']} alt="correctDateTimeSession"/></td>:<td>{""}</td>} 
              </tr>
              <tr>
                <td>{`8:00 ${t("PM")}`}</td>
                <td>{`10:00 ${t("PM")}`}</td>
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
