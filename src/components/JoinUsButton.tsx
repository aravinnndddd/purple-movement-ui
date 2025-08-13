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
        ` w-[68.54px] h-[17.55px] md:w-[164px] md:h-[42px] mt-[10px] bg-[#6F00CD] hover:bg-transparent border-[#6F00CD] border-2
                    text-center rounded-[20px] text-white text-sm sm:text-base
                    font-semibold ease transition-all duration-300 text-[8px] md:text-[20px]
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
