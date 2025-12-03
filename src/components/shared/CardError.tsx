interface CardErrorProps {
  minHeight: number;
  message?: string;
}

const CardError = ({ minHeight, message = "Unable to load data." }: CardErrorProps) => {
  return (
    <div
      className="p-5 bg-white shadow w-full flex items-center justify-center"
      style={{ minHeight }}
    >
      <span className="text-red-500">{message}</span>
    </div>
  );
};

export default CardError;
