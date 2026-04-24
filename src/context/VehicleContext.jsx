import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, setDoc, getDoc } from 'firebase/firestore';

const VehicleContext = createContext();

import nissanMarchImg from '../assets/nissan-march.png';
import kiaPicantoImg from '../assets/kia-picanto.png';
import hyundaiElantraImg from '../assets/hyundai-elantra.png';
import geelyGx3Img from '../assets/geely-gx3.png';

const INITIAL_VEHICLES = [
  {
    category: 'Económicos',
    items: [
      { id: 1, name: 'Nissan March', year: '2019', price: 34.99, image: nissanMarchImg, deposit: 100 },
      { id: 2, name: 'Nissan Note', year: '2019', price: 34.99, image: nissanMarchImg, deposit: 100 },
      { id: 3, name: 'Kia Picanto', year: '2019', price: 38.99, image: kiaPicantoImg, deposit: 100 },
    ]
  },
  {
    category: 'Sedanes',
    items: [
      { id: 4, name: 'Hyundai Elantra', year: '2020', price: 43.99, image: hyundaiElantraImg, deposit: 100 },
      { id: 5, name: 'Kia K5', year: '2019', price: 43.99, image: hyundaiElantraImg, deposit: 100 },
      { id: 6, name: 'Kia Rio', year: '2019', price: 43.99, image: hyundaiElantraImg, deposit: 100 },
    ]
  },
  {
    category: 'SUV / Jeepetas',
    items: [
      { id: 7, name: 'Hyundai Venue', year: '2024', price: 59.99, image: geelyGx3Img, deposit: 200 },
      { id: 8, name: 'Geely GX3', year: '2025', price: 69.99, image: geelyGx3Img, deposit: 200 },
    ]
  }
];

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fleetDocRef = doc(db, 'settings', 'fleet');

    // Initial check and seed
    const checkAndSeed = async () => {
      const docSnap = await getDoc(fleetDocRef);
      if (!docSnap.exists()) {
        await setDoc(fleetDocRef, { vehicles: INITIAL_VEHICLES });
      }
    };
    checkAndSeed();

    const unsubscribe = onSnapshot(fleetDocRef, (doc) => {
      if (doc.exists()) {
        setVehicles(doc.data().vehicles || []);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveToFirebase = async (newVehicles) => {
    const fleetDocRef = doc(db, 'settings', 'fleet');
    await updateDoc(fleetDocRef, { vehicles: newVehicles });
  };

  const addVehicle = async (categoryName, newVehicle) => {
    const updated = vehicles.map(cat => {
      if (cat.category === categoryName) {
        return {
          ...cat,
          items: [...cat.items, { ...newVehicle, id: Date.now() }]
        };
      }
      return cat;
    });
    setVehicles(updated);
    await saveToFirebase(updated);
  };

  const updateVehicle = async (categoryName, updatedVehicle) => {
    const updated = vehicles.map(cat => {
      if (cat.category === categoryName) {
        return {
          ...cat,
          items: cat.items.map(item => item.id === updatedVehicle.id ? updatedVehicle : item)
        };
      }
      return cat;
    });
    setVehicles(updated);
    await saveToFirebase(updated);
  };

  const deleteVehicle = async (categoryName, vehicleId) => {
    const updated = vehicles.map(cat => {
      if (cat.category === categoryName) {
        return {
          ...cat,
          items: cat.items.filter(item => item.id !== vehicleId)
        };
      }
      return cat;
    });
    setVehicles(updated);
    await saveToFirebase(updated);
  };

  return (
    <VehicleContext.Provider value={{ vehicles, loading, addVehicle, updateVehicle, deleteVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => useContext(VehicleContext);
