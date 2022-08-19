/** @format */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import PostDetailsStyles from "./PostDetails.module.css";
import { ImBackward2 } from "react-icons/im";
import { TbUrgent } from "react-icons/tb";
import axios from "axios";
const PostDetails = () => {
  const params = useParams();
  console.log(params);
  const location = useLocation();
  const navigate = useNavigate();
  const [postSetails, setPostDetails] = useState({});
  console.log(params.id);
  useEffect(() => {
    setPostDetails(location.state);
  }, []);
  return (
    <div className='container'>
      <div className={PostDetailsStyles["post-details-main-container"]}>
        <img
          src={postSetails.article_img}
          className={PostDetailsStyles["post-image-details"]}
          alt='a'
        />
        <div className={PostDetailsStyles["post-details-title"]}>
          {postSetails.title}
          {postSetails.latest ? (
            <span className={PostDetailsStyles["latest-post-badge"]}>
              {"Latest"}
              <TbUrgent style={{ marginBottom: "5px" }} />
            </span>
          ) : null}
        </div>
        <div className={PostDetailsStyles["post-details"]}>
          <p className={PostDetailsStyles["post-paragarph"]}>
            {postSetails.content}
          </p>
        </div>
        <button
          type='button'
          className={PostDetailsStyles["btn"]}
          onClick={() => navigate(-1)}>
          <ImBackward2 size={20} style={{ marginTop: "-3px" }} />
          Back To Posts
        </button>
      </div>
    </div>
  );
};
export default PostDetails;
