import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import Post from "../components/small/Post";

interface posts {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
}
function Profile() {
  const [posts, setPosts] = useState<posts[]>();
  const user: {id: number; username: string; email: string} = JSON.parse(localStorage.getItem("User")!)

  const fetchTags = async () => {
    const res = await axios({
        url:"http://localhost:8787/api/v1/user/posts",
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("token")
        }
    });
    setPosts(res.data.post);
  };
  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <>
      <AppBar />
      <div className="m-5 flex gap-3 border-b-0 shadow-sm">
        <div className="m-5 box-border border-2 h-48 w-48 rounded-full flex items-center justify-center">
          <img
            src="/user-icon-svgrepo-com.svg"
            alt="icon"
            className="h-32 w-32"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-4xl font-bold font-serif">{user.username}</div>
          <div>{user.email}</div>
        </div>
      </div>
      <div className="w-1/2 h-screen ml-auto mr-auto flex flex-col gap-7">
        {posts?.map((post) => (
          <div key={post.id}>
            <Post
              userId={user.id}
              username={user.username}
              createdAt={post.createdAt}
              title={post.title}
              body={post.body}
            />{" "}
          </div>
        ))}
      </div>
    </>
  );
}

export default Profile;
