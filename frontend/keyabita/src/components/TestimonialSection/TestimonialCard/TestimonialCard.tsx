import { Star } from "lucide-react";
import styles from "./TestimonialCard.module.scss";

interface TestimonialCardProps {
  name: string;
  text: string;
  imgAvif: string;
  imgWebp: string;
  imgJpg: string;
  stars?: number;
}
/**
 * TestimonialCard component renders a testimonial with a photo, name, star rating, and text.
 *
 * Supports multiple image formats via `<picture>` for performance.
 * Star rating is optional and defaults to 5 stars.
 */
const TestimonialCard = ({
  name,
  text,
  imgAvif,
  imgWebp,
  imgJpg,
  stars = 5,
}: TestimonialCardProps) => {
  return (
    <div className={styles.testimonialCard}>
      <picture className={styles.testimonialCard__picture}>
        <source srcSet={imgAvif} type="image/avif" />
        <source srcSet={imgWebp} type="image/webp" />
        <img
          src={imgJpg}
          alt={name}
          className={styles.testimonialCard__photo}
        />
      </picture>

      <div className={styles.testimonialCard__content}>
        <h3 className={styles.testimonialCard__name}>{name}</h3>

        <div className={styles.testimonialCard__stars}>
          {Array.from({ length: stars }).map((_, i) => (
            <Star
              key={i}
              size={16}
              strokeWidth={1.5}
              fill="#fec841"
              color="#fec841"
            />
          ))}
        </div>

        <p className={styles.testimonialCard__text}>“{text}”</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
