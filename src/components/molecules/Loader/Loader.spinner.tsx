import React from 'react';
import { TailSpin } from 'react-loader-spinner';

interface ILoadSpinner {
    color: any;  // Changed type to string array
}

const LoaderSpinner: React.FC<ILoadSpinner> = ({ 
    color  // Default colors
}) => {
    // Ensure we always have 5 colors

    return (
        <TailSpin
            visible={true}
            height="15"
            width="15"
            color={color}
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            />)
};

export default LoaderSpinner;