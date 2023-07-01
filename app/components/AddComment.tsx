'use client'

import {useState} from "react"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios, { Axios, AxiosError } from "axios"
import toast from "react-hot-toast"
import { totalmem } from "os"

type PostProps = {
    id?: string
}

type Comment = {
    postId?: string
    title: string
}

export default function AddComment({id} : PostProps){
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let commentToastId = "hello"

    const {mutate} = useMutation(
        async (data: Comment) => axios.post('/api/posts/addComment', {data}),
        {
            onSuccess: data => {
                setTitle("")
                setIsDisabled(false)
                queryClient.invalidateQueries(['detail-post'])
                toast.success("Added your comment! 🚀", {id: commentToastId})
            },
            onError: (error) => {
                setIsDisabled(false)
                if (error instanceof AxiosError){
                    toast.error(error?.response?.data.message, { id: commentToastId })
                }
            },
        }
    )

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        commentToastId = toast.loading("Adding your comment...", {id: commentToastId})
        mutate({title, postId: id})
    }

    return(
        <form onSubmit={submitComment} className="my-8">
            <h3 className="text-md font-semibold">Add Comments</h3>
            <div className="flex flex-col my-2">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    name="title"
                    placeholder = "Enter your comment..."
                    className="p-4 text-base rounded-md my-2"
                />
            </div>
            <div className="flex items-center gap-2">
                <button
                    disabled={isDisabled}
                    className = "text-sm bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
                    type="submit"
                >Submit</button>
                <p 
                    className={`font-bold ${
                        title.length > 300 ? "text-red-700" : "text"
                    }`}
                >{`${title.length}/300`}</p>
            </div>
        </form>
    )
}