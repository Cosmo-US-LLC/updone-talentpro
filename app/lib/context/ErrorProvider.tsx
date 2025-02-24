import { createContext, ReactNode, useContext, useState } from 'react';

// Create the context
const ErrorContext =createContext<any | undefined>(undefined);

// Create a provider component
export const ErrorProvider = ({ children }:{children:ReactNode}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const showError = (message:any) => {
    setErrorMessage(message);
    setModalOpen(true);
  };
  const handleError = ( message: string,statusCode: number) => { 
    if(statusCode<200 && statusCode>299 ){
        setErrorMessage(message);
    }
    if (statusCode >= 400 && statusCode < 500) {
      setErrorMessage(message);
  }
    if (statusCode >= 500 ) {
        setModalOpen(true);
    }
};

  const closeError = () => {
    setModalOpen(false);
    setErrorMessage('');
  };

  return (
    <ErrorContext.Provider value={{ showError, closeError, isModalOpen, errorMessage,handleError,setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Create a custom hook to use the error context
export const useError = () => {
  return useContext(ErrorContext);
};
