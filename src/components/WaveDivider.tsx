import React from 'react';

interface WaveDividerProps {
    position?: 'top' | 'bottom';
    fill?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ position = 'bottom', fill = '#ffffff' }) => {
    const style = position === 'top' ? { transform: 'rotate(180deg)', marginBottom: '-1px' } : { marginTop: '-1px' };

    return (
        <div style={{ overflow: 'hidden', lineHeight: 0, ...style }}>
            <svg
                className="w-100"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{ display: 'block', width: '100%', height: '60px' }}
            >
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    fill={fill}
                ></path>
            </svg>
        </div>
    );
};

export default WaveDivider;
