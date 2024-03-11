import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface tag {
  id: string;
  tag: string;
}

function Tags() {
  const navigate = useNavigate()
  const [tags, setTags] = useState<tag[]>();

  const fetchTags = async () => {
    const res = await axios.get("http://localhost:8787/api/v1/user/tags");
    setTags(res.data.tags);
  };
  useEffect(() => {
    fetchTags();
  }, []);


  return (
    <div className="flex gap-2 overflow-x-auto box-border scrollbar-thin whitespace-nowrap">
      {tags?.map((tag) => (
        <div
          key={tag.id}
          
          className="rounded-full p-2 bg-gray-400 w-auto h-10 cursor-pointer"
          onClick={()=>{
            navigate(`/posts/${tag.tag}`)
            
          }}
        >
          {tag.tag}
        </div>
      ))}
    </div>
  );
}

export default Tags;
