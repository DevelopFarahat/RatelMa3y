import React from "react";
import Post from "../post/Post";
import PostBoardStyles from "./PostsBoard.module.css";
import One from "../../assets/images/one.webp";
import Two from "../../assets/images/two.webp";
import Three from "../../assets/images/three.webp";
import Four from "../../assets/images/four.webp";
import Five from "../../assets/images/five.webp";
const PostsBoard = () => {
  const Posts = [{
    id: 1, imagePath: One, title: 'Congratulation For Joining Ratel Ma3y Academy', details: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August`
    ,postWriter:'Mohamed Farahat',date:'monday,aug 8,2022 2:04 am' },
  {
    id: 2, imagePath: Two, title: 'Congratulation For Joining Ratel Ma3y Academy', details: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August`,postWriter:'Mohamed Gamal',date:'monday,aug 8,2022 2:04 am'},
  {
    id: 3, imagePath: Three, title: 'Congratulation For Joining Ratel Ma3y Academy', details: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August`,postWriter:'Mohamed Rashed',date:'monday,aug 8,2022 2:04 am'},
  {
    id: 4, imagePath: Four, title: 'Congratulation For Joining Ratel Ma3y Academy', details: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August, Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our `,postWriter:'Mohamed Magdy',date:'monday,aug 8,2022 2:04 am'},
  {
    id: 5, imagePath: Five, title: 'Congratulation For Joining Ratel Ma3y Academy', details: `Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,
  Inshaa Allah We Gonna Start Our Programes On Sunday 14 August,Inshaa Allah We Gonna Start Our Programes On Sunday 14 August `,postWriter:'Mohamed Mosa',date:'monday,aug 8,2022 2:04 am'}
];

  return (
    <div className={PostBoardStyles['post-board']}>
      {
        Posts.map((post,index,arr) => (
          <Post key={post.id} post={post} latestPost={arr[arr.length-1]} />
        ))
      }
    </div>
  )
}
export default PostsBoard;