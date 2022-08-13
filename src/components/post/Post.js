import React from "react";
import { Link } from "react-router-dom";
import PostStyles from "./Post.module.css";
import { BsPersonFill } from "react-icons/bs";
import { BsCalendarDate } from "react-icons/bs";
import {TbUrgent} from "react-icons/tb";

const Post = (props) => {
    return (
        <>
        {props.post.id === props.latestPost.id?props.post.latest = true:null}
            <div className={PostStyles['post-main-container']}>
                <img src={props.post.imagePath} className={`${PostStyles['post-image']}`} alt="dd" />
                <h3 className={PostStyles['post-header']}>{props.post.title}</h3>
                {props.post.details.split(" ").length > 63 ? <p className={PostStyles['post-details']}>{props.post.details.substring(0, 374)}<Link to={`/events/${props.post.id}`}  state={props.post} className={PostStyles['read-more']}>Read More....</Link></p> : <p className={PostStyles['post-details']}>{props.post.details}</p>}
                <div className={PostStyles['post-writer-profile']}>{`${props.post.postWriter.split(" ")[0].substring(0, 1)} ${props.post.postWriter.split(" ")[props.post.postWriter.split(" ").length - 1].substring(0, 1)}`}</div>
                <span className={PostStyles['post-writer-name']}><BsPersonFill size={15} style={{ marginBottom: '4px' }} />{" "}{props.post.postWriter}</span>
                <span className={PostStyles['post-date']}><BsCalendarDate size={15} style={{ marginBottom: '4px' }} />{" "}{props.post.date}</span>
                {props.latestPost.id === props.post.id ? <span className={PostStyles['latest-post']}>{"Latest"}<TbUrgent style={{marginBottom: '5px'}}/></span> : null}
            </div>
        </>
    )
}
export default Post;