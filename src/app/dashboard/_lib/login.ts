'use server'
import prisma from "@/_lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function _login(data: any) {
    const auth = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!auth) redirect("/dashboard?error=auth")
    if (auth.password !== data.password) redirect("/dashboard?error=auth")

    // set cookies
    const cookie = cookies()
    cookie.set("auth_id", auth.id)

    redirect("/dashboard")
}

