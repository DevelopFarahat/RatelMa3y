import React, { useEffect, useState } from "react";
import AddPostStyles from "./AddPost.module.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { RiFolder5Fill } from "react-icons/ri";
import { MdOutlineClear } from "react-icons/md";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import CircleGif from "../../assets/images/check-circle.gif";
import formEmptyFieldSadEmoji from "../../assets/images/emotions.png";
import axios from "axios";

const AddPost = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    lang: "ar",
  });
  const [img, setImg] = useState();
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
    setImg(null);
    setPostImage("");
  };

  //Submit the form

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsThereAnyPostIsUploading(true);

    if (!img) return console.error("No image selected");

    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      return console.error("AHHHHHHHH!!");
    };

    function uploadImage(img) {
      // console.log(img);
      let cc = {
        article_img: img,
        content: postData.content,
        title: postData.title,
        lang: postData.lang,
        //date:new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      console.log(cc);

      //Upload on the server

      if (
        img !== undefined &&
        img !== null &&
        postData.content !== "" &&
        postData.title !== ""
      ) {
        axios
          .post(`${process.env.REACT_APP_BACK_HOST_URL}/api/events`, cc)
          .then((res) => {
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
            setImg(null);
            setPostImage("");
          })
          .catch((err) => console.error(err));
      } else {
        if (img === undefined || img === null) {
          setIsThereAnyFormFieldEmpty(true);
          setError({
            ...error,
            imgError: "Please Set Post Image",
          });
        }
        if (postData.title.length === 0) {
          setError({
            ...error,
            titleError: "Please Set Post Title",
          });
          setIsThereAnyFormFieldEmpty(true);
        }
        if (postData.content.length === 0) {
          setError({
            ...error,
            contentError: "Please Set Post Content",
          });
          setIsThereAnyFormFieldEmpty(true);
        }
      }
      setTimeout(() => {
        setIsUserMadeAPost(false);
      }, 1000);
    }
  };
  const distroyPostingFaildAlert = () => {
    setIsThereAnyFormFieldEmpty(false);
  };

  return (
    <>
      {isUserMadeAPost ? (
        <div className={AddPostStyles["post-alert-container"]}>
          <img src={CircleGif} alt="successfull" />
          <span>Posted Successfully</span>
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
            OK
          </button>
        </div>
      ) : null}
      <form
        className={AddPostStyles["add-post-main-container"]}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
      >
        <div className={AddPostStyles["image-posting-settings-container"]}>
          <Form.Label htmlFor="postImage">Post Image</Form.Label>
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
          <div>
            <div className={AddPostStyles["button-group"]}>
              <div className={` ${AddPostStyles["button-container"]}`}>
                <button type="button">
                  Upload{" "}
                  <RiFolder5Fill size={15} style={{ marginTop: "-3px" }} />
                </button>
                <Form.Control
                  type="file"
                  id="file"
                  name="post_img"
                  onChange={(event) => {
                    setImg(event.target.files[0]);
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
              Clear <MdOutlineClear size={15} style={{ marginTop: "-3px" }} />
            </button>
          </div>
        </div>
        <div className={AddPostStyles["post-title-content-container"]}>
          <div>
            <Form.Label htmlFor="postTitle">Title</Form.Label>
            <Form.Control
              type="text"
              id="postTitle"
              name="title"
              value={postData.title}
              onChange={handleChange}
            />

            <Form.Label htmlFor="postTitle">Language</Form.Label>
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
            <Form.Label htmlFor="postPargraph">Content</Form.Label>
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
          <button type="submit" className={AddPostStyles["btn"]}>
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
                Post
                <BsFillFileEarmarkPostFill size={15} />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};
export default AddPost;
