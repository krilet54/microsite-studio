import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface WebsiteOrderDetails {
  orderId: string;
  userId: string;
  businessName: string;
  pocName: string;
  phone: string;
  email: string;
  serviceType?: string; // Website, Social Media Management, Branding, etc.
  packageName?: string; // Specific plan/package selected
  industry?: string;
  domainPreference?: string;
  notes?: string;
  addOns?: string[]; // Selected optional add-ons
  otherAddOn?: string; // Custom add-on text when 'Others' selected
  communicationMethod?: 'WhatsApp' | 'Email' | 'Call';
  createdAt: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  paymentStatus: 'pending' | 'paid';
}

interface OrderContextValue {
  currentOrder: WebsiteOrderDetails | null;
  createOrderDraft: (userId: string, initial?: Partial<WebsiteOrderDetails>) => WebsiteOrderDetails;
  updateOrder: (partial: Partial<WebsiteOrderDetails>) => void;
  confirmOrder: () => WebsiteOrderDetails | null;
  listOrders: () => WebsiteOrderDetails[];
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

const STORAGE_KEY = 'ms_orders';

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [currentOrder, setCurrentOrder] = useState<WebsiteOrderDetails | null>(null);

  useEffect(() => {
    // attempt restore latest draft
    const raw = localStorage.getItem('ms_current_order');
    if (raw) {
      try { setCurrentOrder(JSON.parse(raw)); } catch {}
    }
  }, []);

  const persist = (order: WebsiteOrderDetails) => {
    const list = listOrders();
    const idx = list.findIndex(o => o.orderId === order.orderId);
    if (idx >= 0) list[idx] = order; else list.push(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    localStorage.setItem('ms_current_order', JSON.stringify(order));
  };

  const listOrders = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try { return JSON.parse(raw) as WebsiteOrderDetails[]; } catch { return []; }
  };

  const createOrderDraft = (userId: string, initial?: Partial<WebsiteOrderDetails>): WebsiteOrderDetails => {
    // Robust unique id: MSW-<time36>-<rand4>
    let rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    try {
      if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        rand = arr[0].toString(36).toUpperCase().padStart(6, '0');
      }
    } catch {}
    const timePart = Date.now().toString(36).toUpperCase();
    const order: WebsiteOrderDetails = {
      orderId: `MSW-${timePart}-${rand.substring(0,4)}`,
      userId,
      businessName: '',
      pocName: '',
      phone: '',
      email: '',
      // Provide sensible defaults so success page can always show something even if user entered via direct link
      serviceType: initial?.serviceType !== undefined ? initial.serviceType : 'Website',
      packageName: initial?.packageName !== undefined ? initial.packageName : '₹499 Starter Website',
      addOns: [],
      otherAddOn: '',
      communicationMethod: undefined,
      createdAt: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'pending'
    };
    // Merge any other provided initial fields
    Object.assign(order, initial);
    setCurrentOrder(order);
    persist(order);
    return order;
  };

  const updateOrder = (partial: Partial<WebsiteOrderDetails>) => {
    setCurrentOrder(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...partial } as WebsiteOrderDetails;
      persist(updated);
      return updated;
    });
  };

  const confirmOrder = () => {
    if (!currentOrder) return null;
    const updated: WebsiteOrderDetails = { ...currentOrder, status: 'confirmed' };
    setCurrentOrder(updated);
    persist(updated);
    return updated;
  };

  return (
    <OrderContext.Provider value={{ currentOrder, createOrderDraft, updateOrder, confirmOrder, listOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};
