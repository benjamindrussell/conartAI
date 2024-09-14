import React from 'react';
import Logo from '../components/Logo';
const Vote: React.FC = () => {
    return(
        <div className='flex flex-row w-screen h-screen bg-black'>
            <div className='flex bg-black flex-col w-[75%]'>
                <div className='mt-[1.5vw]'>
                    <Logo></Logo>
                </div>

                <div className='flex w-full mt-[2vw]'>
                    <div className='w-[60vw] bg-[#2b2b2b] h-[40vw] ml-10 rounded-2xl'></div>
                </div>
                <div className='flex'>
                    <button className='font-poppins ml-[3vw] mt-[2vw] bg-white p-2 rounded-xl text-black w-[15vw]'>Submit Vote</button>
                    <ul className="flex flex-row justify-center items-center mt-[2.5vw] ml-[10vw] gap-11">
                    <li className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#5C5C5C] hover:bg-white hover:cursor-pointer hover:text-black">1</li>
                    <li className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#5C5C5C] hover:bg-white hover:cursor-pointer hover:text-black">2</li>
                    <li className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#5C5C5C] hover:bg-white hover:cursor-pointer hover:text-black">3</li>
                    <li className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#5C5C5C] hover:bg-white hover:cursor-pointer hover:text-black">4</li>
                    <li className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#5C5C5C] hover:bg-white hover:cursor-pointer hover:text-black">5</li>
                    </ul>

                </div>



            </div>
                <div className=''>
                    <div></div>
                </div>
            <div className='flex flex-col'></div>
        </div>
    );
}

export default Vote;