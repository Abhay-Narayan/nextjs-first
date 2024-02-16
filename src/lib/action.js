'use server'
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDB } from "./utils";
import { signIn, signOut} from "./auth";
import bcrypt from 'bcryptjs'

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

export const addUser = async (prevState,formData) => {
    const { username, email, password, img } = Object.fromEntries(formData);
  
    try {
      connectToDB();
      const newUser = new User({
        username,
        email,
        password,
        img,
      });
  
      await newUser.save();
      console.log("saved to db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDB();
  
      await Post.deleteMany({ userId: id });
      await User.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

export const handlegithublogin=async()=>{
    'use server'
     await signIn('github')
}

export const handleLogOut=async()=>{
    'use server'
    await signOut()
}

export const handleRegister=async(previousState,formData)=>{
    'use server'
    const {username, email, password, img }= Object.fromEntries(formData);
    try {
        connectToDB();
        const user= await User.findOne({email});
        if(user){
            return {error:"User already exists"}
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpass=await bcrypt.hash(password,salt)

        const newUser= new User({
            username,
            email, 
            password: hashedpass,
            img
        });
        await newUser.save();
        console.log("saved user to the db");
        return {success:true}
    } catch (error) {
        console.log(error);
        return {error:"something went wrong"}
    }
}

export const login=async(previousState, formData)=>{
    'use server'
    const {username, password }= Object.fromEntries(formData); 
        await signIn("credentials",{username, password});
}