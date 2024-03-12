'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export async function _logOut() {
    const cookie = cookies()
    cookie.delete("auth_id")
    redirect("/")

}