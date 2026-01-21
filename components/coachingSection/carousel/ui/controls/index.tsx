import { useCarousel } from "../../context";
import { motion } from "framer-motion";

export default function CarouselControls() {
  const { next, prev } = useCarousel();

  return (
    <div className="flex justify-center items-center gap-4 py-2">
      <Button isLeft onClick={prev} />
      <Button onClick={next} />
    </div>
  );
}

function Button({
  isLeft = false,
  onClick,
}: {
  isLeft?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }} // grow slightly on hover
      whileTap={{ scale: 0.95 }} // shrink on tap/click
      initial={{ scale: 1 }}
      className="
        border-2 border-gray2 
        bg-transparent 
        flex items-center justify-center 
        rounded-xl
        p-3
        cursor-pointer
        shadow-sm
        hover:shadow-md
        hover:bg-primary
        transition-all duration-300
      "
    >
      {isLeft ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#B9B9B9"
        >
          <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#B9B9B9"
        >
          <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
        </svg>
      )}
    </motion.button>
  );
}
