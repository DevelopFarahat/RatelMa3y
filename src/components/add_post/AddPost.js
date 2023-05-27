import React, { useEffect, useState, useRef } from "react";
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
import CKEDitor from "../editor/ckeditor";

const AddPost = ({
  isEditeComponentVisible,
  distroyBackrop,
  posInfo,
  setPosInfo,
  setFetchAgain,
}) => {
  const [t, i18n] = useTranslation();
  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    image: "",
    keywords: "",
    summary: "",
    content: "",
    lang: "ar",
  });

  useEffect(() => {
    let dashedTitle = postData.title.trim().replaceAll(" ", "-");
    setPostData({ ...postData, slug: dashedTitle });
  }, [postData.title]);

  const editorRef = useRef(null);

  let editorConfig = {
    language: {
      content: postData.lang,
      ui: t("us") === "Us" ? "en" : "ar",
    },
  };

  const [isUserMadeAPost, setIsUserMadeAPost] = useState(false);
  const [isThereAnyFormFieldEmpty, setIsThereAnyFormFieldEmpty] = useState(false);
  const [isThereAnyPostIsUploading, setIsThereAnyPostIsUploading] =  useState(false);

  const [error, setError] = useState({
    imageError: "",
    titleError: "",
    slugError: "",
    summaryError: "",
    contentError: "",
  });
  const openFile = (event) => {
    
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      !posInfo
        ? setPostData((prev) => ({ ...prev, image: String(dataURL)}))
        : setPosInfo({
          ...posInfo,
          image: String(dataURL),
        });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleChange = (event) => {
    event.stopPropagation();
    console.log("myPost", posInfo);
    posInfo === undefined
      ? setPostData({
        ...postData,
        [event.target.name]: event.target.value,
      })
      : setPosInfo({
        ...posInfo,
        [event.target.name]: event.target.value,
      });
  };

  const clearImagePath = (event) => {
    event.stopPropagation();
    posInfo
      ? setPosInfo({
        ...posInfo,
        image: "",
      })
      : setPostData((prev) => ({
        ...prev,
        image: "",
      }));
  };

  const resetAllPostCriteria = () => {
    setIsThereAnyPostIsUploading(false);
    setIsUserMadeAPost(true);
    setTimeout(() => {
      setIsUserMadeAPost(false);
    }, 1000);
    setPostData({
      title: "",
      content: "",
      image: "",
      slug: "",
      keywords: "",
      summary: "",
      lang: "ar",
    });
    try{
      editorRef.current.setData("");
    }catch(error){
      console.log(error);
    }
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // let contentWithoutBackslash = !posInfo ? postData.content.replace(/(\r\n|\n|\r)/gm, "") : posInfo.content.replace(/(\r\n|\n|\r)/gm, "")
    let post = {
      image: !posInfo ? postData.image : posInfo["image"],
      content: `${!posInfo ? postData.content : posInfo["content"]}`,
      title: !posInfo ? postData.title : posInfo["title"],
      slug: !posInfo ? postData.slug : posInfo["slug"],
      keywords: !posInfo ? postData.keywords : posInfo["keywords"],
      summary: !posInfo ? postData.summary : posInfo["summary"],
      lang: !posInfo ? postData.lang : posInfo["lang"],
    };
    // Validations
    checkIfEmpty("title");
    checkIfEmpty("content");
    checkIfEmpty("summary");
    checkIfEmpty("image");
    // check if all the inputs all not empty
    for (let key in post) {
      if (post[key] === "" && key !== "keywords") return;
    }
    setIsThereAnyPostIsUploading(true);
    if (!posInfo) {
      console.log(post)
      axios.post(`${process.env.REACT_APP_BACK_HOST_URL}/api/events`, post, {headers: { "Access-Control-Allow-Origin": "*" }}).then((res) => {
          resetAllPostCriteria();
        })
        .catch((err) => console.error(err));
    } else {
      axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/events/${posInfo._id}`,post,{ headers: { "Access-Control-Allow-Origin": "*" } } ).then(() => {
          distroyBackrop();
          resetAllPostCriteria();
          setFetchAgain((prev)=>prev+1)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const ckeditorBlurHandle = (event, editor) => {
    const data = editor.getData();
    posInfo === undefined
      ? setPostData({
        ...postData,
        content: data,
      })
      : setPosInfo({
        ...posInfo,
        content: data,
      });
  };

  function checkIfEmpty(name) {
    if (!posInfo ? postData[name] == "" : posInfo[name] == "") {
      setError((prev) => {
        let obj = { ...prev };
        obj[name + "Error"] = t(name + "Error");
        return obj;
      });
      return setIsThereAnyFormFieldEmpty(true);
    }
  }

  const distroyPostingFaildAlert = (event) => {
    event.stopPropagation();
    setIsThereAnyFormFieldEmpty(false);
    setError({
      imageError: "",
      titleError: "",
      slugError: "",
      summaryError: "",
      contentError: "",
    });
  };
  const stopBublingPhase = (e) => {
    e.stopPropagation();
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
          {error.imageError ? (
            <span>{error.imageError}</span>
          ) : error.titleError ? (
            <span>{error.titleError}</span>
          ): error.contentError ? (
            <span>{error.contentError}</span>
          ) : (
            <span>{error.summaryError}</span>
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
        className={`${AddPostStyles["add-post-main-container"]} ${isEditeComponentVisible
            ? AddPostStyles["add-post-main-container-center"]
            : ""
          }`}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        style={{ direction: t("us") === t("Us") ? "ltr" : "rtl" }}
        onClick={stopBublingPhase}
      >
        <div className={AddPostStyles["image-posting-settings-container"]}>
          <Form.Label htmlFor="postImage">{t("postImage")}</Form.Label>
          <div id="postImage" className={AddPostStyles["post-image-area"]}>
            {postData.image && posInfo === undefined ? (
              <img
                src={postData.image}
                className={AddPostStyles["image-post"]}
                alt={"post_image"}
              />
            ) : posInfo !== undefined ? (
              posInfo["image"] !== "" ? (
                <img
                  src={ posInfo["image"]}
                  className={AddPostStyles["image-post"]}
                  alt={"post_image"}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className={`${AddPostStyles["btn-post-image-settings"]} `}>
            <div>
              <div className={` ${AddPostStyles["button-container"]}`}>
                <button type="button">
                  {t("upload")}{" "}
                  <RiFolder5Fill
                    size={15}
                    style={{ margin: "5px 0px 0px -3px" }}
                  />
                </button>
                <Form.Control
                  type="file"
                  id="file"
                  name="post_img"
                  accept="image/*"
  
                  onChange={(event) => {
                    openFile(event);
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              className={`${AddPostStyles["btn"]} ${AddPostStyles["clear-btn"]}`}
              onClick={clearImagePath}
              style={{ marginTop: "21px" }}
            >
              {t("imagePostClear")}{" "}
              <MdOutlineClear size={20} style={{ margin: "4px 0px 0px 0px" }} />
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
              value={!posInfo ? postData.title : posInfo["title"]}
              onChange={handleChange}
            />

            <div className="row col-12 mx-0 mt-3">
              <Form.Label htmlFor="postSlug" className="col-6 mx-0 px-0">
                {t("postSlug")}
                <Form.Control
                  type="text"
                  id="postSlug"
                  name="slug"
                  value={!posInfo ? postData.slug : posInfo["slug"]}
                  onChange={handleChange}
                  style={{marginTop:'5px'}}
                />
              </Form.Label>

              <Form.Label
                htmlFor="postLang"
                className={`col-6 mx-0 px-0 ${t("us") === "Us" ? "ps-2" : "pe-2"
                  }`}
                  
              >
              
                {t("Language")}
              
                <Form.Select
                  id="postLang"
                  name="lang"
                  value={!posInfo ? postData.lang : posInfo["lang"]}
                  onChange={handleChange}
                  placeholder={"Choose Language"}
                  style={{marginTop:'5px'}}
                >
                  <option value={"ar"}>عربي</option>
                  <option value={"en"}>English</option>
                </Form.Select>
                </Form.Label>
            </div>

            <Form.Label htmlFor="postSummary">{t("postSummary")}</Form.Label>
            <Form.Control
              type="text"
              id="postSummary"
              name="summary"
              value={!posInfo ? postData.summary : posInfo["summary"]}
              onChange={handleChange}
            />
            <Form.Label htmlFor="postKeywords">{t("postKeywords")}</Form.Label>
            <Form.Control
              type="text"
              id="postKeywords"
              name="keywords"
              placeholder={t("keywordsExample")}
              value={!posInfo ? postData.keywords : posInfo["keywords"]}
              onChange={handleChange}
            />
          </div>

          <div>
            <Form.Label htmlFor="postPargraph">{t("content")}</Form.Label>
            <CKEDitor
              ref={editorRef}
              name="content"
              id="postPargraph"
              blurF={ckeditorBlurHandle}
              editorConfigProp={editorConfig}
            />

            {/* <Form.Control
              as="textarea"
              id="postPargraph"
              name="content"
              className={` ${AddPostStyles["post-paragraph-area"]}`}
              value={!posInfo ? postData.content : posInfo['content']}
              onChange={handleChange}
              onClick={e => e.stopPropagation()}
            /> */}
          </div>
        </div>
        <div className={AddPostStyles["posting-button-container"]}>
          <button
            type="submit"
            className={AddPostStyles["btn"]}
            style={{ float: t("us") === t("Us") ? "right" : "left" }}
            onClick={(e) => e.stopPropagation()}
          >
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