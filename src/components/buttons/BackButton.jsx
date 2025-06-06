import { ArrowLeft } from "../auth/Icons";

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-0 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#6b1d1d] text-white shadow-md hover:bg-[#4a0f0f] focus:outline-none focus:ring-2 focus:ring-[#6b1d1d] focus:ring-offset-2"
      aria-label="Go back"
    >
      <ArrowLeft />
    </button>
  );
}

export default BackButton;
