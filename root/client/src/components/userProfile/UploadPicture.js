import React, {useState} from 'react'
import axios from 'axios'

function UploadPicture() {

    const [selectedFile,setSelectedFile]=useState();
    const [isFilePicked,setIsFilePicked]=useState(false);

    const changeHandler = (e)=>{
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true)
    }
    
    async function UploadImg(e){
        e.preventDefault()

        const formData=new FormData();
        formData.append('File',selectedFile);
        // const file = imageInput.files[0]
      
        // get secure url from our server

        axios
            .get("http://localhost:3001/s3Url")
            .then((res)=>{return (res.data.url)})
            .then((url)=>{
                axios
                    .put(
                            url,
                            selectedFile,
                            {headers:{
                                    "Content-Type": "multipart/form-data"   
                            }}
                        )
                const imageUrl = url.split('?')[0]
                const img = document.createElement("img")
                img.src = imageUrl
                document.body.appendChild(img)
            })
      
      
        // const imageUrl = url.split('?')[0]
        // console.log(imageUrl)
      
        // post requst to my server to store any extra data
        
        
        
      }

  return (
    <div>
        <input name="file" type="file" accept="image/*" onChange={changeHandler}/>
        <button onClick={UploadImg} type="submit">Upload</button>
        <img src="https://user-profile-pic-bucket.s3.amazonaws.com/95293c0ff9880413cd1c2674dc5d312e" alt="test"></img>
    </div>
  )
}

export default UploadPicture