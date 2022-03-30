export const koPropToEnProp = (koProp: string) => {
  const enProp =
    koProp === "철자"
      ? "spelling"
      : koProp === "뜻"
      ? "meaning"
      : koProp === "유의어"
      ? "syn"
      : "ant";
  return enProp;
};
