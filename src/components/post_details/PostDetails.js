import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import PostDetailsStyles from "./PostDetails.module.css";
import {IoChevronBack } from "react-icons/io5";
import {TbUrgent} from "react-icons/tb";

const PostDetails = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const [postDetails,setPostDetails] = useState({});
    useEffect(()=>{
       setPostDetails(location.state);
    },[]);
    return(
        <>
        <div className={PostDetailsStyles['post-details-main-container']} style={{direction: postDetails?.lang === 'ar'? "rtl": 'ltr'}}>
            <img src={postDetails.article_img} className={PostDetailsStyles['post-image-details']} alt="Post Image"/>
            <div className={PostDetailsStyles['post-details-title']}>
                {postDetails.title}
                {postDetails.latest?<span className={PostDetailsStyles['latest-post-badge']}>{"Latest"}<TbUrgent style={{marginBottom: '5px'}}/></span>:null}
            </div>
            <div className={PostDetailsStyles['post-details']}><span className={PostDetailsStyles['post-paragarph']}>{postDetails.content}</span></div>
            <button type="button" style={{direction: 'ltr'}} className={PostDetailsStyles['btn']} onClick={()=> navigate(-1)}><IoChevronBack size={20} style={{marginTop:'-3px'}}/>Back To Posts</button>
        </div>
        </>
    )
}
export default PostDetails;