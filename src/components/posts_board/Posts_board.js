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

const PostsBoard = () => {
  const { isLoading, setIsLoading } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  let page = 1,
    postsCount = undefined,
    currentCount = undefined;

  useEffect(() => {
    fetchPosts(page);
  }, []);

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

  return (
    <div className={PostBoardStyles["post-board"]}>
      {posts?.map((post, index, arr) => {
        if (index == posts.length - 1)
          return (
            <div
              ref={lastPostElementRef}
              style={{
                width: "100%",
              }}
              key={post._id}
            >
              <Post post={post} latestPost={arr[0]} />
            </div>
          );
        else
          return (
            <div
              style={{
                width: "100%",
              }}
              key={post._id}
            >
              <Post post={post} latestPost={arr[0]} />
            </div>
          )
      })}
    </div>
  );
};
export default PostsBoard;
