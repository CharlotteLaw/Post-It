import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "./MyPosts"

export default async function Dashboard() {
        const session = await getServerSession(authOptions)
        if(!session){
            redirect('/api/auth/signin')
        }
    return(
        <main>
            <h1 className="text-xl font-medium">
                Welcome back, {session?.user?.name}{"!"}
            </h1>
            <h3 className="text-md font-light">
                This is your personal dashboard.
            </h3>
            <br></br>
            <MyPosts />
        </main>
    )
}