import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className='flex justify-center items-center py-6 absolute w-full'>
      <div className='bg-white/5 backdrop-blur-lg rounded-3xl h-15 w-[80vw] text-center'>
        <div className='flex justify-center md:justify-end mr-4 space-x-4 p-3 right-2 text-[#2b2b2b]'>
          <Link to="/create">
            <button className='room-button'>Create Room</button>
          </Link>
          <Link to="/join">
            <button className='room-button'>Join Room</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;