// src/App.js (VERSÃO FINAL - Com Tema, Favoritos e correção para GitHub Pages)

import React from 'react';
// A ÚNICA MUDANÇA ESTÁ AQUI: Trocamos BrowserRouter por HashRouter
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import MovieDetails from './MovieDetails';
import Favorites from './Favorites';
import AnimatedPage from './AnimatedPage';
import { AnimatePresence } from 'framer-motion';
import { FavoritesProvider } from './FavoritesContext';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import './App.css';

function AppLayout() {
  const location = useLocation();

  return (
    <div className="App">
      <header>
        <Link to="/logo-icon.png" alt="CineInfo Logo" className="logo-link">
          <h1>CineInfo</h1>
        </Link>
        <div className="nav-controls">
          <Link to="/favorites" className="nav-link">Meus Favoritos</Link>
          <ThemeToggle />
        </div>
      </header>
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/movie/:id" element={<AnimatedPage><MovieDetails /></AnimatedPage>} />
            <Route path="/favorites" element={<AnimatedPage><Favorites /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <AppLayout />
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;