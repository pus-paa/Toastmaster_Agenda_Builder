import React from "react";

interface InputFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    autoComplete?: string;
    className?: string;
    required?: boolean;
}

const InputField = ({
    id,
    name,
    label,
    type,
    placeholder,
    autoComplete,
    className,
    required,
}: InputFieldProps) => {
    return (
        <div>
            <label htmlFor={id} className="block text-lg font-bold text-gray-700 mb-2">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={className}
                required={required}
            />
        </div>
    );
}

export default InputField;