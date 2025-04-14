import React, { useState } from 'react';

const NumberInput = ({ setNumber }) => {
  const [value, setValue] = useState(1);

  const handleDecrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      setNumber(newValue);
    }
  };

  const handleIncrement = () => {
    if (value < 10) {
        const newValue = value + 1;
        setValue(newValue);
        setNumber(newValue);
      }
  };

  const handleChange = (e) => {
    const newValue = Math.max(1, parseInt(e.target.value) || 1);
    setValue(newValue);
    setNumber(newValue);

    if(newValue > 10) {
      setValue(10);
      setNumber(10);
    }
    else if(newValue < 1) {
      setValue(1);
      setNumber(1);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-center border border-gray-400 rounded-md md:w-2/6 w-2/4 mt-5  '>
        <button onClick={handleDecrement} className='px-4 py-2 text-xl font-medium'>-</button>
        <input
          type="number"
          min={1}
          value={value}
          onChange={handleChange}
          className='w-full text-center border-none outline-none'
        />
        <button onClick={handleIncrement} className='px-4 py-2 text-xl font-medium'>+</button>
      </div>
    </div>
  );
};

export default NumberInput;
