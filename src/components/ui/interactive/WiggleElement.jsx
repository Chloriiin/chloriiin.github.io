import { motion } from 'framer-motion';

const WiggleElement = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        rotate: [0, -1, 1, -1, 0],
        transition: { duration: 0.3 }
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default WiggleElement;
