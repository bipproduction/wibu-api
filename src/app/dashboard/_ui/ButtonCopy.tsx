'use client'
import { FaCopy } from "react-icons/fa6";
import toast from "react-simple-toasts";

export default function ButtonCopy({ data }: { data: string }) {
    return <button onClick={async () => {
        await navigator.clipboard.writeText(data)
        toast("Copied")
    }} ><FaCopy /></button>
}