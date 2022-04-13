export const basicShowVariants = {
  hidden: (yValue: number) => ({
    opacity: 0,
    y: yValue ?? -30,
  }),
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};
