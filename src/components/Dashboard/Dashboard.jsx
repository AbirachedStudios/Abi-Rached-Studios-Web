import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, Plus, X, Users, Briefcase, Layout, Trash, UserX } from 'lucide-react';

const sections = [
  { key: 'news', label: 'Noticias' },
  { key: 'users', label: 'Usuarios' },
  { key: 'team', label: 'Miembros del Equipo' },
  { key: 'stock', label: 'Stock' },
];

function Dashboard() {
  const [activeSection, setActiveSection] = useState('news');
  const [data, setData] = useState({ news: [], users: [], team: [], stock: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    axios.get(`http://localhost:3001/api/${activeSection}`)
      .then(res => setData(prev => ({ ...prev, [activeSection]: res.data })))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  const openModal = (item = null) => {
    setForm(item || {});
    setEditId(item ? item.id : null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({});
    setEditId(null);
  };

  const handleSave = () => {
    const method = editId ? 'put' : 'post';
    const url = `http://localhost:3001/api/${activeSection}${editId ? `/${editId}` : ''}`;

    axios[method](url, form)
      .then(res => {
        fetchData(); // Refrescamos para asegurar sincronía con la DB
        closeModal();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Confirmas que deseas eliminar este registro de la base de datos?')) {
      axios.delete(`http://localhost:3001/api/${activeSection}/${id}`)
        .then(() => fetchData())
        .catch(err => console.error(err));
    }
  };

  // Lógica específica para limpiar usuarios inactivos
  const deleteInactiveUsers = () => {
    if (window.confirm('¿Deseas eliminar todos los usuarios que no han tenido actividad en los últimos 3 meses?')) {
      axios.delete(`http://localhost:3001/api/users/cleanup/inactive`)
        .then(() => fetchData())
        .catch(err => console.error("Error al limpiar usuarios", err));
    }
  };

  const renderColumns = () => {
    switch (activeSection) {
      case 'news':
        return [{ key: 'image', label: 'Vista' }, { key: 'title', label: 'Título' }, { key: 'createdAt', label: 'Fecha' }];
      case 'users':
        return [{ key: 'name', label: 'Usuario' }, { key: 'email', label: 'Email' }, { key: 'lastLogin', label: 'Última Conexión' }];
      case 'team':
        return [{ key: 'imageUrl', label: 'Foto' }, { key: 'name', label: 'Nombre' }, { key: 'role', label: 'Puesto' }, { key: 'area', label: 'Área' }];
      case 'stock':
        return [{ key: 'item', label: 'Producto' }, { key: 'quantity', label: 'Stock' }];
      default: return [];
    }
  };

  const renderFormFields = () => {
    switch (activeSection) {
      // ... dentro del switch de renderFormFields ...
      case 'team':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-oro font-black tracking-tighter">Nombre Completo</label>
                <input 
                  className="input-dark" 
                  placeholder="Ej: Julian Casablancas"
                  value={form.name || ''} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                />
              </div>
              <div>
                <label className="label-oro font-black tracking-tighter">Puesto / Rol</label>
                <input 
                  className="input-dark" 
                  placeholder="Ej: Senior Developer"
                  value={form.role || ''} 
                  onChange={e => setForm({...form, role: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="label-oro font-black tracking-tighter">Área de Trabajo</label>
              <select 
                className="input-dark bg-black w-full"
                value={form.area || ''} 
                onChange={e => setForm({...form, area: e.target.value})}
              >
                <option value="">Seleccionar Área...</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Diseño">Diseño & UX</option>
                <option value="Marketing">Marketing</option>
                <option value="Gerencia">Gerencia</option>
              </select>
            </div>

            <div>
              <label className="label-oro font-black tracking-tighter">URL de la Imagen de Perfil</label>
              <div className="flex gap-3">
                <input 
                  className="input-dark flex-1" 
                  placeholder="https://..."
                  value={form.imageUrl || ''} 
                  onChange={e => setForm({...form, imageUrl: e.target.value})} 
                />
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="preview" className="w-12 h-12 rounded-xl object-cover border border-[#D1A121]" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div>
                <label className="label-oro font-black tracking-tighter italic">LinkedIn URL</label>
                <input 
                  className="input-dark border-[#0A66C2]/30 focus:border-[#0A66C2]" 
                  placeholder="linkedin.com/in/..."
                  value={form.linkedinUrl || ''} 
                  onChange={e => setForm({...form, linkedinUrl: e.target.value})} 
                />
              </div>
              <div>
                <label className="label-oro font-black tracking-tighter italic">GitHub URL</label>
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
            <input className="input-dark" placeholder="Título" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
            <textarea className="input-dark" placeholder="Resumen" value={form.summary || ''} onChange={e => setForm({ ...form, summary: e.target.value })} />
            <input className="input-dark" placeholder="URL Imagen" value={form.image || ''} onChange={e => setForm({ ...form, image: e.target.value })} />
            <textarea className="input-dark" placeholder="Contenido" rows="4" value={form.content || ''} onChange={e => setForm({ ...form, content: e.target.value })} />
          </div>
        );
      case 'users':
        return (
          <div className="space-y-4">
            <input className="input-dark" placeholder="Nombre de Usuario" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="input-dark" placeholder="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <aside className="w-72 bg-[#0A0A0A] p-8 flex flex-col gap-4 border-r border-white/5">
        <h2 className="text-3xl font-black text-[#D1A121] mb-10 italic">ADMIN</h2>
        {sections.map(sec => (
          <button
            key={sec.key}
            className={`py-4 px-6 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-3
              ${activeSection === sec.key ? 'bg-[#D1A121] text-black' : 'text-gray-500 hover:text-[#D1A121] hover:bg-white/5'}`}
            onClick={() => setActiveSection(sec.key)}
          >
            {sec.key === 'users' ? <Users size={18}/> : sec.key === 'team' ? <Briefcase size={18}/> : <Layout size={18}/>}
            {sec.label}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-5xl font-black text-white uppercase tracking-tighter">
                {sections.find(s => s.key === activeSection)?.label}
            </h3>
          </div>
          
          <div className="flex gap-4">
            {activeSection === 'users' && (
              <button onClick={deleteInactiveUsers} className="bg-transparent border border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all">
                <UserX size={20} /> Limpiar Inactivos
              </button>
            )}
            <button onClick={() => openModal()} className="bg-[#8A2BE2] hover:bg-[#9b4ced] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#8A2BE2]/20">
              <Plus size={20} /> Nuevo {activeSection === 'team' ? 'Miembro' : 'Registro'}
            </button>
          </div>
        </div>

        
        <div className="bg-[#111] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                {renderColumns().map(col => (
                  <th key={col.key} className="py-6 px-8 text-[#D1A121] text-xs font-black uppercase tracking-widest">{col.label}</th>
                ))}
                <th className="py-6 px-8 text-[#D1A121] text-xs font-black uppercase tracking-widest text-right">Gestión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data[activeSection].map(item => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-all group">
                  {renderColumns().map(col => (
                    <td key={col.key} className="py-5 px-8 text-sm text-gray-300">
                      {col.key.includes('Url') || col.key === 'image' ? (
                        <img src={item[col.key] || 'https://via.placeholder.com/150'} className="w-10 h-10 rounded-full object-cover border border-[#8A2BE2]/30" alt="profile" />
                      ) : col.key === 'createdAt' || col.key === 'lastLogin' ? (
                        new Date(item[col.key]).toLocaleDateString()
                      ) : (
                        item[col.key] || '-'
                      )}
                    </td>
                  ))}
                  <td className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(item)} className="p-2 text-[#3D9D9B] hover:bg-[#3D9D9B]/10 rounded-lg"><Edit3 size={18}/></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-[#E67E22] hover:bg-[#E67E22]/10 rounded-lg"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {modalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#0F0F0F] border border-white/10 p-10 rounded-[3rem] w-full max-w-2xl">
              <h4 className="text-3xl font-black text-[#D1A121] mb-8 uppercase tracking-tighter">Editor de {activeSection}</h4>
              {renderFormFields()}
              <div className="flex gap-4 mt-10">
                <button className="flex-1 bg-[#D1A121] text-black py-4 rounded-2xl font-black hover:bg-yellow-600 transition-all" onClick={handleSave}>Guardar en Base de Datos</button>
                <button className="px-8 bg-white/5 text-white py-4 rounded-2xl font-bold" onClick={closeModal}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .input-dark {
          width: 100%;
          background: #000;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          padding: 0.75rem 1rem;
          color: white;
          outline: none;
        }
        .input-dark:focus {
          border-color: #D1A121;
        }
        .label-oro {
          color: #D1A121;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
          display: block;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;