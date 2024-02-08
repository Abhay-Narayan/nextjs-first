import { Post, User } from "./models";
import { connectToDB } from "./utils";

export const getPosts= async()=>{
    try {
        connectToDB();
        const posts =await Post.find();
        return posts;
    } catch (error) {
        console.log(error);
        throw new Error('error fetching posts')
    }
}

export const getPost= async(slug)=>{
    try {
        connectToDB();
        const post =await Post.findOne({slug});
        return post;
    } catch (error) {
        console.log(error);
        throw new Error('error fetching post')
    }
}

export const getUser=async(id)=>{
    try {
        connectToDB();
        const user =await User.findById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching the user");
    }
}

export const getUsers=async()=>{
    try {
        connectToDB();
        const users=await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error('Error Fetching the users');
    }
}

