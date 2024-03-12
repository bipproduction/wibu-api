import evn from "@/_lib/evn"
import prisma from "@/_lib/prisma"
import { _update } from "@/app/dashboard/_lib/api_key"
import CheckBox from "@/app/dashboard/_ui/CheckBox"
import { revalidatePath } from "next/cache"

var msg = ""

export default async function Page({ params }: any) {
    evn.on("update_api", (data) => {
        msg = data
        revalidatePath("/dashboard/api-key")
    })
    
    const id = params.id
    const api = await prisma?.apiKey.findUnique({
        where: {
            id
        }
    })
    return <div>
        <h3>Edit API Key</h3>
        <div>{msg}</div>
        <form action={_update} style={{
            display: "flex",
            flexDirection: "column",
            gap: 10
        }}>
            <input type="hidden" name="id" value={id} />
            <label>name</label>
            <input defaultValue={api?.name} name="name" />
            <label>description</label>
            <input defaultValue={api?.description!} name="description" />
            <label>expires</label>
            <input defaultValue={api?.expiresAt?.toISOString().split("T")[0]} type="date" min={new Date().toISOString().split("T")[0]} name="expires" />
            <label>is active</label>
            <input defaultChecked={api?.isActive} type="checkbox" name="isActive" />
            {/* <CheckBox value={Boolean(api?.isActive)} /> */}
            <button>save</button>
        </form>
    </div>

}