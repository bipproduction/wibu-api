'use client'

import { useState } from "react"

export default function CheckBox({ value }: { value: boolean }): JSX.Element {
    const [val, setVal] = useState(value)
    return (
        <>
            <input type="checkbox" checked={val} onClick={() => setVal(!val)} name="isActive" />
        </>
    )
}