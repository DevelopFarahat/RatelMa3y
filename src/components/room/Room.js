import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import DailyIframe from "@daily-co/daily-js";

export default function Room({
  setHideMain,
  setShowSidebar,
  setIsRoomPrepared,
}) {
  const navigate = useNavigate();
  const { user, setUser, setIsLoading } = useContext(UserContext);

  const location = useLocation();
  const session = location.state?.session;

  const id = session.room_id;

  useEffect(()=>{
    setIsLoading(true)
  },[])

  useEffect(() => {
    axios.get("http://localhost:5000/video-api-url").then((res) => {
      const domain = res.data.url;

      axios
        .get(`http://localhost:5000/video-call/${id}`)
        .then(async (res) => {
          if (res.status === 200) {
            
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

                setIsLoading(false)
                setHideMain(true);
              })

              .on("joined-meeting", () => {
                setShowSidebar(true);
                let body = {
                  attendants: [user._id],
                };

                if (session.created_by == user._id)
                  body.started_at = Date.now();

                axios
                  .put(
                    "http://localhost:5000/api/sessions/" + session._id,
                    body
                  )
                  .then((res) => setUser({ ...user, in_session: session }))
                  .catch((err) => console.log("Maybe you should reconnect"));

                let field = "students";
                if (user.role == "instructor") field = "instructors";
                axios
                  .put(`http://localhost:5000/api/${field}/${user._id}`, {
                    sessions: [session._id],
                  })
                  .then((res) =>
                    console.log(
                      "should add to sessions in the student array",
                      res
                    )
                  )
                  .catch((err) => console.log("field problem", err));
              })

              .on("left-meeting", () => {
                //When you left the room

                setHideMain(false);
                setShowSidebar(false);
                setIsRoomPrepared(false);
                const e = document.querySelector("iframe");
                e.parentElement.removeChild(e);
                navigate("../sessions");
              });

            //Enter the room
            callFrame.join({
              url: `${domain}${id}`,
            });
          }
        })
        .catch((err) => console.error(err));
    });
  }, [id]);

  return <></>;
}
