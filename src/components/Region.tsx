import React from 'react';
import CanadaPNG from '../assets/Canada.png';
const Region: React.FC = () => {
    return (
            <div className='flex flex-row'>
                <img src={CanadaPNG} className='w-[25px] ml-[10px] mt-[5px] absolute'></img>
                <div className="ml-[40px] mt-[15px] absolute w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
            </div>

    );
};

export default Region;