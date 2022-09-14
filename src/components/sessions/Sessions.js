import React, { useContext, useEffect, useState,useCallback,useRef } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import RoomCSS from "./Sessions.module.css";
import Button from "react-bootstrap/Button";
import ModalCreateSession from "./ModalCreateSession";
import axios from "axios";
import UserContext from "../../utils/UserContext";
import { IoEnter } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { FaCalendarTimes } from "react-icons/fa";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../utils/error";

function Sessions({ setIsRoomPrepared }) {
  const [modalShow, setModalShow] = useState(false);
  const [sessions, setSessions] = useState([]);
  const { setIsLoading, isLoading } = useContext(UserContext);
  let { user } = useContext(UserContext);
  let page = 1;

  //TODO: still a problem to redirect
  //TODO: Responsive Design

  // const navigate = useNavigate();

  useEffect(() => {
    if (!user) user = JSON.parse(localStorage.getItem("user"));
    if(!user) return

    //Get Sessions for this specific user or get all if admin
    fetchSessions(page);
  }, []);

  function fetchSessions(page) {
    setIsLoading(true);
    let sessions_url =
      `http://localhost:5000/api/sessions?page=${page}` +
      (["Admin", "Supervisor"].includes(user?.privileges)
        ? ""
        : "?userId=" + user._id);

    axios
      .get(sessions_url)
      .then((res) => {
        setSessions(prev => [...new Set([...prev,...res.data.data])]);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }
  
  //To observe last item
  const observer = useRef();
  const lastSessionElementRef = useCallback((node) => {
    if (isLoading) return;

    //TODO: assign it with total sessions count

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("should run now", page);

        fetchSessions(page + 1);
        page = page + 1;
      }
    });
    if (node) observer.current.observe(node);
  }, []);


  function getEvaluation(arr) {
    if (!arr || arr.length === 0)
      return {
        eval_previous: 0,
        eval_current: 0,
        notes: "",
      };

    let evaluation = arr.find((evalu) => evalu.student === user?._id);
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
      .put("http://localhost:5000/api/sessions/" + session?._id, {
        is_live: false,
        room_id: session.room_id,
        ended_at: Date.now(),
      })
      .then(() => {
        fetchSessions();
      })
      .catch((err) => console.error(err.message));
  }

  //======== First: Session Card

  const SessionCard = ({ session, index }) => {
    let notes = "";
    let c_eval = 0;
    let p_eval = 0;

    if (session.evaluations) {
      let obj = session.evaluations.find(
        (evalu) => evalu.student?._id === user?._id
      );
      if (obj) {
        notes = obj.notes;
        c_eval = obj.current_eval;
        p_eval = obj.previously_eval;
      }
    } else console.log("مفيهاش يسطا", session);

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

    let timeEnded = "";
    if (session.ended_at) {
      let dateEnded = new Date(session?.ended_at);
      timeEnded = dateEnded.toLocaleString("default", {
        minute: "numeric",
        hour: "numeric",
      });
    }

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
            <span style={{ fontWeight: 300 }}>{session.created_by?.name?? user?.name}</span>
          </h6>
          {user && user.role === "student" && (
            <>
              <h6>
                Memorizing Evaluation:{" "}
                <span style={{ fontWeight: 300 }}>{p_eval}</span>
              </h6>
              <h6>
                Contribution Evaluation:{" "}
                <span style={{ fontWeight: 300 }}>{c_eval}</span>
              </h6>
            </>
          )}

          {!session.is_live && (
            <div>
              <h6>
                Ended at: 
                <span style={{ fontWeight: 300, marginLeft: 17}}>
                  {timeEnded}
                </span>
              </h6>
              {/* 
        {user.role === "student" && (
          <>
            <h6>
              Memorizing Previous:
              <span style={{ fontWeight: 300 }}>{p_eval}</span>
            </h6>
            <h6>
              Performance in session:
              <span style={{ fontWeight: 300 }}>{c_eval}</span>
            </h6>
            {notes && (
              <h6>
                Notes:
                <span style={{ fontWeight: 300 }}>{notes}</span>
              </h6>
            )}
          </>
        )} */}
            </div>
          )}

          <Accordion defaultActiveKey="1">
            <Accordion.Item className={RoomCSS.AccordionItem} eventKey="0">
              <Accordion.Header className="RoomAccordionHeader">
                More about
              </Accordion.Header>
              <Accordion.Body>
                {user.role === "student" && (
                  <h6>
                    Attended:{" "}
                    <span style={{ fontWeight: 300 }}>
                      {session.attendants?.includes(user._id)
                        ? "true"
                        : "false"}
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
                  Notes:{" "}
                  <span style={{ fontWeight: 300 }}>
                    {notes}
                  </span>
                </h6>
                {/* <h6>
                  Session No.:{" "}
                  <span style={{ fontWeight: 300 }}>
                    {sessions.length - index}
                  </span>
                </h6> */}
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
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <MdDateRange /> {dateClearified}{" "}
            <BiTimeFive style={{ marginLeft: 16 }} /> {time}
          </div>

          {session.is_live && (
            <div>
              {(session.created_by._id === user._id ||
                user.privileges === "Admin") && (
                <Button
                  variant="outline-danger"
                  className="mx-2"
                  onClick={endSession.bind(this, session)}
                >
                  <ImPhoneHangUp className="mx-1" />
                  <span>End</span>
                </Button>
              )}
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
  };

  //======== Second: Page itself

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
        console.log("resetted");
      }}
    >
      <ModalCreateSession
        show={modalShow}
        user={user}
        onHide={() => setModalShow(false)}
        setSessions={setSessions}
        sessions={sessions}
      />

      <div className="container">
        <div className={RoomCSS.card}>
          {user && user.role === "instructor" && (
            <Button
              variant="success"
              className="my-4"
              onClick={() => setModalShow(true)}
            >
              Create New Session +
            </Button>
          )}
        </div>
        {sessions?.length === 0 ? (
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
              textAlign: "center",
              margin: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FaCalendarTimes size="160" color="#198754" />
            <div style={{ marginTop: 16, fontSize: 24 }}>No sessions yet</div>
          </div>
        ) : (
          sessions?.map((session, index) => {
            if(index == sessions?.length -1)
            return <div style={{width: '100%'}} ref={lastSessionElementRef}><SessionCard session={session} index={index} /></div>;
            else return <SessionCard session={session} index={index} />;
          })
        )}
      </div>
    </ErrorBoundary>
  );
}

export default Sessions;
