import { cookies } from "next/headers";
import { _createApiKey, _deactivate } from "../_lib/api_key";
import prisma from "@/_lib/prisma";
import { MdArrowCircleRight, MdArrowDropUp, MdCancel, MdCheck, MdConnectedTv, MdCopyAll, MdDelete, MdDeviceHub, MdEdit, MdRemove, MdUsbOff } from "react-icons/md";
import evn from "@/_lib/evn";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import ButtonCopy from "../_ui/ButtonCopy";
import { IoMdEye } from "react-icons/io";

let msg = ""
let isActive = true

async function _toggle() {
    'use server'
    isActive = !isActive
    revalidatePath("/dashboard/api-key")
}

export default async function Page() {

    evn.on("deactivate", (data) => {
        msg = data
        revalidatePath("/dashboard/api-key")
    })
    const list_apikey = await prisma?.apiKey.findMany({
        where: {
            userId: cookies().get("auth_id")?.value,
            isActive
        }
    })
    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
    }} >
        <div>{msg}</div>
        <form action={_toggle}>
            <button style={{ display: "flex", gap: 10 }}><div>{isActive ? "Active" : "Inactive"}</div><MdArrowDropUp size={24} /></button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>key</th>
                    <th>expires at</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {
                    list_apikey.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td><input disabled type="password" value={item.key} /></td>
                            <td>{item.expiresAt ? item.expiresAt?.toISOString().split("T")[0] : "Never"}</td>
                            <td >
                                <div style={{
                                    display: "flex",
                                    gap: 10
                                }}>
                                    <Link href={`/dashboard/api-key/edit/${item.id}`}><button><MdEdit /></button></Link>
                                    <ButtonCopy data={item.key} />
                                    <Link href={`/dashboard/api-key/test?key=${item.key}`} ><IoMdEye size={42} /></Link>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        {/* <div style={{
            display: "flex",
            flexDirection: "column",
            padding: 10
        }}>
            {list_apikey.map((v, k) => <div key={k} style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
            }}>
                <div style={{
                    width: 400,
                    display: "flex",
                    gap: 10,
                    justifyContent: "space-between",
                }}>
                    <div style={{
                        display: "flex",
                        gap: 10
                    }}>
                        {v.isActive ? <MdCheck color="green" /> : <MdUsbOff />}
                        <div>{v.name}</div>
                    </div>
                    <div>{v.expiresAt ? v.expiresAt?.toISOString().split("T")[0] : "Never"}</div>
                </div>
                <div style={{
                    display: "flex",
                    gap: 10
                }}>
                    <Link href={`/dashboard/api-key/edit/${v.id}`}><MdEdit /></Link>
                    <ButtonCopy data={v.key} />
                </div>
            </div>)}
        </div> */}
    </div>
}
