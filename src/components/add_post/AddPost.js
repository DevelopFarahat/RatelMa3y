import React, { useEffect, useState } from "react";
import AddPostStyles from "./AddPost.module.css";
import { useTranslation } from "react-i18next";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { RiFolder5Fill } from "react-icons/ri";
import { MdOutlineClear } from "react-icons/md";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import CircleGif from "../../assets/images/check-circle.gif";
import formEmptyFieldSadEmoji from "../../assets/images/emotions.png";
import axios from "axios";

const AddPost = () => {
  const [t, i18n] = useTranslation();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    lang: "ar",
  });
  const [postImage, setPostImage] = useState("");
  const [isUserMadeAPost, setIsUserMadeAPost] = useState(false);
  const [isThereAnyFormFieldEmpty, setIsThereAnyFormFieldEmpty] =
    useState(false);
  const [isThereAnyPostIsUploading, setIsThereAnyPostIsUploading] =
    useState(false);
  const [error, setError] = useState({
    imgError: "",
    titleError: "",
    contentError: "",
  });

  const openFile = (event) => {
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      setPostImage(dataURL);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const clearImagePath = () => {
    setPostImage("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
        let post = {
        article_img: postImage,
        content: postData.content,
        title: postData.title,
        lang: postData.lang,
      };
      if (postImage !== undefined && postImage !== null && postImage !== '' && postData.content !== "" && postData.title !== ""){
        setIsThereAnyPostIsUploading(true);
        axios.post(`${process.env.REACT_APP_BACK_HOST_URL}/api/events`,post).then((res) => {
          console.log(res)
            setIsThereAnyPostIsUploading(false);
            setIsUserMadeAPost(true);
            setTimeout(() => {
              setIsUserMadeAPost(false);
            }, 1000);
            setPostData({
              title: "",
              content: "",
              lang: "ar",
            });
            setPostImage("");
          })
          .catch((err) => console.error(err));
      } else {
        if (postImage === undefined || postImage === null || postImage === '') {
          setIsThereAnyFormFieldEmpty(true);
          setError({
            ...error,
            imgError:t("imageError")
          });
        }
        if (postData.title.length === 0) {
          setError({
            ...error,
            titleError: t("titleError"),
          });
          setIsThereAnyFormFieldEmpty(true);
        }
        if (postData.content.length === 0) {
          setError({
            ...error,
            contentError:t("contentError"),
          });
          setIsThereAnyFormFieldEmpty(true);
        }
      }
      setTimeout(() => {
        setIsUserMadeAPost(false);
      }, 1000);
    
  }
  const distroyPostingFaildAlert = () => {
    setIsThereAnyFormFieldEmpty(false);
  };

  return (
    <>
      {isUserMadeAPost ? (
        <div className={AddPostStyles["post-alert-container"]}>
          <img src={CircleGif} alt="successfull" />
          <span>{t("postedSuccessully")}</span>
        </div>
      ) : isThereAnyFormFieldEmpty ? (
        <div className={AddPostStyles["post-alert-faild-container"]}>
          {error.imgError ? (
            <span>{error.imgError}</span>
          ) : error.titleError ? (
            <span>{error.titleError}</span>
          ) : (
            <span>{error.contentError}</span>
          )}
          <img src={formEmptyFieldSadEmoji} alt="sad_emoji" />
          <button
            type="button"
            className="btn btn-warning"
            onClick={distroyPostingFaildAlert}
          >
            {t("ok")}
          </button>
        </div>
      ) : null}
      <form
        className={AddPostStyles["add-post-main-container"]}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        style={{direction: t("us") === t("Us")?'ltr':'rtl'}}
      >
        <div className={AddPostStyles["image-posting-settings-container"]}>
          <Form.Label htmlFor="postImage">{t("postImage")}</Form.Label>
          <div id="postImage" className={AddPostStyles["post-image-area"]}>
            {postImage ? (
              <img
                src={postImage}
                className={AddPostStyles["image-post"]}
                alt="post_image"
              />
            ) : (
              ""
            )}
          </div>
          <div className={AddPostStyles['btn-post-image-settings']}>
            <div>
              <div className={` ${AddPostStyles["button-container"]}`}>
                <button type="button">
                {t("upload")}{" "}
                  <RiFolder5Fill size={15} style={{margin:" -4px 0px 0 -3px"}} />
                </button>
                <Form.Control
                  type="file"
                  id="file"
                  name="post_img"
                  accept="image/*"
                  onChange={(event) => {openFile(event)}}/>
              </div>
            </div>
            <button
              type="button"
              className={`${AddPostStyles["btn"]} ${AddPostStyles["clear-btn"]}`}
              onClick={clearImagePath}
              style={{ marginTop: "21px" }}
            >
              {t("imagePostClear")} <MdOutlineClear size={20} style={{margin:" -1px 0px 0 -3px"}} />
            </button>
          </div>
        </div>
        <div className={AddPostStyles["post-title-content-container"]}>
          <div>
            <Form.Label htmlFor="postTitle">{t("postTitle")}</Form.Label>
            <Form.Control
              type="text"
              id="postTitle"
              name="title"
              value={postData.title}
              onChange={handleChange}
            />

            <Form.Label htmlFor="postTitle">{t("Language")}</Form.Label>
            <Form.Select
              id="postLang"
              name="lang"
              value={postData.lang}
              onChange={handleChange}
              placeholder={"Choose Language"}
            >
              <option value={"ar"}>عربي</option>
              <option value={"en"}>English</option>
            </Form.Select>
          </div>
          <div>
            <Form.Label htmlFor="postPargraph">{t("content")}</Form.Label>
            <Form.Control
              as="textarea"
              id="postPargraph"
              name="content"
              className={` ${AddPostStyles["post-paragraph-area"]}`}
              value={postData.content}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={AddPostStyles["posting-button-container"]}>
          <button type="submit" className={AddPostStyles["btn"]} style={{float:t("us") === t("Us")?'right':'left'}}>
            {isThereAnyPostIsUploading ? (
              <>
                <Spinner
                  animation="grow"
                  variant="light"
                  style={{ width: "10px", height: "10px", marginLeft: "3px" }}
                />
                <Spinner
                  animation="grow"
                  variant="light"
                  style={{ width: "10px", height: "10px", marginLeft: "3px" }}
                />
                <Spinner
                  animation="grow"
                  variant="light"
                  style={{ width: "10px", height: "10px", marginLeft: "3px" }}
                />
                <Spinner
                  animation="grow"
                  variant="light"
                  style={{ width: "10px", height: "10px", marginLeft: "3px" }}
                />
                <Spinner
                  animation="grow"
                  variant="light"
                  style={{ width: "10px", height: "10px", marginLeft: "3px" }}
                />
                <Spinner
                  animation="grow"
                  variant="light"
                  style={{ width: "10px", height: "10px", marginLeft: "3px" }}
                />
              </>
            ) : (
              <>
                {t("post")}
                <BsFillFileEarmarkPostFill size={15} style={{margin:" -1px 0 0 3px"}}/>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};
export default AddPost;
