import { cookies } from 'next/headers'
import LogoutButton from './_ui/logout'
import prisma from '@/_lib/prisma'
import Link from 'next/link'
import { _logOut } from './_lib/logout'
import { MdArrowBackIos } from 'react-icons/md'

export default async function Layout({ children, login }: any) {
    const cookie = cookies()
    // get auth_id from cookie
    const auth_id = cookie.get("auth_id")
    if (!auth_id) return login

    // get user from db
    const user = await prisma.user.findUnique({
        where: {
            id: auth_id.value
        }
    })

    if (!user) return login
    return <>
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 10
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-between"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <Link href="/"><MdArrowBackIos size={42} /></Link><h1>Dashboard</h1>
                </div>
                <div style={{
                    display: "flex",
                    gap: 10
                }}>
                    {auth_id.value}
                    <form action={_logOut}>
                        <button>Logout</button>
                    </form>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                borderBottom: "1px solid grey"
            }}>

                <Link href="/dashboard">HOME</Link>
                <Link href="/dashboard/api-key">API KEY</Link>
                <Link href="/dashboard/config">CONFIG</Link>
                <Link href="/dashboard/access">ACCESS</Link>
            </div>
            {children}
        </div>
    </>
}