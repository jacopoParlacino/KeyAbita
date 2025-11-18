import { Star } from "lucide-react";
import styles from "./AgentCard.module.scss";
import useIsDesktop from "../../../hooks/useIsDesktop";

interface AgentCardProps {
  name: string;
  role: string;
  stars: number;
  experience: string;
  imgAvif: string;
  imgWebp: string;
  imgJpg: string;
  extraInfo?: string;
}

/**
 * Card component to display an agent's profile with photo, role, rating, and experience.
 *
 * Uses the `useIsDesktop` hook to optionally show `extraInfo` only on desktop.
 */
const AgentCard = ({
  name,
  role,
  stars,
  experience,
  imgAvif,
  imgWebp,
  imgJpg,
  extraInfo,
}: AgentCardProps) => {
  const isDesktop = useIsDesktop();
  return (
    <div className={styles.agentCard}>
      <picture className={styles.agentCard__picture}>
        <source srcSet={imgAvif} type="image/avif" />
        <source srcSet={imgWebp} type="image/webp" />
        <img
          src={imgJpg}
          alt={name}
          className={styles.agentCard__photo}
          loading="lazy"
        />
      </picture>

      <div className={styles.agentCard__info}>
        <h3 className={styles.agentCard__name}>{name}</h3>
        <p className={styles.agentCard__role}>{role}</p>

        {isDesktop && extraInfo && (
          <p className={styles.agentCard__extra}>{extraInfo}</p>
        )}

        <div className={styles.agentCard__rating}>
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} size={14} strokeWidth={1.5} fill="#fec841" />
          ))}
          <span className={styles.agentCard__experience}>{experience}</span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
