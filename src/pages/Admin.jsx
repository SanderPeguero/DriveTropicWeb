import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Car, 
  DollarSign, 
  Calendar, 
  Shield, 
  LogOut,
  LayoutDashboard,
  Settings,
  Users,
  Eye,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useVehicles } from '../context/VehicleContext';
import { useAdmin } from '../context/AdminContext';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import fallbackCarImg from '../assets/geely-gx3.png';

const Admin = () => {
  const { vehicles, loading, addVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const { config, updateConfig, reservations, updateReservationStatus, metrics } = useAdmin();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({ name: '', year: '', price: '', deposit: '', image: '', category: 'Económicos' });
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [configForm, setConfigForm] = useState({ whatsappNumber: config?.whatsappNumber || '' });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAdd = (e) => {
    e.preventDefault();
    addVehicle(newVehicle.category, { 
      name: newVehicle.name, 
      year: newVehicle.year, 
      price: parseFloat(newVehicle.price), 
      deposit: parseFloat(newVehicle.deposit), 
      image: newVehicle.image || 'https://ejemplo.com/auto.png' 
    });
    setNewVehicle({ name: '', year: '', price: '', deposit: '', image: '', category: 'Económicos' });
    setShowAddForm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateVehicle(editingVehicle.category, editingVehicle);
    setEditingVehicle(null);
  };

  const handleConfigSave = (e) => {
    e.preventDefault();
    updateConfig(configForm);
    alert('Configuración guardada exitosamente.');
  };

  const PendingReservationsCount = reservations.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-primary text-white p-6 hidden md:flex flex-col">
        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="bg-white p-3 rounded-2xl shadow-lg">
            <img src={logoImg} alt="Logo" className="h-10 w-auto" />
          </div>
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Admin Panel</span>
        </div>
        
        <nav className="space-y-2 flex-grow">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-white/10 font-bold' : 'hover:bg-white/5 font-medium'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('reservas')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${activeTab === 'reservas' ? 'bg-white/10 font-bold' : 'hover:bg-white/5 font-medium'}`}>
            <Calendar size={20} /> Reservas <span className="ml-auto bg-brand-secondary text-white text-[10px] px-2 py-0.5 rounded-full">{PendingReservationsCount}</span>
          </button>
          <button onClick={() => setActiveTab('flota')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${activeTab === 'flota' ? 'bg-white/10 font-bold' : 'hover:bg-white/5 font-medium'}`}>
            <Car size={20} /> Gestión de Flota
          </button>
          <button onClick={() => setActiveTab('config')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${activeTab === 'config' ? 'bg-white/10 font-bold' : 'hover:bg-white/5 font-medium'}`}>
            <Settings size={20} /> Configuración
          </button>
        </nav>

        <Link to="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 font-bold mt-auto transition-colors">
          <LogOut size={20} /> Salir al Sitio
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-12 overflow-y-auto">
        
        {/* VIEW: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <header className="mb-12">
              <h1 className="text-4xl font-black text-brand-primary">Vista General</h1>
              <p className="text-gray-500 font-medium">Estadísticas y estado de la plataforma.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><Eye size={32} /></div>
                <div>
                  <p className="text-sm font-black text-gray-400 tracking-widest uppercase">Visitas Pág.</p>
                  <p className="text-4xl font-black text-brand-primary">{metrics.totalVisits}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center relative">
                  <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></span>
                  <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                  <Users size={32} />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-400 tracking-widest uppercase">Sesiones Activas</p>
                  <p className="text-4xl font-black text-brand-primary">{metrics.activeUsers}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-brand-light text-brand-primary flex items-center justify-center"><Calendar size={32} /></div>
                <div>
                  <p className="text-sm font-black text-gray-400 tracking-widest uppercase">Reservas Pend.</p>
                  <p className="text-4xl font-black text-brand-primary">{PendingReservationsCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: FLOTA */}
        {activeTab === 'flota' && (
          <div className="animate-fade-in">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-black text-brand-primary">Gestión de Flota</h1>
                <p className="text-gray-500 font-medium">Administra los vehículos que se muestran en la web.</p>
              </div>
              <button onClick={() => setShowAddForm(true)} className="btn-primary">
                <Plus size={20} /> Agregar Vehículo
              </button>
            </header>
            <div className="space-y-12">
              {vehicles.map((cat, catIdx) => (
                <section key={catIdx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 italic">
                    {cat.category}
                    <span className="bg-brand-light text-brand-primary text-xs not-italic px-3 py-1 rounded-full">{cat.items.length} autos</span>
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-gray-400 text-xs uppercase tracking-widest font-black border-b border-gray-50">
                          <th className="pb-4">Auto</th>
                          <th className="pb-4">Precio/Día</th>
                          <th className="pb-4">Depósito</th>
                          <th className="pb-4">Año</th>
                          <th className="pb-4 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {cat.items.map((car) => (
                          <tr key={car.id} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-4">
                              <div className="flex items-center gap-4">
                                <img src={car.image?.includes('http') ? car.image : fallbackCarImg} className="w-12 h-12 rounded-xl object-cover bg-gray-100 shadow-sm" alt={car.name} />
                                <span className="font-bold text-brand-primary">{car.name}</span>
                              </div>
                            </td>
                            <td className="py-4 font-black text-brand-primary">${car.price}</td>
                            <td className="py-4 font-bold text-gray-500">${car.deposit}</td>
                            <td className="py-4 font-bold text-gray-500">{car.year}</td>
                            <td className="py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => setEditingVehicle({ ...car, category: cat.category })} className="p-2 text-gray-400 hover:text-brand-primary hover:bg-white rounded-lg transition-all">
                                  <Edit2 size={18} />
                                </button>
                                <button onClick={() => { if(window.confirm('¿Eliminar vehículo?')) deleteVehicle(cat.category, car.id)}} className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: RESERVAS */}
        {activeTab === 'reservas' && (
          <div className="animate-fade-in">
            <header className="mb-12">
              <h1 className="text-4xl font-black text-brand-primary">Reservas</h1>
              <p className="text-gray-500 font-medium">Base de datos de reservas recibidas por los usuarios.</p>
            </header>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 overflow-x-auto">
              {reservations.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-medium">Aún no hay reservas registradas.</div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-widest font-black border-b border-gray-50">
                      <th className="pb-4">Cliente</th>
                      <th className="pb-4">Auto</th>
                      <th className="pb-4">Fechas</th>
                      <th className="pb-4">Agendado (Unix)</th>
                      <th className="pb-4">Estado</th>
                      <th className="pb-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {reservations.map(res => (
                      <tr key={res.id} className="hover:bg-gray-50/50">
                        <td className="py-4">
                          <p className="font-bold text-brand-primary">{res.customer?.name}</p>
                          <p className="text-xs text-gray-500">{res.customer?.phone} - {res.customer?.location}</p>
                        </td>
                        <td className="py-4 font-bold text-brand-primary">{res.carName}</td>
                        <td className="py-4 text-sm font-medium text-gray-500">{res.dates?.start} a {res.dates?.end}</td>
                        <td className="py-4 text-sm font-medium text-gray-400">{new Date(res.createdAt).toLocaleDateString()}</td>
                        <td className="py-4">
                          {res.status === 'pending' && <span className="bg-yellow-100 text-yellow-700 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-yellow-200">Pendiente</span>}
                          {res.status === 'confirmed' && <span className="bg-green-100 text-green-700 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-green-200">Confirmado</span>}
                          {res.status === 'cancelled' && <span className="bg-red-100 text-red-700 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-red-200">Cancelado</span>}
                        </td>
                        <td className="py-4 text-right flex justify-end gap-2">
                           <button onClick={() => updateReservationStatus(res.id, 'confirmed')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition" title="Aprobar"><CheckCircle2 size={18}/></button>
                           <button onClick={() => updateReservationStatus(res.id, 'cancelled')} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition" title="Rechazar/Cancelar"><XCircle size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* VIEW: CONFIG */}
        {activeTab === 'config' && (
          <div className="animate-fade-in max-w-2xl">
            <header className="mb-12">
              <h1 className="text-4xl font-black text-brand-primary">Configuración</h1>
              <p className="text-gray-500 font-medium">Ajustes globales de la plataforma web.</p>
            </header>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <form onSubmit={handleConfigSave} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Notificaciones: Número WhatsApp (Con código de país, sin el +)</label>
                  <input 
                    type="text" 
                    value={configForm.whatsappNumber}
                    onChange={(e) => setConfigForm({...configForm, whatsappNumber: e.target.value})}
                    placeholder="Ej: 18090000000"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-2 font-medium">Este es el número que recibirá las confirmaciones cuando un usuario envíe una reserva desde el Home.</p>
                </div>
                <button type="submit" className="btn-primary py-4 px-8 w-max">Guardar y Aplicar</button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Modals for Flota Tab */}
      <AnimatePresence>
        {(showAddForm || editingVehicle) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setShowAddForm(false); setEditingVehicle(null); }}
              className="absolute inset-0 bg-brand-primary/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-brand-primary">
                  {editingVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}
                </h3>
                <button onClick={() => { setShowAddForm(false); setEditingVehicle(null); }} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
              </div>

              <form onSubmit={editingVehicle ? handleUpdate : handleAdd} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nombre</label>
                    <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none" value={editingVehicle ? editingVehicle.name : newVehicle.name} onChange={(e) => editingVehicle ? setEditingVehicle({...editingVehicle, name: e.target.value}) : setNewVehicle({...newVehicle, name: e.target.value})} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Categoría</label>
                    <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none" value={editingVehicle ? editingVehicle.category : newVehicle.category} onChange={(e) => editingVehicle ? setEditingVehicle({...editingVehicle, category: e.target.value}) : setNewVehicle({...newVehicle, category: e.target.value})}>
                      <option>Económicos</option>
                      <option>Sedanes</option>
                      <option>SUV / Jeepetas</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Año</label>
                    <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none" value={editingVehicle ? editingVehicle.year : newVehicle.year} onChange={(e) => editingVehicle ? setEditingVehicle({...editingVehicle, year: e.target.value}) : setNewVehicle({...newVehicle, year: e.target.value})} />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Precio ($)</label>
                    <input type="number" step="0.01" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none" value={editingVehicle ? editingVehicle.price : newVehicle.price} onChange={(e) => editingVehicle ? setEditingVehicle({...editingVehicle, price: e.target.value}) : setNewVehicle({...newVehicle, price: e.target.value})} />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Depósito ($)</label>
                    <input type="number" step="1" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none" value={editingVehicle ? editingVehicle.deposit : newVehicle.deposit} onChange={(e) => editingVehicle ? setEditingVehicle({...editingVehicle, deposit: e.target.value}) : setNewVehicle({...newVehicle, deposit: e.target.value})} />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Imagen URL</label>
                    <input type="text" placeholder="Ej: https://misitio.com/auto.jpg" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none" value={editingVehicle ? editingVehicle.image : newVehicle.image} onChange={(e) => editingVehicle ? setEditingVehicle({...editingVehicle, image: e.target.value}) : setNewVehicle({...newVehicle, image: e.target.value})} />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-grow btn-primary py-5">
                    {editingVehicle ? <Save /> : <Plus />}
                    {editingVehicle ? 'Guardar Cambios' : 'Crear Vehículo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
