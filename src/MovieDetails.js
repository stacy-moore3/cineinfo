// src/MovieDetails.js (Versão Final e Moderna)

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FavoritesContext } from './FavoritesContext';
import { motion } from 'framer-motion'; // Para animações
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; // Para o gráfico
import 'react-circular-progressbar/dist/styles.css'; // CSS do gráfico

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const apiKey = '6295881217f0843a800772d191faf3b1'; // Sua chave já está aqui

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
        setMovie(response.data);
      } catch (error) { console.error("Erro ao buscar detalhes do filme:", error); }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="loading">Carregando...</div>;
  }

  const isFavorite = favorites.some(favMovie => favMovie.id === movie.id);
  const backdropStyle = { backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` };
  const rating = movie.vote_average * 10; // Converte a nota para uma porcentagem (ex: 8.7 -> 87)

  return (
    <div className="movie-details-backdrop" style={backdropStyle}>
      <div className="movie-details-page">
        <div className="details-poster">
          <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}` : 'https://via.placeholder.com/400x600?text=Sem+Imagem'} alt={`Pôster do filme ${movie.title}`} />
        </div>
        <div className="details-info">
          <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
          <p className="tagline">{movie.tagline}</p>
          
          <div className="rating-and-favorite">
            {/* O novo componente de gráfico */}
            <div style={{ width: 70, height: 70 }}>
              <CircularProgressbar
                value={rating}
                text={`${rating.toFixed(0)}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "rgba(0,0,0,0.4)",
                  textColor: "#fff",
                  pathColor: rating > 70 ? "#21d07a" : rating > 40 ? "#d2d531" : "#db2360", // Verde, Amarelo ou Vermelho
                  trailColor: "transparent"
                })}
              />
            </div>
            
            {/* O botão agora tem micro-interação e é redondo */}
            <motion.button
              whileTap={{ scale: 0.9 }} // Animação de clique
              className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
            >
              {isFavorite ? '❤️' : '🤍'}
            </motion.button>
          </div>

          <h3>Sinopse</h3>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;