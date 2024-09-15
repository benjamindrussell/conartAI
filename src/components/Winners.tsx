import React from 'react';

interface Winner {
    id: number;
    name: string;
    score: number;
}

interface WinnersProps {
    winners: Winner[];
}

const Winners: React.FC<WinnersProps> = ({ winners }) => {
    return (
        <div>
            <h2>Winners</h2>
            <ul className='flex flex-col justify-center items-center'>
                {winners.map(winner => (
                    <li className="w-[450px] h-[200px] bg-[#303030]" key={winner.id}>
                        {winner.name} - {winner.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Winners;