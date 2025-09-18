// src/Favorites.js

import React, { useContext } from 'react';
import { FavoritesContext } from './FavoritesContext';
import { Link } from 'react-router-dom';

const Favorites = () => {
  // Pega a lista de favoritos do nosso contexto
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="favorites-page">
      <h2>Meus Filmes Favoritos</h2>
      {/* Se a lista de favoritos estiver vazia, mostra uma mensagem */}
      {favorites.length === 0 ? (
        <div className="no-movies">
          <p>Você ainda não adicionou nenhum filme aos favoritos.</p>
        </div>
      ) : (
        // Se tiver favoritos, mostra a lista
        <div className="movie-list">
          {favorites.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=Sem+Imagem'}
                alt={`Pôster do filme ${movie.title}`}
              />
              <h3>{movie.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;