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
  
  let page = 1;
  let postsCount = 0;
  let currentCount = 0;

  useEffect(() => {
    fetchPosts(page);
  }, []);

  function fetchPosts(page, limit) {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/events?page=${page}`)
      .then((res) => {
        let postsArr = res.data.data;
        setPosts((prev) => [...prev, ...postsArr]);
        currentCount = posts.length
        postsCount = res.data.count;
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  //To observe last item
  const observer = useRef();

  const lastPostElementRef = useCallback((node) => {
    if (isLoading) return;

    console.log('i')
    console.log("counted", postsCount,currentCount);
    console.log('posts',posts)
    if(posts.length >= postsCount) return
    console.log('d')

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("should run now", page);
        fetchPosts(page + 1);
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
            >
              <Post key={post._id} post={post} latestPost={arr[0]} />
            </div>
          );
        else
          return (
            <div
              style={{
                width: "100%",
              }}
            >
              <Post key={post._id} post={post} latestPost={arr[0]} />;
            </div>
          );
      })}
    </div>
  );
};
export default PostsBoard;
