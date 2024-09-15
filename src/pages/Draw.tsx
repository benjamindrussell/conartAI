import React from 'react';
import Replicate from '../components/Replicate';
import Logo from '../components/Logo';
const Draw: React.FC = () => {
    return(
        <div className='flex flex-row w-screen h-screen bg-black'>
            <div className='flex bg-black flex-col w-[75%]'>
                <div className='flex w-full gap-5 py-5'>
                    <Logo></Logo>
                    <div className='w-[9vw] ml-[7vw] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-[#191919] h-[3vw] rounded-xl'></div>
                    {/* Timer Goes ^ */}
                    <div className='font-poppins font-regular shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-white w-[8vw] text-[14px] h-[3vw] rounded-xl text-black flex items-center justify-center'>Submit</div>
                </div>
                <div className='flex w-full h-[70vw]'>
                    <Replicate></Replicate>
                </div>
            </div>
                <div className=''>
                    <div></div>
                </div>
            <div className='flex flex-col'></div>
        </div>
    );
}

export default Draw;