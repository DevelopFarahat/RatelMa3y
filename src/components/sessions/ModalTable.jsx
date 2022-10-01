import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IoCloseSharp } from "react-icons/io5";
import { SiGooglesheets } from "react-icons/si";
import { VscDebugStart } from "react-icons/vsc";
import ReactDOM from "react-dom";

export default function ModalTable({ user, show, onHide }) {
  const { t } = useTranslation();
  const [sessionsData, setSessionsData] = useState([]);

  useEffect(() => {
    //Check if he is an inspector or admin {Add a row for instructor name if it's an admin or supervisor}

    if (["Supervisor", "Admin"].includes(user?.privileges))
      console.log("admin");

    setSessionsData(
      user.students.map((u) => ({
        prefs: u.program_prefs,
        name: u.name,
        instructor: u.instructor,
      }))
    );
  }, []);

  // function fetchSessions() {
  //   let sessions_url =
  //     "${process.env.REACT_APP_BACK_HOST_URL}/api/sessions" +
  //     (["Admin", "Supervisor"].includes(user.privileges)
  //       ? ""
  //       : "?userId=" + user._id);

  //   axios
  //     .get(sessions_url)
  //     .then((res) => {
  //       props.setSessions(res.data.data);
  //       console.log("fetched", res.data.data);
  //     })
  //     .catch((err) => console.error(err));
  // }
  // CustomTable({ user });

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span>
          <IoCloseSharp
            onClick={onHide}
            size={28}
            color="grey"
            cursor={"pointer"}
          />
          {user?.plan_doc && (
            <Button
              vatiant="success"
              className={"btn-success"}
              style={{ marginLeft: 8 }}
            >
              <SiGooglesheets size={24} />
            </Button>
          )}
        </span>

        <Modal.Title id="contained-modal-title-vcenter">
          {t("sessions_table")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          direction: "rtl",
          maxHeight: "70%",
          overflow: "scroll",
        }}
      >
        <CustomTable user={user} t={t} />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const styles = {
  gridStyle: {
    display: "grid",
    gridTemplateColumns: "auto auto 1fr",
    gap: 2,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  dayStyle: {
    backgroundColor: "#198754",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    writingMode: "vertical-rl",
    transform: "translateX(16px)",
    height: "100%",
    width: "100%",
    fontWeight: "700",
  },
  hourStyle: {
    backgroundColor: "#20aa69",
    height: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: "8px",
    fontSize: "14px",
  },
  cellStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(245, 241, 241)",
    height: "100%",
    whiteSpace: "pre-line",
  },
};

const CustomTable = ({ user, t }) => {
  //GET THE DATA
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

  const timesC = [
    "8:00 AM",
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
    "8:00 PM",
    "10:00 PM",
  ];

  //FORMaT IT
  useEffect(() => {
    let date = new Date();
    let c = getTimeNowFormatted(date);
    let divGrid = document.getElementById("host");
    Object.assign(divGrid.style, styles.gridStyle);

    for (const [key, value] of Object.entries(user?.busy)) {
      //Day
      let i = 0;
      let j = 0;
      let pDay = document.createElement("p");
      pDay.innerText = days[Number.parseInt(key)];
      Object.assign(pDay.style, styles.dayStyle);

      let alreadyAddedDay = false;

      for (const [key2, value2] of Object.entries(value)) {
        //Hour
        if (value2.max == undefined) continue;
        let alreadyAddedHour = false;

        let pHour = document.createElement("p");

        i++;
        j = 0;

        //Get the name of students from recorded data
        let students = user.students.filter((s) =>
          value2.stdIds.includes(s._id)
        );
        
        let names = "";
        for (let student of students) {
          console.log(student.name);
          names += `${names !== "" ? "\n" : ""}${student.name}`;
          j++;
        }

        let pStudent = document.createElement("p");
        pStudent.innerHTML = names;

        if (!alreadyAddedDay) {
          divGrid?.appendChild(pDay);
          alreadyAddedDay = true;
        }

        pHour.style.gridRow = `span ${j}`;
        pHour.innerHTML = times[Number.parseInt(key2)];
        if (t("us") === "Us") pHour.style.direction = "ltr";

        Object.assign(pHour.style, styles.hourStyle);
        if (!alreadyAddedHour) {
          divGrid.appendChild(pHour);
          alreadyAddedHour = true;
        }

        if (
          timesC[Number.parseInt(key2)] === c &&
          Number.parseInt(key) == date.getDay() + 1
        )
          pHour.style.backgroundColor = "#f9c324";

        Object.assign(pStudent.style, styles.cellStyle);
        divGrid.appendChild(pStudent);
      }

      pDay.style.gridRow = `span ${i * j}`;

      if (Number.parseInt(key) == date.getDay() + 1)
        pDay.style.backgroundColor = "#ffc107";
    }
  }, []);

  //==========================================

  //TODO: show instructors names as well if admin or supervisor is watching table

  return <div id="host" style={styles.gridStyle}></div>;
};

function getTimeNowFormatted(date) {
  let time = date.toLocaleString("default", {
    minute: "numeric",
    hour: "numeric",
  });
  let arr = time.split(":");
  let s = arr[0];
  let t = arr[1].split(" ")[1];
  let n = Number.parseInt(s);
  if (n % 2 === 1) n = n + 1;
  return `${n}:00 ${t}`;
}

//day grid with var span down
//hours with var span down
//names with fraction
//Admin can't start the session
