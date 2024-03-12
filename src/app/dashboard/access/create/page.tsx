import prisma from "@/_lib/prisma"
import { cookies } from "next/headers"
import Link from "next/link"
export default async function Page() {
    const auth_id = cookies().get("auth_id")?.value
    const api_key = await prisma.apiKey.findMany({
        where: {
            userId: auth_id,
            isActive: true
        }
    })

    const config = await prisma.config.findMany({
        where: {
            userId: auth_id,
            isActive: true
        }
    })

    // const apikey_config = await prisma.apikeyConfig.findMany({
    //     where: {
    //         userId: auth_id
    //     }
    // })

    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }}>
        <h1>Create Access</h1>
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>key</th>
                    <th>config</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {
                    api_key.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td><input type="password" value={item.key} disabled/></td>
                            <td>
                                <ul>
                                    {
                                        config.map((item, index) => (
                                            <li key={index}>{item.name}</li>
                                        ))
                                    }
                                </ul>
                            </td>
                            <td>
                                <Link href={`/dashboard/access/create/${item.id}`}><button>Create</button></Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
}