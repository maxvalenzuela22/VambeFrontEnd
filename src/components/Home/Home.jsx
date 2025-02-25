import "./Home.css";

const Home = () => {
  const navigator = () => {
    window.location.href = "/dashboard";
  }

  return (
    <div className="home-container">
      <h1 className="home-title">¡Bienvenido a la Prueba Técnica de Vambe!</h1>
      <p className="home-subtitle">
        Desarrollado por <span className="highlight">Max Valenzuela</span>, combinando tecnología y creatividad. 🚀
      </p>

      <div className="home-card">
        <p>🎨 Diseño inspirado en la esencia de Vambe.</p>
        <p>📊 Gráficos interactivos, rendimiento optimizado y una experiencia espectacular.</p>
      </div>

      <button className="home-button" onClick={navigator}>Explorar Más</button>
    </div>
  );
};

export default Home;
