import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

interface Props {
    userId: number
    username: string
    createdAt: string
    title: string
    body: string
}

function Post(props: Props) {
    const navigate = useNavigate()
    const {username, createdAt, title, body, userId} = props
    

    return (
        <div className='flex flex-col gap-3'>
            {/* Icon, name, createdAt */}
            <div className='flex items-center gap-3'>
                
                <div className='flex gap-2 cursor-pointer' onClick={()=>{
                    navigate(`/user-posts/${userId}`)
                }}><Icon hwt={"h-6 w-6 text-base"}>{username}</Icon>
                <span >{username}</span></div>
                <span>{createdAt}</span>
                
            </div>

            {/* title */}
            <div className='text-xl font-bold font-serif'>{title}</div>

            {/* body */}
            <div className='font-serif'>{body}</div>
        </div>
    )
}

export default Post
