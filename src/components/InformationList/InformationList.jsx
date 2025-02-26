import React, { useEffect, useState } from "react";
import { fetchMetrics, fetchSubcategories } from "../../services/index";
import "./InformationList.css";

const InformationList = () => {
  const [information, setInformation] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    seller: "",
    closed: "",
    category: "",
    subcategory: "",
  });

  const loadData = async () => {
    const filteredData = await fetchMetrics(filters);
    setInformation(filteredData);
  };

  useEffect(() => {
    loadData();
  }
  , []);

  useEffect(() => {
    if (filters.category) {
      fetchSubcategories(filters.category).then((data) => {
        setSubcategories(data);
      });
    }
    else {
      setSubcategories([]);
    }
  }, [filters.category]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="info-container">
      <h1 className="info-title">Información general de los clientes de Vambe</h1>

      <div className="filters">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="seller"
          placeholder="Vendedor"
          value={filters.seller}
          onChange={handleFilterChange}
        />
        <select name="closed" value={filters.closed} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="1">Cerrado</option>
          <option value="0">No Cerrado</option>
        </select>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">Categoría</option>
          <option value="Industria">Industria</option>
          <option value="Motivacion para Buscar Vambe">Motivacion para Buscar Vambe</option>
          <option value="Interes en Funcionalidades">Interés en Funcionalidades</option>
          <option value="Motivacion para Buscar Vambe">Motivación para Buscar Vambe</option>
        </select>
        <select name="subcategory" value={filters.subcategory} onChange={handleFilterChange} disabled={!filters.category}>
          <option value="">Subcategoría</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </select>
        <button onClick={loadData}>Filtrar</button>
      </div>

      <div className="info-list">
        {information.map((info) => (
          <div key={info.id} className="info-row">
            <div className="info-main">
              <h2>Cliente: {info.client}</h2>
              <p><strong>Fecha:</strong> {formatDate(info.date)}</p>
              <p><strong>Vendedor:</strong> {info.seller}</p>
              <p className={`status ${info.closed ? "closed" : "open"}`}>
                {info.closed ? "✅ Acuerdo Cerrado" : "❌ Acuerdo No Cerrado"}
              </p>
            </div>
            <div className="info-subcategories">
              <h3>Subcategorías Asignadas:</h3>
              <ul>
                {info.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <strong>{sub.name}</strong> - Categoría: {sub.category?.name || "Sin categoría"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformationList;
