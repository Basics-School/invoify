import create from 'zustand';

interface InvoiceState {
  invoices: InvoiceType[];
  addInvoice: (invoice: InvoiceType) => void;
  removeInvoice: (index: number) => void;
  updateInvoice: (index: number, updatedInvoice: InvoiceType) => void;
  activeId: UniqueIdentifier | null;
  setActiveId: (id: UniqueIdentifier | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  error: string;
  setError: (error: string) => void;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
  invoices: [],
  addInvoice: (invoice) =>
    set((state) => ({ invoices: [...state.invoices, invoice] })),
  removeInvoice: (index) =>
    set((state) => ({
      invoices: state.invoices.filter((_, i) => i !== index),
    })),
  updateInvoice: (index, updatedInvoice) =>
    set((state) => ({
      invoices: state.invoices.map((invoice, i) =>
        i === index ? updatedInvoice : invoice
      ),
    })),
  activeId: null,
  setActiveId: (id) => set({ activeId: id }),
  open: false,
  setOpen: (open) => set({ open }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  email: '',
  setEmail: (email) => set({ email }),
  error: '',
  setError: (error) => set({ error }),
}));
