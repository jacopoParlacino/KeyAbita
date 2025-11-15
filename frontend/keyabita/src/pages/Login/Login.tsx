import styles from "./Login.module.scss";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
        // login logic
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

        <p className={styles.forgot}>Password dimenticata?</p>
      </form>
    </main>



<Footer />
</>

    )
}