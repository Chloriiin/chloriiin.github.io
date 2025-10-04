import React from 'react';
import { motion } from 'framer-motion';

interface WiggleElementProps {
  children: React.ReactNode;
}

const WiggleElement: React.FC<WiggleElementProps> = ({ children }) => {
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
