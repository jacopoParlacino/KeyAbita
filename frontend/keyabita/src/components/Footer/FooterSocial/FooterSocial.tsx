import { Facebook, Instagram , Linkedin } from "lucide-react";
import styles from "../Footer.module.scss";

/**
 * FooterSocial component renders the social media section of the footer.
 *
 * Displays icons for Facebook, Instagram, and LinkedIn with links to the respective pages.
 * Each icon opens in a new tab and includes an accessible `aria-label`.
 */
const FooterSocial = () => {
  return (
    <div className={styles.footer__social}>
      <h4>Seguici</h4>
      <div className={styles.footer__socialIcons}>
        <a
          href="https://www.facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
            <div className={styles.icon__circle}>
          <Facebook color="#3b0000"/>
          </div>
        </a>
        <a
          href="https://www.instagram.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Instagram color="white" size={34}/>
        </a>
        <a
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
            <div className={styles.icon__circle}>
          <Linkedin color="#3b0000"/>
          </div>
        </a>
      </div>
    </div>
  );
};

export default FooterSocial;
