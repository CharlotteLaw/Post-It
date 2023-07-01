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
    
    if(req.method === "POST"){ 
        const session = await getServerSession(req, res, authOptions)
        if(!session) return res.status(401).json({message: "Please sign in"})
        //Get User
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email},
        })
        //Add a comment
        try{
            const {title, postId} = req.body.data

            if(!title.length){
                return res.status(401).json({message: "Please don't leave this field empty"})
            }

            const result = await prisma.comment.create({
                data: {
                    message: title,
                    userId: prismaUser?.id,
                    postId,
                },
            })
            res.status(200).json(result)
        } catch(err) {
            console.log("hello, failed!")
            res.status(403).json({err: 'Error has occured whilst deleting post.'})
        }
    }
}

// to be working
//  