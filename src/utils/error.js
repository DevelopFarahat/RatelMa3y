import { ErrorBoundary } from "react-error-boundary";
import { VscError } from "react-icons/vsc";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        itemsAlign: "center",
        height: "80vh",
      }}
    >
      <div
        className="container text-center bg-danger"
        role="alert"
        style={{
          borderRadius: 16,
          width: "50%",
          color: "white",
          minWidth: 200,
          paddingTop: 32,
          paddingBottom: 16,
          paddingLeft: 32,
          paddingRight: 32,
          boxShadow: "0 0 12px rgb(0 0 0 / 16%)",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <VscError size={32} />
          <h4>Something went wrong</h4>
        </div>
        <pre>Cause: {error.message}</pre>
        <button onClick={resetErrorBoundary} className="btn btn-dark">
          Try again
        </button>
      </div>
    </div>
  );
}
