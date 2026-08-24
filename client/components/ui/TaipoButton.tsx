import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function TaipoButton({
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <Link
      className={cn(
        "bg-white py-[14px] px-[20px] w-full max-w-[259px] !text-20 hover:bg-[var(--secondary)] hover:text-white transition-all duration-500 ease-in-out text-center",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
