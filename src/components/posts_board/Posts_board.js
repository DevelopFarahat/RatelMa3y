import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostBoardStyles from "./PostsBoard.module.css";
import One from "../../assets/images/one.jpg";
import Two from "../../assets/images/two.jpg";
import Three from "../../assets/images/three.jpg";
import Four from "../../assets/images/four.jpg";
import Five from "../../assets/images/five.jpg";
import axios from "axios";
const PostsBoard = () => {

  const Posts = [{
    _id: 1, article_img: One, title: 'Congratulation For Joining Ratel Ma3y Academy', content: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August`
    ,postWriter:'Mohamed Farahat',date:'monday,aug 8,2022 2:04 am' },
  {
    _id: 2, article_img: Two, title: 'Congratulation For Joining Ratel Ma3y Academy', content: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August`,postWriter:'Mohamed Gamal',date:'monday,aug 8,2022 2:04 am'},
  {
    _id: 3, article_img: Three, title: 'Congratulation For Joining Ratel Ma3y Academy', content: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August`,postWriter:'Mohamed Rashed',date:'monday,aug 8,2022 2:04 am'},
  {
    _id: 4, article_img: Four, title: 'Congratulation For Joining Ratel Ma3y Academy', content: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August, Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our `,postWriter:'Mohamed Magdy',date:'monday,aug 8,2022 2:04 am'},
  {
    _id: 5, article_img: Five, title: 'Congratulation For Joining Ratel Ma3y Academy', content: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August `,postWriter:'Mohamed Mosa',date:'monday,aug 8,2022 2:04 am'}
];
  const [post,setPost] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:5000/api/events`).then((res)=>{
      let postsArr = res.data;
      postsArr.reverse();
      setPost(current=>postsArr);
      
    }).catch((error)=>{
      console.log(error);
    })
 //   axios.delete(`https://ratel-may.herokuapp.com/api/events/62fd6bd6a32dd427e57f71f9`).then(())
  },[])


  return (
    <div className={PostBoardStyles['post-board']}>
      {
        
        post.map((post,index,arr) => (
          
          <Post key={post._id} post={post} latestPost={arr[0]}/>
     
        ))
      }
    </div>
  )
}
export default PostsBoard;