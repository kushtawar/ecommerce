import React from 'react';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <main className="py-3">
        <Container>
          {/* <h1 className="container text-center">eCommerce Shop</h1> */}
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
