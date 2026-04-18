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

// Assets
import logoImg from './assets/logo.png';
import heroImg from './assets/hero.png';
import nissanMarchImg from './assets/nissan-march.png';
import hyundaiElantraImg from './assets/hyundai-elantra.png';
import geelyGx3Img from './assets/geely-gx3.png';
import rangeRoverImg from './assets/range-rover.png';
import kiaPicantoImg from './assets/kia-picanto.png';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const vehicles = [
    {
      category: 'Económicos',
      items: [
        { name: 'Nissan March', year: '2019', price: 34.99, image: nissanMarchImg, deposit: 100 },
        { name: 'Nissan Note', year: '2019', price: 34.99, image: nissanMarchImg, deposit: 100 },
        { name: 'Kia Picanto', year: '2019', price: 38.99, image: kiaPicantoImg, deposit: 100 },
      ]
    },
    {
      category: 'Sedanes',
      items: [
        { name: 'Hyundai Elantra', year: '2020', price: 43.99, image: hyundaiElantraImg, deposit: 100 },
        { name: 'Kia K5', year: '2019', price: 43.99, image: hyundaiElantraImg, deposit: 100 },
        { name: 'Kia Rio', year: '2019', price: 43.99, image: hyundaiElantraImg, deposit: 100 },
      ]
    },
    {
      category: 'SUV / Jeepetas',
      items: [
        { name: 'Hyundai Venue', year: '2024', price: 59.99, image: geelyGx3Img, deposit: 200 },
        { name: 'Geely GX3', year: '2025', price: 69.99, image: geelyGx3Img, deposit: 200 },
      ]
    }
  ];

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
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden items-center gap-2 font-heading font-black text-brand-primary text-xl">
              DRIVE<span className="text-brand-secondary">TROPIC</span>
            </div>
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

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Punta Cana" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-light via-brand-light/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary px-5 py-2 rounded-full text-sm font-black mb-8">
              <MapPin size={16} /> PUNTA CANA • REPUBLICA DOMINICANA
            </div>
            <h1 className="text-6xl md:text-8xl mb-8 leading-[0.9] text-brand-primary tracking-tight">
              Simple. Seguro. <br/>
              <span className="text-brand-secondary italic">Tropical.</span>
            </h1>
            <p className="text-xl text-brand-primary/70 mb-12 leading-relaxed max-w-lg font-medium">
              Renta tu auto hoy sin procesos complejos. Entrega directa en el Aeropuerto de Punta Cana sin costo adicional.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#flota" className="btn-primary px-10 py-5 text-xl shadow-lg shadow-brand-secondary/30">
                Ver Vehículos <ChevronRight />
              </a>
              <button className="btn-outline px-10 py-5 text-xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all">
                Contáctanos
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simplified Fleet */}
      <section id="flota" className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-20 text-center md:text-left">
            <h2 className="text-5xl mb-4 italic">Nuestra Flota</h2>
            <p className="text-brand-primary/60 text-lg max-w-2xl font-medium">
              Seleccionamos solo los vehículos más cómodos y confiables para tus vacaciones.
            </p>
          </header>

          <div className="space-y-32">
            {vehicles.map((cat, catIdx) => (
              <div key={catIdx}>
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="text-3xl italic">{cat.category}</h3>
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
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl font-bold text-xs uppercase tracking-widest text-brand-primary border border-gray-100 shadow-sm">
                          Modelo {car.year}
                        </div>
                      </div>
                      <div className="px-3 pb-4">
                        <div className="flex justify-between items-start mb-6">
                          <h4 className="text-2xl font-bold leading-none">{car.name}</h4>
                          <img src={logoImg} alt="" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-all" />
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-sm text-gray-400 font-bold block mb-1">PRECIO POR DÍA</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl font-black text-brand-primary">${car.price}</span>
                              <span className="text-gray-400 text-sm font-bold">USD</span>
                            </div>
                          </div>
                          <button className="bg-brand-secondary/10 text-brand-secondary px-6 py-3 rounded-2xl font-black text-sm hover:bg-brand-secondary hover:text-white transition-all uppercase tracking-widest">
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
              <h2 className="text-5xl text-white mb-16 italic">Comodidad Drive Tropic</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                {[
                  { icon: <Navigation />, title: "Entrega Directa", desc: "Te entregamos el auto en tu ubicación acordada sin esperas." },
                  { icon: <CheckCircle2 />, title: "Todo Incluido", desc: "Precios claros. Sin cargos ocultos ni sorpresas finales." },
                  { icon: <Clock />, title: "24/7 Soporte", desc: "Estamos disponibles para ti en cualquier momento de tu renta." },
                  { icon: <ShieldCheck />, title: "Seguridad", desc: "Vehículos mantenidos según los más altos estándares." },
                ].map((s, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="text-brand-secondary shrink-0">{React.cloneElement(s.icon, { size: 32 })}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-white">{s.title}</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">{s.desc}</p>
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
              <h3 className="text-2xl mb-8">Requisitos</h3>
              <ul className="space-y-4 text-brand-primary/70 font-bold text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-secondary" size={18} /> Mayor de 18 años</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-secondary" size={18} /> Licencia de conducir</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-secondary" size={18} /> Pasaporte e Itinerario</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-secondary" size={18} /> Dirección de estadía</li>
              </ul>
            </div>

            <div className="glass p-10 rounded-[3rem] border-0 shadow-sm">
              <div className="bg-brand-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-secondary mb-8">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl mb-8">Nuestras Políticas</h3>
              <ul className="space-y-4 text-brand-primary/70 font-bold text-sm">
                <li className="flex items-center gap-3">● Renta mínima de 3 días</li>
                <li className="flex items-center gap-3">● Kilometraje ilimitado</li>
                <li className="flex items-center gap-3">● Combustible nivel a nivel</li>
                <li className="flex items-center gap-3">● Uso nacional permitido</li>
              </ul>
            </div>

            <div className="bg-brand-secondary p-12 rounded-[3.5rem] text-white flex flex-col justify-between">
              <div>
                <Beer className="w-12 h-12 mb-8" />
                <h3 className="text-3xl text-white mb-6 italic leading-tight">Regalo Tropic</h3>
                <p className="text-white/80 font-medium mb-8">
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
    </div>
  );
};

export default App;
