import AppBar from '../components/AppBar'
import Tags from '../components/Tags'
import useGetPostByTags from '../hooks/useGetPostByTags'
import { useParams } from 'react-router-dom'
import Post from '../components/small/Post'


function TagPosts() {
    const {tagname} = useParams<{tagname: string}>()
    console.log(tagname);
    
    const data  = useGetPostByTags(tagname!)

    return (
        <>
        <AppBar />
        <div className="w-1/2 h-screen ml-auto mr-auto flex flex-col gap-7">
        <Tags />
        {data?.map(post=> (<div key={post.id}><Post username={post.username} createdAt={post.createdAt} title={post.title} body={post.body} /> </div>))}
      </div>
        </>
    )
}

export default TagPosts
