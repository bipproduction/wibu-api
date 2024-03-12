import prisma from "@/_lib/prisma"
import { cookies } from "next/headers"
import Link from "next/link"
import { MdCancel, MdCheck, MdEdit } from "react-icons/md"
export default async function Page() {
    const auth_id = cookies().get("auth_id")?.value
    const list = await prisma.config.findMany({
        where: {
            userId: auth_id
        }
    })
    return <div>
        <h1>List Config</h1>
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>active</th>
                    <th>description</th>
                    <th>value</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.isActive ? <MdCheck /> : <MdCancel />}</td>
                            <td>{item.description}</td>
                            <td><input type="password" value={JSON.stringify(item.value)} disabled /></td>
                            <td>
                                <Link href={`/dashboard/config/edit/${item.id}`}><MdEdit /></Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
}