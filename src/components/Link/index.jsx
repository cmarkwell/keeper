import './link.css';

const Link = ({ children, leftIcon, rightIcon, ...aProps }) => (
    <a {...aProps} className={`keeper-link${leftIcon || rightIcon ? ' keeper-link-icon' : ''}`}>
        {leftIcon && <i className={leftIcon} />}
        {children}
        {rightIcon && <i className={rightIcon} />}
    </a>
);

export default Link;
