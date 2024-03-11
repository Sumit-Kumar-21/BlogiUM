import AppBar from "../components/AppBar";
import Posts from "../components/Posts";
import Tags from "../components/Tags";

function Dashboard() {
  return (
    <>
      <AppBar />
      <div className="w-1/2 h-screen ml-auto mr-auto flex flex-col gap-7">
        <Tags />
        <Posts />
      </div>
    </>
  );
}

export default Dashboard;
