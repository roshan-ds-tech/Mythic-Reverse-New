import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, CheckCircle, XCircle, Trash2, Edit2 } from 'lucide-react';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    code: '',
    discount_type: 'percentage',
    discount_value: '',
    expiry_date: '',
    usage_limit: '',
    applicable_course_ids: '', // We'll parse this to an array by commas
    is_active: true
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchCoupons();
  }, []);

  async function fetchCoupons() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      setError('Failed to fetch coupons. Make sure you ran the SQL script.');
    } else {
      setCoupons(data || []);
      setError(null);
    }
    setIsLoading(false);
  }

  const handleOpenModal = (coupon = null) => {
    if (coupon) {
      setEditingId(coupon.id);
      setForm({
        ...coupon,
        expiry_date: coupon.expiry_date ? coupon.expiry_date.split('T')[0] : '',
        usage_limit: coupon.usage_limit || '',
        applicable_course_ids: coupon.applicable_course_ids ? coupon.applicable_course_ids.join(', ') : ''
      });
    } else {
      setEditingId(null);
      setForm(initialForm);
    }
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setForm(initialForm);
    setEditingId(null);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        code: form.code.toUpperCase(),
        discount_type: form.discount_type,
        discount_value: parseFloat(form.discount_value),
        expiry_date: form.expiry_date ? new Date(form.expiry_date).toISOString() : null,
        usage_limit: form.usage_limit ? parseInt(form.usage_limit) : null,
        applicable_course_ids: form.applicable_course_ids ? form.applicable_course_ids.split(',').map(s => s.trim()).filter(Boolean) : null,
        is_active: form.is_active
      };

      if (editingId) {
        const { error } = await supabase.from('coupons').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('coupons').insert([payload]);
        if (error) throw error;
      }
      
      handleCloseModal();
      fetchCoupons();
    } catch (err) {
      alert(err.message || 'Error saving coupon');
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    const { error } = await supabase.from('coupons').delete().eq('id', id);
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      fetchCoupons();
    }
  }

  const handleToggleActive = async (id, currentStatus) => {
    const { error } = await supabase.from('coupons').update({ is_active: !currentStatus }).eq('id', id);
    if (!error) {
      fetchCoupons();
    } else {
      alert("Error toggling: " + error.message);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Coupon Management</h1>
            <p className="text-gray-400">Create and manage discount codes for courses.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Coupon
          </button>
        </div>

        {error && <div className="bg-red-500/20 text-red-400 p-4 rounded-md mb-6 border border-red-500/30">{error}</div>}

        <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 border-b border-white/10">
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">CODE</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">DISCOUNT</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">USAGE</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">EXPIRY</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm">STATUS</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-sm text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">Loading coupons...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No coupons found. Create one to get started.</td></tr>
              ) : coupons.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
                      {c.code}
                    </span>
                    {c.applicable_course_ids?.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">Specific courses only</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {c.discount_type === 'percentage' ? `${c.discount_value}%` : `₹${c.discount_value}`}
                  </td>
                  <td className="px-6 py-4">
                    <span className={c.usage_limit && c.used_count >= c.usage_limit ? "text-orange-400" : "text-gray-300"}>
                      {c.used_count} {c.usage_limit ? `/ ${c.usage_limit}` : 'uses'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {c.expiry_date ? new Date(c.expiry_date).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleToggleActive(c.id, c.is_active)} className="flex items-center gap-1 hover:opacity-80">
                      {c.is_active ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-gray-600" />}
                      <span className={`text-sm ${c.is_active ? 'text-green-500' : 'text-gray-500'}`}>
                        {c.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleOpenModal(c)} className="text-gray-400 hover:text-white transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Coupon' : 'Create New Coupon'}</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Coupon Code *</label>
                <input required type="text" value={form.code} onChange={e => setForm({...form, code: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 uppercase placeholder:normal-case font-mono focus:outline-none focus:border-purple-500" placeholder="e.g. DIWALI50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Discount Type *</label>
                  <select value={form.discount_type} onChange={e => setForm({...form, discount_type: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 focus:outline-none focus:border-purple-500">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Value *</label>
                  <input required min="1" type="number" value={form.discount_value} onChange={e => setForm({...form, discount_value: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 focus:outline-none focus:border-purple-500" placeholder="e.g. 20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Expiry Date</label>
                  <input type="date" value={form.expiry_date} onChange={e => setForm({...form, expiry_date: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 [color-scheme:dark] focus:outline-none focus:border-purple-500" />
                  <p className="text-xs text-gray-500 mt-1">Leave empty for no expiry</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Usage Limit</label>
                  <input type="number" min="1" value={form.usage_limit} onChange={e => setForm({...form, usage_limit: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 focus:outline-none focus:border-purple-500" placeholder="e.g. 100" />
                  <p className="text-xs text-gray-500 mt-1">Leave empty for unlimited</p>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Applicable Courses</label>
                <input type="text" value={form.applicable_course_ids} onChange={e => setForm({...form, applicable_course_ids: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 focus:outline-none focus:border-purple-500" placeholder="e.g. Programming Languages, Ethical Hacking & Cybersecurity" />
                <p className="text-xs text-gray-500 mt-1">Comma-separated exact course names. Leave empty for all courses.</p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isActive" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="w-4 h-4 accent-purple-500" />
                <label htmlFor="isActive" className="text-sm cursor-pointer hover:text-white transition-colors">Coupon is Active</label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-white/10 mt-4">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-white hover:bg-white/5 rounded transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors">{editingId ? 'Update Coupon' : 'Create Coupon'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
