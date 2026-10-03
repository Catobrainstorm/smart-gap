import React from "react";

const Button = ({
  id,
  title,
  leftIcon,
  rightIcon,
  containerClass = "",
  onClick,
  href,
}) => {
  const content = (
    <>
      {leftIcon && <span className="inline-flex text-base transition-transform duration-300 group-hover:-translate-x-0.5">{leftIcon}</span>}
      <span className="relative inline-flex overflow-hidden font-general text-[11px] font-black uppercase tracking-wider">
        <span className="inline-block transition-transform duration-500 group-hover:-translate-y-[140%] group-hover:skew-y-6">
          {title}
        </span>
        <span className="absolute left-0 inline-block translate-y-[140%] skew-y-6 transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </span>
      </span>
      {rightIcon && <span className="inline-flex text-base transition-transform duration-300 group-hover:translate-x-0.5">{rightIcon}</span>}
    </>
  );

  const baseClasses = `group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-5 py-2 font-bold transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-1.5 ${containerClass}`;

  if (href) {
    return (
      <a id={id} href={href} className={baseClasses} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button id={id} onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};

export default Button;
