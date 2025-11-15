import './Logo.css';

const Logo = ({ size = 'medium', variant = 'full' }) => {
  return (
    <div className={`logo-component logo-${size} logo-${variant}`}>
      <div className="logo-icon-wrapper">
        <img
          src="/logo-keyabita.png"
          alt="KeyAbita Logo"
          className="logo-image"
          onError={(e) => {
            // Fallback se l'immagine non esiste
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className="logo-fallback">
          <svg viewBox="0 0 100 100" className="logo-svg">
            <path
              d="M50 10 L90 40 L90 90 L10 90 L10 40 Z"
              fill="currentColor"
              opacity="0.2"
            />
            <path
              d="M50 10 L90 40 L80 40 L50 20 L20 40 L10 40 Z"
              fill="currentColor"
            />
            <rect x="35" y="50" width="30" height="40" fill="currentColor" />
            <circle cx="50" cy="65" r="3" fill="white" />
          </svg>
        </div>
      </div>
      {variant === 'full' && (
        <div className="logo-text">
          <span className="logo-title">KeyAbita</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
