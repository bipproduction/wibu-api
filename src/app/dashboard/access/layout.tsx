import Link from "next/link";
import { MdList } from "react-icons/md";

export default function Layout({ children }: any) {
    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }}>
        <div style={{
            display: "flex",
            gap: 10,
            borderBottom: "1px solid grey"
        }}>
            <Link href="/dashboard/access"><MdList size={42}/></Link>
            {/* <Link href="/dashboard/access/create">Create</Link> */}
        </div>
        {children}
    </div>
}