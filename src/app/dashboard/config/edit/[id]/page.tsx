import evn from "@/_lib/evn"
import prisma from "@/_lib/prisma"
import { _updateConfig } from "@/app/dashboard/_lib/config"
import _ from "lodash"
import { revalidatePath } from "next/cache"
import { MdClose } from "react-icons/md"
import toast from "react-simple-toasts"

var msg = ""

evn.on("update_config", (data) => {
    msg = data;
    revalidatePath("/dashboard/config/edit/")
})

async function _closeMsg() {
    'use server'
    msg = ""
    revalidatePath("/dashboard/config/edit/")
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await prisma.config.findUnique({
        where: {
            id: params.id
        }
    })

    if (!data) return <center>No Data</center>
    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }}>
        <div>{_.isEmpty(msg) ? null : <div style={{
            display: "flex",
            gap: 10,
            padding: 12,
            backgroundColor: "green",
            color: "white",
            width: "50%",
            justifyContent: "space-between"
        }}>
            <div>{msg}</div>
            <form action={_closeMsg}>
                <button><MdClose /></button>
            </form>
        </div>}</div>
        <h1>Edit</h1>
        <form action={_updateConfig} style={{
            display: "flex",
            flexDirection: "column",
            gap: 10
        }}>
            <label>name</label>
            <input name="name" defaultValue={data?.name} />
            <label>description</label>
            <input name="description" defaultValue={data?.description!} />
            <label>value</label>
            <textarea name="value" cols={30} rows={10} defaultValue={JSON.stringify(data?.value, null, 2)}></textarea>
            <input name="id" value={data.id} hidden />
            <button>save</button>
        </form>
    </div>
}