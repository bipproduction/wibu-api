import { headers } from "next/headers"

export default async function Page({ searchParams }: any) {
    const header: any = (headers() as any)
    const pro = header.get("x-forwarded-proto")
    const host = header.get("x-forwarded-host")

    const test = await fetch(`${pro}://${host}/api/key`, {
        method: "get",
        headers: {
            "authorization": `key ${searchParams.key}`
        }
    }).then(res => res.json())
    return <>
        <pre>{JSON.stringify(test, null, 2)}</pre>
    </>
}