'use server'
import evn from "@/_lib/evn"
import prisma from "@/_lib/prisma"
import { cookies } from "next/headers"
export async function _createConfig(formData: FormData) {
    // get user id
    const auth_id = cookies().get("auth_id")?.value

    evn.emit("create_config", "loading ...")
    const name = formData.get("name")
    const value = formData.get("value")
    const description = formData.get("description")

    if (!name || !value) return evn.emit("create_config", "membutuhkan name dan value")

    const data: any = {
        userId: auth_id,
        name: name?.toString(),
        value: JSON.parse(value?.toString() || "{}"),
        description: description?.toString(),
    }

    try {
        const config = await prisma.config.create({
            data
        })

        evn.emit("create_config", "success")
    } catch (error) {
        console.log(error)
        evn.emit("create_config", "gagal")
    }
}

export async function _updateConfig(formData: FormData) {
    const name = formData.get("name")?.toString()
    const description = formData.get("description")?.toString()
    const value = formData.get("value")?.toString()
    const id = formData.get("id")

    try {
        const data = {
            name: name,
            description: description,
            value: JSON.parse(value!)
        }

        evn.emit("update_config", "success")
    } catch (error) {
        evn.emit("update_config", error)
    }


}