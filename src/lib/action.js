'use server'
import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDB } from "./utils";

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