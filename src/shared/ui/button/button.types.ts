export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export type CustonButton = {
  color: "green" | "gold" | "blue" | "none";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;