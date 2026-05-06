import React, { useState, useEffect } from 'react';
import axios from 'axios';

const areas = ['Programación', 'Marketing', 'Game design', 'Diseño'];

const Talents = () => {
  const [selectedArea, setSelectedArea] = useState(areas[0]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuración de Axios y llamada al backend
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('/api/team-members');
        
        setTeamMembers(response.data); 
      } catch (err) {
        console.error("Error al obtener el equipo:", err);
        setError("No se pudo cargar la información del equipo.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // Filtrado de talentos basado en el área seleccionada
  const filteredMembers = teamMembers.filter(miembro => miembro.area === selectedArea);

  // Nuevo estado para mostrar todos los miembros
  const [showAll, setShowAll] = useState(false);

  // Cambia el filtrado según showAll
  const displayedMembers = showAll ? teamMembers : teamMembers.filter(miembro => miembro.area === selectedArea);

  return (
    <div className='w-full min-h-screen bg-black flex flex-col items-center justify-center text-white p-8 text-center'>
      <h4 className='text-4xl'>
        Conoce a nuestros <span className='text-purple-500'>talentos</span> detrás de cada <br/>uno de nuestros proyectos
      </h4>
      
      {/* Selector de Áreas */}
      <div className='flex flex-wrap gap-4 mt-10 mb-8 justify-center'>
        {areas.map(area => (
          <button
            key={area}
            className={`border-2 px-6 py-2 rounded-md font-medium uppercase transition-all duration-200
              ${selectedArea === area && !showAll ? 'bg-[#D1A121] text-black border-[#D1A121]' : 'border-[#D1A121] text-[#D1A121] hover:bg-[#D1A121] hover:text-black'}`}
            onClick={() => {
              setSelectedArea(area);
              setShowAll(false);
            }}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Estados de Carga y Error */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-12 h-12 border-4 border-[#D1A121] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#D1A121] font-medium">Cargando talentos...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500 p-4 rounded-md text-red-500 my-10">
          {error}
        </div>
      )}

      {/* Grid de Talentos */}
      {!loading && !error && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mt-4'>
          {displayedMembers.length > 0 ? (
            displayedMembers.map((miembro) => (
              <div 
                key={miembro.id || miembro.name} 
                className='bg-[#111] border border-gray-800 hover:border-purple-500 transition-colors rounded-xl p-8 flex flex-col items-center group'
              >
                {/* Avatar/Imagen */}
                <div className='w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform'>
                  {miembro.foto ? (
                    <img src={miembro.foto} alt={miembro.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    miembro.name?.[0] || '?'
                  )}
                </div>
                
                <h5 className='text-xl font-bold text-[#D1A121] mb-1'>{miembro.name}</h5>
                <p className='text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3'>{miembro.role}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20">
              <p className="text-gray-500 italic text-lg">Próximamente más talentos en esta área.</p>
            </div>
          )}
        </div>
      )}

      <button
        className='border-2 border-[#D1A121] p-3 w-full max-w-xs rounded-md text-[#D1A121] font-bold uppercase mt-16 hover:bg-[#D1A121] hover:text-black transition-all'
        onClick={() => setShowAll(true)}
        disabled={showAll}
      >
        Ver todo el equipo
      </button>
    </div>
  );
}

export default Talents;