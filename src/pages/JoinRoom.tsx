import React from 'react';
import Navbar from '../components/Navbar';
import Region from '../components/Region';

const JoinRoom: React.FC = () => {
    return (
        <div className='w-screen h-screen bg-black overflow-hidden'>
            <Navbar />
            <div className='flex items-center justify-center h-full'>
                <div className='w-[55vw] h-[25vw] bg-white bg-opacity-[10%] rounded-xl'>
                    <Region/>                    
                    <div className='flex flex-col gap-8 justify-center w-full h-full items-center'>
                        <div className='flex flex-col gap-3'>
                            <div className='relative'>
                                <input 
                                    className='bg-[#303030] px-2 w-[35vw] h-[4vw] rounded-2xl placeholder:absolute placeholder:text-[10px] placeholder:top-2 placeholder:left-3 placeholder:text-white' 
                                    type="text" 
                                    placeholder='Name' 
                                />
                            </div>
                            <div className='relative'>
                                <input 
                                    className='bg-[#303030] px-2 w-[35vw] h-[4vw] rounded-2xl placeholder:absolute placeholder:text-[10px] placeholder:top-2 placeholder:left-3 placeholder:text-white' 
                                    type="text" 
                                    placeholder='Room Code' 
                                />
                            </div>
                        </div>
                        <button className='px-7 rounded-2xl py-3 w-[25vw] bg-white text-[#2b2b2b]'>Join Room</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinRoom;