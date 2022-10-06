import React from "react";
import { Link } from "react-router-dom";
import PostStyles from "./Post.module.css";
import { BsPersonFill } from "react-icons/bs";
import { BsCalendarDate } from "react-icons/bs";
import { TbUrgent } from "react-icons/tb";
import { useTranslation } from "react-i18next";
//
const Post = (props) => {
  const { t } = useTranslation();
  let date = new Date(props.post.date);
  let dateClearified = date.toLocaleString(
    `${t("us") === t("Us") ? "en" : "ar"}`,
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  let link = "";

  function linkify(text) {
    return text?.replace(urlRegex, function (url) {
      link = (
        <a
          href={url}
          target="_blank"
          style={{
            backgroundColor: "#198754",
            padding: 8,
            paddingInline: 16,
            textDecoration: "none",
            fontWeight: 500,
            borderRadius: 4,
            color: "white",
          }}
        >
          {props.post.lang == "ar" ? "الرابط" : "Link"}
        </a>
      );
      return "";
    });
  }

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
                height: 200,
              }}
            >
              {props.post.content.substring(0, 374)}
            </span>
          ) : (
            <p className={PostStyles["post-details"]}>
              {linkify(props.post.content)}
            </p>
          )}

          <span className={PostStyles["post-date"]}>
            <BsCalendarDate size={15} style={{ marginBottom: "4px" }} />{" "}
            {dateClearified}
          </span>
        </div>
        {props.latestPost._id === props.post._id ? (
          <span className={PostStyles["latest-post"]}>
            {t("events_latest")}
            <TbUrgent style={{ marginBottom: "5px" }} />
          </span>
        ) : null}
      </div>
    </Link>
  );
};
export default Post;
