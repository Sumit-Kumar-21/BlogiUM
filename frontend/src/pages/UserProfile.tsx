import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import useGetUserPosts from "../hooks/useGetUserPosts";
import Post from "../components/small/Post";

function UserProfile() {
  const { id } = useParams<{id: string}>();
  const userData = useGetUserPosts(id!);

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
          <div className="text-4xl font-bold font-serif">
            {userData?.username}
          </div>
          <div>{userData?.email}</div>
        </div>
      </div>
      <div className="w-1/2 h-screen ml-auto mr-auto flex flex-col gap-7">
        {userData?.posts.map((post) => (
          <div key={post.id}>
            <Post
            userId={userData?.id}
              username={userData?.username}
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

export default UserProfile;
