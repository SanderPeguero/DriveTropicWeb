import React, { useState, useEffect } from 'react';
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
  XCircle,
  Lock,
  ShieldCheck,
  Menu,
  ChevronLeft,
  ChevronRight,
  Grid,
  List
} from 'lucide-react';

const ReservationCalendar = ({ reservations }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayObj, setSelectedDayObj] = useState(null);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const realToday = new Date();
  const realTodayStr = `${realToday.getFullYear()}-${String(realToday.getMonth() + 1).padStart(2, '0')}-${String(realToday.getDate()).padStart(2, '0')}`;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-brand-primary">{monthNames[month]} {year}</h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors"><ChevronLeft size={20}/></button>
          <button onClick={nextMonth} className="p-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors"><ChevronRight size={20}/></button>
        </div>
      </div>
      
      <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
        <div className="grid grid-cols-7 gap-2 min-w-[700px]">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="text-center font-bold text-gray-400 text-xs py-2 uppercase tracking-widest">{day}</div>
          ))}
          
          {blanks.map(blank => (
            <div key={`blank-${blank}`} className="aspect-square bg-gray-50/50 rounded-xl border border-gray-50 p-2 opacity-50"></div>
          ))}
          
          {days.map(day => {
            const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            const todaysRes = reservations.filter(r => {
              if (r.status === 'cancelled') return false;
              return r.dates?.start <= formattedDate && r.dates?.end >= formattedDate;
            });
            const isToday = formattedDate === realTodayStr;

            return (
              <div 
                key={day} 
                onClick={() => setSelectedDayObj({ date: formattedDate, reservations: todaysRes, day })}
                className={`border rounded-xl p-2 relative min-h-[100px] hover:border-brand-secondary transition-colors cursor-pointer ${isToday ? 'bg-brand-light/30 border-brand-primary' : 'bg-white border-gray-100'}`}
              >
                <span className={`text-sm font-black absolute top-2 right-2 ${isToday ? 'text-brand-primary' : 'text-gray-300'}`}>{day}</span>
                <div className="mt-6 flex flex-col gap-1 w-full relative z-10 pointer-events-none">
                  {todaysRes.map(res => (
                    <div key={res.id} className={`text-[10px] sm:text-[11px] font-black px-2 py-1 rounded-lg text-ellipsis overflow-hidden whitespace-nowrap border ${res.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`} title={`${res.carName} (${res.customer?.name})`}>
                      {res.carName}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Day Detail Modal */}
      <AnimatePresence>
        {selectedDayObj && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDayObj(null)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md relative z-10 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-brand-primary mb-1">
                  Día {selectedDayObj.day} de {monthNames[month]}
                </h3>
                <button onClick={() => setSelectedDayObj(null)} className="p-2 text-gray-400 hover:text-brand-primary rounded-xl transition-colors"><X size={24} /></button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {selectedDayObj.reservations.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 font-medium">No hay reservas para este día.</div>
                ) : (
                  selectedDayObj.reservations.map(res => (
                    <div key={res.id} className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-brand-primary">{res.carName}</h4>
                        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider border ${res.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                          {res.status === 'confirmed' ? 'Conf.' : 'Pend.'}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-700">{res.customer?.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{res.customer?.phone}</p>
                      <div className="mt-3 text-xs text-gray-400 font-medium bg-white p-2 rounded-lg border border-gray-100">
                        {res.dates?.start} <span className="mx-1">→</span> {res.dates?.end}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
import { useVehicles } from '../context/VehicleContext';
import { useAdmin } from '../context/AdminContext';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import fallbackCarImg from '../assets/geely-gx3.png';

const Admin = () => {
  const { vehicles, loading, addVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const { config, updateConfig, reservations, updateReservationStatus, metrics } = useAdmin();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [resViewMode, setResViewMode] = useState('table');
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ name: '', year: '', price: '', deposit: '', image: '', category: 'Económicos' });
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [configForm, setConfigForm] = useState({ 
    whatsappNumber: config?.whatsappNumber || '',
    instagramUrl: config?.instagramUrl || '',
    phoneNumber: config?.phoneNumber || '',
    emailAddress: config?.emailAddress || '',
    officeLocation: config?.officeLocation || ''
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('dt_admin_auth') === 'true'
  );
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);

  // Sincronizar el formulario de configuración una vez que Firebase traiga la data
  useEffect(() => {
    if (config) {
      setConfigForm({ 
        whatsappNumber: config.whatsappNumber || '',
        instagramUrl: config.instagramUrl || '',
        phoneNumber: config.phoneNumber || '',
        emailAddress: config.emailAddress || '',
        officeLocation: config.officeLocation || ''
      });
    }
  }, [config]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Static Basic Validation Block
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      sessionStorage.setItem('dt_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (loading && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Auth Gate Render
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-xl text-center">
          <div className="bg-brand-primary p-4 rounded-2xl mx-auto w-16 h-16 flex items-center justify-center mb-6">
            <Lock className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-brand-primary mb-2">Acceso Admin</h2>
          <p className="text-gray-400 font-medium mb-8 text-sm">Ingrese sus credenciales.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Usuario" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none text-center" value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} required />
            <input type="password" placeholder="Contraseña" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none text-center" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} required />
            {loginError && <p className="text-red-500 font-bold text-[10px] uppercase tracking-widest">Credenciales incorrectas.</p>}
            <button type="submit" className="w-full btn-primary py-4 mt-2">Ingresar</button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
             <Link to="/" className="text-brand-primary/40 font-bold text-[10px] uppercase tracking-widest hover:text-brand-secondary transition-colors">Volver al sitio público</Link>
          </div>
        </div>
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

  const SidebarContent = () => (
    <>
      <div className="flex flex-col items-center gap-3 mb-12">
        <div className="mb-2">
          <img src={logoImg} alt="Logo" className="h-12 w-auto grayscale brightness-200" />
        </div>
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Admin Panel</span>
      </div>
      
      <nav className="space-y-2 flex-grow">
        <button 
          onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-brand-secondary text-white shadow-lg shadow-brand-secondary/20' : 'text-white/60 hover:bg-white/5'}`}
        >
          <LayoutDashboard size={20} /> Dashboard
        </button>
        <button 
          onClick={() => { setActiveTab('flota'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'flota' ? 'bg-brand-secondary text-white shadow-lg shadow-brand-secondary/20' : 'text-white/60 hover:bg-white/5'}`}
        >
          <Car size={20} /> Flota
        </button>
        <button 
          onClick={() => { setActiveTab('reservas'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'reservas' ? 'bg-brand-secondary text-white shadow-lg shadow-brand-secondary/20' : 'text-white/60 hover:bg-white/5'}`}
        >
          <div className="relative flex items-center gap-3 w-full">
            <Calendar size={20} /> Reservas
            {PendingReservationsCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{PendingReservationsCount}</span>
            )}
          </div>
        </button>
        <button 
          onClick={() => { setActiveTab('config'); setIsSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'config' ? 'bg-brand-secondary text-white shadow-lg shadow-brand-secondary/20' : 'text-white/60 hover:bg-white/5'}`}
        >
          <Settings size={20} /> Configuración
        </button>
      </nav>

      <div className="pt-8 border-t border-white/5 space-y-4">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white transition-colors font-bold text-sm">
          <Eye size={18} /> Ver Sitio
        </Link>
        <button 
          onClick={() => {
            sessionStorage.removeItem('dt_admin_auth');
            window.location.reload();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
        >
          <LogOut size={18} /> Salir
        </button>
      </div>
    </>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden bg-brand-primary h-16 flex items-center justify-between px-6 z-40 shrink-0 shadow-lg">
        <img src={logoImg} alt="Logo" className="h-8 w-auto grayscale brightness-200" />
        <button onClick={() => setIsSidebarOpen(true)} className="text-white p-2">
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-brand-primary text-white p-6 hidden md:flex flex-col flex-shrink-0 h-full overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-brand-primary text-white p-8 z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsSidebarOpen(false)} className="text-white/40 hover:text-white p-2">
                  <X size={24} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-12 overflow-y-auto h-full relative">
        
        {/* VIEW: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <header className="mb-12">
              <h1 className="text-4xl font-black text-brand-primary">Vista General</h1>
              <p className="text-gray-500 font-medium">Estadísticas y estado de la plataforma.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 md:gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-50 text-blue-500 flex shrink-0 items-center justify-center"><Eye size={28} className="md:w-8 md:h-8" /></div>
                <div>
                  <p className="text-xs md:text-sm font-black text-gray-400 tracking-widest uppercase">Visitas Pág.</p>
                  <p className="text-3xl md:text-4xl font-black text-brand-primary">{metrics.totalVisits}</p>
                </div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 md:gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-50 text-green-500 flex shrink-0 items-center justify-center relative">
                  <span className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></span>
                  <span className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white"></span>
                  <Users size={28} className="md:w-8 md:h-8" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-black text-gray-400 tracking-widest uppercase">Sesiones</p>
                  <p className="text-3xl md:text-4xl font-black text-brand-primary">{metrics.activeUsers}</p>
                </div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 md:gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-light text-brand-primary flex shrink-0 items-center justify-center"><Calendar size={28} className="md:w-8 md:h-8" /></div>
                <div>
                  <p className="text-xs md:text-sm font-black text-gray-400 tracking-widest uppercase">Reservas</p>
                  <p className="text-3xl md:text-4xl font-black text-brand-primary">{PendingReservationsCount}</p>
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
            <div className="space-y-8 md:space-y-12">
              {vehicles.map((cat, catIdx) => (
                <section key={catIdx} className="bg-white rounded-3xl p-4 sm:p-5 md:p-8 shadow-sm border border-gray-100 overflow-hidden">
                  <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-3 italic">
                    {cat.category}
                    <span className="bg-brand-light text-brand-primary text-xs not-italic px-3 py-1 rounded-full">{cat.items.length} autos</span>
                  </h2>
                  <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                    <table className="w-full text-left min-w-[700px]">
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
            <header className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h1 className="text-4xl font-black text-brand-primary">Reservas</h1>
                <p className="text-gray-500 font-medium">Base de datos de reservas recibidas por los usuarios.</p>
              </div>
              <div className="bg-white p-1 rounded-2xl flex border border-gray-100 shadow-sm w-full sm:w-auto">
                <button onClick={() => setResViewMode('table')} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${resViewMode === 'table' ? 'bg-brand-secondary text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
                  <List size={18} /> Tabla
                </button>
                <button onClick={() => setResViewMode('calendar')} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${resViewMode === 'calendar' ? 'bg-brand-secondary text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
                  <Grid size={18} /> Calendario
                </button>
              </div>
            </header>
            
            {resViewMode === 'calendar' ? (
              <ReservationCalendar reservations={reservations} />
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-8 overflow-hidden">
              {reservations.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-medium">Aún no hay reservas registradas.</div>
              ) : (
                <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                  <table className="w-full text-left min-w-[800px]">
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
              </div>
              )}
            </div>
            )}
          </div>
        )}

        {/* VIEW: CONFIG */}
        {activeTab === 'config' && (
          <div className="animate-fade-in max-w-2xl">
            <header className="mb-12">
              <h1 className="text-4xl font-black text-brand-primary">Configuración</h1>
              <p className="text-gray-500 font-medium">Ajustes globales de la plataforma web.</p>
            </header>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 md:p-8">
              <form onSubmit={handleConfigSave} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">WhatsApp de Recepción</label>
                  <input 
                    type="text" 
                    value={configForm.whatsappNumber}
                    onChange={(e) => setConfigForm({...configForm, whatsappNumber: e.target.value})}
                    placeholder="Ej: 18090000000"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-2 font-medium">Usado globalmente para botones WhatsApp vinculados en la web.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Teléfono de Oficina</label>
                    <input 
                      type="text" 
                      value={configForm.phoneNumber}
                      onChange={(e) => setConfigForm({...configForm, phoneNumber: e.target.value})}
                      placeholder="Ej: +1 809-123-4567"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Página de Instagram (URL)</label>
                    <input 
                      type="text" 
                      value={configForm.instagramUrl}
                      onChange={(e) => setConfigForm({...configForm, instagramUrl: e.target.value})}
                      placeholder="https://instagram.com/drivetropic"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Correo Electrónico</label>
                    <input 
                      type="email" 
                      value={configForm.emailAddress}
                      onChange={(e) => setConfigForm({...configForm, emailAddress: e.target.value})}
                      placeholder="info@drivetropic.com"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Dirección Física Web</label>
                    <input 
                      type="text" 
                      value={configForm.officeLocation}
                      onChange={(e) => setConfigForm({...configForm, officeLocation: e.target.value})}
                      placeholder="Aeropuerto Punta Cana"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-100">
                  <button type="submit" className="btn-primary py-4 px-8 w-full md:w-auto">Guardar y Aplicar Todos los Entornos</button>
                </div>
              </form>
            </div>

            {/* Developer Contact Support Card */}
            <div className="mt-8 bg-brand-light p-6 rounded-3xl border border-brand-primary/10 shadow-sm">
              <h4 className="text-brand-primary font-black mb-2 flex items-center gap-2">
                <ShieldCheck size={18} /> Soporte Técnico
              </h4>
              <p className="text-sm font-medium text-brand-primary/70 mb-1">
                Plataforma web desarrollada y mantenida por <a href="https://atomdevteam.com" target="_blank" rel="noreferrer" className="text-brand-secondary hover:underline">atomdevteam.com</a>.
              </p>
              <p className="text-sm font-medium text-brand-primary/70">
                En caso de fallos críticos del sistema, mantenimiento o necesidad de modificaciones, contactar directamente a:
              </p>
              <p className="mt-3 font-black text-brand-primary text-sm flex items-center gap-2 bg-white w-fit px-4 py-2 rounded-xl border border-brand-primary/10 shadow-sm">
                Sander Peguero <span className="text-gray-300">|</span> <a href="https://wa.me/18295063137" target="_blank" rel="noreferrer" className="text-brand-secondary hover:underline">+1 829-506-3137</a>
              </p>
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
