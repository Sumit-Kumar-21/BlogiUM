import AppBar from "./AppBar";
import Post from "./small/Post";
import Tags from "./Tags";


function Dashboard() {

  return (
    <>
      <AppBar />
      <div className="w-1/2 h-screen ml-auto mr-auto flex flex-col gap-7">
        <Tags />
        <Post />
      </div>
    </>
  );
}

export default Dashboard;
