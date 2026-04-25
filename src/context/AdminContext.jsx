import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, onSnapshot, setDoc, updateDoc, increment, query, orderBy, getDocs, deleteDoc, addDoc } from 'firebase/firestore';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [config, setConfig] = useState({ whatsappNumber: '18090000000' });
  const [reservations, setReservations] = useState([]);
  const [metrics, setMetrics] = useState({ totalVisits: 0, activeUsers: 0 });

  // 1. Configuracion y Reservas
  useEffect(() => {
    // Config Snapshot
    const configRef = doc(db, 'settings', 'config');
    const unsubConfig = onSnapshot(configRef, (docSnap) => {
      if (docSnap.exists()) {
        setConfig(docSnap.data());
      } else {
        setDoc(configRef, { whatsappNumber: '18090000000' }, { merge: true });
      }
    });

    // Analytics Snapshot (Visits)
    const analyticsRef = doc(db, 'settings', 'analytics');
    const unsubAnalytics = onSnapshot(analyticsRef, (docSnap) => {
      if (docSnap.exists()) {
        setMetrics(prev => ({ ...prev, totalVisits: docSnap.data().totalVisits || 0 }));
      }
    });

    // Reservations Snapshot
    const reservationsRef = collection(db, 'reservations');
    const q = query(reservationsRef, orderBy('createdAt', 'desc'));
    const unsubReservations = onSnapshot(q, (snapshot) => {
      const resData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(resData);
    });

    return () => {
      unsubConfig();
      unsubAnalytics();
      unsubReservations();
    };
  }, []);

  // 2. Active Users Tracker (Admin view interval)
  useEffect(() => {
    // Solo monitorear la lista de activos si es necesario, lo haremos periódicamente
    const checkActiveUsers = async () => {
      try {
        const fiveMinsAgo = Date.now() - 5 * 60 * 1000;
        const sessionsRef = collection(db, 'active_sessions');
        const snapshot = await getDocs(sessionsRef);
        let count = 0;
        
        // Limpiamos los viejos de paso para ahorrar espacio
        const toDelete = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (data.timestamp > fiveMinsAgo) {
            count++;
          } else {
            toDelete.push(docSnap.id);
          }
        });

        setMetrics(prev => ({ ...prev, activeUsers: count }));

        // Optimist delete of old sessions
        toDelete.forEach(id => {
           deleteDoc(doc(db, 'active_sessions', id)).catch(() => {});
        });
      } catch (error) {
        console.error("Error fetching active users", error);
      }
    };

    checkActiveUsers();
    const interval = setInterval(checkActiveUsers, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  // 3. User Facing Logic: Log visit & session
  const logVisit = React.useCallback(async () => {
    try {
      if (!sessionStorage.getItem('drive_tropic_visited')) {
        // Bloqueo síncrono (evita race conditions en re-renders)
        sessionStorage.setItem('drive_tropic_visited', 'true');
        // Increment global counter
        await setDoc(doc(db, 'settings', 'analytics'), { totalVisits: increment(1) }, { merge: true });
      }

      // Heartbeat for Active Session
      const sessionId = sessionStorage.getItem('drive_tropic_session_id') || Math.random().toString(36).substring(2, 10);
      sessionStorage.setItem('drive_tropic_session_id', sessionId);
      
      const sessionRef = doc(db, 'active_sessions', sessionId);
      await setDoc(sessionRef, { timestamp: Date.now() });

    } catch (e) {
      console.log("Analytics error (ignored)", e);
    }
  }, []);

  // 4. Send Reservation Logic
  const createReservation = async (reservationData) => {
    try {
      const docRef = await addDoc(collection(db, 'reservations'), {
        ...reservationData,
        createdAt: Date.now(),
        status: 'pending' // pending, confirmed, cancelled
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error creating reservation: ", error);
      return { success: false, error };
    }
  };

  // 5. Update Config
  const updateConfig = async (newConfig) => {
    try {
      await setDoc(doc(db, 'settings', 'config'), newConfig, { merge: true });
    } catch (error) {
      console.error("Error al guardar config:", error);
    }
  };

  const updateReservationStatus = async (id, status) => {
      await updateDoc(doc(db, 'reservations', id), { status });
  }

  return (
    <AdminContext.Provider value={{
      config,
      updateConfig,
      reservations,
      createReservation,
      updateReservationStatus,
      metrics,
      logVisit
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
