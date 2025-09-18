// src/ThemeContext.js

import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Inicia o tema com o valor do localStorage ou 'dark' como padrão
  const [theme, setTheme] = useState(() => {
    const localData = localStorage.getItem('theme');
    return localData || 'dark';
  });

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Efeito para atualizar o localStorage e a classe no body do HTML
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Adicionamos uma classe 'dark' ou 'light' no <body>
    document.body.className = theme;
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};