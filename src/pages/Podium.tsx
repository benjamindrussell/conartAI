import React from 'react';
import Navbar from '../components/Navbar';
const Podium: React.FC = () => {
    return (
        <div className='bg-black w-screen h-screen'>
            <Navbar></Navbar>
            <div className='w-screen h-screen flex flex-col justify-center gap-8 items-center'>
                <div className='w-[700px] rounded-2xl h-[200px] bg-[#191919]'>
                    <div className='w-full h-full flex items-end justify-end p-4'>
                        <button className='w-[100px] h-[35px] font-poppins text-black rounded-2xl bg-white text-[13px] hover:opacity-[60%]'>Save Image</button>
                    </div>
                </div>
                <div className='w-[600px] rounded-2xl h-[200px] bg-[#191919] flex flex-col justify-center items-center '>
                    <div className='flex'>
                    <div className="w-[450px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] h-[50px] rounded-xl bg-[#303030] px-12 pb-5 pt-3 font-poppins font-regular">2 - Benjamin
                        
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Podium;