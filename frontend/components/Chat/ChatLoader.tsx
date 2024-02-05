import { FC } from 'react';
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp';
import Paper from '@mui/material/Paper';

import RobotIcon from '@/icons/RobotIcon';

interface Props { }

export const ChatLoader: FC<Props> = () => {
  return (
    <div className="w-full bg-[#F3F3F3] text-[#011020] relative flex items-center justify-start">
      {/* <RobotIcon
        className={`rounded-full ml-28`}
        width={30}
        height={30}
      /> */}
      <span className='w-[30px] h-[30px] flex items-center justify-center rounded-full ml-28 bg-[#00143a]'>
        <SmartToySharpIcon htmlColor='#fff' fontSize="medium" />
      </span>
      <Paper
        elevation={3}
        className="relative w-[4rem] bg-white my-4 flex items-center p-3 text-base rounded-2xl ml-4 mr-40"
      >
        <span className="animate-pulse cursor-default">▍</span>
      </Paper>
    </div>
  );
};
