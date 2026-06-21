import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-primary)",
            gap: "1rem",
            padding: "2rem",
            textAlign: "center",
          }}
          role="alert"
        >
          <h2 style={{ color: "var(--color-text)" }}>Something went wrong</h2>
          <p>
            {this.state.error?.message ?? "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(120deg, #93f1c9, #4dcf97)",
              color: "#062219",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-primary)",
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
