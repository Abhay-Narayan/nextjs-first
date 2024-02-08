import { addPost, deletePost } from "@/lib/action";

const ServerActionTestPage=()=>{
    return (
        <div>
            <form action={addPost}>
                <input type="text" placeholder="title" name="title"/>
                <input type="text" placeholder="description" name="desc"/>
                <input type="text" placeholder="slug" name="slug"/>
                <input type="text" placeholder="userId" name="userId"/>
                <button>Create</button>
            </form>

            <form action={deletePost}>
                <input type="text" placeholder="userid" name="id"/>
                <button>Delete</button>
            </form>
        </div>
    )
}

export default ServerActionTestPage;