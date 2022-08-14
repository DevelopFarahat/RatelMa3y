
import AdminPanelStyles from "./AdminPanel.module.css";
import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
const AdminPanel = () => {
    const [activeLinks, setActiveLinks] = useState({
        SystemUsersActive: true,
        addPostActive: false,
        studentActive: false,
        instructorActive: false

    });

    const activateLink = (event) => {
        event.target.id === 'SystemUsersActive' ? setActiveLinks({ SystemUsersActive: true, addPostActive: false, studentActive: false, instructorActive: false }) : event.target.id === 'addPostActive' ? setActiveLinks({ SystemUsersActive: false, addPostActive: true, studentActive: false, instructorActive: false }) : event.target.id === 'studentActive' ? setActiveLinks({ SystemUsersActive: false, addPostActive: false, studentActive: true, instructorActive: false }) : setActiveLinks({ SystemUsersActive: false, addPostActive: false, studentActive: false, instructorActive: true })
    }

    return (
        <>
            {console.log(activeLinks)}
            <div className={AdminPanelStyles['admin-panel-navigation']}>
                <Link className={`${activeLinks.SystemUsersActive? AdminPanelStyles['active-tap']:AdminPanelStyles['navigation-links']}`} to={"/adminPanel/systemUsers"} id="SystemUsersActive" onClick={(event)=>activateLink(event)}>System Users</Link>
            
                <Link className={`${activeLinks.addPostActive? AdminPanelStyles['active-tap']:AdminPanelStyles['navigation-links']}`} to={"/adminPanel/addPost"}  id="addPostActive" onClick={(event)=>activateLink(event)}>Add Post</Link>
                <Link className={`${activeLinks.studentActive? AdminPanelStyles['active-tap']:AdminPanelStyles['navigation-links']}`}  to={"/adminPanel/students"}   id="studentActive" onClick={(event)=>activateLink(event)}>Students</Link>
                <Link className={`${activeLinks.instructorActive? AdminPanelStyles['active-tap']:AdminPanelStyles['navigation-links']}`} to={"/adminPanel/instructors"}   id="instructorActive" onClick={(event)=>activateLink(event)}>Instructors</Link> 
            </div>
            <div className={AdminPanelStyles['main-container']}>
                <Outlet />
            </div>

        </>
    )
}
export default AdminPanel;