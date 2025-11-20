type LoadingProps = {
    title?: string;
  };

  const Loading = ({ title = "Caricamento..." }: LoadingProps) => {
    return (
      <div className="loading-wrapper">
        <div className="card-header">
          <h2>{title}</h2>
        </div>
        <div className="loading">{title}</div>
      </div>
    );
  };

  export default Loading;
