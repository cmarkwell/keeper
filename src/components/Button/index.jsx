import './button.css';

const Button = ({ children, className, leftIcon, rightIcon, ...buttonProps }) => (
    <button
        {...buttonProps}
        className={`keeper-button${leftIcon || rightIcon ? ' keeper-button-icon' : ''}${className ? ` ${className}` : ''}`}
    >
        {leftIcon && <i className={leftIcon} />}
        {children}
        {rightIcon && <i className={rightIcon} />}
    </button>
);

export default Button;
