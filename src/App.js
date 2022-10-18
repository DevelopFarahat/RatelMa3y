import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Sessions from "./components/sessions/Sessions";
import AdminPanel from "./components/admin_panel/Admin_Panel";
import SystemUsers from "./components/system_users/SystemUsers";
import AddPost from "./components/add_post/AddPost";
import Student from "./components/students/Students";
import PostsBoard from "./components/posts_board/Posts_board";
import PostDetails from "./components/post_details/PostDetails";
import StudentRegistrationForm from "./components/student_registration/StudentRegistrationForm";
import { useTranslation } from "react-i18next";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import Instructor from "./components/instructor/Instructor";
import Room from "./components/room/Room";
import Login from "./pages/Login";
import UserContext from "./utils/UserContext";
import React, { useContext, useEffect, useState } from "react";
import RoomSideBar from "./components/room-side-bar/RoomSideBar";
import Forgot from "./pages/Forgot";
import ManageAcc from "./pages/ManageAcc";
import Messages from "./components/messages/message";
import BookBoard from "./components/quran_board/BookBoard";

function App() {
  const [t, i18n] = useTranslation();
  const [hideMain, setHideMain] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isRoomPrepared, setIsRoomPrepared] = useState(false);
  const { isLoading } = useContext(UserContext);

  useEffect(() => {
    if (!localStorage.getItem("i18nextLng") || localStorage.getItem("i18nextLng")=== 'en-US') {
      console.log('done one')
      localStorage.setItem("i18nextLng", 'ar');
      i18n.changeLanguage("ar")
    }
  }, []);

  const styles = {
    hideableDiv: {
      display: hideMain ? "none" : "block",
    }
  };
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="App" style={styles.body}>
        {isLoading && <LoadingScreen />}
        <ScrollToTop />
        <div style={styles.hideableDiv}>
          <NavBar
            i18n={i18n}
            isRoomPrepared={isRoomPrepared}
            expanded={expanded}
            setExpanded={setExpanded}
          />

          <div style={{ height: 86 }}></div>
          <div style={{ minHeight: "100vh",position:'relative'}}>
            <div onClick={setExpanded.bind(this, false)}>
              <Routes>
                <Route path="/" element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<Aboutus />} />
                <Route path="contact" element={<Contact />} />
                <Route path="book" element={<BookBoard />} />

                <Route element={<PrivateRoutes />}>
                  <Route
                    path="sessions"
                    element={
                      <Sessions
                        textt={"test test"}
                        setIsRoomPrepared={setIsRoomPrepared}
                      />
                    }
                  />
                  <Route
                    path="sessions/room"
                    element={
                      <Room
                        setHideMain={setHideMain}
                        setShowSidebar={setShowSidebar}
                        setIsRoomPrepared={setIsRoomPrepared}
                      />
                    }
                  />
                </Route>

                <Route element={<NotLoggedInRoutes />}>
                  <Route path="login" element={<Login />} />
                  <Route path="forgot-password" element={<Forgot />} />
                  <Route
                    path="register"
                    element={<StudentRegistrationForm i18n={i18n} t={t} />}
                  />
                </Route>

                <Route element={<PrivateRoutes />}>
                  <Route path="account" element={<ManageAcc />} />
                </Route>

                <Route path="events" element={<PostsBoard />} />
                <Route path="events/:id" element={<PostDetails />} />

                <Route
                  element={
                    <PrivateRoutes
                      roleRequired="instructor"
                      privilegesRequired="Admin"
                    />
                  }
                >
                  <Route path="adminPanel" element={<AdminPanel />}>
                    <Route index element={<SystemUsers />} />
                    <Route path="systemUsers" index element={<SystemUsers />} />
                    <Route path="addPost" element={<AddPost />} />
                    <Route path="students" element={<Student />} />
                    <Route path="instructors" element={<Instructor />} />
                    <Route path="messages" element={<Messages />} />
                  </Route>
                </Route>

                <Route path="*" element={<Navigate to="home" replace />} />
              </Routes>
            </div>
          </div>
          <Footer isRoomPrepared={isRoomPrepared} />
        </div>

        <div
          style={{
            display: showSidebar ? "flex" : "none",
            position: "absolute",
            zIndex: 11,
            top: 0,
            bottom: 0,
            left: -8,
            alignItems: "center",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <RoomSideBar hideMain={hideMain} />
        </div>
      </div>
    </>
  );
}

const PrivateRoutes = (props) => {
  let auth = localStorage.getItem("accessToken");
  if (!auth) return <Navigate to="/login" />;

  let decoded = auth.split(".")[1];
  let { role, privileges } = JSON.parse(atob(decoded));

  if ("roleRequired" in props || "privilegesRequired" in props)
    if (
      props.roleRequired != role ||
      !props.privilegesRequired.includes(privileges)
    )
      return <Navigate to="/login" />;

  return <Outlet />;
};

const NotLoggedInRoutes = () => {
  let auth = localStorage.getItem("accessToken");
  if (auth) return <Navigate to="/home" />;

  return <Outlet />;
};

const LoadingScreen = () => (
  <div
    style={{
      height: "100vh",
      width: "100%",
      position: "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
      backgroundColor: "rgba(255, 255, 255, 0.471)",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44 44"
      className="jsx-3467701036"
    >
      <g
        fill="none"
        fillRule="evenodd"
        strokeWidth="2"
        className="jsx-3467701036"
      >
        <circle cx="22" cy="22" r="19.4775" className="jsx-3467701036">
          <animate
            attributeName="r"
            begin="0s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
            className="jsx-3467701036"
          ></animate>
          <animate
            attributeName="stroke-opacity"
            begin="0s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
            className="jsx-3467701036"
          ></animate>
        </circle>
        <circle cx="22" cy="22" r="11.8787" className="jsx-3467701036">
          <animate
            attributeName="r"
            begin="-0.9s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
            className="jsx-3467701036"
          ></animate>
          <animate
            attributeName="stroke-opacity"
            begin="-0.9s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
            className="jsx-3467701036"
          ></animate>
        </circle>
      </g>
    </svg>
  </div>
);

export default App;
