
import AdminPanelStyles from "./AdminPanel.module.css";
import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const AdminPanel = () => {
    const [t, i18n] = useTranslation();
    const [activeLinks, setActiveLinks] = useState({
        SystemUsersActive: true,
        addPostActive: false,
        studentActive: false,
        instructorActive: false,
        messagesActive:false

    });

    const activateLink = (event) => {
        event.target.id === 'SystemUsersActive' ? setActiveLinks({ SystemUsersActive: true, addPostActive: false, studentActive: false, instructorActive: false,messagesActive:false }) : event.target.id === 'addPostActive' ? setActiveLinks({ SystemUsersActive: false, addPostActive: true, studentActive: false, instructorActive: false,messagesActive:false }) : event.target.id === 'studentActive' ? setActiveLinks({ SystemUsersActive: false, addPostActive: false, studentActive: true, instructorActive: false,messagesActive:false }): event.target.id === 'messagesActive'?setActiveLinks({ SystemUsersActive: false, addPostActive: false, studentActive: false, instructorActive: false,messagesActive:true })  : setActiveLinks({ SystemUsersActive: false, addPostActive: false, studentActive: false, instructorActive: true,messagesActive:false })
    }

    return (
        <>
            <div className={AdminPanelStyles['admin-panel-navigation']}>
                <Link className={`${activeLinks.SystemUsersActive? AdminPanelStyles['active-tap']:AdminPanelStyles['navigation-links']}`} to={"/adminPanel/systemUsers"} id="SystemUsersActive" onClick={(event)=>activateLink(event)}>{t("systemUsers")}</Link>
                <Link className={`${activeLinks.addPostActive? AdminPanelStyles['active-tap']:AdminPanelStyles['navigation-links']}`} to={"/adminPanel/addPost"}  id="addPostActive" onClick={(event)=>activateLink(event)}>{t("adminpanel_addpost")}</Link>
                <Link className={`${activeLinks.studentActive? AdminPanelStyles['active-tap']:AdminPanelStyles['navigation-links']}`}  to={"/adminPanel/students"}   id="studentActive" onClick={(event)=>activateLink(event)}>{t("adminpanel_students")}</Link>
                <Link className={`${activeLinks.instructorActive? AdminPanelStyles['active-tap']:AdminPanelStyles['navigation-links']}`} to={"/adminPanel/instructors"}   id="instructorActive" onClick={(event)=>activateLink(event)}>{t("instructor")}</Link> 
                <Link className={`${activeLinks.messagesActive? AdminPanelStyles['active-tap']:AdminPanelStyles['navigation-links']}`} to={"/adminPanel/messages"}   id="messagesActive" onClick={(event)=>activateLink(event)}>Messages</Link>
            </div>
            <div className={AdminPanelStyles['main-container']}>
                <Outlet />
            </div>

        </>
    )
}
export default AdminPanel;