import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import Post from "../post/Post";
import PostBoardStyles from "./PostsBoard.module.css";
import axios from "axios";
import UserContext from "../../utils/UserContext";
import WarningIcon from "../../assets/images/warning.png";
import { useTranslation } from "react-i18next";
import CircleGif from "../../assets/images/check-circle.gif";
import Form from "react-bootstrap/Form";
import AddPost from "../add_post/AddPost";

const PostsBoard = () => {
  const { isLoading, setIsLoading } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isMoreOptionVisible, setIsMoreOptionVisible] = useState(false);
  const [deleteAlertConfirmation, setAlertDeleteConfirmation] = useState(false);
  const [donnotAskmeAgain, setDonotAskmeAgain] = useState(false);
  const [donnotAskmeAgainChecked, setDonotAskmeAgainChecked] = useState(false);
  const [selectedPostMoreOption, setSelectedPostMoreOption] = useState(-1);
  const [isEditeComponentVisible, setIsEditeComponentVisible] = useState(false);
  const [isUserDeleteAnyPost, setIsUserDeleteAnyPost] = useState(false);
  const [posId, setPosId] = useState("");
  const [fetchAgain, setFetchAgain] = useState(0);
  const { user } = useContext(UserContext)
  const [posInfo, setPosInfo] = useState({});
  const styles = {
    moreOptionVisible: {
      display: "flex",
    },
    moreOptionHidden: {
      display: "none",
    },
  };
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
    setIsMoreOptionVisible((current) => !current);
  };
  const handleEditComponentVisibility = (event, pId) => {
    event.stopPropagation();
    setIsEditeComponentVisible(true);
    getSpecificPostDetails(pId);
  };
  const getSpecificPostDetails = (postId) => {
    axios
      .get(`${process.env.REACT_APP_BACK_HOST_URL}/api/events/${postId}`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        setPosInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const distroyBackrop = (event) => {
    event.stopPropagation();
    setSelectedPostMoreOption(-1);
    setIsMoreOptionVisible((current) => !current);
    setIsEditeComponentVisible(false);
    setPosInfo({});
  };
  const deletePost = (event, postId) => {
    event.stopPropagation();
    setIsMoreOptionVisible(false);
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
          setAlertDeleteConfirmation(false);
          setFetchAgain(fetchAgain + 1);
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
          if (index === posts.length - 1)
            return (
              <div
                ref={lastPostElementRef}
                style={{
                  width: "100%",
                  position: "relative",
                }}
                key={post._id}
              >
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
                      className={PostBoardStyles["more-option-menu-list"]}
                      style={
                        selectedPostMoreOption === post._id &&
                        isMoreOptionVisible
                          ? styles.moreOptionVisible
                          : styles.moreOptionHidden
                      }
                    >
                      <li
                        onClick={(event) =>
                          handleEditComponentVisibility(event, post._id)
                        }
                        style={{
                          textAlign: t("us") === t("Us") ? "start" : "end",
                          padding:
                            t("us") === t("Us") ? "0 0 0 10px" : "0 10px 0 0",
                        }}
                      >
                        {t("edit")}
                      </li>
                      <li
                        onClick={(event) => deletePost(event, post._id)}
                        style={{
                          textAlign: t("us") === t("Us") ? "start" : "end",
                          padding:
                            t("us") === t("Us") ? "0 0 0 10px" : "0 10px 0 0",
                        }}
                      >
                        {t("delete")}
                      </li>
                    </ul>
                  </>
                ) : null}
                <Post post={post} latestPost={arr[0]} />
              </div>
            );
          else
            return (
              <div
                style={{
                  width: "100%",
                  position: "relative",
                }}
                key={post._id}
              >
                <button
                  className={PostBoardStyles["post-more-option"]}
                  id={post._id}
                  onClick={handleMoreOptionVisibility}
                >
                  ...
                </button>
                <ul
                  className={PostBoardStyles["more-option-menu-list"]}
                  style={
                    selectedPostMoreOption === post._id && isMoreOptionVisible
                      ? styles.moreOptionVisible
                      : styles.moreOptionHidden
                  }
                >
                  <li
                    onClick={(event) =>
                      handleEditComponentVisibility(event, post._id)
                    }
                    style={{
                      textAlign: t("us") === t("Us") ? "start" : "end",
                      padding:
                        t("us") === t("Us") ? "0 0 0 10px" : "0 10px 0 0",
                    }}
                  >
                    {t("edit")}
                  </li>
                  <li
                    onClick={(event) => deletePost(event, post._id)}
                    style={{
                      textAlign: t("us") === t("Us") ? "start" : "end",
                      padding:
                        t("us") === t("Us") ? "0 0 0 10px" : "0 10px 0 0",
                    }}
                  >
                    {t("delete")}
                  </li>
                </ul>
                <Post post={post} latestPost={arr[0]} />
              </div>
            );
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
              <span>{t("are you sure you want to delete this account")}</span>
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
          onClick={(event) => distroyBackrop(event)}
        >
          <AddPost
            isEditeComponentVisible={isEditeComponentVisible}
            posInfo={posInfo}
            setPosInfo={setPosInfo}
            setIsEditeComponentVisible={setIsEditeComponentVisible}
            setIsMoreOptionVisible={setIsMoreOptionVisible}
            setFetchAgain={setFetchAgain}
          />
        </div>
      ) : null}
    </>
  );
};
export default PostsBoard;
