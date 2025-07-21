import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select } from './ui';

/**
 * SearchBar component for searching jobs and services
 */
const SearchBar = ({
    type = 'job',
    categories = [],
    locations = [],
    onSearch,
    className = '',
    variant = 'default',
    ...props
}) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');

    // Variant styles
    const variantStyles = {
        default: 'bg-white shadow-md rounded-lg p-4',
        primary: 'bg-primary-50 shadow-md rounded-lg p-4 border border-primary-100',
        transparent: 'bg-white/80 backdrop-blur-md shadow-md rounded-lg p-4',
        card: 'bg-white rounded-lg p-4 border border-gray-200',
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchParams = {
            keyword,
            category,
            location,
        };

        if (onSearch) {
            onSearch(searchParams);
        } else {
            // Default behavior: navigate to search page with query params
            const queryString = new URLSearchParams({
                ...(keyword && { keyword }),
                ...(category && { category }),
                ...(location && { location }),
            }).toString();

            navigate(`/${type === 'job' ? 'jobs' : 'services'}?${queryString}`);
        }
    };

    return (
        <div className={`${variantStyles[variant]} ${className}`} {...props}>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                    <Input
                        placeholder={`Search ${type === 'job' ? 'jobs' : 'services'}...`}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        leftIcon={
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                    />
                </div>

                {categories.length > 0 && (
                    <div className="md:w-64">
                        <Select
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            options={[
                                { value: '', label: 'All Categories' },
                                ...categories.map(cat => ({ value: cat.value || cat, label: cat.label || cat })),
                            ]}
                        />
                    </div>
                )}

                {locations.length > 0 && (
                    <div className="md:w-64">
                        <Select
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            options={[
                                { value: '', label: 'All Locations' },
                                ...locations.map(loc => ({ value: loc.value || loc, label: loc.label || loc })),
                            ]}
                        />
                    </div>
                )}

                <div>
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        className="h-full"
                    >
                        Search
                    </Button>
                </div>
            </form>
        </div>
    );
};

SearchBar.propTypes = {
    type: PropTypes.oneOf(['job', 'service']),
    categories: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            }),
        ])
    ),
    locations: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            }),
        ])
    ),
    onSearch: PropTypes.func,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'primary', 'transparent', 'card']),
};

export default SearchBar;