import styles from "../Footer.module.scss";

const FooterLinks = () => {
  return (
    <div className={styles.footer__links}>
      <h4>Link Rapidi</h4>
      <ul>
        <li>Home</li>
        <li>Chi Siamo</li>
        <li>Servizi</li>
      </ul>
    </div>
  );
};

export default FooterLinks;