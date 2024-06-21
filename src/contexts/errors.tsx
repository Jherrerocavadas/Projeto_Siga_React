import React, { createContext, useState, useEffect, useContext } from 'react';


interface ErrorContextData {
  error: ErrorData;
  setError: (error: ErrorData | null) => void;
}

interface ErrorData{
  title: string;
  description: string;
  closeLabel: string;
}

const ErrorContext = createContext<ErrorContextData>({} as ErrorContextData);


export function ErrorProvider({children}){
    const [error, setError] = useState(null);

    
      return (
        <ErrorContext.Provider
          value={{error, setError}}>
          {children}
        </ErrorContext.Provider>
      );
    };
    
    export function useError() {
      const context = useContext(ErrorContext);
    
      return context;
    }