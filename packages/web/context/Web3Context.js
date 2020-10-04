import React, { createContext, useEffect } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

export const Web3Context = createContext({
  ethersProvider: null,
  connectWeb3: async () => {},
  disconnect: () => undefined,
});

export const Web3ContextProvider = ({ children }) => {
  const [web3modal, setWeb3Modal] = useState();
  useEffect(() => {
    setWeb3Modal(new Web3Modal({
    }))
  });
};
