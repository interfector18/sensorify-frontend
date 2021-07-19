import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useColorMode } from '@chakra-ui/react';

const DatePicker = (props: ReactDatePickerProps) => {
  const {
    isClearable = false,
    showPopperArrow = false,
    ...rest
  } = props
  const isLight = useColorMode().colorMode === 'light';
  return (
    <div className={isLight ? "light-theme" : "dark-theme"}>
      <ReactDatePicker
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
        className="react-datapicker__input-text"
        {...rest}
      />
    </div>
  );
};

export default DatePicker;