import { useData } from "nextra/data";

export const Demo = () => {
  const { demo } = useData();

  return demo;
};
