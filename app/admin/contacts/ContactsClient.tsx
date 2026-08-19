'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Phone, Calendar, Clock, CheckCircle, Trash2, Users, CheckCircle2, AlertCircle } from 'lucide-react';
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

  const statsConfig = [
    {
      label: 'Total Submissions',
      value: stats.total,
      icon: Users,
      bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50/30',
      iconBg: 'bg-indigo-500/10',
      iconColor: 'text-indigo-600',
      borderColor: 'border-indigo-200',
      valueColor: 'text-secondary'
    },
    {
      label: 'Appointments',
      value: stats.appointments,
      icon: Calendar,
      bgColor: 'bg-gradient-to-br from-teal-50 to-emerald-50/30',
      iconBg: 'bg-teal-500/10',
      iconColor: 'text-teal-600',
      borderColor: 'border-teal-200',
      valueColor: 'text-primary'
    },
    {
      label: 'Contacted',
      value: stats.contacted,
      icon: CheckCircle2,
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50/30',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      valueColor: 'text-emerald-600'
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: AlertCircle,
      bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50/30',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      valueColor: 'text-amber-600'
    }
  ];

  if (loading) return <Loading fullScreen />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-heading font-bold text-secondary">Contacts & Appointments</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className={`border-b-4 ${stat.borderColor} ${stat.bgColor} p-6 relative overflow-hidden transition-all duration-300`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className={`text-4xl font-extrabold font-heading ${stat.valueColor}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-2xl ${stat.iconBg}`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none" />
              </Card>
            );
          })}
        </div>

        <Card className="border border-neutral-100 bg-white shadow-soft">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, phone or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-neutral-700 bg-neutral-50/30"
              />
            </div>
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-neutral-600" />
                <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wider hidden sm:inline">Filter:</span>
              </div>
              <div className="flex bg-neutral-100 p-1 rounded-xl gap-1">
                {([
                  ['all', `All (${stats.total})`, 'bg-secondary text-white shadow-soft'],
                  ['general', `General (${stats.general})`, 'bg-secondary text-white shadow-soft'],
                  ['appointment', `Appointments (${stats.appointments})`, 'bg-primary text-white shadow-soft']
                ] as const).map(([tab, label, activeClasses]) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      filter === tab
                        ? activeClasses
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                    }`}
                  >
                    {label}
                  </button>
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
                <Card
                  className={`border-l-4 ${
                    contact.contact_type === 'appointment' ? 'border-primary' : 'border-secondary'
                  } bg-white shadow-soft hover:shadow-md transition-shadow`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            contact.contact_type === 'appointment'
                              ? 'bg-teal-50 text-teal-700 border border-teal-100'
                              : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}
                        >
                          {contact.contact_type === 'appointment' ? 'Appointment Request' : 'General Inquiry'}
                        </span>
                        
                        {contact.is_contacted ? (
                          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Contacted
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            Pending
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-secondary mb-3">{contact.name}</h3>
                        
                        <div className="flex flex-wrap gap-4 items-center text-sm text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-teal-600" />
                            <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors font-medium text-neutral-700">
                              {contact.email}
                            </a>
                          </div>
                          <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full hidden sm:block" />
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-teal-600" />
                            <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors font-medium text-neutral-700">
                              {contact.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {contact.contact_type === 'appointment' && contact.appointment_date && (
                        <div className="flex items-stretch gap-4 border border-teal-100 bg-gradient-to-r from-teal-50/70 to-emerald-50/20 rounded-2xl p-4">
                          <div className="flex flex-col items-center justify-center bg-white border border-teal-200 rounded-xl px-4 py-2 shadow-sm min-w-[80px]">
                            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                              {new Date(contact.appointment_date).toLocaleDateString('en-IN', { month: 'short' })}
                            </span>
                            <span className="text-2xl font-extrabold text-secondary">
                              {new Date(contact.appointment_date).toLocaleDateString('en-IN', { day: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Requested Schedule</p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-secondary">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-teal-600" />
                                {new Date(contact.appointment_date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric' })}
                              </div>
                              {contact.appointment_time && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-teal-600" />
                                  {contact.appointment_time}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border-l-2 border-neutral-300 pl-4 py-1 italic text-neutral-700 bg-neutral-50/50 rounded-r-lg pr-2 text-base">
                        "{contact.message}"
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 pt-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Submitted on {new Date(contact.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-row lg:flex-col gap-2.5 min-w-[180px] justify-end lg:justify-start pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
                      <Button
                        variant={contact.is_contacted ? 'outline' : 'primary'}
                        onClick={() => handleToggleContacted(contact.id, contact.is_contacted)}
                        className="w-full text-sm py-2.5 flex items-center justify-center gap-2 border-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>{contact.is_contacted ? 'Mark Pending' : 'Mark Contacted'}</span>
                      </Button>
                      
                      {deleteConfirmId === contact.id ? (
                        <div className="flex gap-2 w-full">
                          <Button
                            variant="primary"
                            onClick={() => handleDelete(contact.id)}
                            className="flex-1 text-xs py-2.5 bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm"
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setDeleteConfirmId(null)}
                            className="flex-1 text-xs py-2.5 border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => setDeleteConfirmId(contact.id)}
                          className="w-full text-sm py-2.5 flex items-center justify-center gap-2 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </Button>
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
