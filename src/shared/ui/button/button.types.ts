export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export type CustonButton = {
  color: "green" | "gold" | "blue" | "none";
  children: React.ReactNode;
  rounded?: string;
  nonBorder?: boolean;
  square?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };
