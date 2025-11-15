import styles from "./FeatureSection.module.scss";

interface FeatureSectionProps {
<<<<<<< HEAD
    icon: React.ReactNode;
    iconBgColor: string;

  title: string;
  text: string;
  image: string;
  reverse?: boolean; // if true — picture left, text right
}

export default function FeatureSection({
    icon,
    iconBgColor,
  title,
  text,
  image,
  reverse,
}: FeatureSectionProps) {
  return (
    <section className={`${styles.feature} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.feature__content}>
      <div
=======
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  text: string;
  bcgColor: string;
  image: string;
  reverse?: boolean; // if true — picture left, text right
  children?: React.ReactNode;
}

export default function FeatureSection({
  icon,
  iconBgColor,
  title,
  text,
  bcgColor,
  image,
  reverse,
  children
}: FeatureSectionProps) {
  return (
    <section className={`${styles.feature} ${reverse ? styles.reverse : ""}`}  style={{ backgroundColor: bcgColor }} >
      <div className={styles.feature__content}>
        <div
>>>>>>> origin/frontend/mobile_homepage
          className={styles.icon__wrapper}
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </div>
        <h2 className={styles.featuresection__title}>{title}</h2>
        <p className={styles.featuresection__text}>{text}</p>
<<<<<<< HEAD
      </div>
      <picture>
      <source
          srcSet={image + ".avif"}
          type="image/avif"
        />
        <source
          srcSet={image + ".webp"}
          type="image/webp"
        />

      <img src={image} alt={title} className={styles.featuresection__image} loading="lazy" />
      </picture>



     
=======
        {children && <div className={styles.featuresection__children}>{children}</div>}
      </div>
      <picture className={styles.featuresection__picture}>
        <source srcSet={image + ".avif"} type="image/avif" />
        <source srcSet={image + ".webp"} type="image/webp" />
        <img
          src={image + ".jpg"}
          alt={title}
          className={styles.featuresection__image}
          loading="lazy"
        />
      </picture>
>>>>>>> origin/frontend/mobile_homepage
    </section>
  );
}
