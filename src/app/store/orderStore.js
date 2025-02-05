'use client';
import { create } from 'zustand';

const useOrderStore = create((set) => ({
  orders: [],
  notifications: [],
  
  addOrder: (order) => set((state) => {
    const currentDate = new Date();
    const deliveryTime = new Date(currentDate.getTime() + 60 * 60 * 1000); // +1 heure
    
    const newOrder = {
      ...order,
      id: Date.now(),
      orderDate: currentDate,
      deliveryTime: deliveryTime,
      status: 'en cours',
      remainingTime: 3600 // 1 heure en secondes
    };
    
    return { orders: [...state.orders, newOrder] };
  }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { id: Date.now(), ...notification }]
  })),
  
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    )
  })),
  
  updateRemainingTime: (orderId, remainingTime) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, remainingTime } : order
    )
  }))
}));

export default useOrderStore;
