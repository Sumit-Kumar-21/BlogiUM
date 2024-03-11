import axios from "axios";
import { useEffect, useState } from "react";

interface posts {
  username: string;
  id: string;
  title: string;
  userId: string;
  body: string;
  createdAt: string;
}



function useGetPostByTags(tag: string) {

    const [ data, setData ] = useState<posts[]>();

    const fetchPost = async(tag:string)=>{
        const res = await axios({
            url:`http://localhost:8787/api/v1/user/getPost/${tag}`,
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        setData(res.data.posts)
    }

    useEffect(()=>{
        fetchPost(tag);
    },[tag])

  return data;
}

export default useGetPostByTags;
