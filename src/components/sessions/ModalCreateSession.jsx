import React, { useState, useEffect, useRef, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select, { components, GroupProps } from "react-select";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { BsTable } from "react-icons/bs";

export default function ModalCreateSession(props) {
  const { t } = useTranslation();
  const [options, setOptions] = useState([]); //For the dropdown
  const [instructors, setInstructors] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isExam, setIsExam] = useState(false);
  const { user, isLoading, setIsLoading } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const instrRef = useRef({ label: user.name, value: user._id });

  let page = 1;
  // let postsCount = undefined,
  //   currentCount = undefined;

  useEffect(() => {
    fetchData(page, 10000);
    fetchInstructors(page, 10000);
  }, []);

  //To observe last item
  // const observer = useRef();
  // const lastPostElementRef = useCallback((node) => {
  //   if (isLoading) return;

  //   if (options.length-user.students.length >= postsCount) return;

  //   if (observer.current) observer.current.disconnect();

  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       //To prevent excess page loading
  //       if (currentCount !== undefined && currentCount >= postsCount)
  //         return setIsLoading(false);

  //       let resObj = fetchData(page + 1);
  //       currentCount = resObj[0];
  //       postsCount = resObj[1];
  //       page = page + 1;
  //     }
  //   });
  //   if (node) observer.current.observe(node);
  // }, []);

  async function fetchInstructors(page, limit = 10) {
    let res = await axios.get(
      `${process.env.REACT_APP_BACK_HOST_URL}/api/instructors?page=${page}&&limit=${limit}`
    );
    let opts = res.data.data.map((stu) => {
      return {
        value: stu._id,
        label: stu.name,
      };
    });
    setInstructors(opts);
  }

  async function fetchData(page, limit = 10) {
    //Add students as options to select
    let opts = [];
    let mine = [];
    let indicators = [];
    if (["Supervisor", "Admin"].includes(user?.privileges)) {
      let arr = await axios.get(
        `${process.env.REACT_APP_BACK_HOST_URL}/api/students?page=${page}&&limit=${limit}`
      );

      //FIRST ADD YOUR STUDENTS
      mine = user.students.map((stu) => {
        indicators.push(stu._id);
        return {
          value: stu._id,
          label: stu.name,
          instructor: user._id,
        };
      });

      //THEN GET ALL STUDENTS DATA FROM BACKEND
      let filter = arr.data.data.filter(
        (stu) => stu.subscription_state === "Active"
      );
      opts = filter.map((stu) => ({
        value: stu._id,
        label: stu.name,
        instructor: stu.instructor,
      }));
    } else {
      opts = user?.students?.map((stu) => ({
        value: stu._id,
        label: stu.name,
      }));
    }

    //Sort students for easy access
    opts?.sort(function (a, b) {
      let textA = a.label.toUpperCase();
      let textB = b.label.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    if (mine.length !== 0 && opts.length !== 0)
      opts = opts?.filter((i) => !indicators.includes(i.value));

    //Make his students in the top
    setOptions([...mine, ...opts]);
  }

  const dropdownColorStyles = {
    option: (styles, i) => {
      return {
        ...styles,
        color:
          i.data.instructor == user._id
            ? "green"
            : i.data.instructor === undefined
            ? "black"
            : "grey",
      };
    },
    singleValue: (styles) => {
      return {
        ...styles,

        ":hover": { color: "white", backgroundColor: "#00875a" },
      };
    },
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

    participants[participants.length] = instrRef.current.props.value.value;

    //room id as the name of instructor and time of creation
    //Create a session and send it to the backend

    let date = Date.now();
    let rid = date + "-" + instrRef.current.props.value.value;

    let resSession = await axios.post(
      `${process.env.REACT_APP_BACK_HOST_URL}/api/sessions`,
      {
        room_id: rid.slice(0, -3),
        members_with_access: participants,
        created_by: instrRef.current.props.value.value,
        previously_reached: {},
        evaluations: [],
        is_live: true,
        attendants: [],
        created_at: date,
        is_exam: isExam,
      },
      {
        headers: {
          authentication: props.user.accessToken,
        },
      }
    );

    //Show the added session
    let newSes = [resSession.data, ...props.sessions];

    props.setSessions(newSes);
    props.onHide();
  }

  return (
    <Modal
      style={{ direction: props.isArabic ? "rtl" : "ltr" }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className={"d-flex justify-content-between"}
          style={{ width: "100%" }}
        >
          {t("sessions_select_title")}

          <Button
            variant={"outline-success"}
            style={{ marginLeft: 8 }}
            onClick={() => props.setTableShow(true)}
          >
            <BsTable size={24} />
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ direction: props.isArabic ? "rtl" : "ltr" }}>

        {["Admin", "Supervisor"].includes(user?.privileges) && (
          <div className="mb-4">
            <p>{t("sessions_select_instructor")}</p>
            <Select
              ref={instrRef}
              options={instructors}
              onChange={(e) => console.log(e)}
              // components={{ Group }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#e5f3ee",
                  primary: "#198754",
                },
              })}
              defaultValue={{ label: user.name, value: user._id }}
              placeholder={t("sessions_select")}
            />
          </div>
        )}

        <p>{t("sessions_select_info")}</p>

        <Select
          options={options}
          onChange={handleChange}
          isMulti
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "#e5f3ee",
              primary: "#198754",
            },
          })}
          // components={{ Group }}
          closeMenuOnSelect={false}
          placeholder={t("sessions_select")}
          styles={dropdownColorStyles}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            className="form-check-input m-2"
            type="checkbox"
            id="isExamCheckbox"
            value={isExam}
            onClick={() => setIsExam(!isExam)}
          />
          <label
            className="form-check-label"
            htmlFor="isExamCheckbox"
            style={{ fontWeight: 500 }}
          >
            {t("is_an_exam")}
          </label>
        </div>
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
