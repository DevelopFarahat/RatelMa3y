import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import DailyIframe from "@daily-co/daily-js";
import { useSnackbar } from "notistack";

export default function Room({
  setHideMain,
  setShowSidebar,
  setIsRoomPrepared,
}) {
  const navigate = useNavigate();
  const { user, setUser, setIsLoading } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation();
  const session = location.state?.session;

  const id = session.room_id;

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_HOST_URL}/video-api-url`).then((res) => {
      const domain = res.data.url;

      axios
        .post(`${process.env.REACT_APP_BACK_HOST_URL}/video-call/${id}`,{role: user.role})
        .then(async (res) => {
          if (res.status !== 200) {
            enqueueSnackbar("Room has ended");
            return endRoom();
          }

          const callFrame = await DailyIframe.createFrame({
            iframeStyle: {
              position: "absolute",
              width: "100%",
              height: "104%",
              overflow: "hidden",
              marginTop: "-30px",
              border: "0",
              zIndex: 0,
            },
            theme: {
              colors: {
                accent: "#4c6e59",
                accentText: "#FFFFFF",
                mainAreaBgAccent: "#4c6e59",
                mainAreaBg: "#eff3f5",
              },
            },
            showLeaveButton: true,
            showFullscreenButton: false,
            userName: `"${localStorage.getItem("user_name")}"`,
          });
          callFrame.setBandwidth({
            kbs: 20,
            trackConstraints: { width: 64, height: 64, frameRate: 3 },
          });
          callFrame
            .on("joining-meeting", () => {
              setIsLoading(false);
              setHideMain(true);
            })

            .on("joined-meeting", () => {
              setShowSidebar(true);
              let body = {
                attendants: [user._id],
              };

              if (session.created_by === user._id) body.started_at = Date.now();

              axios
                .put(`${process.env.REACT_APP_BACK_HOST_URL}/api/sessions/${session._id}`, body)
                .then((res) => setUser({ ...user, in_session: session }))
                .catch((err) => enqueueSnackbar("Maybe you should reconnect"));
            })

            .on("left-meeting", endRoom);

          //Enter the room
          callFrame.join({
            url: `${domain}${id}`,
          });
        })
        .catch((err) => {
          enqueueSnackbar("Room has ended");
          console.error(err);
          endRoom();
        });
    });
  }, [id]);

  function endRoom() {
    setHideMain(false);
    setShowSidebar(false);
    setIsRoomPrepared(false);
    const e = document.querySelector("iframe");
    if(e) e?.parentElement?.removeChild(e);
    navigate("../sessions");
  }

  return <></>;
}
