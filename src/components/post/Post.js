import React from "react";
import { Link } from "react-router-dom";
import PostStyles from "./Post.module.css";
import { BsPersonFill } from "react-icons/bs";
import { BsCalendarDate } from "react-icons/bs";
import {TbUrgent} from "react-icons/tb";
   //
const Post = (props) => {

    //TODO: أكد على فرحات عدل دي عشان تاخد الصور من الباك ولا لأ
    return (
        <>

        {props.post._id === props.latestPost._id?props.post.latest = true:null}
            <div className={PostStyles['post-main-container']}>
                <img src={props.post.article_img} className={`${PostStyles['post-image']}`} alt="dd" />
                <div>
                    
                <h3 className={PostStyles['post-header']}>{props.post.title}</h3>
                {props.post.content.split(" ").length > 63 ? <p className={PostStyles['post-details']}>{props.post.content.substring(0, 374)}<Link to={`/events/${props.post._id}`}  state={props.post} className={PostStyles['read-more']}>Read More....</Link></p> : <p className={PostStyles['post-details']}>{props.post.content}</p>}
                {console.log(props.post.content.split("\n"))}
             
                <span className={PostStyles['post-date']}><BsCalendarDate size={15} style={{ marginBottom: '4px' }} />{" "}{props.post.date}</span></div>
                {props.latestPost._id === props.post._id ? <span className={PostStyles['latest-post']}>{"Latest"}<TbUrgent style={{marginBottom: '5px'}}/></span> : null}
            </div>
        </>
    )
}
export default Post;
