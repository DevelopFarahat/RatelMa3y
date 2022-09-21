import React, { useContext, useRef, useState, useEffect } from "react";
import { Button, Card, Form, Overlay } from "react-bootstrap";
import BookBoard from "../quran_board/BookBoard";
import { GiBookmarklet } from "react-icons/gi";
import UserContext from "../../utils/UserContext";
import { Formik, Field } from "formik";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FiCheckCircle } from "react-icons/fi";
import { MdFactCheck } from "react-icons/md";
import { useTranslation } from "react-i18next";



export default function RoomSideBar({ hideMain }) {
  const [bookIsShown, showBook] = useState(false);
  const [evalIsShown, showEval] = useState(false);
  const target = useRef(null);
  const target2 = useRef(null);
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (user && user?.in_session && user?.in_session?.members_with_access) {
      let promiseArr = [];

      user.in_session.members_with_access.forEach(async (id) => {
        if (id != user._id) {
          let r = axios.get(
            "http://localhost:5000/api/students/" + id.toString()
          );
          promiseArr.push(r);
        }
      });

      Promise.all(promiseArr).then((result) => {
        for (let i = 0; i < result.length; i++) {
          result[i] = {
            name: result[i].data.name,
            id: result[i].data._id,
          };
        }
        setStudents(result);
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

//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//
//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//
//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//
//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//
//*_*_*_*_*__*_*__*_*__*__*_*___*_*_*__*_*_*_*_*__*_*_*_*__*_*___*_**__*//

const EvaluationSheet = (props) => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyTested, setAlreadyTested] = useState([]);
  const [evaluationsList, setEvaluationsList] = useState([])

  useEffect(() => {
    setEvaluationsList(props.session.evaluations);
    let arr = props.session.evaluations.map((ev) => ev.student) ?? [];
    setAlreadyTested(arr);
  }, []);

  //TODO: use this to get the evaluation
  function getEvaluation(values, id) {
    let evalu = props.session.evaluations.find((ev) => ev.student == id);
    if (evalu) {
      values.current_eval = evalu.current_eval;
      values.prev_eval = evalu.prev_eval;
    }
  }

  return (
    <Formik
      initialValues={{
        evaluated_by: user._id,
        current_eval: 10,
        previously_eval: 10,
        notes: "",
        student: "",
        is_exam: false,
      }}
      onSubmit={(values) => {
        console.log(values, props.session._id);
        setIsLoading(true);
        axios
          .put(`http://localhost:5000/api/sessions/${props.session._id}`, {
            evaluations: {
              ...values,
              _id: values.student,
            },
            is_exam: values.is_exam,
          })
          .then((res) => {
            setIsLoading(false);
            console.log("done", res.data);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log("error", err);
            enqueueSnackbar("Error: " + err);
          });

        console.log("resulted", alreadyTested, values.student);
        setAlreadyTested([...alreadyTested, values.student]);
        setEvaluationsList([...evaluationsList, values]);
      }}
    >
      {(fprops) => (
        <Card style={{ flex: 1, paddingTop: 16, width: 240, marginLeft: t('us')!== "Us"? 0: 16,marginRight: t('us')!== "Us"? 16:0,direction: t('us')!== "Us"? 'rtl':'ltr'}}>
          <Form onSubmit={fprops.handleSubmit}>
            <Card.Title className="mx-3 fs-4">{t('evaluations_title')}</Card.Title>
            <Card.Body>
              <Form.Group className="mb-3">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Form.Label>{t('login_select_student')}</Form.Label>

                  <FiCheckCircle
                    style={{
                      display: alreadyTested.includes(fprops.values.student)
                        ? "initial"
                        : "none",
                    }}
                    color={"#4c6e59"}
                  />
                </div>
                {!props.students || props.students.length == 1}
                <Field
                  name="student"
                  component="select"
                  className="form-select"
                  placeholder="select student"
                  disabled={!props.students || props.students.length == 1}
                >
                  {props.students?.map((stud, index) => {
                    if (index == 0) fprops.values.student = stud.id;
                    //TODO: here you check if he already get tested
                    // alreadyEval = props.evaluations.some(
                    //   (stu) => stu._id == stud.id
                    // )
                    return (
                      <option key={stud.id} value={stud.id}>
                        {stud.name}
                      </option>
                    );
                  })}
                </Field>
              </Form.Group>

              <Form.Group className="mb-3">
                <Field type="checkbox" name="is_exam" id="is_exam" />
                <Form.Label className="ms-1 me-1" htmlFor="is_exam">
                  {t('evaluations_general_exam')}
                </Form.Label>
              </Form.Group>

              {!fprops.values.is_exam ? (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>{t('sessions_mem_eval')}</Form.Label>
                    <Field
                      name="previously_eval"
                      component="select"
                      className="form-select"
                      placeholder={t('evaluations_eval_holder')}
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
                    <Form.Label>{t('sessions_cur_eval')}</Form.Label>

                    <Field
                      name="current_eval"
                      component="select"
                      className="form-select"
                      placeholder={t('evaluations_eval_holder')}
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
                  <Form.Label>{t('sessions_exam_eval')}</Form.Label>
                  <Field
                    name="previously_eval"
                    component="select"
                    className="form-select"
                    placeholder={t('evaluations_eval_holder')}
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

              <Form.Label style={{ marginTop: 16 }}>{t('sessions_notes')}</Form.Label>
              <Field
                as="textarea"
                rows={2}
                name="notes"
                type="text"
                className="form-control"
                placeholder={t('sessions_notes_holder')}
              ></Field>

              <Button
                variant="success"
                type="submit"
                className="mt-4 mb-4"
                disabled={
                  isLoading || alreadyTested.includes(fprops.values.student)
                }
              >
                {t('sessions_eval_submit')}
              </Button>
            </Card.Body>
          </Form>
        </Card>
      )}
    </Formik>
  );
};
