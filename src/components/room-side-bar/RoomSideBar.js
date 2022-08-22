import React, { useContext, useRef, useState } from "react";
import { Button, Card, Form, Overlay,Image } from "react-bootstrap";
import BookBoard from "../quran_board/BookBoard";
// import "./RoomSide.module.css";
import { GiBookmarklet } from "react-icons/gi";
import { CgFileDocument } from "react-icons/cg";
import { AiTwotoneProfile } from 'react-icons/ai'
import { BsFillFileTextFill } from 'react-icons/bs'
import UserContext from "../../utils/UserContext";

export default function RoomSideBar() {
  const [bookIsShown, showBook] = useState(false);
  const [evalIsShown, showEval] = useState(false);
  const target = useRef(null);
  const target2 = useRef(null);
  const { user } = useContext(UserContext);
  console.log('usrr', user)

  //TODO: using just a simple div to animate it once the button get clicked
  //TODO: when scrolling on overlay it gives a glitch
  //TODO: maybe the height of evaluation overlay should be more flexible

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
            <EvaluationSheet />
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
              pointerEvents: 'auto'
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

const EvaluationSheet = () => {
  const [isGeneralExam, setIsGeneralExam] = useState(false);
  return (
    <Card style={{ flex: 1, paddingTop: 16, width: 240, marginLeft: 16 }}>
      <Form>
        <Card.Title className="mx-3 fs-4">Evaluations</Card.Title>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Select student</Form.Label>
            <Form.Select>
              {["Ahmed Ali", "Qassem Saleh"]?.map((stud) => (
                <option key={stud} value={stud}>
                  {stud}
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

          <Button variant="success" type="submit" className="mt-4 mb-4">
            Submit
          </Button>
        </Card.Body>
      </Form>
    </Card>
  );
};
