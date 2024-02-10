'use server'
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDB } from "./utils";
import { signIn, signOut} from "./auth";

export const addPost=async(formData)=>{
    const {title, desc, slug, userId }= Object.fromEntries(formData);
    console.log(title, desc, slug, userId);
    try {
        connectToDB();
        const newPost= new Post({
            title,desc,slug,userId,
        });
        await newPost.save();
        revalidatePath('/blog')
        console.log("Saved to Db")
        
    } catch (error) {
        console.log(error)
        return {error:'something went wrong'}
    }
}

export const deletePost=async(formData)=>{
    const {id }= Object.fromEntries(formData);
    //console.log(title, desc, slug, userId);
    try {
        connectToDB();
        await Post.findByIdAndDelete(id);
        revalidatePath('/blog')
        console.log("deleted from Db")
        
    } catch (error) {
        console.log(error)
        return {error:'something went wrong'}
    }
}

export const handlegithublogin=async()=>{
    'use server'
     await signIn('github')
}

export const handleLogOut=async()=>{
    'use server'
    await signOut()
}

export const handleRegister=async(formData)=>{
    'use server'
    const {username, email, password, img }= Object.fromEntries(formData);
    try {
        connectToDB();
        const user= await User.findOne({email});
        if(user){
            return "User already exists"
        }

        const newUser= new User({
            username,
            email, 
            password,
            img
        });
        await newUser.save();
        console.log("saved user to the db");
    } catch (error) {
        console.log(error);
        return {error:"something went wrong"}
    }
}