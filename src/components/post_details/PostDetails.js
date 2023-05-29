import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import PostDetailsStyles from "./PostDetails.module.css";
import { IoChevronBack } from "react-icons/io5";
import { TbUrgent } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import HeadTags from "../head/Head";

const PostDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    let abortController;
    abortController = new AbortController();
    (async () => {
      let signal = abortController.signal;
      axios
        .get(`${process.env.REACT_APP_BACK_HOST_URL}/api/events/${params.slug}`, { signal: signal })
        .then((res) => setPostDetails(res.data))
    })();

    return () => abortController?.abort();
  }, []);

  //Find link and separate it in new item
  // const urlRegex =
  //   /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  let link = "";

  return (
    <>
      <Helmet>
        {HeadTags({ title: postDetails.title, summary: postDetails.summary, url: `${process.env.REACT_APP_FRONT_HOST_URL}/blog/${postDetails.slug}`, img: postDetails.image, keywords: postDetails.keywords })}
      </Helmet>

      <div className={PostDetailsStyles["post-details-main-container"]}>
        <img
          src={postDetails.image}
          className="rounded-4 w-100"
          style={{ maxHeight: '60vh', objectFit: 'cover' }}
          alt="article content"
        />

        <h5
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
        </h5>
        {/* TODO here should be you incoming html page */}
        <div
          className={PostDetailsStyles["post-details"]}
          style={{ direction: postDetails?.lang === "ar" ? "rtl" : "ltr" }}
        >
          <span className={PostDetailsStyles["post-paragarph"]}>
            {<div dangerouslySetInnerHTML={{ __html: postDetails.content }}></div>}
          </span>
          {link !== "" && <span>{link}</span>}
        </div>


        <Link
          to="/blog"
          type="button"
          style={{ direction: "ltr" }}
          className={PostDetailsStyles["btn"]}
        >

          <IoChevronBack size={20} style={{ marginTop: "3px" }} />
          {t("events_back")}
        </Link>
      </div>
    </>
  );
};
export default PostDetails;