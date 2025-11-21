import styles from "./Login.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");


        // --- FRONTEND VALIDATION ---
        // email must include @, a dot, a domain, no spaces allowed
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError("Formato email non valido");
          return;
        }

        // password includes at least one letter, one digit, not less than 6 chars
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
          setError("La password deve contenere almeno una lettera e un numero");
          return;
        }

        // login logic
        // an API call - endpoints from backend

        try {

        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email, password})
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.message || "Email o Password sbagliato");
          return;
        }

        // Map backend response to frontend Admin type
        const adminData = {
          id: data.utente.id,
          username: data.utente.nome || data.utente.email,
          role: data.utente.ruolo?.nome || "user",
          token: data.token
        };

        login(adminData); // save admin in context

        if (adminData.role?.toUpperCase() === "ADMIN") {
          navigate("/amministrazione");
        } else if (adminData.role?.toUpperCase() === "AGENT") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (err) {
        setError("Errore di rete.");
        console.error(err);
      }
    };


    return (
<>
<Header />

<main className={styles.loginPage}>
      <h1>Amministrazione</h1>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Login</button>

        {error && (
          <div style={{ color: "red", marginTop: "12px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <p className={styles.forgot}>Password dimenticata?</p>
      </form>
    </main>



<Footer />
</>

    )
}