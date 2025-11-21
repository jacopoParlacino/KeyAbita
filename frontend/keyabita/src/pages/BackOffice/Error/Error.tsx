type ErrorProps = {
    title?: string;
    message: string;
  };

  const ErrorMessage = ({ title = "Errore", message }: ErrorProps) => {
    return (
      <div className="error-wrapper">
        <div className="card-header">
          <h2>{title}</h2>
        </div>
        <div className="error">{message}</div>
      </div>
    );
  };

  export default ErrorMessage;
