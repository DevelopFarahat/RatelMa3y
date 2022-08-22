import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import RoomCSS from "./Sessions.module.css";
import Button from "react-bootstrap/Button";
import ModalCreateSession from "./ModalCreateSession";
import axios from "axios";
import UserContext from "../../utils/UserContext";
import { IoEnter } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { BsRecordCircleFill, BsCircleFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { FaCalendarTimes } from 'react-icons/fa'

function Sessions({ setIsRoomPrepared, setShowSidebar,setHideMain }) {
  const [modalShow, setModalShow] = useState(false);
  const [sessions, setsessions] = useState([]);
  //TODO: still a problem to redirect
  //TODO: Responsive Design

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) user = JSON.parse(localStorage.getItem('user'));

    //Get Sessions for this specific user or get all if admin

    fetchSessions()
  }, []);


function fetchSessions(){
  
  let sessions_url =
  "http://localhost:5000/api/sessions" +
  (["Admin", "Supervisor"].includes(user.privileges)
    ? ""
    : "?userId=" + user._id);

axios
  .get(sessions_url)
  .then((res) => setsessions(res.data.reverse()))
  .catch((err) => console.error(err));
}

  console.log("user is ", user);

  function getEvaluation(arr) {
    if (!arr || arr.length == 0)
      return {
        eval_previous: 0,
        eval_current: 0,
        notes: "",
      };

    let evaluation = arr.find((evalu) => evalu.student == user._id);
    if (!evaluation)
      return {
        eval_previous: 0,
        eval_current: 0,
        notes: "",
      };

    return {
      eval_previous: evaluation.previously_eval,
      eval_current: evaluation.current_eval,
      notes: evaluation.notes,
    };
  }

  function endSession(session) {
    axios
      .put("http://localhost:5000/api/sessions/" + session._id, {
        is_live: false,
        ended_at: Date.now(),
      })
      .then((res) => {
        fetchSessions()
        //Then delete room in the third party
        axios
          .delete("https://api.daily.co/v1/rooms/"+session.room_id)
          .then((ress) => console.log(ress.status))
          .catch((err) => console.error(err.message));
      })
      .catch((err) => console.error(err.message));
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
        {(user) && user.role == "instructor" && (
          <Button
            variant="success"
            className="my-4"
            onClick={() => setModalShow(true)}
          >
            Create New Session +
          </Button>
        )}
        {sessions?.length == 0 ? (
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: 'center',
              
              margin: 24,
            }}
          >
            <FaCalendarTimes size="160" color="#198754"/>
            <div style={{marginTop: 16, fontSize: 24}}>No sessions yet</div>
          </div>
        ) : (
          sessions?.map((session, index) => {
            let { notes, eval_current, eval_previous } = getEvaluation(
              session.evaluations
            );
            let date = new Date(session.created_at);
            let dateClearified = date.toLocaleString("default", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            let time = date.toLocaleString("default", {
              minute: "numeric",
              hour: "numeric",
            });
            return (
              <Card className={RoomCSS.card} key={session._id}>
                <Card.Header className="text-center">
                  {session.is_live ? (
                    <span
                      style={{
                        color: "#198754",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      <BsCircleFill color="#198754" size={10} /> Live Session
                    </span>
                  ) : (
                    "Session ended"
                  )}
                </Card.Header>
                <Card.Body>
                  <h6>
                    Created by:{" "}
                    <span style={{ fontWeight: 300 }}>
                      {session.created_by.name}
                    </span>
                  </h6>
                  {!session.is_live && (
                    <div>
                      <h6>
                        Ended at:{" "}
                        <span style={{ fontWeight: 300 }}>
                          {session?.ended_at?.replace("T", " ").slice(0, -8)}
                        </span>
                      </h6>

                      {user.role == "student" && (
                        <>
                          <h6>
                            Memorizing Previous:
                            <span style={{ fontWeight: 300 }}>
                              {eval_previous}
                            </span>
                          </h6>
                          <h6>
                            Performance in session:
                            <span style={{ fontWeight: 300 }}>
                              {eval_current}
                            </span>
                          </h6>
                          {notes && (
                            <h6>
                              Notes:
                              <span style={{ fontWeight: 300 }}>{notes}</span>
                            </h6>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  <Accordion defaultActiveKey="1">
                    <Accordion.Item
                      className={RoomCSS.AccordionItem}
                      eventKey="0"
                    >
                      <Accordion.Header className="RoomAccordionHeader">
                        More about
                      </Accordion.Header>
                      <Accordion.Body>
                        {user.role == "student" && (
                          <h6>
                            Attended:{" "}
                            <span style={{ fontWeight: 300 }}>
                              {session.attendants?.includes(user._id)}
                            </span>
                          </h6>
                        )}
                        <h6>
                          Attendants Count:{" "}
                          <span style={{ fontWeight: 300 }}>
                            {session.attendants?.length}
                          </span>
                        </h6>
                        <h6>
                          Full Participants Count:{" "}
                          <span style={{ fontWeight: 300 }}>
                            {session.members_with_access?.length}
                          </span>
                        </h6>
                        <h6>
                          Session No.:{" "}
                          <span style={{ fontWeight: 300 }}>{index + 1}</span>
                        </h6>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
                <Card.Footer
                  className="text-muted"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <MdDateRange /> {dateClearified}{" "}
                    <BiTimeFive style={{ marginLeft: 16 }} /> {time}
                  </div>

                  {session.is_live && (
                    <div>
                      {/* TODO */}
                      <Button
                        variant="outline-danger"
                        className="mx-2"
                        onClick={endSession.bind(this,session)}
                      >
                        <ImPhoneHangUp className="mx-1" />
                        <span>End</span>
                      </Button>
                      <Link to="/sessions/room" state={{ session: session }}>
                        <Button
                          variant="success"
                          onClick={() => setIsRoomPrepared(true)}
                        >
                        <span>Join</span>                          
                          <IoEnter />
                        </Button>
                      </Link>
                    </div>
                  )}
                </Card.Footer>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}
export default Sessions;
