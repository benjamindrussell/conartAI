import React from 'react';
import Navbar from '../components/Navbar';
// import Spline from '@splinetool/react-spline';

const Index: React.FC = () => {
    return (
        <div className='w-screen h-screen bg-custom-bg bg-cover bg-center overflow-hidden'>
            <Navbar />
            <div className='flex items-center justify-center h-full'>
                <div className='text-center font-poppins mt-[-2vw]'>
                    <p className='sm:text-[8px] md:text-[16px] font-regular animate-fadeIn1'>Sparking creativity in game designers by...</p>
                    <h1 className='md:text-[32px] sm:text-[16px] animate-fadeIn2'>Bringing your Ideas to Life with</h1>
                    <h1 className="md:text-[120px] text-[60px] mt-[-1vw] font-bold bg-gradient-to-b from-white to-black bg-clip-text text-transparent animate-fadeIn3">ConArt AI
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Index;