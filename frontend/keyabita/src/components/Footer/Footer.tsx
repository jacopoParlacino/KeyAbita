// Footer.tsx
import styles from "./Footer.module.scss";
import FooterLinks from "./FooterLinks/FooterLinks";
import FooterContacts from "./FooterContacts/FooterContacts";
import FooterSocial from "./FooterSocial/FooterSocial";

const Footer = () => {
  return (
    <footer id="contatti" className={styles.footer} >
        <div className={styles.footer__content}>
      <div className={styles.footer__logo}>
      <div className={styles.logoWrapper}>
        <img src="/KeyAbita_Logo.png" alt="KeyAbita" />

  </div>
        <p>Il tuo partner di fiducia per la valutazione immobiliare</p>
      </div>

      <div className={styles.footer__info}>
        <FooterLinks />
        <FooterContacts />
      </div>

      <FooterSocial />
      </div>

      <hr className={styles.footer__divider} />
      <div className={styles.footer__copyright}>
        © 2025 KeyAbita.it | P.IVA 012345678900 | Condizioni Generali, Regole della Privacy e Uso dei Cookie
      </div>

    </footer>
  );
};

export default Footer;
