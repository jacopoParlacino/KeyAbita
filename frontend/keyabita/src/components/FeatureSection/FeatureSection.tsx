import styles from "./FeatureSection.module.scss";

interface FeatureSectionProps {
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
          className={styles.icon__wrapper}
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </div>
        <h2 className={styles.featuresection__title}>{title}</h2>
        <p className={styles.featuresection__text}>{text}</p>
      </div>
      <picture className={styles.featuresection__picture}>
        <source srcSet={image + ".avif"} type="image/avif" />
        <source srcSet={image + ".webp"} type="image/webp" />

        <img
          src={image}
          alt={title}
          className={styles.featuresection__image}
          loading="lazy"
        />
      </picture>{children}
    </section>
  );
}
