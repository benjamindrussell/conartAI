import React from 'react';
import Replicate from '../components/Replicate';
import Logo from '../components/Logo';
import Chat from '../components/Chat';
const Draw: React.FC = () => {
  return (
    <div className='flex flex-col w-screen h-screen bg-black'>
      <div className='flex w-full gap-5 py-5'>
        <Logo></Logo>
        <div className='w-[9vw] ml-[7vw] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-[#191919] h-[3vw] rounded-xl'></div>
        {/* Timer Goes ^ */}
        <button className='font-poppins font-regular shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-white w-[8vw] text-[14px] h-[3vw] rounded-xl text-black flex items-center justify-center'>Submit</button>
      </div>
      <div className='flex justify-evenly bg-black'>
        <Replicate></Replicate>
        <Chat></Chat>
      </div>
      <div className='flex flex-col'></div>
    </div>
  );
}

export default Draw;