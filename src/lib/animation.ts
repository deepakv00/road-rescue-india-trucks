
export const fadeIn = "animate-in fade-in duration-500";
export const slideIn = "animate-in slide-in-from-bottom-8 duration-500";
export const scaleIn = "animate-in zoom-in-95 duration-500";
export const hoverScale = "transition-transform duration-300 hover:scale-105";
export const pulseEffect = "animate-pulse";

export const animateList = (index: number) => {
  return `animate-in fade-in slide-in-from-bottom-4 duration-500 delay-${(index * 100) % 500}`;
};
