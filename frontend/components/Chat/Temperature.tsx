import { FC, useEffect, useState } from 'react';

import { DEFAULT_TEMPERATURE } from '@/utils/app/const';

import Slider from '@mui/material/Slider';

interface Props {
  value: number
  onChangeTemperature: (temperature: number) => void;
}

export const TemperatureSlider: FC<Props> = ({ value, onChangeTemperature }) => {
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);

  useEffect(() => {
    // 初始化温度
    setTemperature(value)
  }, [])

  const handleChange = (event: any) => {
    event.stopPropagation(); // 阻止事件冒泡
    event.preventDefault(); // 阻止默认事件

    const newValue = parseFloat(event.target.value);
    setTemperature(newValue);

    onChangeTemperature(newValue);
  };

  return (
    <div className="flex flex-col w-full pl-10">
      <Slider
        min={0}
        max={1}
        step={0.1}
        value={temperature}
        valueLabelDisplay="on"
        onChange={handleChange}
        sx={{
          '& .MuiSlider-thumb': {
            color: '#161616',
          },
          '& .MuiSlider-thumb:hover': {
            boxShadow: 'none !important',
          },
          '& .MuiSlider-thumb.Mui-active': {
            boxShadow: 'none !important',
          },
          '& .MuiSlider-track': {
            color: '#161616',
          },
          '& .MuiSlider-rail': {
            color: '#7E7E7E',
          },
          '& .MuiSlider-valueLabel': {
            fontFamily: 'Montserrat',
            top: 45,
            backgroundColor: 'unset',
            color: '#161616',
            '&:before': {
              display: 'none',
            },
            '& *': {
              background: 'transparent',
              color: '#161616',
            },
          },
        }}
      />
    </div>
  );
};
