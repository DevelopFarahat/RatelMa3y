import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostBoardStyles from "./PostsBoard.module.css";
import axios from "axios";
import UserContext from "../../utils/UserContext";
import Pagination from 'react-bootstrap/Pagination';

const PostsBoard = () => {
  const { setIsLoading } = useContext(UserContext);

  const [post, setPost] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/events`)
      .then((res) => {
        let postsArr = res.data.data;
        setPost(postsArr);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={PostBoardStyles["post-board"]}>
      {post?.map((post, index, arr) => (
        <Post key={post._id} post={post} latestPost={arr[0]} />
      ))}
    </div>
  )
}
export default PostsBoard;