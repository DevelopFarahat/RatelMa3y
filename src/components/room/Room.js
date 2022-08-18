import React, { useContext, useEffect, useRef,useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { Overlay,Card, Button,Tooltip ,Popover,OverlayTrigger} from "react-bootstrap";
import BookBoard from "../quran_board/BookBoard";
import $ from 'jquery';

export default function Room() {
  //   const id = match.params.id;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log("USER", user);
  const location = useLocation();
  const session = location.state?.session;
  
  const [show, setShow] = useState(false);
  const target = useRef(null);

  //   if (!session) return navigate("../../sessions");

  const id = session.room_id;
  console.log("HAHA", session.room_id);
  const divVideo = useRef();
  var callFrame;
  function leaveRoom(){
    callFrame.leave()
  }

  useEffect(() => {
    axios.get("http://localhost:5000/video-api-url").then((res) => {
      const domain = res.data.url;
      console.log("Checker", res.data);

        axios
          .get(`http://localhost:5000/video-call/${id}`)
          .then((res) => {
            if (res.status === 200) {
      //         //TODO: navBar and footer slide to the top when the session start

              document.body.innerHTML = "";

              let sideBar = `<Overlay target={target.current} show={show} placement="right">
              {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <div
                  {...props}
                  style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    boxShadow: '0 0 8px rgb(0 0 0 / 16%)',
                    borderRadius: 24,
                    margin: 20,
                    paddingBottom: 16,
                    borderRadius: 3,
                    width: '70%',
                    ...props.style,
                  }}
                >
                 <BookBoard/>
                </div>
              )}
            </Overlay>
            <div style={{ position: "fixed", left: 0, top: "50%" }}>
              <Card className="" style={{ outline: "1px solid grey" }}>
                <Button variant="light" ref={target} onClick={() => setShow(!show)}>Book</Button>
                <Button variant="light">Evaluations</Button>
                <Button variant="light" className="text-danger" onClick={leaveRoom}>
                  Leave Room
                </Button>
              </Card>
            </div>`

            let bt = document.createElement('button')
            bt.innerHTML = 'change'
            bt.style.zIndex = '10';
            // $('body').append(bt)

              callFrame = window.DailyIframe.createFrame({
                iframeStyle: {
                  position: "relative",
                  width: "100%",
                  height: "106%",
                  marginTop: "-30px",
                  border: "0",
                  zIndex: 2,
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

            //   const myEmitter = new EventEmitter();
            //   myEmitter.on('join', function firstListener() {
            //     console.log('Helloooo! first listener');
            //   });
            //   callFrame.on('join',()=> console.error('not so fast'))
              callFrame.join({
                url: `${domain}${id}`,
              });

              // divVideo.current.innerHTML = script;
            }
          })
          .catch((err) => console.error(err));
    });
  }, [id]);

  //TODO: see if there are better options for BookBoard
  return (
    <>
    </>
  );
}
