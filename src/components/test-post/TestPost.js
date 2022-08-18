// import React, { useState } from "react";

// export default function TestPost() {
//     const [postBody, setPostBody] = useState({})
//     const obj = {}
//     function submitPost(){

//     }
//   return(
//   <form style={{margin: 24}} encType="multipart/form-data">
//     <input type="file" name="article_img"
//        accept="image/png, image/jpeg"/>
//     <input type="text" placeholder={"title"} name="title" onChange={(e)=> obj.title = e.target.value}/>
//     <input type="text" placeholder={"content"} name="content" onChange={(e)=> obj.content = e.target.value}/>
//   </form>)
// }

import React, { useState } from "react";

export function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    fetch("https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
        <div style={{width: 100,height: 40}}>
      <input type="file" name="file" onChange={changeHandler} />
      </div>
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}
