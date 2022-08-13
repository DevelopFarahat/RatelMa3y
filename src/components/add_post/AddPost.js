import React, { useState } from "react";
import AddPostStyles from "./AddPost.module.css";
import Form from "react-bootstrap/Form";
import { RiFolder5Fill } from "react-icons/ri";
import { MdOutlineClear } from "react-icons/md";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
const AddPost = () => {
    const[postData,setPostData] = useState({
        post_img:'',
        title:'',
        content:''
    });
    const [postImage,setPostImage] = useState("");
    const [isUserMadeAPost,setIsUserMadeAPost] = useState(false);
    const  openFile =  (event)=> {
        let reader = new FileReader();
        reader.onload = function () {
            let dataURL = reader.result;
            setPostImage(dataURL);
        };
        reader.readAsDataURL(event.target.files[0]);
        
      };
        const handleChange = (event)=>{

            setPostData({
                ...postData,
                [event.target.name]:event.target.value,
                post_img:postImage
            })
        }
        const clearImagePath = ()=>{
            setPostImage("");
        }
        const handleSubmit = (event)=>{

            event.preventDefault();

            
            setIsUserMadeAPost(true);
            
            setTimeout(()=>{
                setIsUserMadeAPost(false)
            },1000)
        
            console.log(postData);
        }
    return (
        <>
        {isUserMadeAPost?<div className={AddPostStyles['post-alert-container']}>
            <span>Posted Successfully</span>
        </div>:null}
            <form className={AddPostStyles['add-post-main-container']} onSubmit={handleSubmit}>
                <div>
                    <Form.Label htmlFor="postImage">Post Image</Form.Label>
                    <div  id="postImage"   className={AddPostStyles['post-image-area']}>
                    {postImage === ''?null:<img src={postImage} alt="logo" className={AddPostStyles['image-post']}/>}
                    
                    </div>
                    <div className={AddPostStyles["button-group"]}>
                        <div className={` ${AddPostStyles["button-container"]}`} >
                            <button type="button">Upload <RiFolder5Fill size={20}/></button>
                            <Form.Control type="file" id="file" name="post_img"  onChange={(event)=>openFile(event)}/>
                        </div>
                        </div>
                        <button type="button" className={`${AddPostStyles['btn']} ${AddPostStyles['clear-btn']}`} onClick={clearImagePath}>Clear <MdOutlineClear size={25} /></button>
                     
                    </div>
                    <div>
                        <Form.Label htmlFor="postTitle">Title</Form.Label>
                        <Form.Control type="text" id="postTitle" name="title"  value={postData.title} onChange={handleChange}/>
               
                    </div>
                    <div>
                        <Form.Label htmlFor="postPargraph">Content</Form.Label>
                        <Form.Control as="textarea" id="postPargraph" name="content" className={` ${AddPostStyles['post-paragraph-area']}`} value={postData.content} onChange={handleChange}/>
             
                    </div>
                    <button type="submit" className={AddPostStyles['btn']}>Post <BsFillFileEarmarkPostFill size={15} /></button>
                    
            </form>
        </>
    )
}
export default AddPost;