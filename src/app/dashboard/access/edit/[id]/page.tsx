import prisma from "@/_lib/prisma"
import { revalidatePath } from "next/cache"
import { MdCancel, MdCheck } from "react-icons/md"

async function _activate(formData: FormData) {
    'use server'
    const api_key = formData.get("api_key")?.toString()
    const config = formData.get("config")?.toString()

    await prisma.apikeyConfig.upsert({
        where: {
            configId_apiKeyId: {
                apiKeyId: api_key as any,
                configId: config as any
            }
        },
        create: {
            apiKeyId: api_key as any,
            configId: config as any
        },
        update: {
            configId: config as any
        }
    })

    revalidatePath(`/dashboard/access/edit/${api_key}`)
}

async function _inActivate(formData: FormData) {
    'use server'
    const api_key = formData.get("api_key")?.toString()
    const config = formData.get("config")?.toString()

    const del = await prisma.apikeyConfig.delete({
        where: {
            configId_apiKeyId: {
                apiKeyId: api_key as any,
                configId: config as any
            }
        }
    })

    revalidatePath(`/dashboard/access/edit/${api_key}`)

}

export default async function Page({ params }: { params: { id: string } }) {
    const api_key = await prisma.apiKey.findUnique({
        where: {
            id: params.id
        }
    })

    const config = await prisma.config.findMany({
        where: {
            userId: api_key?.userId,
            isActive: true
        },
        select: {
            id: true,
            name: true,
            ApikeyConfig: {
                where: {
                    apiKeyId: api_key?.id,
                },
                select: {
                    apiKeyId: true,
                    configId: true,
                    isActive: true
                }
            }
        }
    })

    const total = await prisma.apikeyConfig.count({
        where: {
            apiKeyId: api_key?.id
        }
    })

    if (!api_key) return <center>No Data</center>
    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }}>
        <h1>Edit Access</h1>
        <div>Name: {api_key.name}</div>
        <div>Total Config: {total}</div>
        {/* <pre>
            {JSON.stringify(config, null, 2)}
        </pre> */}
        <table>
            <thead>
                <tr>
                    <th>select</th>
                    <th>name</th>
                </tr>
            </thead>
            <tbody>
                {
                    config.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <form action={_activate}>
                                    <input name="api_key" value={api_key.id} hidden />
                                    <input name="config" value={item.id} hidden />
                                    {!item.ApikeyConfig.map(v => v.apiKeyId).includes(api_key.id) && <button><MdCheck /></button>}
                                </form>
                                <form action={_inActivate}>
                                    <input name="api_key" value={api_key.id} hidden />
                                    <input name="config" value={item.id} hidden />
                                    {item.ApikeyConfig.map(v => v.apiKeyId).includes(api_key.id) && <button><MdCancel /></button>}
                                </form>
                            </td>
                            <td>{item.name}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
}