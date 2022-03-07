import React from 'react'
import {BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon} from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
import Moment from 'react-moment';
export default function Post({id, username, userImg, caption, img}) {

  const {data: session} = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(()=> onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),(snapshot)=>setComments(snapshot.docs)),[db, id])
  useEffect(()=> onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot)=>setLikes(snapshot.docs)), [db, id])
  useEffect(()=>setHasLiked(likes.findIndex(like=>like.id === session?.user?.uid) !== -1), [likes])

  const likePost = async () =>{
    if(hasLiked){
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    }
    else{
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }

  const sendComment = async (e)=>{
    e.preventDefault();
    const commentTosend = comment;
    setComment('')
    await addDoc(collection(db, 'posts', id, 'comments'),{
      comment:commentTosend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    })
  }
  return (    
    <div className='bg-white my-7 py-3 border rounded-sm'>
        <div className="flex items-center p-5 ">
            <img src={userImg} alt="" className='rounded-full h-12 w-12 object-contain border p-1 mr-3'/>
            <p className='flex-1 font-bold '>{username}</p>
            <DotsHorizontalIcon className='h-5'/>
        </div>
        <img src={img} alt="" className='w-full object-cover'/>
       {session && <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4 ">
          {hasLiked ? (
            <HeartIconFilled onClick={likePost} className='btn text-red-500'/>
          ):(
            <HeartIcon onClick={likePost} className='btn'/>
          )}
          
          <ChatIcon className='btn'/>
          <PaperAirplaneIcon className='btn'/>
        </div>
          <BookmarkIcon className='btn'/>
       </div>}
       <div className="">
              {likes.length > 0 && (
                <p className='font-bold mb-1 pl-5'>
                  {likes.length} likes
                </p>
              )}
           <p className='p-5 truncate'>
               <span className='font-bold mr-1'>{username} </span>
               {caption}
           </p>
       </div>
       {comments.length>0 && (
         <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
           {comments.map((cm)=>(
             <div className="flex items-center space-x-2 mb-3" key={cm.id}>
               <img className='h-7 rounded-full' src={cm.data().userImage} alt="" />
               <p className='text-sm flex-1'><span className='font-bold'>{cm.data().username}</span>{" "}{cm.data().comment}</p>
               <Moment className='pr-5 text-sm' fromNow>{cm.data().timestamp.toDate()}</Moment>
             </div>
           ))}
         </div>
       )}
       {session && 
       <form className="flex items-center p-4">
         <EmojiHappyIcon className='btn'/>
         <input type="text" name="" placeholder='Add a comment ...' id="" className='border-none flex-1 focus:ring-0 outline-none' value={comment} onChange={e=>setComment(e.target.value)}/>
         <button type='submit' disabled={!comment.trim()} onClick={sendComment} className='font-semibold text-blue-400'>Post</button>
       </form>}
    </div>
  )
}
