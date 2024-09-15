import React from 'react';
const Logo: React.FC = () => {
    return (
            <div className='flex flex-row absolute'>
                <div className='w-[30px] ml-[3vw] h-[30px] mt-[0.4vw] rounded-full bg-white'></div>
                <h1 className='mt-[0.5vw] ml-[1vw] font-bold font-poppins text-[10px] md:text-[18px]'>ConArt AI</h1>
            </div>

    );
};

export default Logo;