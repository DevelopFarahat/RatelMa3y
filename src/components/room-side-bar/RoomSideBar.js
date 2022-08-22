import React, { useContext, useRef, useState, useEffect } from "react";
import { Button, Card, Form, Overlay, Image } from "react-bootstrap";
import BookBoard from "../quran_board/BookBoard";
// import "./RoomSide.module.css";
import { GiBookmarklet } from "react-icons/gi";
import { CgFileDocument } from "react-icons/cg";
import { AiTwotoneProfile } from "react-icons/ai";
import { BsFillFileTextFill } from "react-icons/bs";
import UserContext from "../../utils/UserContext";
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import axios from "axios";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export default function RoomSideBar({ hideMain }) {
  const [bookIsShown, showBook] = useState(false);
  const [evalIsShown, showEval] = useState(false);
  const target = useRef(null);
  const target2 = useRef(null);
  const { user } = useContext(UserContext);
  console.log("usrr", user);
  const [students, setStudents] = useState([]);

  //TODO: using just a simple div to animate it once the button get clicked
  //TODO: when scrolling on overlay it gives a glitch
  //TODO: maybe the height of evaluation overlay should be more flexible
  useEffect(() => {
    if (user) {
      if (user.in_session) {
        if (user.in_session.members_with_access) {
          user.in_session.members_with_access.forEach((id) => {
            if (id != user._id) {
              console.log("here", id);
              axios
                .get("http://localhost:5000/api/students/" + id.toString())
                .then((res) =>
                  setStudents(...students, {
                    name: res.data.name,
                    id: res.data._id,
                  })
                )
                .catch((err) => console.error(err));
            }
          });
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (!hideMain) {
      showEval(false);
      showBook(false);
    }
  }, [hideMain]);

  return (
    <>
      <Overlay
        target={target.current}
        show={bookIsShown}
        placement="right"
        style={{ zIndex: 10 }}
      >
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: "absolute",
              backgroundColor: "white",
              boxShadow: "0 0 8px rgb(0 0 0 / 16%)",
              borderRadius: 24,
              margin: 20,
              paddingBottom: 16,
              borderRadius: 3,
              width: "70%",
              ...props.style,
            }}
          >
            <BookBoard />
          </div>
        )}
      </Overlay>

      <Overlay
        target={target.current}
        show={evalIsShown}
        placement="right"
        style={{ zIndex: 10 }}
      >
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: "absolute",
              borderRadius: 24,
              margin: 20,
              flex: 1,
              borderRadius: 3,
              ...props.style,
            }}
          >
            <EvaluationSheet
              students={students}
              session={user.in_session}
              instructorId={user._id}
            />
          </div>
        )}
      </Overlay>

      {user != null && user.role == "instructor" && (
        <div>
          <Card
            className=""
            style={{
              outline: "1px solid #eff3f5",
              alignItems: "start",
              paddingLeft: 8,
              pointerEvents: "auto",
            }}
          >
            <Button
              variant="light"
              ref={target}
              onClick={() => showBook(!bookIsShown)}
              style={{ width: "100%", textAlign: "start" }}
            >
              <GiBookmarklet
                size={24}
                color={"#121a24"}
                style={{ marginRight: 8 }}
              />
              Book
            </Button>
            <Button
              variant="light"
              onClick={() => showEval(!evalIsShown)}
              ref={target2}
              style={{ width: "100%", textAlign: "start" }}
            >
              <BsFillFileTextFill
                size={24}
                color={"#121a24"}
                style={{ marginRight: 8 }}
              />
              Evaluation
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}

//TODO: handle 3-months Oral Exam
//TODO: handle the submit review

const EvaluationSheet = (props) => {
  const [isGeneralExam, setIsGeneralExam] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [submitted, setSubmitted] = useState(false);

  //TODO: not working properly for a reason
  // //if user is already logged in redirect to home
  // useEffect(()=>{
  //   if(!user) navigate('../home')
  // },[])

  const initialValues = {
    current_eval: 10,
    prev_eval: 10,
    notes: "",
    student: "62fff41d4c5f4c0fbd4db40a",
    is_exam: isGeneralExam,
  };

  const onSubmit = async (values) => {
    console.log("evalu", {
      student: values.student,
      evaluated_by: props.instructorId,
      notes: values.notes,
      current_eval: values.current_eval,
      previously_eval: values.prev_eval,
    });

    axios
      .put("http://localhost:5000/api/sessions/" + props.session._id, {
        evaluations: [
          {
            student: "62fff41d4c5f4c0fbd4db40a",
            evaluated_by: props.instructorId,
            notes: values.notes,
            current_eval: values.current_eval,
            previously_eval: values.prev_eval,
          },
        ],
      })
      .then((res) => {
        if (res.status == 200) {
          setSubmitted(true);
        } else return enqueueSnackbar("Try again");
      })
      .catch((err) => enqueueSnackbar("Try again"));
  };

  const validate = (values) => {
    let errors = {};
    /*************************************/
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <Card style={{ flex: 1, paddingTop: 16, width: 240, marginLeft: 16 }}>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Title className="mx-3 fs-4">Evaluations</Card.Title>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Select student</Form.Label>
            <Form.Select
              disabled={!props.students || props.students.length == 0}
              onChange={formik.handleChange}
              value={formik.values.students}
            >
              {[props.students]?.map((stud) => (
                <option key={stud.id} value={stud.id}>
                  {stud.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="General Exam"
              onClick={setIsGeneralExam.bind(this, !isGeneralExam)}
            />
          </Form.Group>

          {!isGeneralExam ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Memorizing previous</Form.Label>
                <Form.Select>
                  {Array.from(Array(11).keys())
                    .reverse()
                    .map((rate) => (
                      <option key={"a" + rate} value={rate}>
                        {rate}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Current Session</Form.Label>
                <Form.Select>
                  {Array.from(Array(11).keys())
                    .reverse()
                    .map((rate) => (
                      <option key={"b" + rate} value={rate}>
                        {rate}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </div>
          ) : (
            <Form.Group className="mb-3">
              <Form.Label>Total evaluation in the exam</Form.Label>
              <Form.Select>
                {Array.from(Array(11).keys())
                  .reverse()
                  .map((rate) => (
                    <option key={"c" + rate} value={rate}>
                      {rate}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Label style={{ marginTop: 16 }}>Notes</Form.Label>
          <Form.Control
            as="textarea"
            resize="false"
            rows={2}
            placeholder="Any notes for student?"
          />

          <Button
            variant="success"
            type="submit"
            className="mt-4 mb-4"
            disabled={submitted}
          >
            Submit
          </Button>
        </Card.Body>
      </Form>
    </Card>
  );
};
