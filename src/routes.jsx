import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './views/DashboardPage';
import HomePage from './views/HomePage';
import ChartPage from './views/ChartPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/statistics/:category" element={<ChartPage />} />
    </Routes>
    <Footer />
  </Router>
);

export default AppRoutes;
