import React, {useState} from 'react'
import axios from 'axios'

function UploadPicture({setMode}) {

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

            .get(`${process.env.REACT_APP_API_HOST}/s3Url`,
                {headers:{accessToken:localStorage.getItem("token")}})

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
                return imageUrl
            })
            .then(async (imgUrl)=>{
                await axios
                    .put(`${process.env.REACT_APP_API_HOST}/User/UpdateProfilePic`,
                        {"profile":imgUrl},
                        {headers:{accessToken:localStorage.getItem("token")}})
            })
            .then(()=>{
                setMode(mode=>!mode);
            })
                //       console.log(imageUrl);
                // const img = document.createElement("img")
                // img.src = imageUrl
                // document.body.appendChild(img)
      
        // const imageUrl = url.split('?')[0]
        // console.log(imageUrl)
      
        // post requst to my server to store any extra data
        
        
        
      }

  return (
    <div>
        <input name="file" type="file" accept="image/*" onChange={changeHandler}/>
        <button onClick={UploadImg} type="submit">Upload</button>
        {/* <img src="https://user-profile-pic-bucket.s3.amazonaws.com/3aed2a7f20ec3f7ff66ef1f0c1081547" alt="test"></img> */}
    </div>
  )
}

export default UploadPicture