import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
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
import Account from "./components/account_manage/form2formik";
import { UserProvider } from "./utils/UserContext";
import React, { useEffect, useState } from "react";
import RoomSideBar from "./components/room-side-bar/RoomSideBar";
import Forgot from "./pages/Forgot";
// import { FileUploadPage } from "./components/test-post/TestPost";

function App() {
  const [t, i18n] = useTranslation();

  //For changing direction with language change
  const [isArabic, setIsArabic] = useState(false);
  const [hideMain, setHideMain] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isRoomPrepared, setIsRoomPrepared] = useState(false)

  useEffect(() => {
    setIsArabic(localStorage.getItem("i18nextLng") == "ar");
  }, [localStorage.getItem("i18nextLng")]);

  const styles = {
    body: {
      // direction: isArabic ? "rtl" : "ltr",
    },
    hideableDiv: {
      display: hideMain ? "none" : "block",
    },
  };

  return (
    <>
      <div className="App" style={styles.body}>
        <ScrollToTop />
        <UserProvider>
          <div style={styles.hideableDiv}>
            <NavBar i18n={i18n} isRoomPrepared={isRoomPrepared}/>
            <div style={{ height: 86 }}></div>
            <div style={{ minHeight: "100vh" }}>
              <Routes>
                <Route path="/" element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<Aboutus />} />
                <Route path="contact" element={<Contact />} />
                <Route path="adminPanel" element={<AdminPanel />} />
                <Route
                  path="sessions"
                  element={<Sessions textt={"test test"} setIsRoomPrepared={setIsRoomPrepared}/>}
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

                <Route path="login" element={<Login />} />
                <Route path="forgotten" element={<Forgot />} />
                <Route path="account" element={<Account />} />

                <Route path="events" element={<PostsBoard />} />
                <Route path="events/:id" element={<PostDetails />} />

                <Route path="adminPanel" element={<AdminPanel />}>
                  <Route index element={<SystemUsers />} />
                  <Route path="systemUsers" index element={<SystemUsers />} />
                  <Route path="addPost" element={<AddPost />} />
                  <Route path="students" element={<Student />} />
                  <Route path="instructors" element={<Instructor />} />
                </Route>
                <Route
                  path="register"
                  element={<StudentRegistrationForm i18n={i18n} t={t} />}
                />
                <Route path="*" element={<Navigate to="home" replace />} />
              </Routes>
            </div>
            <Footer isRoomPrepared={isRoomPrepared}/>
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
              overflow: 'hidden'
            }}
          >
            <RoomSideBar hideMain={hideMain}/>
          </div>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
