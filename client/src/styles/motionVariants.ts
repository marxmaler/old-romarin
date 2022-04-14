interface IBasicShowVariantCustoms {
  yValue: number | undefined;
  delay: number | undefined;
}

export const basicShowVariants = {
  hidden: (props: IBasicShowVariantCustoms) => ({
    opacity: 0,
    y: props?.yValue ?? -30,
  }),
  show: (props: IBasicShowVariantCustoms) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: props?.delay ?? 0,
      duration: 0.7,
    },
  }),
};

export const LangSwitchVar = {
  fadeIn: (direction: number) => ({
    x: 25 * -direction,
    opacity: 0,
  }),
  fadeOut: (direction: number) => ({
    x: 25 * direction,
    opacity: 0,
  }),
  stay: {
    x: 0,
    opacity: 1,
  },
};

export const wordListVar = {
  hidden: {
    y: -30,
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      staggerChildren: 0.7,
    },
  },
  hide: {
    y: -30,
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
};
