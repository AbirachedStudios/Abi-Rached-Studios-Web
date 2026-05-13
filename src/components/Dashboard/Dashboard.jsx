import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Trash2, 
  Edit3, 
  Plus, 
  Users, 
  Briefcase, 
  Layout, 
  Package, 
  UserX,
  Linkedin,
  Github,
  Save,
  X
} from 'lucide-react';

const SECTIONS = [
  { key: 'news', label: 'Noticias', icon: Layout },
  { key: 'users', label: 'Usuarios', icon: Users },
  { key: 'team-members', label: 'Miembros del Equipo', icon: Briefcase },
  { key: 'stock', label: 'Stock', icon: Package },
];


const API_BASE_URL = 'http://localhost:3001/api';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('news');
  const [data, setData] = useState({ news: [], users: [], team: [], stock: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/${activeSection}`);
      setData(prev => ({ ...prev, [activeSection]: res.data || [] }));
    } catch (err) {
      console.error("Error fetching data: Verifica que el backend en 3001 esté activo.", err);
      // Evitamos que el estado quede indefinido si falla la red
      setData(prev => ({ ...prev, [activeSection]: [] }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  const openModal = (item = null) => {
    if (!item && activeSection === 'team-members') {
      setForm({ area: '', role: '', name: '', imageUrl: '', linkedinUrl: '', githubUrl: '' });
    } else {
      setForm(item || {});
    }
    setEditId(item ? item.id : null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({});
    setEditId(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const method = editId ? 'put' : 'post';
      const url = `${API_BASE_URL}/${activeSection}${editId ? `/${editId}` : ''}`;
      
      const payload = { ...form };
      if (activeSection === 'stock' && payload.quantity) {
        payload.quantity = parseInt(payload.quantity, 10);
      }

      await axios[method](url, payload);
      await fetchData(); 
      closeModal();
    } catch (err) {
      console.error("Error al guardar:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Confirmas que deseas eliminar este registro de la base de datos?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${activeSection}/${id}`);
        fetchData();
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  const deleteInactiveUsers = async () => {
    if (window.confirm('¿Deseas eliminar todos los usuarios que no han tenido actividad en los últimos 12 meses?')) {
      try {
        await axios.delete(`${API_BASE_URL}/user/cleanup/inactive`);
        fetchData();
      } catch (err) {
        console.error("Error al limpiar usuarios", err);
      }
    }
  };

  const renderColumns = () => {
    switch (activeSection) {
      case 'news':
        return [{ key: 'image', label: 'Vista' }, { key: 'title', label: 'Título' }, { key: 'createdAt', label: 'Fecha' }];
      case 'users':
        return [{ key: 'name', label: 'Usuario' }, { key: 'email', label: 'Email' }, { key: 'lastLogin', label: 'Última Conexión' }];
      case 'team-members':
        return [{ key: 'imageUrl', label: 'Foto' }, { key: 'name', label: 'Nombre' }, { key: 'role', label: 'Puesto' }, { key: 'area', label: 'Área' }];
      case 'stock':
        return [{ key: 'item', label: 'Producto' }, { key: 'quantity', label: 'Stock' }];
      default: return [];
    }
  };

  const renderFormFields = () => {
    switch (activeSection) {
      case 'team-members':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="label-oro">Nombre Completo</label>
                <input 
                  className="input-dark" 
                  placeholder="Ej: Julian Casablancas"
                  value={form.name || ''} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                />
              </div>
              <div className="space-y-1">
                <label className="label-oro">Puesto / Rol</label>
                <input 
                  className="input-dark" 
                  placeholder="Ej: Senior Developer"
                  value={form.role || ''} 
                  onChange={e => setForm({...form, role: e.target.value})} 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="label-oro">Área de Trabajo</label>
              <select 
                className="input-dark bg-black w-full appearance-none"
                value={form.area || ''} 
                onChange={e => setForm({...form, area: e.target.value})}
              >
                <option value="" disabled>Seleccionar Área...</option>
                <option value="Administración">Administración</option>
                <option value="Programación">Programación</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Diseño">Diseño & UX</option>
                <option value="Marketing">Marketing</option>
                <option value="Gerencia">Gerencia</option>
                <option value="Soporte">Soporte Técnico</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
                <option value="Finanzas">Finanzas</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="label-oro">URL de la Imagen de Perfil</label>
              <div className="flex gap-3 items-center">
                <input 
                  className="input-dark flex-1" 
                  placeholder="https://..."
                  value={form.imageUrl || ''} 
                  onChange={e => setForm({...form, imageUrl: e.target.value})} 
                />
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#D1A121]/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {form.imageUrl ? (
                    <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" />
                  ) : <Briefcase size={20} className="text-gray-600"/>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-6">
              <div className="space-y-1">
                <label className="label-oro flex items-center gap-2">
                  <Linkedin size={12}/> LinkedIn URL
                </label>
                <input 
                  className="input-dark border-[#0A66C2]/30 focus:border-[#0A66C2]" 
                  placeholder="linkedin.com/in/..."
                  value={form.linkedinUrl || ''} 
                  onChange={e => setForm({...form, linkedinUrl: e.target.value})} 
                />
              </div>
              <div className="space-y-1">
                <label className="label-oro flex items-center gap-2">
                  <Github size={12}/> GitHub URL
                </label>
                <input 
                  className="input-dark border-white/20 focus:border-white" 
                  placeholder="github.com/..."
                  value={form.githubUrl || ''} 
                  onChange={e => setForm({...form, githubUrl: e.target.value})} 
                />
              </div>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="label-oro">Título de la noticia</label>
              <input className="input-dark" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="label-oro">Resumen Breve</label>
              <textarea className="input-dark" value={form.summary || ''} onChange={e => setForm({ ...form, summary: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="label-oro">Imagen de Cabecera (URL)</label>
              <input className="input-dark" value={form.image || ''} onChange={e => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="label-oro">Contenido Extendido</label>
              <textarea className="input-dark" rows="5" value={form.content || ''} onChange={e => setForm({ ...form, content: e.target.value })} />
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="label-oro">Nombre de Usuario</label>
              <input className="input-dark" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="label-oro">Correo Electrónico</label>
              <input className="input-dark" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
        );

      case 'stock':
        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="label-oro">Nombre del Producto</label>
              <input className="input-dark" value={form.item || ''} onChange={e => setForm({ ...form, item: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="label-oro">Cantidad disponible</label>
              <input type="number" className="input-dark" value={form.quantity || ''} onChange={e => setForm({ ...form, quantity: e.target.value })} />
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-[#D1A121]/30">
      {/* Estilos globales inyectados manualmente para evitar errores de JSX attribute */}
      <style>
        {`
          .input-dark {
            width: 100%;
            background: #000;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 1.25rem;
            padding: 1rem 1.25rem;
            color: white;
            outline: none;
            transition: all 0.3s;
            font-weight: 500;
          }
          .input-dark:focus {
            border-color: #D1A121;
            background: #050505;
            box-shadow: 0 0 0 4px rgba(209, 161, 33, 0.05);
          }
          .label-oro {
            color: #D1A121;
            font-size: 0.7rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            display: block;
            margin-bottom: 0.5rem;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(209, 161, 33, 0.2);
            border-radius: 10px;
          }
        `}
      </style>

      {/* Sidebar */}
      <aside className="w-72 bg-[#0A0A0A] p-8 flex flex-col gap-4 border-r border-white/5 sticky top-0 h-screen">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-[#D1A121] italic tracking-tighter">ADMIN</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Control Panel v2.0</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          {SECTIONS.map(sec => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.key}
                className={`py-4 px-6 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-3
                  ${activeSection === sec.key ? 'bg-[#D1A121] text-black shadow-lg shadow-[#D1A121]/10' : 'text-gray-500 hover:text-[#D1A121] hover:bg-white/5'}`}
                onClick={() => setActiveSection(sec.key)}
              >
                <Icon size={18}/>
                {sec.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h3 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">
                {SECTIONS.find(s => s.key === activeSection)?.label}
            </h3>
            <p className="text-gray-500 mt-2 font-medium">Gestiona la información de {activeSection} en tiempo real.</p>
          </div>
          
          <div className="flex gap-4">
            {activeSection === 'users' && (
              <button 
                onClick={deleteInactiveUsers} 
                className="bg-transparent border border-[#E67E22]/50 text-[#E67E22] hover:bg-[#E67E22] hover:text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all group"
              >
                <UserX size={20} className="group-hover:scale-110 transition-transform"/> 
                Limpiar Inactivos
              </button>
            )}
            <button 
              onClick={() => openModal()} 
              className="bg-[#8A2BE2] hover:bg-[#9b4ced] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-[#8A2BE2]/20 active:scale-95"
            >
              <Plus size={20} /> 
              Nuevo {activeSection === 'team' ? 'Miembro' : 'Registro'}
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#111] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                {renderColumns().map(col => (
                  <th key={col.key} className="py-6 px-8 text-[#D1A121] text-[10px] font-black uppercase tracking-widest">{col.label}</th>
                ))}
                <th className="py-6 px-8 text-[#D1A121] text-[10px] font-black uppercase tracking-widest text-right font-black">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data[activeSection] && data[activeSection].length > 0 ? (
                data[activeSection].map(item => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-all group">
                    {renderColumns().map(col => (
                      <td key={col.key} className="py-5 px-8 text-sm text-gray-300">
                        {col.key.toLowerCase().includes('url') || col.key === 'image' ? (
                          <div className="relative w-10 h-10 group/img">
                            <img 
                              src={item[col.key] || 'https://via.placeholder.com/150'} 
                              className="w-10 h-10 rounded-full object-cover border border-[#8A2BE2]/30 shadow-lg" 
                              alt="thumb" 
                            />
                          </div>
                        ) : col.key === 'createdAt' || col.key === 'lastLogin' ? (
                          <span className="font-mono text-xs text-gray-500">
                             {item[col.key] ? new Date(item[col.key]).toLocaleDateString() : '-'}
                          </span>
                        ) : (
                          <span className="font-medium">{item[col.key] || '-'}</span>
                        )}
                      </td>
                    ))}
                    <td className="py-5 px-8 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button 
                          onClick={() => openModal(item)} 
                          className="p-2.5 text-[#3D9D9B] hover:bg-[#3D9D9B]/10 rounded-xl transition-colors"
                          title="Editar"
                        >
                          <Edit3 size={18}/>
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="p-2.5 text-[#E67E22] hover:bg-[#E67E22]/10 rounded-xl transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={renderColumns().length + 1} className="py-20 text-center text-gray-600 font-bold uppercase tracking-widest text-xs">
                    {loading ? 'Cargando datos...' : 'No hay registros en esta sección o el servidor está desconectado'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Editor */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-[#0F0F0F] border border-white/10 p-10 rounded-[3.5rem] w-full max-w-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D1A121] to-transparent opacity-50"></div>
              
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h4 className="text-4xl font-black text-[#D1A121] uppercase tracking-tighter">Editor</h4>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Sección: {activeSection}</p>
                </div>
                <button onClick={closeModal} className="p-3 bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
                  <X size={20}/>
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {renderFormFields()}
              </div>

              <div className="flex gap-4 mt-10">
                <button 
                  className={`flex-1 bg-[#D1A121] text-black py-5 rounded-[1.5rem] font-black hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D1A121]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-pulse">Guardando...</span>
                  ) : (
                    <>
                      <Save size={20} />
                      {editId ? 'Actualizar Registro' : 'Guardar en Base de Datos'}
                    </>
                  )}
                </button>
                <button 
                  className="px-10 bg-white/5 text-white py-5 rounded-[1.5rem] font-bold hover:bg-white/10 transition-colors" 
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;