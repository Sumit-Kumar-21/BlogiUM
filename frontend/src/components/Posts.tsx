import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./small/Post";

interface posts{
    id: number
    username: string
    userId: number
    title: string
    body: string
    createdAt: string
}
function Posts() {
  const [posts, setPosts] = useState<posts[]>();

  const fetchTags = async () => {
    const res = await axios.get("http://localhost:8787/api/v1/user/all-posts");
    setPosts(res.data.post);
  };
  useEffect(() => {
    fetchTags();
  }, []);

  return <>
  {posts?.map(post=> (<div key={post.id} ><Post userId={post.userId} username={post.username} createdAt={post.createdAt} title={post.title} body={post.body} /> </div>))}
  </>;
}

export default Posts;
