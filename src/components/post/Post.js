import React from "react";
import { Link } from "react-router-dom";
import PostStyles from "./Post.module.css";
import { BsPersonFill } from "react-icons/bs";
import { BsCalendarDate } from "react-icons/bs";
import {TbUrgent} from "react-icons/tb";
   //
const Post = (props) => {

  let date = new Date(props.post.date);
  let dateClearified = date.toLocaleString("default", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  //  Privacy and Security
  return (
    <Link
      to={`/events/${props.post._id}`}
      state={props.post}
      className={PostStyles["read-more"]}
      style={{
        cursor: "auto",
        textDecoration: "none",
        width: "100%",
        backgroundImage: "linear-gradient(to left,#f9f9f9, #ffffff)",
      }}
    >
      {props.post._id === props.latestPost._id
        ? (props.post.latest = true)
        : null}
      <div className={PostStyles["post-main-container"]}>
        <img
          src={props.post.article_img}
          className={`${PostStyles["post-image"]}`}
          style={{
            cursor: "pointer",
          }}
          alt="dd"
        />
        <div style={{ minHeight: "100%" }}>
          <h3
            className={PostStyles["post-header"]}
            style={{
              cursor: "pointer",
            }}
          >
            {props.post.title}
          </h3>
          {props.post.content.split(" ").length > 63 ? (
            <span
              className={PostStyles["post-details"]}
              style={{
                cursor: "pointer",
                height: 200
              }}
            >
              {props.post.content.substring(0, 374)}
            </span>
          ) : (
            <p className={PostStyles["post-details"]}>{props.post.content}</p>
          )}

          <span className={PostStyles["post-date"]}>
            <BsCalendarDate size={15} style={{ marginBottom: "4px" }} />{" "}
            {dateClearified}
          </span>
        </div>
        {props.latestPost._id === props.post._id ? (
          <span className={PostStyles["latest-post"]}>
            {"Latest"}
            <TbUrgent style={{ marginBottom: "5px" }} />
          </span>
        ) : null}
      </div>
    </Link>
  );
};
export default Post;
