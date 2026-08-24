import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function TaipoButtonSecondary({
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <Link
      className={cn(
        "bg-[var(--primary)] py-[14px] px-[20px] w-full max-w-[259px] !text-20 text-[var(--white)] hover:bg-[var(--white)] hover:text-[var(--primary)] transition-all duration-500 ease-in-out text-center",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
