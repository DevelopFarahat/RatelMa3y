import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import RegistrationForm from "./components/registration-form/RegistrationForm";
import { useTranslation } from "react-i18next";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import Instructor from "./components/instructor/Instructor";
import Room from "./components/room/Room";
import Login from "./pages/Login";
import { UserProvider } from "./utils/UserContext";
import { useEffect, useState } from "react";
// import { FileUploadPage } from "./components/test-post/TestPost";

function App() {
  const [t, i18n] = useTranslation();

  //For changing direction with language change
  const [isArabic, setIsArabic] = useState(false);
  useEffect(() => {
    setIsArabic(localStorage.getItem("i18nextLng")=='ar');
  }, [localStorage.getItem("i18nextLng")]);

  const styles = {
    body: {
      direction: isArabic ? "rtl" : "ltr",
    },
  };

  return (
    <div className="App" style={styles.body}>
      <ScrollToTop />
      <UserProvider>
        <NavBar i18n={i18n}  t={t}/>
        <div style={{ height: 86 }}></div>
        <div style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" i18n={i18n}  t={t}  element={<Home />} />
            <Route path="home"  i18n={i18n}  t={t} element={<Home />} />
            <Route path="about" element={<Aboutus />} />
            <Route path="contact" element={<Contact />} />
            <Route path="adminPanel" element={<AdminPanel />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="sessions/room" element={<Room />} />

            <Route path="login" element={<Login />} />

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
              element={<RegistrationForm i18n={i18n} t={t} />}
            />
          </Routes>
        </div>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
