
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { MdArrowBack, MdRefresh } from 'react-icons/md'
import evn from "@/_lib/evn";
import { _createApiKey } from "../../_lib/api_key";

let msg = ""

export default function Page() {
    evn.on("halo", (data) => {
        msg = data
        revalidatePath("/dashboard/api-key/create")
        setTimeout(() => {
            msg = ""
        }, 500)
    });

    return <>
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
        }}>
            <div>{msg}</div>
            <form action={_createApiKey} style={{
                display: "flex",
                flexDirection: "column",
                gap: 10
            }}>
                <h3>Create API Key</h3>
                <label>Name</label>
                <input name="name" placeholder="name" />
                <label>Description</label>
                <input name="description" placeholder="description" />
                <label>expires</label>
                <input name="expires" type="date" min={new Date().toISOString().split("T")[0]} />
                <br></br>
                <button >Create</button>
            </form>
        </div>
    </>
}