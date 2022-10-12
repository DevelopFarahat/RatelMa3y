import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import PostDetailsStyles from "./PostDetails.module.css";
import { IoChevronBack } from "react-icons/io5";
import { TbUrgent } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const PostDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [postDetails, setPostDetails] = useState({});
  useEffect(() => {
    setPostDetails(location.state);
  }, []);

  //Find link and separate it in new item
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  let link = "";

  function linkify(text) {
    return text?.replace(urlRegex, function (url) {
      link = <a href={url} target="_blank" style={{backgroundColor: '#198754',padding: 8,paddingInline: 16,textDecoration: 'none',fontWeight:500, borderRadius: 4,color:'white'}}>{postDetails.lang == 'ar'? 'الرابط':'Link'}</a>
      return ""
    });
  }

  return (
    <>
      <div className={PostDetailsStyles["post-details-main-container"]}>
        <img
          src={postDetails.article_img}
          className={PostDetailsStyles["post-image-details"]}
          alt="Post Image"
        />
        <div
          className={PostDetailsStyles["post-details-title"]}
          style={{ direction: postDetails?.lang === "ar" ? "rtl" : "ltr" }}
        >
          {postDetails.title}
          {postDetails.latest ? (
            <span className={PostDetailsStyles["latest-post-badge"]}>
              {t("events_latest")}
              <TbUrgent style={{ marginBottom: "5px" }} />
            </span>
          ) : null}
        </div>
        <div
          className={PostDetailsStyles["post-details"]}
          style={{ direction: postDetails?.lang === "ar" ? "rtl" : "ltr" }}
        >
          <span className={PostDetailsStyles["post-paragarph"]}>
            {linkify(postDetails.content)}
          </span>
          {link !== "" && <span>{link}</span>}
        </div>
        <button
          type="button"
          style={{ direction: "ltr" }}
          className={PostDetailsStyles["btn"]}
          onClick={() => navigate(-1)}
        >
          <IoChevronBack size={20} style={{ marginTop: "3px" }} />
          {t("events_back")}
        </button>
      </div>
    </>
  );
};
export default PostDetails;
