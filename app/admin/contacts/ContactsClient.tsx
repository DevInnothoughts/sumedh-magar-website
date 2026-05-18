'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Phone, Calendar, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase, Contact } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { AdminLayout } from '@/components/AdminLayout';

type FilterType = 'all' | 'general' | 'appointment';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) { router.push('/admin'); return; }
      fetchContacts();
    }).catch(() => router.push('/admin'));
  }, [router]);

  useEffect(() => {
    let filtered = [...contacts];
    if (search) filtered = filtered.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.message.toLowerCase().includes(search.toLowerCase()));
    if (filter !== 'all') filtered = filtered.filter((c) => c.contact_type === filter);
    setFilteredContacts(filtered);
  }, [search, filter, contacts]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setContacts(data);
    } catch {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleContacted = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from('contacts').update({ is_contacted: !currentStatus }).eq('id', id);
      if (error) throw error;
      setContacts((prev) => prev.map((c) => c.id === id ? { ...c, is_contacted: !currentStatus } : c));
      toast.success(`Contact marked as ${!currentStatus ? 'contacted' : 'not contacted'}`);
    } catch {
      toast.error('Failed to update contact');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) throw error;
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast.success('Contact deleted successfully');
      setDeleteConfirmId(null);
    } catch {
      toast.error('Failed to delete contact');
    }
  };

  const stats = {
    total: contacts.length,
    general: contacts.filter((c) => c.contact_type === 'general').length,
    appointments: contacts.filter((c) => c.contact_type === 'appointment').length,
    contacted: contacts.filter((c) => c.is_contacted).length,
    pending: contacts.filter((c) => !c.is_contacted).length,
  };

  if (loading) return <Loading fullScreen />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-heading font-bold text-secondary">Contacts & Appointments</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[['Total Submissions', stats.total, 'secondary'], ['Appointments', stats.appointments, 'primary'], ['Contacted', stats.contacted, 'text-green-600'], ['Pending', stats.pending, 'gold']].map(([label, value, color]) => (
            <Card key={label as string}><div className="text-center"><p className="text-neutral-600 mb-2">{label}</p><p className={`text-4xl font-bold text-${color}`}>{value}</p></div></Card>
          ))}
        </div>

        <Card>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input type="text" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-neutral-600" />
              <div className="flex gap-2">
                {[['all', `All (${stats.total})`, 'secondary'], ['general', `General (${stats.general})`, 'secondary'], ['appointment', `Appointments (${stats.appointments})`, 'primary']].map(([tab, label, color]) => (
                  <button key={tab} onClick={() => setFilter(tab as FilterType)} className={`px-4 py-2 rounded-xl font-medium transition-all ${filter === tab ? `bg-${color} text-white` : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}>{label}</button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {filteredContacts.length === 0 ? (
          <Card><p className="text-center text-neutral-600 py-8">No contacts found</p></Card>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <motion.div key={contact.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${contact.contact_type === 'appointment' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                          {contact.contact_type === 'appointment' ? 'Appointment Request' : 'General Inquiry'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${contact.is_contacted ? 'bg-green-100 text-green-700' : 'bg-gold/10 text-gold'}`}>
                          {contact.is_contacted ? 'Contacted' : 'Pending'}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-secondary mb-2">{contact.name}</h3>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-neutral-600"><Mail className="w-4 h-4 text-primary" /><a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a></div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600"><Phone className="w-4 h-4 text-primary" /><a href={`tel:${contact.phone}`} className="hover:text-primary">{contact.phone}</a></div>
                      </div>
                      {contact.contact_type === 'appointment' && contact.appointment_date && (
                        <div className="bg-primary/5 p-3 rounded-xl mb-3">
                          <p className="font-medium text-secondary mb-2">Requested Appointment:</p>
                          <div className="flex items-center gap-4 text-sm text-neutral-700">
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />{new Date(contact.appointment_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                            {contact.appointment_time && <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />{contact.appointment_time}</div>}
                          </div>
                        </div>
                      )}
                      <p className="text-neutral-700 mb-3">{contact.message}</p>
                      <p className="text-sm text-neutral-500">Submitted: {new Date(contact.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="flex lg:flex-col gap-2">
                      <Button variant={contact.is_contacted ? 'outline' : 'primary'} onClick={() => handleToggleContacted(contact.id, contact.is_contacted)} className="flex-1 lg:flex-none">
                        <CheckCircle className="w-4 h-4 mr-2" />{contact.is_contacted ? 'Mark Pending' : 'Mark Contacted'}
                      </Button>
                      {deleteConfirmId === contact.id ? (
                        <div className="flex flex-col gap-2">
                          <Button variant="primary" onClick={() => handleDelete(contact.id)} className="bg-red-600 hover:bg-red-700">Confirm Delete</Button>
                          <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                        </div>
                      ) : (
                        <Button variant="outline" onClick={() => setDeleteConfirmId(contact.id)} className="flex-1 lg:flex-none border-red-600 text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
