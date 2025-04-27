import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showError = (msg) => setMessage(msg);
  const dismiss = () => setMessage(null);

  return (
    <ErrorContext.Provider value={{ message, showError, dismiss }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}
