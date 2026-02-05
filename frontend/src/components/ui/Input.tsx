import React, { forwardRef } from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', id, ...props }, ref) => {
        const inputId = id || props.name;

        return (
            <div className="input-group">
                {label && <label htmlFor={inputId} className="input-label">{label}</label>}
                <input
                    id={inputId}
                    ref={ref}
                    className={`input-field ${error ? 'input-field--error' : ''} ${className}`}
                    {...props}
                />
                {error && <span className="input-error">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
