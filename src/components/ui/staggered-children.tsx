
import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface StaggeredChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  containerAnimation?: {
    hidden: any;
    visible: any;
  };
}

export const StaggeredChildren = ({
  children,
  className = '',
  staggerDelay = 0.1,
  containerAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
}: StaggeredChildrenProps) => {
  const childrenArray = React.Children.toArray(children);
  
  const containerVariants: Variants = {
    hidden: containerAnimation.hidden,
    visible: {
      ...containerAnimation.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };
  
  const childVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredChildren;
