'use client'

import { useEffect, useState } from "react"
import { _login } from "../_lib/login"

export default function Page(params: any) {
    const [auth, setAuth] = useState<any>({
        "email": "",
        "password": ""
    })

    useEffect(() => {
        if (params.searchParams && params.searchParams.error) {
            alert(params.searchParams.error)
        }
    }, [params])

    return (
        <center>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                width: 300
            }}>
                <h1>LOGIN</h1>
                <input type="email" placeholder="email" onChange={(val) => setAuth({ ...auth, "email": val.target.value })} />
                <input type="password" placeholder="password" onChange={(val) => setAuth({ ...auth, "password": val.target.value })} />
                <button onClick={async () => {
                    _login(auth)
                }}>Login</button>
            </div>
        </center>
    )
}