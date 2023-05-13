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


const AddPost = ({ isEditeComponentVisible, posInfo, setPosInfo, setIsEditeComponentVisible, setIsMoreOptionVisible, setFetchAgain }) => {
  const [t, i18n] = useTranslation();
  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    keywords: "",
    summary: "",
    content: "",
    lang: "ar"
  });

  useEffect(() => {
    let dashedTitle = postData.title.trim().replaceAll(" ", "-")
    setPostData({ ...postData, slug: dashedTitle })
  }, [postData.title])
  
  const editorRef = useRef(null)

  let editorConfig = 
    {
      language: {
        content: postData.lang,
        ui: t('us') === 'Us' ? 'en' : 'ar'
      },
    }

  const [postImage, setPostImage] = useState("");
  const [isUserMadeAPost, setIsUserMadeAPost] = useState(false);
  const [isThereAnyFormFieldEmpty, setIsThereAnyFormFieldEmpty] = useState(false);

  // For spinner animations
  const [isThereAnyPostIsUploading, setIsThereAnyPostIsUploading] = useState(true);
  const [startMiddleSpinner, setStartMiddleSpinner] = useState(false);

  useEffect(() => {
      if(isThereAnyPostIsUploading)
      setTimeout(() => {
        setStartMiddleSpinner(true)
      }, 500);
  }, [isThereAnyPostIsUploading])
  
  const [error, setError] = useState({
    imgError: "",
    titleError: "",
    slugError: "",
    summaryError: "",
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
    console.log('myPost', posInfo)
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


  const handleSubmit = async (event) => {
    event.preventDefault();

    // let contentWithoutBackslash = !posInfo ? postData.content.replace(/(\r\n|\n|\r)/gm, "") : posInfo.content.replace(/(\r\n|\n|\r)/gm, "")
    let post = {
      article_img: !posInfo ? postImage : posInfo['article_img'],
      content: `${!posInfo ? postData.content : posInfo['content']}`,
      title: !posInfo ? postData.title : posInfo['title'],
      slug: !posInfo ? postData.slug : posInfo['slug'],
      keywords: !posInfo ? postData.keywords : posInfo['keywords'],
      summary: !posInfo ? postData.summary : posInfo['summary'],
      lang: !posInfo ? postData.lang : posInfo['lang'],
    };

    // Validations
    
    checkIfEmpty('title')
    checkIfEmpty('content')
    checkIfEmpty('summary')
    
    if (!posInfo ? postImage === undefined || postImage === '' : posInfo.article_img !== "") {
      setError({
        ...error,
        imgError: t("imageError")
      });
      return setIsThereAnyFormFieldEmpty(true);
    }
    if(isThereAnyFormFieldEmpty) return console.log("can't");


    // Uploading Post

    setIsThereAnyPostIsUploading(true);
    
    let res;
    try{

      if (!posInfo) {
        res = await axios.post(`${process.env.REACT_APP_BACK_HOST_URL}/api/events`, post, { headers: { 'Access-Control-Allow-Origin': '*' } })
      } else {
        res = await axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/events/${posInfo._id}`, post, { headers: { 'Access-Control-Allow-Origin': '*' } })
        setIsMoreOptionVisible(false);
        setFetchAgain(current => current + 1);
      }
      
    setIsThereAnyPostIsUploading(false);
    setIsUserMadeAPost(true);
    setTimeout(() => {
      setIsUserMadeAPost(false);
      if (!posInfo) setIsEditeComponentVisible(false);
    }, 1000);

    setPostData({
      title: "",
      content: "",
      slug: "",
      keywords: "",
      summary: "",
      lang: "ar",
    });
    editorRef.current.setData('')
    setPostImage("")

    }catch(e){
      alert(e, res.data)
    }
  }

  const ckeditorBlurHandle = (event, editor) => {
    const data = editor.getData();
    posInfo === undefined ?
      setPostData({
        ...postData,
        content: data,
      }) : setPosInfo({
        ...posInfo,
        content: data
      })
  }


  function checkIfEmpty(name) {
    console.log('check on', name)
    if (!posInfo ? postData[name].length === 0 : posInfo[name].length === 0) {
      setError((prev) => {
        let obj = { ...prev }
        obj[name+"Error"] = t(name + "Error")
        console.log('validation obj', obj)
        return obj
      });
      return setIsThereAnyFormFieldEmpty(true);
    }
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
        className={`${AddPostStyles["add-post-main-container"]} ${setIsEditeComponentVisible ? AddPostStyles["add-post-main-container-center"] : ''}`}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        style={{ direction: t("us") === t("Us") ? 'ltr' : 'rtl' }}
      >
        <div className={AddPostStyles["image-posting-settings-container"]}>
          <Form.Label htmlFor="postImage">{t("postImage")}</Form.Label>
          <div id="postImage" className={AddPostStyles["post-image-area"]}>
            {postImage && posInfo === undefined ? (
              <img
                src={postImage}
                className={AddPostStyles["image-post"]}
                alt={"post_image"}
              />
            ) : posInfo !== undefined ? (
              posInfo['article_img'] !== "" ? <img
                src={posInfo['article_img']}
                className={AddPostStyles["image-post"]}
                alt={"post_image"}
              /> : ''
            ) : (
              ""
            )}
          </div>
          <div className={`${AddPostStyles['btn-post-image-settings']} `}>
            <div>
              <div className={` ${AddPostStyles["button-container"]}`}>
                <button type="button">
                  {t("upload")}{" "}
                  <RiFolder5Fill size={15} style={{ margin: "5px 0px 0px -3px" }} />
                </button>
                <Form.Control
                  type="file"
                  id="file"
                  name="post_img"
                  accept="image/*"
                  onClick={e => e.stopPropagation()}
                  onChange={(event) => { openFile(event) }} />
              </div>
            </div>
            <button
              type="button"
              className={`${AddPostStyles["btn"]} ${AddPostStyles["clear-btn"]}`}
              onClick={clearImagePath}
              style={{ marginTop: "21px" }}
            >
              {t("imagePostClear")} <MdOutlineClear size={20} style={{ margin: "4px 0px 0px 0px" }} />
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
              value={!posInfo ? postData.title : posInfo['title']}
              onChange={handleChange}
              onClick={e => e.stopPropagation()}
            />

            <div className="row col-12 mx-0 mt-3">

              <Form.Label htmlFor="postSlug" className="col-9 mx-0 px-0">{t("postSlug")}
                <Form.Control
                  type="text"
                  id="postSlug"
                  name="slug"
                  value={!posInfo ? postData.slug : posInfo['slug']}
                  onChange={handleChange}
                  onClick={e => e.stopPropagation()}
                />
              </Form.Label>

              <Form.Label htmlFor="postLang" className={`col-3 mx-0 px-0 ${t('us')=== "Us"? 'ps-2':'pe-2'}`}>{t("Language")}
                <Form.Select
                  id="postLang"
                  name="lang"
                  value={!posInfo ? postData.lang : posInfo['lang']}
                  onChange={handleChange}
                  onClick={e => e.stopPropagation()}
                  placeholder={"Choose Language"}
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
              value={!posInfo ? postData.summary : posInfo['summary']}
              onChange={handleChange}
              onClick={e => e.stopPropagation()}
            />
            <Form.Label htmlFor="postKeywords">{t("postKeywords")}</Form.Label>
            <Form.Control
              type="text"
              id="postKeywords"
              name="keywords"
              placeholder={t('keywordsExample')}
              value={!posInfo ? postData.keywords : posInfo['keywords']}
              onChange={handleChange}
              onClick={e => e.stopPropagation()}
            />
          </div>

          <div>

            <Form.Label htmlFor="postPargraph">{t("content")}</Form.Label>
            <CKEDitor ref={editorRef} name="content" id="postPargraph" blurF={ckeditorBlurHandle} editorConfigProp={editorConfig}/>

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
          <button type="submit" className={AddPostStyles["btn"]} style={{ float: t("us") === t("Us") ? 'right' : 'left' }} onClick={e => e.stopPropagation()}>
            {!isThereAnyPostIsUploading ? (
              <>
                <Spinner
                  animation="grow"
                  variant="light"
                  style={{ width: "10px", height: "10px", marginLeft: "3px" }}
                />
                {startMiddleSpinner? (
                <Spinner
                  animation="grow"
                  variant="light"
                  style={{ width: "10px", height: "10px", marginLeft: "3px" }}
                />):<></>
              }
                
               
                <Spinner
                  animation="grow"
                  variant="light"
                  style={{ width: "10px", height: "10px", marginLeft: "3px" }}
                />
              </>
            ) : (
              <>
                {t("post")}
                <BsFillFileEarmarkPostFill size={15} style={{ margin: "5px 4px 0px 3px" }} />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};
export default AddPost;
