import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";

import UserContext from "../../utils/UserContext";
import PostBoardStyles from "./PostsBoard.module.css";
import WarningIcon from "../../assets/images/warning.png";
import CircleGif from "../../assets/images/check-circle.gif";
import AddPost from "../add_post/AddPost";
import Post from "../post/Post";
import Modal from 'react-bootstrap/Modal';

const PostsBoard = () => {
  const { isLoading, setIsLoading } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [deleteAlertConfirmation, setAlertDeleteConfirmation] = useState(false);
  const [donnotAskmeAgain, setDonotAskmeAgain] = useState(false);
  const [donnotAskmeAgainChecked, setDonotAskmeAgainChecked] = useState(false);
  const [selectedPostMoreOption, setSelectedPostMoreOption] = useState(-1);
  const [isEditeComponentVisible, setIsEditeComponentVisible] = useState(false);
  const [isUserDeleteAnyPost, setIsUserDeleteAnyPost] = useState(false);
  const [posId, setPosId] = useState("");
  const { user } = useContext(UserContext)
  const [posInfo, setPosInfo] = useState({});
  const [fetchAgain,setFetchAgain] = useState(false);
  const [t, i18n] = useTranslation();
  const handleDonnotAskmeAgainChange = (event) => {
    setDonotAskmeAgainChecked((current) => !current);
    if (event.target.checked) {
      setDonotAskmeAgain(true);
    } else {
      setDonotAskmeAgain(false);
    }
  };

  let page = 1,
    postsCount = undefined,
    currentCount = undefined;

  useEffect(() => {
    fetchPosts(page);
  }, [fetchAgain]);

  async function fetchPosts(page) {
    setIsLoading(true);

    try {
      let res = await axios.get(
        `${process.env.REACT_APP_BACK_HOST_URL}/api/events?page=${page}`
      );

      let postsArr = res.data.data;
      setPosts((prev) => {
        let parr = [...prev, ...postsArr];
        currentCount = parr.length;
        return parr;
      });
      postsCount = res.data.count;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      return [currentCount, postsCount];
    }
  }

  //To observe last item
  const observer = useRef();

  const lastPostElementRef = useCallback((node) => {
    if (isLoading) return;

    if (posts.length >= postsCount) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        //To prevent excess page loading
        if (currentCount !== undefined && currentCount >= postsCount)
          return setIsLoading(false);

        let resObj = fetchPosts(page + 1);
        currentCount = resObj[0];
        postsCount = resObj[1];
        page = page + 1;
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const handleMoreOptionVisibility = (event) => {
    event.stopPropagation();
    setSelectedPostMoreOption(event.currentTarget.id);
  };
  const handleEditComponentVisibility = (event, postObji) => {
    event.stopPropagation();
    setIsEditeComponentVisible(true);
    getSpecificPostDetails(postObji);
  };
  const getSpecificPostDetails = (pObji) => {
    
   
    let blogPost = {
      title: pObji.title,
      content: pObji.content,
      image: pObji.article_img,
      slug: pObji.slug,
      keywords: pObji.keywords,
      summary: pObji.summary,
      lang: pObji.lang,
    }
  
    setPosInfo(blogPost);
  };
  const distroyBackrop = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setSelectedPostMoreOption(-1);
    setIsEditeComponentVisible(false);
    setPosInfo({});
  };

  const deletePost = (event, postId) => {
    event.stopPropagation();
    setSelectedPostMoreOption(-1);
    if (postId !== undefined) {
      setPosId(postId);
    }
    if (donnotAskmeAgain === false || event.currentTarget.value === "confirm") {
      if (event.currentTarget.value === "cancel") {
        setAlertDeleteConfirmation(false);
      } else {
        setAlertDeleteConfirmation(true);
      }
    } else {
      setAlertDeleteConfirmation(false);
    }
    if (event.currentTarget.value === "confirm" || donnotAskmeAgain === true) {
      let pId = postId === undefined ? posId : postId;
      axios
        .delete(`${process.env.REACT_APP_BACK_HOST_URL}/api/events/${pId}`)
        .then(() => {
          console.log("deleted successfully")
          setAlertDeleteConfirmation(false);
          setIsUserDeleteAnyPost(true);
          setTimeout(() => {
            setIsUserDeleteAnyPost(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className={PostBoardStyles["post-board"]}>
        {posts?.map((post, index, arr) => {
          return (
            <div
              ref={lastPostElementRef}
              dir={t("us") === t("Us") ? "ltr" : "rtl"}
              style={{
                width: "100%",
                position: "relative",
                backgroundImage: "linear-gradient(to left,#f9f9f9, #ffffff)",

              }}
              className="d-flex justify-content-between"
              key={post._id}
              
            >
              <Post post={post} latestPost={arr[0]} />
              
         
                {user && user?.privileges === "Admin" ? (
                  <>
                    <button
                      className={PostBoardStyles["post-more-option"]}
                     
                      id={post._id}
                      onClick={handleMoreOptionVisibility}
                    >
                      ...
                    </button>
                    <ul
                      className={`${selectedPostMoreOption === post._id 
                        ?PostBoardStyles["more-option-menu-list"]:PostBoardStyles['more-option-menu-list-hidden']}`}
                        style={{left:t("us")===t("Us")?"calc(100% - 170px)":"7px"}}
                    >
                      <li
                        onClick={(event) =>
                          handleEditComponentVisibility(event, {...post,postArrIndex:index})
                        }
                        style={{textAlign:t("US") === t("Us")?'end':'start'}}
                      >
                        {t("edit")}
                      </li>
                      <li
                        onClick={(event) => deletePost(event, post._id)}
                        style={{textAlign:t("US") === t("Us")?'end':'start'}}
                      >
                        {t("delete")}
                      </li>
                    </ul>
                  </>
                ) : null}
                   
                      </div>
          )
        })}
        {isUserDeleteAnyPost ? (
          <div className={PostBoardStyles["alert-container"]}>
            <img src={CircleGif} alt="successfull" />
            <span>
              <span style={{ fontWeight: "bold", color: "#198754" }}>
                {localStorage.getItem("user_name")}
              </span>{" "}
              {t("has deleted post successfully")}
            </span>
          </div>
        ) : null}
        {deleteAlertConfirmation ? (
          <div
            className={`${PostBoardStyles["alert-container"]} ${PostBoardStyles["warning-alert"]}`}
          >
            <section>
              <img src={WarningIcon} alt="warning" />
              <span>{t("are you Sure you want to delete this postt")}</span>
            </section>
            <section style={{ width: t("us") === t("Us") ? "98%" : "88%" }}>
              <Form.Check
                checked={donnotAskmeAgainChecked}
                name="donotAskmeAgain"
                id="donotAskmeAgain"
                onChange={handleDonnotAskmeAgainChange}
              />
              <Form.Label htmlFor="donotAskmeAgain">
                {t("don't ask me again!")}
              </Form.Label>
            </section>
            <section style={{ direction: t("us") === t("Us") ? "ltr" : "rtl" }}>
              <button
                type="submit"
                className={PostBoardStyles["btn"]}
                value={"confirm"}
                onClick={deletePost}
              >
                {t("confirm")}
              </button>
              <button
                type="submit"
                value={"cancel"}
                className={PostBoardStyles["btn"]}
                onClick={deletePost}
              >
                {t("cancel")}
              </button>
            </section>
          </div>
        ) : null}
      </div>
      {isEditeComponentVisible ? (
      
      <div
      className={PostBoardStyles["backdrop"]}
      onClick={(event) => {
        distroyBackrop(event);
        event.stopPropagation();
      }}
    >
             <AddPost
                isEditeComponentVisible={isEditeComponentVisible}
                posInfo={posInfo}
                setPosInfo={setPosInfo}
                setIsEditeComponentVisible={setIsEditeComponentVisible}
              setSelectedPostMoreOption={setSelectedPostMoreOption}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              />
      </div>

         
 
 
     
      ) : null}
    </>
  );
};
export default PostsBoard;
