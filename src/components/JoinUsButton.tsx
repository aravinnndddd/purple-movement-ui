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
        `w-fit p-2 px-4 sm:px-6 sm:py-2 bg-[#6F00CD] hover:bg-purple-500 
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
