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
import Spinner from "react-bootstrap/Spinner";
import styles from "./RoomSide.module.css";

export default function RoomSideBar({ hideMain }) {
  const [bookIsShown, showBook] = useState(false);
  const [evalIsShown, showEval] = useState(false);
  const target = useRef(null);
  const target2 = useRef(null);
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (user && user?.in_session && user?.in_session?.members_with_access) {
      let promiseArr = [];

      user.in_session.members_with_access.forEach(async (id) => {
        if (id != user._id) {
          let r = axios.get(
            `${
              process.env.REACT_APP_BACK_HOST_URL
            }/api/students/${id.toString()}`
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
        console.log('students',result)
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
        style={{ zIndex: 10}}
      >
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            className={[styles['no-scrollbar'],styles['wider-board']]}
            style={{
              height: '85%',
              overflowY: 'scroll',
              position: "absolute",
              backgroundColor: "white",
              boxShadow: "0 0 8px rgb(0 0 0 / 16%)",
              borderRadius: 24,
              margin: 20,
              paddingBottom: 16,
              borderRadius: 3,
              
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
            className={styles['no-scrollbar']}
            style={{
            height: '92%',
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
              t={t}
              session={user.in_session}
              instructorId={user._id}
            />
          </div>
        )}
      </Overlay>

      {user && (
        <div>
          <Card className={styles["card"]}>
            <Button
              variant="light"
              ref={target}
              onClick={() => showBook(!bookIsShown)}
              className={styles["sideBtn"]}
            >
              <GiBookmarklet className={styles["icons"]} color="#121a24"/>
              <span className={styles["labels"]}>{t("book")}</span>
            </Button>
            {user.role === "instructor" && (
              <Button
                variant="light"
                onClick={() => showEval(!evalIsShown)}
                ref={target2}
                className={styles["sideBtn"]}
              >
                <MdFactCheck className={styles["icons"]} color="#121a24"/>
                <span className={styles["labels"]}>{t("evaluations")}</span>
              </Button>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

const EvaluationSheet = (props) => {
  console.log('props Sidebar',props )
  const { user } = useContext(UserContext);
  const t = props.t;
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyTested, setAlreadyTested] = useState([]);
  const [evaluationsList, setEvaluationsList] = useState([]);

  useEffect(() => {
    setEvaluationsList(props.session.evaluations);
    let arr = props.session?.evaluations?.map((ev) => ev.student) ?? [];
    setAlreadyTested(arr);
  }, []);

  function getEvaluationOrResetIfNew(val, fprops) {
    let evaluation = -1;

    if (alreadyTested.includes(val))
      evaluation = evaluationsList.find((eva) => eva.student === val);

    if (evaluation === -1)
      evaluation = {
        previously_eval: 10,
        current_eval: 10,
        total_eval: 10,
        notes: "",
        is_exam: props.session.is_exam,
      };

    fprops.previously_eval = evaluation.previously_eval;
    fprops.current_eval = evaluation.current_eval;
    fprops.total_eval = evaluation.total_eval;
    fprops.notes = evaluation.notes;
    fprops.is_exam = evaluation.is_exam;
  }

  return (
    <Formik
      initialValues={{
        evaluated_by: user._id,
        current_eval: 10,
        previously_eval: 10,
        total_eval: 10,
        notes: "",
        student: props?.students[0]?.id,
        is_exam: props?.session.is_exam,
      }}
      onSubmit={(values) => {
        if (values.is_exam) {
          delete values.current_eval;
          delete values.previously_eval;
        } else {
          delete values.total_eval;
        }

        setIsLoading(true);

        axios
          .put(
            `${process.env.REACT_APP_BACK_HOST_URL}/api/sessions/${props.session._id}`,
            {
              evaluations: {
                ...values,
                _id: values.student,
              },
              is_exam: values.is_exam,
            }
          )
          .then((res) => {
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log("error", err);
            enqueueSnackbar("Error: " + err);
          });

        setAlreadyTested([...alreadyTested, values.student]);
        setEvaluationsList([...evaluationsList, values]);
      }}
    >
      {(fprops) => (
        <Card
          style={{
            height: '100%',
            overflowY: 'scroll',
            flex: 1,
            paddingTop: 16,
            width: 240,
            marginLeft: t("us") !== "Us" ? 0 : 16,
            marginRight: t("us") !== "Us" ? 16 : 0,
            direction: t("us") !== "Us" ? "rtl" : "ltr",
          }}
        >
          <Form onSubmit={fprops.handleSubmit}>
            <Card.Title className="mx-3 fs-4">
              {t("evaluations_title")}
            </Card.Title>
            <Card.Body>
              <Form.Group className="mb-3">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Form.Label>{t("login_select_student")}</Form.Label>

                  <span>
                    <Spinner
                      animation="grow"
                      variant="secondary"
                      style={{
                        display: isLoading ? "initial" : "none",
                      }}
                    />

                    <FiCheckCircle
                      style={{
                        display: alreadyTested.includes(fprops.values.student)
                          ? "initial"
                          : "none",
                      }}
                      color={"#4c6e59"}
                    />
                  </span>
                </div>
                {!props.students || props.students.length == 1}
                <Field
                  name="student"
                  component="select"
                  className="form-select"
                  placeholder="select student"
                  onChange={(e) => {
                    fprops.setFieldValue("student", e.target.value);
                    getEvaluationOrResetIfNew(e.target.value, fprops.values);
                  }}
                  disabled={!props.students || props.students.length == 1}
                >
                  {props.students?.map((stud) => {
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
                  {t("evaluations_general_exam")}
                </Form.Label>
              </Form.Group>

              {!fprops.values.is_exam ? (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("sessions_mem_eval")}</Form.Label>
                    <Field
                      name="previously_eval"
                      component="select"
                      className="form-select"
                      placeholder={t("evaluations_eval_holder")}
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
                    <Form.Label>{t("sessions_cur_eval")}</Form.Label>

                    <Field
                      name="current_eval"
                      component="select"
                      className="form-select"
                      placeholder={t("evaluations_eval_holder")}
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
                  <Form.Label>{t("sessions_exam_eval")}</Form.Label>
                  <Field
                    name="total_eval"
                    component="select"
                    className="form-select"
                    placeholder={t("evaluations_eval_holder")}
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

              <Form.Label style={{ marginTop: 16 }}>
                {t("sessions_notes")}
              </Form.Label>
              <Field
                as="textarea"
                rows={2}
                name="notes"
                type="text"
                className="form-control"
                placeholder={t("sessions_notes_holder")}
              ></Field>

              <Button
                variant="success"
                type="submit"
                className="mt-4 mb-2"
                disabled={
                  isLoading || alreadyTested.includes(fprops.values.student)
                }
              >
                {t("sessions_eval_submit")}
              </Button>
            </Card.Body>
          </Form>
        </Card>
      )}
    </Formik>
  );
};
