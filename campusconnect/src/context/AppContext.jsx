import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Try to load from localStorage, otherwise set default
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem('appliedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [rsvpedEvents, setRsvpedEvents] = useState(() => {
    const saved = localStorage.getItem('rsvpedEvents');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  useEffect(() => {
    localStorage.setItem('rsvpedEvents', JSON.stringify(rsvpedEvents));
  }, [rsvpedEvents]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Cart Logic
  const addToCart = (product, quantity, size) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => item.id === product.id && item.size === size ? { ...item, qty: item.qty + quantity } : item);
      }
      return [...prev, { ...product, qty: quantity, size }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateCartQty = (id, size, delta) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // Job App Logic
  const applyForJob = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  };

  const rsvpEvent = (eventId) => {
    if (!rsvpedEvents.includes(eventId)) {
      setRsvpedEvents([...rsvpedEvents, eventId]);
    } else {
      setRsvpedEvents(rsvpedEvents.filter(id => id !== eventId)); // toggle off
    }
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateCartQty, clearCart,
      appliedJobs, applyForJob,
      rsvpedEvents, rsvpEvent,
      favorites, toggleFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
};
