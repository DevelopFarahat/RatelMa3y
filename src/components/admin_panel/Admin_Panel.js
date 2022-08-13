
import AdminPanelStyles from "./AdminPanel.module.css";
import { Outlet } from "react-router";
import {Link} from "react-router-dom";
const AdminPanel = () => {
 

    
    return (
        <>
        <div className={AdminPanelStyles['admin-panel-navigation']}>
            <Link className={AdminPanelStyles['navigation-links']} to={"/adminPanel/systemUsers"}>System Users</Link>
            <Link className={AdminPanelStyles['navigation-links']} to={"/adminPanel/addPost"}>Add Post</Link>
            <Link className={AdminPanelStyles['navigation-links']} to={"/adminPanel/students"}>Students</Link>
        </div>
        <div className={AdminPanelStyles['main-container']}>
        <Outlet/>
        </div>
    
        </>
    )
}
export default AdminPanel;