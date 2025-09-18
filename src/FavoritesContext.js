// src/FavoritesContext.js

import React, { createContext, useState, useEffect } from 'react';

// 1. Criamos o Contexto
export const FavoritesContext = createContext();

// 2. Criamos o "Provedor" do Contexto
export const FavoritesProvider = ({ children }) => {
  // O estado que vai guardar a lista de filmes favoritos
  const [favorites, setFavorites] = useState(() => {
    // Tenta carregar os favoritos do localStorage ao iniciar
    const localData = localStorage.getItem('favorites');
    return localData ? JSON.parse(localData) : [];
  });

  // Efeito que salva os favoritos no localStorage sempre que a lista muda
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Função para adicionar um filme aos favoritos
  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  // Função para remover um filme dos favoritos
  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  // Valor que será compartilhado com todos os componentes
  const value = {
    favorites,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};