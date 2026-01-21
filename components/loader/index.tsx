type SpinnerProps = {
  size?: number; // px
  className?: string;
};

export default function Spinner({ className = "" }: SpinnerProps) {
  return (
    <div
      className={`inline-block w-4 h-4 md:w-6 md:h-6 animate-spin rounded-full border-2 border-primary border-t-transparent ${className}`}
      role="status"
      aria-label="loading"
    />
  );
}
