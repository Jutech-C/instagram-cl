import React, { useEffect, useState } from 'react'
import "./Post.css"
import { Image } from "semantic-ui-react"
import Logo from "./logo.jpg"
import { db, serverTimestamp } from './firebase'
import firebase from "./firebase"

export default function Post({ imageUrl, caption, username, postId, user }) {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState(" ")

    useEffect(() => {
        let unsubscribe;
        if (postId) {   //responsible for collecting what is in db and displaying it in the web page for the general public
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc") //makes the time of post to be the same regardless of your location
                .onSnapshot(snapshot => {

                    setComments(snapshot.docs.map(doc => doc.data()))
                })
        }

        return () => {
            unsubscribe()
        }
    }, [postId])

    function postComment(e) {
        e.preventDefault()

        db.collection("posts").doc(postId).collection("comments").add({ //responsible for posting what has been typed in comment
            text: comment,
            username: user.displayName,
            timestamp: serverTimestamp()
        })
        setComment("")
    }

    return (

        <div className='post'>

            <div className='post_header'>
                <Image avatar src={Logo} />
                <h3>{username}</h3>
            </div>

            <img className='post_img' src={imageUrl} />
            <h4 className='post_text'> <strong>{username}</strong> {caption}</h4>
            <div className='post_comment'>

                {comments.map((comment) => (
                    <p><strong>{comment.username}</strong> {comment.text}</p>
                ))}
            </div>


            {user && (
                <form className='post_commentBox'>
                    <input
                        className='post_input'
                        type="text"
                        placeholder='Add a comment...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button
                        className='post_button'
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}

                    >Post</button>
                </form>
            )}
        </div>
    )
}

