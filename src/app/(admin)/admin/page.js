'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState([]);
  const [clients, setClients] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editItem, setEditItem] = useState(null);

  const [newClient, setNewClient] = useState({ name: '', logo: '', website: '' });
  const [newMember, setNewMember] = useState({ name: '', role: '', bio: '', image: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'arsanka2025') {
      setIsLoggedIn(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Yanlış şifre!');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [msgRes, clientRes, teamRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/clients'),
        fetch('/api/team')
      ]);
      if (msgRes.ok) setMessages(await msgRes.json());
      if (clientRes.ok) setClients(await clientRes.json());
      if (teamRes.ok) setTeam(await teamRes.json());
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
    }
    setLoading(false);
  };

  const markAsRead = async (id) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: true })
    });
    loadData();
  };

  const deleteMessage = async (id) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    loadData();
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    if (type === 'client') {
      setNewClient(item || { name: '', logo: '', website: '' });
    } else if (type === 'member') {
      setNewMember(item || { name: '', role: '', bio: '', image: '' });
    }
    setShowModal(true);
  };

  const saveClient = async () => {
    if (!newClient.name) return;
    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `/api/clients/${editItem._id}` : '/api/clients';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient)
    });
    setShowModal(false);
    setNewClient({ name: '', logo: '', website: '' });
    setEditItem(null);
    loadData();
  };

  const deleteClient = async (id) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/clients/${id}`, { method: 'DELETE' });
    loadData();
  };

  const saveMember = async () => {
    if (!newMember.name || !newMember.role) return;
    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `/api/team/${editItem._id}` : '/api/team';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMember)
    });
    setShowModal(false);
    setNewMember({ name: '', role: '', bio: '', image: '' });
    setEditItem(null);
    loadData();
  };

  const deleteMember = async (id) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/team/${id}`, { method: 'DELETE' });
    loadData();
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    setIsLoggedIn(false);
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  // Login Screen
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Paneli</h1>
            <p className="text-white/30 text-sm mt-1">Arsanka Medya</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-white placeholder-white/20 focus:border-red-600/50 focus:outline-none mb-4"
            />
            <button type="submit" className="w-full py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-all">
              Giriş
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c0c0c] border-r border-white/[0.04] flex flex-col">
        <div className="p-6 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Arsanka</p>
              <p className="text-white/30 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { id: 'messages', label: 'Mesajlar', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', badge: unreadCount },
              { id: 'clients', label: 'Müşteriler', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { id: 'team', label: 'Ekip', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                    activeTab === item.id
                      ? 'bg-red-600/10 text-red-500 border-l-2 border-red-600'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  {item.label}
                  {item.badge > 0 && (
                    <span className="ml-auto w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">{item.badge}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/[0.04]">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-white/40 text-sm hover:text-red-500 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.04] px-8 py-4 z-10">
          <h1 className="text-xl font-semibold text-white capitalize">{activeTab}</h1>
        </header>

        <div className="p-8">
          {loading && <div className="text-center py-12 text-white/40">Yükleniyor...</div>}

          {/* Dashboard */}
          {activeTab === 'dashboard' && !loading && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Toplam Mesaj', value: messages.length, color: 'red' },
                  { label: 'Okunmamış', value: unreadCount, color: 'yellow' },
                  { label: 'Müşteriler', value: clients.length, color: 'green' },
                  { label: 'Ekip Üyeleri', value: team.length, color: 'blue' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/[0.02] border border-white/[0.04] p-6">
                    <p className="text-white/40 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] border border-white/[0.04] p-6">
                <h3 className="text-white font-medium mb-4">Son Mesajlar</h3>
                <div className="space-y-3">
                  {messages.slice(0, 5).map((msg) => (
                    <div key={msg._id} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                      <div>
                        <p className="text-white text-sm">{msg.name}</p>
                        <p className="text-white/30 text-xs">{msg.subject || 'Konu belirtilmedi'}</p>
                      </div>
                      <span className="text-white/20 text-xs">{new Date(msg.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {activeTab === 'messages' && !loading && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-white/20">Henüz mesaj yok</div>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className={`p-6 border transition-all ${msg.isRead ? 'bg-white/[0.01] border-white/[0.04]' : 'bg-red-600/5 border-red-600/20'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium">{msg.name}</h3>
                          {!msg.isRead && <span className="px-2 py-0.5 bg-red-600 text-white text-xs">Yeni</span>}
                        </div>
                        <p className="text-white/40 text-sm">{msg.email}</p>
                      </div>
                      <span className="text-white/20 text-xs">{new Date(msg.createdAt).toLocaleString('tr-TR')}</span>
                    </div>
                    <p className="text-white/50 text-sm mb-2">{msg.subject}</p>
                    <p className="text-white/70 text-sm mb-4 whitespace-pre-wrap">{msg.message}</p>
                    <div className="flex gap-2">
                      {!msg.isRead && (
                        <button onClick={() => markAsRead(msg._id)} className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] text-white/60 text-xs hover:text-green-500 transition-all">
                          Okundu
                        </button>
                      )}
                      <a href={`mailto:${msg.email}`} className="px-3 py-1.5 bg-red-600 text-white text-xs hover:bg-red-700 transition-all">
                        Yanıtla
                      </a>
                      <button onClick={() => deleteMessage(msg._id)} className="px-3 py-1.5 text-red-500/50 text-xs hover:text-red-500 transition-all">
                        Sil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Clients */}
          {activeTab === 'clients' && !loading && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-white/40 text-sm">{clients.length} müşteri</p>
                <button onClick={() => openModal('client')} className="px-4 py-2 bg-red-600 text-white text-sm hover:bg-red-700 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Yeni Ekle
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {clients.map((client) => (
                  <div key={client._id} className="group bg-white/[0.02] border border-white/[0.04] p-4 hover:border-red-600/20 transition-all">
                    <div className="h-20 flex items-center justify-center mb-3">
                      {client.logo ? (
                        <img src={client.logo} alt={client.name} className="max-h-full max-w-full object-contain opacity-60" />
                      ) : (
                        <span className="text-white/20 text-2xl font-bold">{client.name.charAt(0)}</span>
                      )}
                    </div>
                    <p className="text-white/70 text-sm text-center mb-3">{client.name}</p>
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openModal('client', client)} className="px-2 py-1 text-white/40 text-xs hover:text-white">Düzenle</button>
                      <button onClick={() => deleteClient(client._id)} className="px-2 py-1 text-red-500/50 text-xs hover:text-red-500">Sil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team */}
          {activeTab === 'team' && !loading && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-white/40 text-sm">{team.length} üye</p>
                <button onClick={() => openModal('member')} className="px-4 py-2 bg-red-600 text-white text-sm hover:bg-red-700 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Yeni Ekle
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map((member) => (
                  <div key={member._id} className="group bg-white/[0.02] border border-white/[0.04] p-6 hover:border-red-600/20 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white/20 text-xl font-bold">{member.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{member.name}</h3>
                        <p className="text-red-500 text-sm">{member.role}</p>
                        {member.bio && <p className="text-white/30 text-xs mt-2 line-clamp-2">{member.bio}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openModal('member', member)} className="px-2 py-1 text-white/40 text-xs hover:text-white">Düzenle</button>
                      <button onClick={() => deleteMember(member._id)} className="px-2 py-1 text-red-500/50 text-xs hover:text-red-500">Sil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6" onClick={() => setShowModal(false)}>
          <div className="bg-[#0c0c0c] border border-white/[0.06] w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-white font-medium mb-6">
              {editItem ? 'Düzenle' : 'Yeni Ekle'} - {modalType === 'client' ? 'Müşteri' : 'Ekip Üyesi'}
            </h2>

            {modalType === 'client' && (
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs block mb-2">Firma Adı *</label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-white placeholder-white/20 focus:border-red-600/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-2">Logo</label>
                  <ImageUploader
                    currentImage={newClient.logo}
                    onUpload={(url) => setNewClient({...newClient, logo: url})}
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-2">Website</label>
                  <input
                    type="text"
                    value={newClient.website}
                    onChange={(e) => setNewClient({...newClient, website: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-white placeholder-white/20 focus:border-red-600/50 focus:outline-none"
                    placeholder="https://"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-white/[0.06] text-white/60 hover:text-white transition-all">
                    İptal
                  </button>
                  <button onClick={saveClient} className="flex-1 py-3 bg-red-600 text-white hover:bg-red-700 transition-all">
                    Kaydet
                  </button>
                </div>
              </div>
            )}

            {modalType === 'member' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/40 text-xs block mb-2">Ad Soyad *</label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-white placeholder-white/20 focus:border-red-600/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs block mb-2">Pozisyon *</label>
                    <input
                      type="text"
                      value={newMember.role}
                      onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-white placeholder-white/20 focus:border-red-600/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-2">Fotoğraf</label>
                  <ImageUploader
                    currentImage={newMember.image}
                    onUpload={(url) => setNewMember({...newMember, image: url})}
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-2">Biyografi</label>
                  <textarea
                    value={newMember.bio}
                    onChange={(e) => setNewMember({...newMember, bio: e.target.value})}
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-white placeholder-white/20 focus:border-red-600/50 focus:outline-none resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-white/[0.06] text-white/60 hover:text-white transition-all">
                    İptal
                  </button>
                  <button onClick={saveMember} className="flex-1 py-3 bg-red-600 text-white hover:bg-red-700 transition-all">
                    Kaydet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
