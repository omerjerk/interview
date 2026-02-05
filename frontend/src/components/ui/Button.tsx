import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    ...props
}) => {
    const baseClass = 'ui-button';
    const variantClass = `ui-button--${variant}`;
    const sizeClass = `ui-button--${size}`;
    const loadingClass = isLoading ? 'ui-button--loading' : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? <span className="spinner" /> : children}
        </button>
    );
};
