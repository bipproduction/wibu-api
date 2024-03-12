'use server'
import { AES } from 'crypto-js'
import prisma from '@/_lib/prisma'
import { cookies } from 'next/headers'
import evn from '@/_lib/evn'

export async function _createApiKey(value: FormData) {

    const name = value.get("name")?.toString()
    const description = value.get("description")?.toString()
    const expires = value.get("expires")

    const cookie = cookies()
    const auth_id = cookie.get("auth_id")?.value

    if (!name) {
        evn.emit("halo", "membutuhkan nama")
        return
    }

    const data: any = {
        userId: auth_id,
        name: name,
        key: AES.encrypt(JSON.stringify(name), "makuro").toString(),
        description: description,
        expiresAt: expires ? new Date(expires.toString()) : null
    }

    try {
        const api = await prisma.apiKey.create({
            data
        })
        return evn.emit("halo", `success ${api.key}`)
    } catch (error) {
        return evn.emit("halo", "gagal")
    }

}

export async function _deactivate(formData: FormData) {
    try {
        const api = await prisma.apiKey.update({
            where: {
                key: formData.get("key")?.toString()
            },
            data: {
                isActive: false
            }
        })
        evn.emit("deactivate", `success ${api.key}`)
    } catch (error) {
        console.log(error)
        evn.emit("deactivate", "gagal")
    }
}

export async function _update(formData: FormData) {
    const name = formData.get("name")
    const description = formData.get("description")
    const exiresAt = formData.get("expires") ? new Date(formData.get("expires")!.toString()) : null
    const isActive = formData.get("isActive")
    const id = formData.get("id")?.toString()

    setTimeout(() => {
        evn.emit("update_api", "selesai")
        console.log("timeout")
    }, 1000)

    const data: any = {
        name: name,
        description: description,
        expiresAt: exiresAt,
        isActive: isActive === "on"
    }

    try {
        const api = await prisma.apiKey.update({
            where: {
                id: id
            },
            data: {
                ...data
            }
        })

        evn.emit("update_api", `success`)
    } catch (error) {
        console.log("error")
        evn.emit("update_api", "gagal")
    }

}
