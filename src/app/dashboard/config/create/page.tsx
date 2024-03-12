import evn from "@/_lib/evn";
import { _createConfig } from "../../_lib/config";
import { revalidatePath } from "next/cache";
import _ from 'lodash'
import { MdClose } from "react-icons/md";
var msg = ""

evn.on("create_config", (data) => {
    msg = data
    revalidatePath("/dashboard/config/create")
})

async function _closeMsg() {
    'use server'
    msg = ""
    revalidatePath("/dashboard/config/create")
}

export default function Page() {
    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }}>
        <div>{_.isEmpty(msg) ? "" : <div style={{
            display: "flex",
            gap: 10,
            padding: 12,
            backgroundColor: "green",
            color: "white",
            width: "50%",
            justifyContent: "space-between"
        }}>
            <div >
                {msg}
            </div>
            <form action={_closeMsg} >
                <button ><MdClose /></button>
            </form></div>}</div>
        <h1>Create Config</h1>
        <form action={_createConfig} style={{
            display: "flex",
            flexDirection: "column",
            gap: 10
        }}>
            <label>name</label>
            <input placeholder="name" name="name" />
            <label>description</label>
            <input placeholder="description" name="description" />
            <label>value</label>
            <textarea placeholder="json text" name="value" cols={30} rows={10}></textarea>
            <button>Create</button>
        </form>
    </div>
}