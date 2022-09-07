import React, { useContext, useRef, useState, useEffect } from "react";
import { Button, Card, Form, Overlay } from "react-bootstrap";
import BookBoard from "../quran_board/BookBoard";
import { GiBookmarklet } from "react-icons/gi";
import { BsFillFileTextFill, BsUiChecks } from "react-icons/bs";
import UserContext from "../../utils/UserContext";
import { Formik, Field } from "formik";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FiCheckCircle } from "react-icons/fi";
import { MdFactCheck } from 'react-icons/md'

export default function RoomSideBar({ hideMain }) {
  const [bookIsShown, showBook] = useState(false);
  const [evalIsShown, showEval] = useState(false);
  const target = useRef(null);
  const target2 = useRef(null);
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (user && user?.in_session && user?.in_session?.members_with_access) {
      user.in_session.members_with_access.forEach((id) => {
        if (id != user._id)
          axios
            .get("http://localhost:5000/api/students/" + id.toString())
            .then((res) => {
              let arr = [
                {
                  name: res.data.name,
                  id: res.data._id,
                },
              ];
              if (students.length != 0)
                arr = [
                  ...students,
                  {
                    name: res.data.name,
                    id: res.data._id,
                  },
                ];
              setStudents(arr);
            })
            .catch((err) => console.error(err));
      });
    }
  }, [user]);

  useEffect(() => {
    setStudents([]);
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

      {user != null && user.role === "instructor" && (
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
              <MdFactCheck
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

//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//
//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//
//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//
//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//
//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//

const EvaluationSheet = (props) => {
  const [isGeneralExam, setIsGeneralExam] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [submitted, setSubmitted] = useState(false);
  const [alreadyTested, setAlreadyTested] = useState(false);
  console.log("student", props.students);

  //TODO: student id is not

  return (
    <Formik
      initialValues={{
        current_eval: 10,
        prev_eval: 10,
        notes: "",
        student_id: "",
        is_exam: false,
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(fprops) => (
        <Card style={{ flex: 1, paddingTop: 16, width: 240, marginLeft: 16 }}>
          <Form onSubmit={fprops.handleSubmit}>
            <Card.Title className="mx-3 fs-4">Evaluations</Card.Title>
            <Card.Body>
              <Form.Group className="mb-3">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Form.Label>Select student</Form.Label>

                  <FiCheckCircle style={{ display: alreadyTested? "initial":"none" }} color={'#4c6e59'}/>
                </div>
                {!props.students || props.students.length == 1}
                <Field
                  name="student_id"
                  component="select"
                  className="form-select"
                  placeholder="select student"
                  disabled={!props.students || props.students.length == 1}
                >
                  {props.students?.map((stud,index) => {
                    if(index==0) fprops.values.student_id = stud.id
                    //TODO: here you check if he already get tested
                    return (
                      <option key={stud.id} value={stud.id}>
                        {stud.name}
                      </option>
                    );
                  })}
                </Field>
              </Form.Group>

              <Form.Group className="mb-3">
                <Field type="checkbox" name="is_exam" id="is_exam"/>
                <Form.Label className="ms-1" htmlFor="is_exam">General Exam</Form.Label>
              </Form.Group>

              {!fprops.values.is_exam ? (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Memorizing previous</Form.Label>
                    <Field
                      name="prev_eval"
                      component="select"
                      className="form-select"
                      placeholder="select rate"
                    >
                      {Array.from(Array(11).keys())
                        .reverse()
                        .map((rate) => (
                          <option key={"a" + rate} value={rate}>
                            {rate}
                          </option>
                        ))}
                    </Field>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Current Session</Form.Label>

                    <Field
                      name="current_eval"
                      component="select"
                      className="form-select"
                      placeholder="select rate"
                    >
                      {Array.from(Array(11).keys())
                        .reverse()
                        .map((rate) => (
                          <option key={"b" + rate} value={rate}>
                            {rate}
                          </option>
                        ))}
                    </Field>
                  </Form.Group>
                </div>
              ) : (
                <Form.Group className="mb-3">
                  <Form.Label>Total evaluation in the exam</Form.Label>
                  <Field
                    name="prev_eval"
                    component="select"
                    className="form-select"
                    placeholder="select rate"
                  >
                    {Array.from(Array(11).keys())
                      .reverse()
                      .map((rate) => (
                        <option key={"c" + rate} value={rate}>
                          {rate}
                        </option>
                      ))}
                  </Field>
                </Form.Group>
              )}

              <Form.Label style={{ marginTop: 16 }}>Notes</Form.Label>
              <Field
                as="textarea"
                rows={2}
                name="notes"
                type="text"
                className="form-control"
                placeholder="Any notes for student?"
              ></Field>

              <Button
                variant="success"
                type="submit"
                className="mt-4 mb-4"
                // disabled={submitted}
              >
                Submit
              </Button>
            </Card.Body>
          </Form>
        </Card>
      )}
    </Formik>
  );
};
