import React from "react";

interface Props {}

function Tags(props: Props) {
  const {} = props;
  const tags = [
    { id: 1, tagname: "hello world" },
    { id: 2, tagname: "hello world" },
    { id: 3, tagname: "hello world" },
    { id: 5, tagname: "hello world" },
    { id: 7, tagname: "hello world" },
    { id: 8, tagname: "hello world" },
    { id: 9, tagname: "hello world" },
    { id: 10, tagname: "hello world" },
    { id: 10, tagname: "hello world" },
    { id: 10, tagname: "hello world" },
    
  ];

  return <div className="flex gap-2 overflow-x-auto box-border scrollbar-thin whitespace-nowrap">
    {tags.map(tag=> (
        <div key={tag.id} className="rounded-full p-2 bg-gray-400 w-auto h-10">{tag.tagname}</div>
    ))}
  </div>;
}

export default Tags;
