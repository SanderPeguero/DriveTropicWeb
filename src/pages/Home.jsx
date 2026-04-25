import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Camera,
  Share2,
  Info,
  Beer,
  ChevronRight,
  Menu,
  X,
  CreditCard,
  Clock,
  Navigation,
  MessageSquare
} from 'lucide-react';
import { useVehicles } from '../context/VehicleContext';
import { useAdmin } from '../context/AdminContext';

// Assets
import logoImg from '../assets/logo.png';
import heroImg from '../assets/hero.png';
import heroBeachImg from '../assets/hero-beach.jpg';
import fallbackCarImg from '../assets/geely-gx3.png';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { vehicles } = useVehicles();
  const { logVisit, config, createReservation } = useAdmin();
  const [selectedCar, setSelectedCar] = useState(null);
  const [resForm, setResForm] = useState({ name: '', phone: '', location: '', startDate: '', endDate: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (logVisit) logVisit();
  }, [logVisit]);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createReservation({
      carName: selectedCar.name,
      carId: selectedCar.id,
      customer: { name: resForm.name, phone: resForm.phone, location: resForm.location },
      dates: { start: resForm.startDate, end: resForm.endDate }
    });
    
    const msg = `🚗 *Nueva Reserva*\n\nHola Drive Tropic, soy *${resForm.name}*.\nMe gustaría reservar el *${selectedCar.name}*.\n📅 Desde: ${resForm.startDate}\n📅 Hasta: ${resForm.endDate}\n📍 Entrega en: ${resForm.location}.`;
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    
    setIsSubmitting(false);
    setSelectedCar(null);
    setResForm({ name: '', phone: '', location: '', startDate: '', endDate: '' });
  };

  const NavLinks = () => (
    <>
      <a href="#flota" className="hover:text-brand-secondary transition-colors">Flota</a>
      <a href="#servicios" className="hover:text-brand-secondary transition-colors">Servicios</a>
      <a href="#requisitos" className="hover:text-brand-secondary transition-colors">Información</a>
    </>
  );

  return (
    <div className="min-h-screen font-sans selection:bg-brand-secondary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Drive Tropic Logo"
              className="h-10 lg:h-14 w-auto object-contain"
            />
          </div>

          <div className="hidden md:flex items-center gap-10 font-bold text-brand-primary">
            <NavLinks />
            <button className="bg-brand-secondary text-white px-8 py-3 rounded-2xl flex items-center gap-2 hover:bg-brand-primary transition-all shadow-md shadow-brand-secondary/20">
              <MessageSquare className="w-5 h-5" /> Reservar Ahora
            </button>
          </div>

          <button className="md:hidden p-2 text-brand-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white md:hidden py-24 px-6 flex flex-col items-center justify-center text-center space-y-8"
          >
            <div className="flex flex-col gap-8 text-2xl font-black text-brand-primary">
              <a href="#flota" onClick={() => setIsMenuOpen(false)}>Nuestra Flota</a>
              <a href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
              <a href="#requisitos" onClick={() => setIsMenuOpen(false)}>Requisitos</a>
            </div>
            <button className="bg-brand-secondary text-white w-full max-w-xs py-5 rounded-3xl text-xl font-bold flex items-center justify-center gap-3">
              <MessageSquare /> WhatsApp Reserva
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Hero Section - Full Viewport */}
      <section className="bg-slate-50 relative overflow-hidden min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hero-card relative grid grid-cols-1 grid-rows-1 items-center overflow-hidden min-h-screen"
        >
          {/* Background Image Layer */}
          <div className="col-start-1 row-start-1 h-full w-full z-0 overflow-hidden">
            <img
              src={heroBeachImg}
              alt="Luxury Car in Punta Cana"
              className="w-full h-full object-cover"
            />
            {/* Ultra-clear accessibility overlay */}
            <div className="absolute inset-0 bg-white/20 lg:bg-gradient-to-r lg:from-white/65 lg:via-white/30 lg:to-transparent z-10" />
          </div>

          {/* Content Side */}
          <div className="col-start-1 row-start-1 z-20 hero-content !bg-transparent md:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-brand-secondary/15 border border-brand-secondary/30 text-brand-secondary px-4 py-2 flex-shrink-0 rounded-full text-xs font-bold tracking-[0.1em] mb-6 w-fit backdrop-blur-md mt-6 lg:mt-0"
            >
              <MapPin className="w-4 h-4" /> PUNTA CANA • REPÚBLICA DOMINICANA
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary leading-[1.05] mb-6 tracking-tight"
            >
              Simple. Seguro.<br />
              <span className="text-brand-secondary italic">Tropical.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-brand-primary/80 mb-10 max-w-sm font-medium leading-relaxed"
            >
              Renta tu auto hoy sin procesos complejos. Entrega directa en el Aeropuerto de Punta Cana sin costo adicional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#flota" className="bg-brand-secondary text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-secondary/90 transition-all shadow-lg active:scale-95 text-base w-full md:w-auto">
                Ver Vehículos <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#flota" className="bg-white/40 backdrop-blur-md border border-brand-primary text-brand-primary px-8 py-4 rounded-xl font-bold hover:bg-brand-primary hover:text-white transition-all active:scale-95 text-base w-full md:w-auto text-center">
                Contáctanos
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Simplified Fleet */}
      <section id="flota" className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl mb-3 pr-2 italic">Nuestra Flota</h2>
            <p className="text-brand-primary/60 text-base max-w-xl font-medium">
              Seleccionamos solo los vehículos más cómodos y confiables para tus vacaciones.
            </p>
          </header>

          <div className="space-y-24">
            {vehicles.map((cat, catIdx) => (
              cat.items.length > 0 && (
                <div key={catIdx}>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-2xl font-semibold italic">{cat.category}</h3>
                    <div className="h-px flex-grow bg-brand-primary/10" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cat.items.map((car, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -8 }}
                        className="card-simple p-4 group"
                      >
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 mb-6">
                          <img src={car.image?.includes('http') ? car.image : fallbackCarImg} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl font-bold text-xs uppercase tracking-widest text-brand-primary border border-gray-100 shadow-sm">
                            Modelo {car.year}
                          </div>
                        </div>
                        <div className="px-3 pb-4">
                          <div className="flex justify-between items-start mb-6">
                            <h4 className="text-xl font-bold leading-tight">{car.name}</h4>
                            <img src={logoImg} alt="" className="h-5 opacity-30 grayscale hover:grayscale-0 transition-all" />
                          </div>
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block mb-1">PRECIO POR DÍA</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-brand-primary">${car.price}</span>
                                <span className="text-gray-400 text-xs font-bold">USD</span>
                              </div>
                            </div>
                            <button onClick={() => setSelectedCar(car)} className="bg-brand-secondary/10 text-brand-secondary px-6 py-3 rounded-2xl font-black text-sm hover:bg-brand-secondary hover:text-white transition-all uppercase tracking-widest">
                              Reservar
                            </button>
                          </div>
                          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2"><CreditCard size={14} className="text-brand-secondary" /> Depósito ${car.deposit}</div>
                            <div className="flex items-center gap-2"><MapPin size={14} className="text-brand-secondary" /> Entrega Gratis*</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Services - Compact & Clean */}
      <section id="servicios" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-brand-primary rounded-[3.5rem] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 flex items-center justify-center p-20 pointer-events-none">
              <img src={logoImg} className="w-full grayscale brightness-200" alt="" />
            </div>

            <div className="max-w-3xl relative z-10">
              <h2 className="text-3xl md:text-4xl text-white mb-12 italic">Comodidad Drive Tropic</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { icon: <Navigation />, title: "Entrega Directa", desc: "Te entregamos el auto en tu ubicación acordada sin esperas." },
                  { icon: <CheckCircle2 />, title: "Todo Incluido", desc: "Precios claros. Sin cargos ocultos ni sorpresas finales." },
                  { icon: <Clock />, title: "24/7 Soporte", desc: "Disponibles para ti en cualquier momento de tu renta." },
                  { icon: <ShieldCheck />, title: "Seguridad", desc: "Vehículos mantenidos según los más altos estándares." },
                ].map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-brand-secondary shrink-0">{React.cloneElement(s.icon, { size: 24 })}</div>
                    <div>
                      <h4 className="text-lg font-bold mb-1 text-white">{s.title}</h4>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Sections - Simplified */}
      <section id="requisitos" className="py-32 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="glass p-10 rounded-[3rem] border-0 shadow-sm">
              <div className="bg-brand-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-secondary mb-8">
                <Info size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-6">Requisitos</h3>
              <ul className="space-y-4 text-brand-primary/70 font-medium text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-secondary" size={16} /> Mayor de 18 años</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-secondary" size={16} /> Licencia de conducir</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-secondary" size={16} /> Pasaporte e Itinerario</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-secondary" size={16} /> Dirección de estadía</li>
              </ul>
            </div>

            <div className="glass p-10 rounded-[3rem] border-0 shadow-sm">
              <div className="bg-brand-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-secondary mb-8">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-6">Nuestras Políticas</h3>
              <ul className="space-y-4 text-brand-primary/70 font-medium text-sm">
                <li className="flex items-center gap-3">● Renta mínima de 3 días</li>
                <li className="flex items-center gap-3">● Kilometraje ilimitado</li>
                <li className="flex items-center gap-3">● Combustible nivel a nivel</li>
                <li className="flex items-center gap-3">● Uso nacional permitido</li>
              </ul>
            </div>

            <div className="bg-brand-secondary p-12 rounded-[3.5rem] text-white flex flex-col justify-between">
              <div>
                <Beer className="w-10 h-10 mb-6" />
                <h3 className="text-2xl text-white mb-4 italic leading-tight">Regalo Tropic</h3>
                <p className="text-white/80 text-sm font-medium mb-8">
                  Rentando más de <span className="font-black underline uppercase">2 semanas</span>, te regalamos dos Cervezas Presidente bien frías a tu llegada.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-3xl border border-white/20 text-xs font-black uppercase tracking-widest text-center">
                ¡Bienvenidos al Paraíso!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-xs">
              <img src={logoImg} alt="Drive Tropic" className="h-16 mb-8" />
              <p className="text-brand-primary/50 font-medium leading-relaxed mb-8">
                Haciendo el alquiler de vehículos algo placentero en Punta Cana.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all"><Camera size={20} /></a>
                <a href="#" className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all"><Share2 size={20} /></a>
                <a href="#" className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all"><Phone size={20} /></a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-16 md:gap-24">
              <div>
                <h5 className="font-black text-brand-primary mb-6 uppercase tracking-widest text-xs">Empresa</h5>
                <ul className="space-y-4 text-brand-primary/60 font-bold text-sm">
                  <li><a href="#flota" className="hover:text-brand-secondary transition-colors">Vehículos</a></li>
                  <li><a href="#servicios" className="hover:text-brand-secondary transition-colors">Servicios</a></li>
                  <li><a href="#requisitos" className="hover:text-brand-secondary transition-colors">Políticas</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-black text-brand-primary mb-6 uppercase tracking-widest text-xs">Contacto</h5>
                <ul className="space-y-4 text-brand-primary/60 font-bold text-sm">
                  <li className="flex items-center gap-2"><Mail size={14} /> info@drivetropic.com</li>
                  <li className="flex items-center gap-2"><MapPin size={14} /> Aeropuerto Punta Cana</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <p>© 2026 DRIVE TROPIC RENT A CAR</p>
            <div className="flex gap-8">
              <a href="#">Privacidad</a>
              <a href="#">Términos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCar(null)}
              className="absolute inset-0 bg-brand-primary/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-2xl font-black text-brand-primary mb-1">Reservar {selectedCar.name}</h3>
                  <p className="text-brand-secondary font-bold text-sm">${selectedCar.price} USD / día</p>
                </div>
                <button onClick={() => setSelectedCar(null)} className="p-2 bg-gray-50 text-brand-primary hover:bg-red-50 hover:text-red-500 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nombre Completo</label>
                  <input type="text" required value={resForm.name} onChange={e => setResForm({...resForm, name: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Teléfono</label>
                    <input type="tel" required value={resForm.phone} onChange={e => setResForm({...resForm, phone: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Lugar de Entrega</label>
                    <input type="text" required value={resForm.location} onChange={e => setResForm({...resForm, location: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none" placeholder="Ej: Aeropuerto" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Fecha Inicio</label>
                    <input type="date" required value={resForm.startDate} onChange={e => setResForm({...resForm, startDate: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Fecha Fin</label>
                    <input type="date" required value={resForm.endDate} onChange={e => setResForm({...resForm, endDate: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold focus:ring-2 focus:ring-brand-secondary outline-none text-sm" />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-5 text-base flex justify-center items-center gap-2 disabled:bg-gray-300">
                    {isSubmitting ? 'Procesando...' : 'Confirmar y Reservar via WhatsApp'}
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

export default Home;
