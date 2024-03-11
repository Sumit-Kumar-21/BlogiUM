// import axios from "axios";
import { useNavigate } from "react-router-dom";


function AppBar() {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex h-16  box-border justify-between items-center border-b-0 shadow-sm pl-9 pr-9">
        <div className="flex gap-2 cursor-pointer">
          <img src="/blog-svgrepo-com.svg" alt="icon" className="h-10" onClick={()=>{navigate("/dashboard")}}/>

          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 rounded-full pl-3 border-none"
          />
        </div>

        <div className="flex box-border items-center gap-3">
          <div className="flex items-center cursor-pointer">
            <img
              src="/icons8-write-60.png"
              alt="write"
              className="h-6"
              onClick={() => {}}
            />
            <span className="text-gray-500">write</span>
          </div>

          <div className="flex items-center cursor-pointer" onClick={() => {
            localStorage.clear();
            navigate("/signin")
          }}>
            <img
              src="/icons8-logout-64.png"
              alt="logout"
              className="h-6"
            />
            <span className="text-gray-500">logout</span>
          </div>

          <div onClick={()=>{navigate("/profile")}} className="cursor-pointer rounded-full box-border border-black flex items-center justify-center font-serif bg-green-700 text-white h-8 w-8 text-2xl">{(JSON.parse(localStorage.getItem("User")!)).username[0]}</div>
        </div>
        
      </div>
    </>
  );
}

export default AppBar;
