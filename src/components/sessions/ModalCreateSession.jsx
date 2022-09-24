import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export default function ModalCreateSession(props) {
  //TODO: make participants accessable from above to have the ability to remove any student later

  const { t } = useTranslation();
  const [options, setOptions] = useState([]); //For the dropdown
  const [participants, setParticipants] = useState([]);
  const [isExam, setIsExam] = useState(false);
  const { user } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchData() {
      //Add students as options to select
      let opts = [];

      if (["Supervisor", "Admin"].includes(user?.privileges)) {
        let arr = await axios.get("http://localhost:5000/api/students");
        opts = arr.data.data.map((stu) => ({
          value: stu._id,
          label: stu.name,
        }));
      } else {
        opts = user?.students?.map((stu) => ({
          value: stu._id,
          label: stu.name,
        }));
      }

      //Sort students for easy access
      opts.sort(function (a, b) {
        let textA = a.label.toUpperCase();
        let textB = b.label.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
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
    setParticipants(chosen);
  }

  async function createSession() {
    if (participants.length === 0)
      return enqueueSnackbar("there are no participants");

    participants[participants.length] = localStorage.getItem("user_id");

    //room id as the name of instructor and time of creation
    //Create a session and send it to the backend

    let date = Date.now();
    let rid = localStorage.getItem("user_id") + "-" + date;
    let resSession = await axios.post(
      "http://localhost:5000/api/sessions",
      {
        room_id: rid.slice(0, -3),
        members_with_access: participants,
        created_by: localStorage.getItem("user_id"),
        previously_reached: {},
        evaluations: [],
        is_live: true,
        attendants: [],
        created_at: date,
      },
      {
        headers: {
          authentication: props.user.accessToken,
        },
      }
    );

    //Show the added session
    let newSes = [resSession.data, ...props.sessions];
    console.log("newSes", newSes);

    props.setSessions(newSes);
    props.onHide();
  }

  // function fetchSessions() {
  //   let sessions_url =
  //     "http://localhost:5000/api/sessions" +
  //     (["Admin", "Supervisor"].includes(user.privileges)
  //       ? ""
  //       : "?userId=" + user._id);

  //   axios
  //     .get(sessions_url)
  //     .then((res) => {
  //       props.setSessions(res.data.data);
  //       console.log("fetched", res.data.data);
  //     })
  //     .catch((err) => console.error(err));
  // }

  return (
    <Modal
      style={{ direction: props.isArabic ? "rtl" : "ltr" }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("sessions_select_title")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ direction: props.isArabic ? "rtl" : "ltr" }}>
        <h4></h4>
        <p>{t("sessions_select_info")}</p>

        <Select
          options={options}
          onChange={handleChange}
          isMulti
          placeholder={t("sessions_select")}
          styles={dropdownColorStyles}
        />

        {false && (
          <div>
            <input
              className="form-check-input m-2"
              type="checkbox"
              id="isExamCheckbox"
              value={isExam}
            />
            <label
              className="form-check-label"
              htmlFor="isExamCheckbox"
              style={{ fontWeight: 500, transform: "translateY(3px)" }}
            >
              Is an exam
            </label>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide} className="btn-secondary">
          {t("sessions_close")}
        </Button>
        <Button
          onClick={createSession}
          vatiant="success"
          className={"btn-success"}
        >
          {t("sessions_create_room")}
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
