'use client'

import Image from "next/image"
import {signOut} from 'next-auth/react'
import Link from "next/link"


type User = {
    image: string
}

export default function Logged({image}: User){
    return(
        <li className="flex gap-8 items-center">
            <button onClick={() => signOut()} 
            className="bg-pink-700 text-white text-sm px-6 py-2 rounded-md hover:bg-pink-800">Sign out</button>

            <Link href={"/dashboard"}>
                <Image 
                    width={64} 
                    height={64} 
                    className = "w-14 rounded-full"
                    src={image}
                    alt=""
                    priority />
            </Link>

        </li>
    )
}