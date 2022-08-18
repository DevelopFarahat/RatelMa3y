import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import RoomCSS from "./Sessions.module.css";
import Button from "react-bootstrap/Button";
import ModalCreateSession from "./ModalCreateSession";
import axios from "axios";
import UserContext from "../../utils/UserContext";
import {IoEnter} from 'react-icons/io5'
import { useNavigate, Link } from "react-router-dom";


function Sessions() {
  const [modalShow, setModalShow] = useState(false);
  const [sessions, setsessions] = useState([]);
  const {user,setUser} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
console.log('userTO',user)
//TODO: make it specific for the user sessions only
    axios
      .get(
        "http://localhost:5000/api/sessions"
      )
      .then((res) => setsessions(res.data.reverse()))
      .catch((err) => console.error(err))
  }, []);

  function joinTheRoom(session){
    console.log('room',session.room_id)
    navigate('sessions/room/'+session.room_id)
  }

  function dateFormat() {
    let options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString([], options);
  }

  return (
    <>
      <ModalCreateSession
        show={modalShow}
        user={user}
        onHide={() => setModalShow(false)}
        setsessions={setsessions}
        sessions={sessions}
      />
      <div className="container">
        {user.role == 'instructor' &&
        <Button variant="success" className="my-4" onClick={() => setModalShow(true)}>
          Create New Session +
        </Button>
        }
        {sessions?.map((session) => (
          <Card className={RoomCSS.card} key={session._id}>
            <Card.Header className="text-center">
              {session.is_live ? `Room is running` : "Room ended"}
            </Card.Header>
            <Card.Body>
              <h6>Created by: <span style={{fontWeight: 300}}>{session.created_by.name}</span></h6>
              {/* <h6>Members: <span style={{fontWeight: 300}}>{session.members}</span></h6> */}
              {/* <h6>Evaluations: </h6> */}
              <h6>Ended at: <span style={{fontWeight: 300}}>{session?.ended_at?.replace('T'," ").slice(0,-8)}</span></h6>
              
              <Accordion defaultActiveKey="1">
                <Accordion.Item className={RoomCSS.AccordionItem} eventKey="0">
                  <Accordion.Header className="RoomAccordionHeader">
                    More about
                  </Accordion.Header>
                  <Accordion.Body></Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
            <Card.Footer className="text-muted" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <p>{session.created_at.replace('T'," ").slice(0,-8)}</p>

              {session.is_live &&
              <Link to="/sessions/room" state={{ session: session }}>
              <Button variant="success">
                Join
              <IoEnter /></Button>
              </Link>
              }
            </Card.Footer>
          </Card>
        ))}

        {/* <Card className={RoomCSS.card}>
          <Card.Header className="text-center">Today Room</Card.Header>
          <Card.Body>
            <Accordion defaultActiveKey="1">
              <Accordion.Item className={RoomCSS.AccordionItem} eventKey="0">
                <Accordion.Header className="RoomAccordionHeader">
                  Comments
                </Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
          <Card.Footer className="text-muted">{dateFormat()}</Card.Footer>
        </Card> */}
      </div>
    </>
  );
}
export default Sessions;
