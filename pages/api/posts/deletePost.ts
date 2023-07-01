import type { NextApiRequest, NextApiResponse } from 'next'
/*import { getServerSession } from "next-auth/next"*/
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"
import axios, { AxiosError } from "axios"
import Post from '@/app/components/Post'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    
    if(req.method === "DELETE"){ 
        const session = await getServerSession(req, res, authOptions)
        if(!session) return res.status(401).json({message: "Please sign in"})
        //Delete a post
        try{
            /**const postId = req.body*/
            console.log("hello, passed in 1") /** WORKS */
            const postId = req.body
            console.log("hello, passed in 2") /** WORKS */
            console.log(req)
            const result = await prisma.post.delete({
                where: {
                    id: postId,
                },
            })
            console.log("hello, passed in 3")
            res.status(200).json(result)
            console.log("hello, passed in 4")
        } catch(err) {
            console.log("hello, failed!")
            res.status(403).json({err: 'Error has occured whilst deleting post.'})
        }
    }
}

