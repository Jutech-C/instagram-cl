import React, { useState } from 'react'
import { Button } from "semantic-ui-react"
import { db, storage, serverTimestamp} from "./firebase"
import "./imageUpload.css"

function ImageUpload({username}) {
    const [caption, setCaption] = useState("")
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)

    function handleChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])  //targets the first image chosen from your device
        }
    }
    function handleClick() {
        // upload image to firestore storage
        const uploadTask = storage.ref(`images/${image.name}`).put(image) //image.name is the name of the image you want to upload

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                //error message
                console.log(error)
            },
            () => {
                //complete function
                storage
                    .ref("images")  //retrieve the image from storage in the "images" folder
                    .child(image.name)
                    .getDownloadURL()  //gives you the url of the image you uploaded
                    .then(url => {
                        // post the image url in the db
                        db.collection("posts").add({
                            timestamp: serverTimestamp(), //unifies the time in all regions so that the image appears at the top of the page regardless of the location
                            caption: caption,
                            imageUrl: url,
                            username: username

                        })
                        setProgress(0)
                        setCaption("")
                        setImage(null)
                    })
            }

        )
    }


    return (
        <div className="imageupload">
            <progress className="imageupload_progress" value={progress} max="100"></progress>
            <input type="text" placeholder="Enter a Caption..." value={caption} onChange={(event) => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleClick}>Upload</Button>

        </div>
    )
}

export default ImageUpload
