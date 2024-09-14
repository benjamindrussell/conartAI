import React from 'react';
import Navbar from '../components/Navbar';
// import Spline from '@splinetool/react-spline';

const Index: React.FC = () => {
    return (
        <div className='w-screen h-screen bg-custom-bg bg-cover bg-center overflow-hidden'>
            <Navbar />
            <div className='flex items-center justify-center h-full'>
                <div className='text-center font-poppins mt-[-2vw]'>
                    <p className='text-[16px] font-regular'>Sparking creativity in game designers by...</p>
                    <h1 className='text-[32px]'>Bringing your Ideas to Life with</h1>
                    <h1 className='text-[120px] mt-[-1vw] font-bold bg-gradient-to-b from-white to-black bg-clip-text text-transparent'>ConArt AI</h1>
                </div>
            </div>
        </div>
    );
};

export default Index;