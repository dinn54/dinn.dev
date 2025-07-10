export type ButtonProps = {
  children: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
};

export type CustonButton = {
  color: "green" | "gold" | "blue" | "none";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;