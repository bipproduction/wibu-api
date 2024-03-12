import Link from "next/link";
import { MdAddBox, MdList } from "react-icons/md";

export default function Layout({ children }: any) {
    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }}>
        <div style={{
            borderBottom: "1px solid grey",
            display: "flex",
            flexDirection: "row",
            gap: 10
        }}
        >
            <Link href="/dashboard/config"><MdList size={42} /></Link>
            <Link href="/dashboard/config/create"><MdAddBox size={42} /></Link>

        </div>
        {children}
    </div>
}