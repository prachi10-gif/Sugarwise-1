// Framer Motion animation variants for consistent page transitions

export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const pageEnterVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

export const scanRippleVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    scale: 1.2,
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const glassCardHoverVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 0 30px rgba(0, 212, 180, 0.05)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 0 40px rgba(0, 212, 180, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const buttonVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 0 20px rgba(0, 212, 180, 0.2)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 30px rgba(0, 212, 180, 0.4)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

export const heroHeadingVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

export const heroSubtitleVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.4,
    },
  },
};

export const horizontalScrollVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
