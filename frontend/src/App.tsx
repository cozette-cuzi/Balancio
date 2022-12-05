import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
