import React, { createContext, useContext } from 'react'

const CalendarContext = createContext();

const useCalendar = () => {
  const contextValue = useContext(CalendarContext);
  return contextValue;
};

export {  CalendarContext, useCalendar };
