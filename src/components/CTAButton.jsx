import { ChevronRightIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({
  children,
  variant = 'filled', // 'filled' | 'outlined'
  href,
  onClick,
  radius = 999,
  showArrow = false,
  link = '',
  className = '',
}) {
  const isFilled = variant === 'filled'

    const baseClasses = clsx(
    'hover:cursor-pointer group relative inline-flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-medium no-underline overflow-hidden border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
    isFilled
        ? 'bg-[#0d5c4a] text-white border-[#0d5c4a] hover:bg-transparent hover:text-[#0d5c4a] active:bg-transparent active:text-[#0d5c4a]'
        : 'bg-transparent text-[#0d5c4a] border-[#0d5c4a] hover:bg-[#0d5c4a] active:bg-[#0d5c4a] active:text-white hover:text-white',
    className
    );

    const Content = (
    <>
        {/* Animated background */}
        <span
        style={{ borderRadius: radius }}
        className={clsx(
            'absolute inset-0 transition-all duration-300 ease-out scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100',
            isFilled ? 'bg-transparent' : 'bg-[#0d5c4a]'
        )}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-1 w-full select-none">
        <p className="w-max">{children}</p>
        {showArrow && (
            <ChevronRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
        )}
        </span>
    </>
    );

    return link ? (
    <Link
        to={link}
        onClick={onClick}
        style={{ borderRadius: radius }}
        className={baseClasses}
    >
        {Content}
    </Link>
    ) : (
    <button
        onClick={onClick}
        style={{ borderRadius: radius }}
        className={baseClasses}
        type="button"
    >
        {Content}
    </button>
    );
}

export default CTAButton