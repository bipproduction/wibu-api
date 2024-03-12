import { _logOut } from "../_lib/logout";

export default function LogoutButton() {
    return (
        <>
            <form action={_logOut}>
                <button>Logout</button>
            </form>
        </>

    )
}