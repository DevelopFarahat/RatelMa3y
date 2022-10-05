import React from "react";
import { Link } from "react-router-dom";
import PostStyles from "./Post.module.css";
import { BsPersonFill } from "react-icons/bs";
import { BsCalendarDate } from "react-icons/bs";
import {TbUrgent} from "react-icons/tb";
import { useTranslation } from "react-i18next";
   //
const Post = (props) => {

  const {t} = useTranslation()
  let date = new Date(props.post.date);
  let dateClearified =  date.toLocaleString(`${t("us") === t("Us")?'en':'ar'}`, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
let extractLinkFromThePostContent = /https?:\/\/[^\s"<>]+/;

console.log(props.post.content.match(extractLinkFromThePostContent));
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
            <p className={PostStyles["post-details"]}>{props.post.content}{props.post.content.match(extractLinkFromThePostContent) !== null?<a  href={props.post.content.match(extractLinkFromThePostContent)[0]} target="_blank">{props.post.content.match(extractLinkFromThePostContent)[0]}</a>:null}</p>
          )}

          <span className={PostStyles["post-date"]}>
            <BsCalendarDate size={15} style={{ marginBottom: "4px" }} />{" "}
            {dateClearified}
          </span>
        </div>
        {props.latestPost._id === props.post._id ? (
          <span className={PostStyles["latest-post"]}>
            {t('events_latest')}
            <TbUrgent style={{ marginBottom: "5px" }} />
          </span>
        ) : null}
      </div>
    </Link>
  )
};
export default Post;
