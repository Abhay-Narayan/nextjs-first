import { Post } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET= async(request,{params})=>{
    const {slug}= params;
    try {
        connectToDB();
        const post= await Post.findOne({slug});
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        throw new Error("something went wrong")
    }
}

export const DELETE=async(request,{params})=>{
    const {slug}= params;
    //console.log(title, desc, slug, userId);
    try {
        connectToDB();
        await Post.deleteOne({slug});
        return NextResponse.json('Post deleted');
    } catch (error) {
        console.log(error)
        return {error:'something went wrong'}
    }
}

