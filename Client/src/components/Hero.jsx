import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from './ui';

/**
 * Hero component for homepage and landing pages
 */
const Hero = ({
    title,
    subtitle,
    primaryAction,
    primaryActionText,
    primaryActionLink,
    secondaryAction,
    secondaryActionText,
    secondaryActionLink,
    image,
    imageAlt = 'Hero image',
    variant = 'default',
    className = '',
    ...props
}) => {
    // Variant styles
    const variantStyles = {
        default: 'bg-white',
        primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white',
        secondary: 'bg-gray-100',
        accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white',
        dark: 'bg-gray-900 text-white',
    };

    // Button variant based on hero variant
    const buttonVariant = variant === 'primary' || variant === 'accent' || variant === 'dark' ? 'secondary' : 'primary';
    const secondaryButtonVariant = variant === 'primary' || variant === 'accent' || variant === 'dark' ? 'outline' : 'secondary';

    return (
        <div className={`${variantStyles[variant]} ${className}`} {...props}>
            <div className="container-custom py-16 md:py-24">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto md:mx-0 opacity-90 animate-slide-up">
                            {subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            {primaryActionLink && (
                                <Button
                                    to={primaryActionLink}
                                    variant={buttonVariant}
                                    size="lg"
                                    className="animate-fade-in"
                                >
                                    {primaryActionText}
                                </Button>
                            )}
                            {primaryAction && (
                                <Button
                                    onClick={primaryAction}
                                    variant={buttonVariant}
                                    size="lg"
                                    className="animate-fade-in"
                                >
                                    {primaryActionText}
                                </Button>
                            )}
                            {secondaryActionLink && (
                                <Button
                                    to={secondaryActionLink}
                                    variant={secondaryButtonVariant}
                                    size="lg"
                                    className="animate-fade-in"
                                >
                                    {secondaryActionText}
                                </Button>
                            )}
                            {secondaryAction && (
                                <Button
                                    onClick={secondaryAction}
                                    variant={secondaryButtonVariant}
                                    size="lg"
                                    className="animate-fade-in"
                                >
                                    {secondaryActionText}
                                </Button>
                            )}
                        </div>
                    </div>
                    {image && (
                        <div className="flex-1 animate-fade-in">
                            <img
                                src={image}
                                alt={imageAlt}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Hero.propTypes = {
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node,
    primaryAction: PropTypes.func,
    primaryActionText: PropTypes.string,
    primaryActionLink: PropTypes.string,
    secondaryAction: PropTypes.func,
    secondaryActionText: PropTypes.string,
    secondaryActionLink: PropTypes.string,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent', 'dark']),
    className: PropTypes.string,
};

export default Hero;