
import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import RoomCSS from "./Sessions.module.css";

function Sessions() {
  function dateFormat() {
    let options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString([], options);
  }
  return (
    <Fragment>
      <div className='container'>
        <Card className={RoomCSS.card}>
          <Card.Header className='text-center'>Ended Room</Card.Header>
          <Card.Body>
            <Accordion defaultActiveKey='1'>
              <Accordion.Item className={RoomCSS.AccordionItem} eventKey='0'>
                <Accordion.Header className='RoomAccordionHeader'>
                  Comments
                </Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
          <Card.Footer className='text-muted'>August 2, 2022</Card.Footer>
        </Card>
        <Card className={RoomCSS.card}>
          <Card.Header className='text-center'>Today Room</Card.Header>
          <Card.Body>
            <Accordion defaultActiveKey='1'>
              <Accordion.Item className={RoomCSS.AccordionItem} eventKey='0'>
                <Accordion.Header className='RoomAccordionHeader'>
                  Comments
                </Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
          <Card.Footer className='text-muted'>{dateFormat()}</Card.Footer>
        </Card>
      </div>
    </Fragment>
  );
}
export default Sessions;
