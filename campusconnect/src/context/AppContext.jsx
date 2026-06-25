import React, { createContext, useContext, useState, useEffect } from 'react';
import { seedStores, seedProducts, seedJobs, seedEvents } from '../data/mockData';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const { registerStoreForUser } = useAuth();

  // Force refresh localStorage data with updated images
  useEffect(() => {
    const currentVersion = '2.0'; // Update this when we change mockData
    const storedVersion = localStorage.getItem('cc_data_version');
    
    if (storedVersion !== currentVersion) {
      // Data will be refreshed by AuthContext, so we just need to reload from seeds
      localStorage.setItem('cc_stores', JSON.stringify(seedStores));
      localStorage.setItem('cc_products', JSON.stringify(seedProducts));
      localStorage.setItem('cc_jobs', JSON.stringify(seedJobs));
      localStorage.setItem('cc_events', JSON.stringify(seedEvents));
    }
  }, []);

  // Load datasets from localStorage or seeds
  const [stores, setStores] = useState(() => {
    const saved = localStorage.getItem('cc_stores');
    return saved ? JSON.parse(saved) : seedStores;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('cc_products');
    return saved ? JSON.parse(saved) : seedProducts;
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('cc_jobs');
    return saved ? JSON.parse(saved) : seedJobs;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('cc_events');
    return saved ? JSON.parse(saved) : seedEvents;
  });

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

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('cc_stores', JSON.stringify(stores));
  }, [stores]);

  useEffect(() => {
    localStorage.setItem('cc_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cc_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('cc_events', JSON.stringify(events));
  }, [events]);

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

  // Store Management
  const createStore = (storeData, ownerId) => {
    const storeId = 's_' + Date.now();
    const newStore = {
      id: storeId,
      ownerId,
      storeName: storeData.storeName,
      description: storeData.description || '',
      logo: storeData.logo || '/images/stores/default-store.jpg',
      banner: storeData.banner || '/images/stores/default-banner.jpg',
      category: storeData.category || 'General',
      contactDetails: {
        email: storeData.email || '',
        phone: storeData.phone || ''
      },
      socialLinks: {
        instagram: storeData.instagram || '',
        twitter: storeData.twitter || '',
        website: storeData.website || ''
      },
      followers: [],
      createdAt: new Date().toISOString()
    };

    setStores(prev => [...prev, newStore]);
    registerStoreForUser(ownerId, storeId);
    return newStore;
  };

  const updateStore = (storeId, updatedData) => {
    setStores(prev => prev.map(store => {
      if (store.id === storeId) {
        return {
          ...store,
          storeName: updatedData.storeName,
          description: updatedData.description || '',
          logo: updatedData.logo || store.logo,
          banner: updatedData.banner || store.banner,
          category: updatedData.category || store.category,
          contactDetails: {
            email: updatedData.email || '',
            phone: updatedData.phone || ''
          },
          socialLinks: {
            instagram: updatedData.instagram || '',
            twitter: updatedData.twitter || '',
            website: updatedData.website || ''
          }
        };
      }
      return store;
    }));
  };

  const followStore = (storeId, userId) => {
    setStores(prev => prev.map(store => {
      if (store.id === storeId) {
        const followers = store.followers || [];
        if (!followers.includes(userId)) {
          return { ...store, followers: [...followers, userId] };
        }
      }
      return store;
    }));
  };

  const unfollowStore = (storeId, userId) => {
    setStores(prev => prev.map(store => {
      if (store.id === storeId) {
        const followers = store.followers || [];
        return { ...store, followers: followers.filter(id => id !== userId) };
      }
      return store;
    }));
  };

  // Product Management
  const addProduct = (productData) => {
    const newProduct = {
      id: 'p_' + Date.now(),
      storeId: productData.storeId,
      ownerId: productData.ownerId,
      name: productData.name,
      price: parseFloat(productData.price) || 0,
      oldPrice: productData.oldPrice ? parseFloat(productData.oldPrice) : undefined,
      description: productData.description || '',
      imageUrl: productData.imageUrl || '/images/products/default-product.jpg',
      category: productData.category || 'General',
      createdAt: new Date().toISOString()
    };

    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          name: updatedData.name,
          price: parseFloat(updatedData.price) || 0,
          oldPrice: updatedData.oldPrice ? parseFloat(updatedData.oldPrice) : undefined,
          description: updatedData.description || '',
          imageUrl: updatedData.imageUrl || product.imageUrl,
          category: updatedData.category || product.category
        };
      }
      return product;
    }));
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    // Also remove from cart/favorites if deleted
    setCart(prev => prev.filter(item => item.id !== productId));
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  // Job Listing Creation
  const createJob = (jobData, postedByUserId) => {
    const newJob = {
      id: jobs.length + 1,
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      type: jobData.type,
      salary: jobData.salary,
      description: jobData.description,
      postedBy: postedByUserId,
      createdAt: new Date().toISOString()
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  // Event Posting Creation
  const createEvent = (eventData, organizedByUserId) => {
    const newEvent = {
      id: events.length + 1,
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      img: eventData.img || '/images/events/default-event.jpg',
      description: eventData.description,
      organizedBy: organizedByUserId,
      rsvps: []
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

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

  // Event RSVP
  const rsvpEvent = (eventId) => {
    if (!rsvpedEvents.includes(eventId)) {
      setRsvpedEvents([...rsvpedEvents, eventId]);
      // Also update rsvps list inside the event object
      setEvents(prev => prev.map(ev => {
        if (ev.id === eventId) {
          const evRsvps = ev.rsvps || [];
          return { ...ev, rsvps: [...evRsvps, 'current_user'] };
        }
        return ev;
      }));
    } else {
      setRsvpedEvents(rsvpedEvents.filter(id => id !== eventId));
      setEvents(prev => prev.map(ev => {
        if (ev.id === eventId) {
          const evRsvps = ev.rsvps || [];
          return { ...ev, rsvps: evRsvps.filter(id => id !== 'current_user') };
        }
        return ev;
      }));
    }
  };

  // Favorites
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <AppContext.Provider value={{
      stores, createStore, updateStore, followStore, unfollowStore,
      products, addProduct, updateProduct, deleteProduct,
      jobs, createJob, applyForJob, appliedJobs,
      events, createEvent, rsvpEvent, rsvpedEvents,
      cart, addToCart, removeFromCart, updateCartQty, clearCart,
      favorites, toggleFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
};

