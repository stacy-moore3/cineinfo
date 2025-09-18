// src/Home.js (VERSÃO FINAL E CORRIGIDA)

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

const SkeletonCard = () => (
  <div className="movie-card">
    <Skeleton height={300} />
    <Skeleton height={20} style={{ marginTop: 10 }} />
  </div>
);

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState('Filmes Populares'); // Estado para o título
  const apiKey = '6295881217f0843a800772d191faf3b1';

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5 }
    })
  };

  // Usamos o useCallback para otimizar a função de busca
  const fetchMovies = useCallback(async (url, newHeader) => {
    setLoading(true);
    setHeader(newHeader);
    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setMovies([]); // Limpa os filmes em caso de erro
    }
    setLoading(false);
  }, []); // useCallback memoriza a função

  // ESTA É A MUDANÇA PRINCIPAL
  useEffect(() => {
    const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
    // Sempre que o componente for montado, ele busca os filmes populares
    fetchMovies(popularMoviesUrl, 'Filmes Populares');
  }, [fetchMovies]); // A dependência agora é a própria função de busca

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
      fetchMovies(popularMoviesUrl, 'Filmes Populares');
    } else {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchTerm}`;
      fetchMovies(searchUrl, `Resultados para: "${searchTerm}"`);
    }
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSearch}>
        <input type="text" placeholder="Procure por um filme..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Pesquisar</button>
      </form>

      <h2>{header}</h2>
      <SkeletonTheme baseColor="var(--loading-base-color)" highlightColor="var(--loading-highlight-color)">
        <div className="movie-list">
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
          ) : movies.length > 0 ? (
            movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Link to={`/movie/${movie.id}`} className="movie-card">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=Sem+Imagem'}
                    alt={`Pôster do filme ${movie.title}`}
                  />
                  <h3>{movie.title}</h3>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="no-movies">
              <h2>Nenhum filme encontrado.</h2>
            </div>
          )}
        </div>
      </SkeletonTheme>
    </>
  );
};

export default Home;