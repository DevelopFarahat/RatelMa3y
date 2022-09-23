import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IoCloseSharp } from "react-icons/io5";
import { SiGooglesheets } from "react-icons/si";

export default function ModalTable({ user, show, onHide }) {

  const { t } = useTranslation();
  const [sessionsData, setSessionsData] = useState([]);

    useEffect(() => {
        //Check if he is an inspector or admin {Add a row for instructor name if it's an admin or supervisor}
        
        if(['Supervisor','Admin'].includes(user?.privileges)) console.log('csa')
        
        
        setSessionsData(user.students.map((u)=> ({prefs: u.program_prefs,name: u.name, instructor: u.instructor})))
        console.log('after change ',user?.students)
        console.log('our result',sessionsData)

    }, []);
    

  // function fetchSessions() {
  //   let sessions_url =
  //     "http://localhost:5000/api/sessions" +
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

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{ display: "flex", justifyContent: "space-between"}}
      >
        <span>
          <IoCloseSharp
            onClick={onHide}
            size={28}
            color="grey"
            cursor={"pointer"}
          />
          <Button
            vatiant="success"
            className={"btn-success"}
            style={{ marginLeft: 8 }}
          >
            <SiGooglesheets size={24} />
          </Button>
        </span>

        <Modal.Title id="contained-modal-title-vcenter">
          {t("sessions_table")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          direction: t("us") !== "Us" ? "rtl" : "ltr",
          maxHeight: "70%",
          overflow: "scroll",
        }}
      >
        <CustomTable />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const CustomTable = () => {
    var span = 2;
    //TODO: show instructors names as well if admin or supervisor is watching table
    return (
  <div
    style={{ display: "grid", gridTemplateColumns: "15% 15% 1fr 15%", gap: 8 , textAlign: 'center', alignItems: 'center'}}
  >
    <p style={{ gridRow: "span 4" }}>Day 1</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 1</p>
    <p>Student 1</p>
    <p>Button 1</p>
    <p>Student 2</p>
    <p>Button 2</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 2</p>
    <p>Student 3</p>
    <p>Button 3</p>
    <p>Student 4</p>
    <p>Button 4</p>

    {/* =============================== */}
    <p style={{ gridRow: "span 4" }}>Day 1</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 1</p>
    <p>Student 1</p>
    <p>Button 1</p>
    <p>Student 2</p>
    <p>Button 2</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 2</p>
    <p>Student 3</p>
    <p>Button 3</p>
    <p>Student 4</p>
    <p>Button 4</p>

    {/* =============================== */}
    <p style={{ gridRow: "span 4" }}>Day 1</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 1</p>
    <p>Student 1</p>
    <p>Button 1</p>
    <p>Student 2</p>
    <p>Button 2</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 2</p>
    <p>Student 3</p>
    <p>Button 3</p>
    <p>Student 4</p>
    <p>Button 4</p>

    {/* =============================== */}
    <p style={{ gridRow: "span 4" }}>Day 1</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 1</p>
    <p>Student 1</p>
    <p>Button 1</p>
    <p>Student 2</p>
    <p>Button 2</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 2</p>
    <p>Student 3</p>
    <p>Button 3</p>
    <p>Student 4</p>
    <p>Button 4</p>

    {/* =============================== */}
    <p style={{ gridRow: "span 4" }}>Day 1</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 1</p>
    <p>Student 1</p>
    <p>Button 1</p>
    <p>Student 2</p>
    <p>Button 2</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 2</p>
    <p>Student 3</p>
    <p>Button 3</p>
    <p>Student 4</p>
    <p>Button 4</p>

    {/* =============================== */}
    <p style={{ gridRow: "span 4" }}>Day 1</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 1</p>
    <p>Student 1</p>
    <p>Button 1</p>
    <p>Student 2</p>
    <p>Button 2</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 2</p>
    <p>Student 3</p>
    <p>Button 3</p>
    <p>Student 4</p>
    <p>Button 4</p>

    {/* =============================== */}
    <p style={{ gridRow: "span 4" }}>Day 1</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 1</p>
    <p>Student 1</p>
    <p>Button 1</p>
    <p>Student 2</p>
    <p>Button 2</p>
    <p style={{ gridRow: `span ${span}` }}>Hour 2</p>
    <p>Student 3</p>
    <p>Button 3</p>
    <p>Student 4</p>
    <p>Button 4</p>

    {/* =============================== */}


  </div>
);}

//day grid with var span down
//hours with var span down
//names with fraction
