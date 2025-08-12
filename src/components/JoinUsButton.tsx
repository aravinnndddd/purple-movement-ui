import clsx from "clsx";
import React from "react";
type Button = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const JoinUsButton = ({ onClick, className, children, ...props }: Button) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `  w-[164px] h-[42px] mt-[10px] bg-[#6F00CD] hover:bg-purple-500 
                    text-center rounded-[20px] text-white text-sm sm:text-base
                    font-semibold ease transition-all duration-300
                    `,
        className
      )}
      {...props}
    >
      {children || "Join Us"}
    </button>
  );
};

export default JoinUsButton;
