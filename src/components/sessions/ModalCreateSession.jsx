import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import axios from "axios";

export default function ModalCreateSession(props) {
  //TODO: make participants accessable from above to have the ability to remove any student later

  const [options, setOptions] = useState([]);
  const [participants, setParticipants] = useState([]);

  //TODO: make options asyncLater with this vid https://www.youtube.com/watch?v=3u_ulMvTYZI

  useEffect(() => {
    async function fetchData() {
      //Add students as options to select

      let first = await axios.get("http://localhost:5000/api/students");
      // let second = await axios.get('http://localhost:5000/api/instructors/62f26d5d8bd8c6d9adf90f55')
      // first.filter((mem)=> second.students.include(mem._id))
      let opts = await first.data?.map((stu) => ({
        value: stu._id,
        label: stu.name,
      }));
      setOptions(opts);
    }
    fetchData();
  }, []);

  const dropdownColorStyles = {
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#e5f3ee",
        color: "#00875a",
        borderRadius: 4,
      };
    },
    multiValueLabel: (styles) => {
      return { ...styles, color: "#00875a" };
    },
    multiValueRemove: (styles) => {
      return {
        ...styles,
        color: "#00875a",
        cursor: "pointer",
        ":hover": { color: "white", backgroundColor: "#00875a" },
      };
    },
  };

  function handleChange(selectedOption) {
    let chosen = selectedOption?.map((sel) => sel.value);
    console.log(chosen);
    setParticipants(chosen);
  }

  async function createSession() {
    if (participants == 0) return console.log("there are no participants");

    participants[participants.length] = localStorage.getItem('user_id')
    console.log(participants);

    //TODO: make room id as the name of instructor and time of creation
    //TODO: make the backend dynamic when listening to whom want to join the room
    //Create a session and send it to the backend
    let date = Date.now()
    let rid = localStorage.getItem('user_id')+'-'+date
    console.log('Room_id',rid.slice(0, -3))
    
    let first = await axios.post("http://localhost:5000/api/sessions", {
      room_id:  rid.slice(0, -3),
      chat: [],
      members_with_access: participants,
      created_by: localStorage.getItem('user_id'),
      previously_reached: "Surah Al Ekhlas",
      evaluations: [],
      is_live: true,
      currently_inside: [localStorage.getItem('user_id')],
      created_at: date,
      started_at: date,
    },{
      headers:{
        authentication: props.user.accessToken
      }
    });
    console.log(first);

    //Show the added session

    props.setsessions(props.sessions.concat({
      room_id: localStorage.getItem('user_id')+'-'+date,
      chat: [],
      members_with_access: participants,
      created_by: localStorage.getItem('user_id'),
      previously_reached: "Surah Al Ekhlas",
      evaluations: [],
      is_live: true,
      currently_inside: [localStorage.getItem('user_id')],
      created_at: date,
      started_at: date,
    }));
    props.onHide();
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Session
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p>Choose participants who can join see the session</p>

        <Select
          options={options}
          onChange={handleChange}
          isMulti
          styles={dropdownColorStyles}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide} className="btn-secondary">
          Close
        </Button>
        <Button onClick={createSession} vatiant="success" className="btn-success">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);
