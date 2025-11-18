// This is a placeholder for future backoffice page

import { useAuth } from "../../hooks/useAuth";

export default function Admin() {

    const { admin, logout } = useAuth();

    return (
<div>
    <h1>Pagina di Amministrazione</h1>
    <h2>Bentornato, {admin?.username}</h2>
    <button onClick={logout}>Logout</button>
</div>

    )
}
