import { Mail, Phone, MapPin } from "lucide-react";
import styles from "../Footer.module.scss";

/**
 * FooterContacts component renders the contact information section of the footer.
 *
 * Includes phone, email, and address with corresponding icons.
 */
const FooterContacts = () => {
  return (
    <div className={styles.footer__contacts}>
      <h4>Contatti</h4>
      <p>
        <Phone color="white" size={16} />{" "}
        <a href="tel:+391234567980">+39 (123) 4567-980</a>
      </p>
      <p>
        <Mail color="white" size={16} />{" "}
        <a href="mailto:info@keyabita.com">info@keyabita.com</a>
      </p>
      <p className={styles.footer__address}>
        <MapPin color="white" size={16} />
        Via Jacopo Durandi 10
        <br />
        Torino, Italia
      </p>
    </div>
  );
};

export default FooterContacts;
