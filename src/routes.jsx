import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './views/DashboardPage';
import HomePage from './views/HomePage';
import ChartPage from './views/ChartPage';
import MetricsPage from './views/MetricsPage';
import VambePage from './views/VambePage';
import CategoryPage from './views/CategoryPage';
import InfoPage from './views/InfoPage';
import SellerPage from './views/SellerPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/statistics/:category" element={<ChartPage />} />
        <Route path="/seller" element={<SellerPage />}/>
        <Route path="/vambe" element={<VambePage />} />
        <Route path="/info" element={< InfoPage />}/>
        <Route path="/metrics" element={<MetricsPage />} />
    </Routes>
    <Footer />
  </Router>
);

export default AppRoutes;
