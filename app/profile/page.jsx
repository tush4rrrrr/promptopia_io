"use client";

import { useState, useEffect } from 'react';  //reason for "use clients"
import { useSession } from 'next-auth/react';  //to know whether we are currently logged in
import { useRouter } from 'next-navigation';  //router to navigate back to home

import Profile from '@components/profile';

const MyProfile = () => {
    const router = useRouter(); 

    const { data : session } = useSession();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts =async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);  //it's a dynamic template string where we are going to search for user and only get post from that specific user
          const data = await response.json();
    
          setPosts(data);
        }
    
        //only fetch post if we have the valid user_id in that session
        if(session?.user.id) fetchPosts();
      }, []);

    const handleEdit = (post) => {
         router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post)  => {
      const handleConfirmed = confirm("Are you sure you want to delete this prompt");

      if(hasConfimred){
        try{
          await fetch(`/api/prompt/${post._id.toString}`,
            {
              method : 'DELETE'
            }
          );
        }catch{
          console.log(error);
        }
      }
    }

  return (
    <Profile
     name = "My"  //to show whose profile are we seeing in this case it's our own profile
     desc = "Welcome to your personalized profile page"
     data = {posts}  //array of our posts, we have to fetch the data and we already have api endpoints to fetch it
     handleEdit = {handleEdit} 
     handleDelete = {handleDelete}
    />
  )
}

export default MyProfile;