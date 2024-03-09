import Icon from './Icon'

interface Props {
}

function Post(props: Props) {
    const {} = props
    

    return (
        <div className='flex flex-col gap-3'>
            {/* Icon, name, createdAt */}
            <div className='flex items-center gap-3'>
                <Icon hwt={"h-6 w-6 text-base"}>Name</Icon>
                <span>Sumit kumar</span>
                <span>Created at</span>
                
            </div>

            {/* title */}
            <div className='text-xl font-bold font-serif'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quo rerum impedit autem iure vel deleniti dicta neque labore tempore, </div>

            {/* body */}
            <div className='font-serif'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt nobis quae corporis ea vel, quia sunt magni eum, laudantium, rem nemo repudiandae dolorem facere expedita itaque doloremque ipsam odio modi laborum quos doloribus mollitia ducimus. Suscipit ducimus rem dignissimos officiis temporibus provident praesentium quo quibusdam perferendis quia natus illo sed, voluptatem sunt error ratione consequatur tenetur unde. Suscipit, itaque ratione quae possimus voluptatibus sit dignissimos deleniti ipsam laudantium qui voluptas temporibus ab quisquam tempora, fuga totam autem? Doloribus perferendis consectetur ut vitae quam maiores suscipit illo aut eius. Ut doloribus earum iure quis vero odit cum cupiditate beatae unde corporis.</div>
        </div>
    )
}

export default Post
