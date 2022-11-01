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

const AddPost = ({ isEditeComponentVisible, posInfo, setPosInfo, setIsEditeComponentVisible, setIsMoreOptionVisible, setFetchAgain }) => {
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
      !posInfo ? setPostImage(dataURL) : setPosInfo({
        ...posInfo,
        article_img: dataURL
      })

    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const handleChange = (event) => {
    event.stopPropagation();
    posInfo === undefined ?
      setPostData({
        ...postData,
        [event.target.name]: event.target.value,
      }) : setPosInfo({
        ...posInfo,
        [event.target.name]: event.target.value
      })
  };

  const clearImagePath = (event) => {
    event.stopPropagation();
    posInfo ? setPosInfo({
      ...posInfo,
      article_img: ''
    }) : setPostImage("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    let contentWithoutBackslash = !posInfo? postData.content.replace(/(\r\n|\n|\r)/gm, "") : posInfo.content.replace(/(\r\n|\n|\r)/gm, "")
    let post = {
      article_img: !posInfo ? postImage : posInfo['article_img'],
      content: contentWithoutBackslash,
      title: !posInfo ? postData.title : posInfo['title'],
      lang: !posInfo ? postData.lang : posInfo['lang'],
    };

    if ((!posInfo ? postImage !== undefined && postImage !== '' : posInfo['article_img']) && (!posInfo ? postData.content !== "" : posInfo.content !== "") && (!posInfo ? postData.title !== "" : posInfo.title !== "")) {
      setIsThereAnyPostIsUploading(true);
      if (!posInfo) {
        axios.post(`${process.env.REACT_APP_BACK_HOST_URL}/api/events`, post, { headers: { 'Access-Control-Allow-Origin': '*' } }).then((res) => {
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
        axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/events/${posInfo._id}`, post, { headers: { 'Access-Control-Allow-Origin': '*' } }).then(() => {
          setIsThereAnyPostIsUploading(false);
          setIsMoreOptionVisible(false);
          setFetchAgain(current => current + 1);
          setIsUserMadeAPost(true);
          setTimeout(() => {
            setIsUserMadeAPost(false);
            setIsEditeComponentVisible(false);
          }, 1000);
          setPostData({
            title: "",
            content: "",
            lang: "ar",
          });
          setPostImage("");
        }).catch((error) => {
          console.log(error)
        })
      }
    } else {
      if (!posInfo ? postImage === undefined || postImage === '' : posInfo.article_img !== "") {
        setIsThereAnyFormFieldEmpty(true);
        setError({
          ...error,
          imgError: t("imageError")
        });
      }
       if (!posInfo ? postData.title.length === 0 : posInfo.title.length === 0) {
        setError({
          ...error,
          titleError: t("titleError"),
        });
        setIsThereAnyFormFieldEmpty(true);
      }
      
      if(!posInfo ? postData.content.length === 0 : posInfo.content.length === 0) {
        setError({
          ...error,
          contentError: t("contentError"),
        });
        setIsThereAnyFormFieldEmpty(true);
      }
    }
    setTimeout(() => {
      setIsUserMadeAPost(false);
    }, 1000);


  }
  const distroyPostingFaildAlert = (event) => {
    event.stopPropagation();
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
        className={`${AddPostStyles["add-post-main-container"]} ${setIsEditeComponentVisible?AddPostStyles["add-post-main-container-center"]:''}`}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        style={{direction: t("us") === t("Us")?'ltr':'rtl'}}
      >
        <div className={AddPostStyles["image-posting-settings-container"]}>
          <Form.Label htmlFor="postImage">{t("postImage")}</Form.Label>
          <div id="postImage" className={AddPostStyles["post-image-area"]}>
            {postImage && posInfo === undefined? (
              <img
                src={postImage}
                className={AddPostStyles["image-post"]}
                alt={"post_image"}
              />
            ):posInfo !== undefined?(
              posInfo['article_img'] !== ""?<img
              src={posInfo['article_img']}
              className={AddPostStyles["image-post"]}
              alt={"post_image"}
            />:''
            ):(
              ""
            )}
          </div>
          <div className={`${AddPostStyles['btn-post-image-settings']} `}>
            <div>
              <div className={` ${AddPostStyles["button-container"]}`}>
                <button type="button">
                {t("upload")}{" "}
                  <RiFolder5Fill size={15} style={{margin:"5px 0px 0px -3px"}} />
                </button>
                <Form.Control
                  type="file"
                  id="file"
                  name="post_img"
                  accept="image/*"
                  onClick={e=>e.stopPropagation()}
                  onChange={(event) => {openFile(event)}}/>
              </div>
            </div>
            <button
              type="button"
              className={`${AddPostStyles["btn"]} ${AddPostStyles["clear-btn"]}`}
              onClick={clearImagePath}
              style={{ marginTop: "21px" }}
            >
              {t("imagePostClear")} <MdOutlineClear size={20} style={{margin:"4px 0px 0px 0px"}} />
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
              value={!posInfo?postData.title:posInfo['title']}
              onChange={handleChange}
              onClick={e=>e.stopPropagation()}
            />

            <Form.Label htmlFor="postTitle">{t("Language")}</Form.Label>
            <Form.Select
              id="postLang"
              name="lang"
              value={!posInfo?postData.lang:posInfo['lang']}
              onChange={handleChange}
              onClick={e=>e.stopPropagation()}
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
              value={!posInfo?postData.content:posInfo['content']}
              onChange={handleChange}
              onClick={e=>e.stopPropagation()}
            />
          </div>
        </div>
        <div className={AddPostStyles["posting-button-container"]}>
          <button type="submit" className={AddPostStyles["btn"]} style={{float:t("us") === t("Us")?'right':'left'}}   onClick={e=>e.stopPropagation()}>
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
                <BsFillFileEarmarkPostFill size={15} style={{margin:"5px 4px 0px 3px"}}/>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};
export default AddPost;
