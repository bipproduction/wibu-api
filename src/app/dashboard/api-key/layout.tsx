import { cookies } from "next/headers"
import { _createApiKey } from "../_lib/api_key"
import Link from "next/link"
import { MdAdd, MdAddBox, MdList } from "react-icons/md"

export default function Layout({ children }: any) {

    return <div>

        <div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                borderBottom: "1px solid grey"
            }}>
                <Link href="/dashboard/api-key"><MdList size={42} /></Link>
                <Link href={"/dashboard/api-key/create"}><MdAddBox size={42} /></Link>
            </div>

        </div>
        {children}
    </div>
}