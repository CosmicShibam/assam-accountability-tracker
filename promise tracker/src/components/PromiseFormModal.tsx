import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PromiseRecord } from '../types';

interface PromiseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  record?: PromiseRecord;
  onSave: (record: PromiseRecord) => void;
}

export default function PromiseFormModal({ isOpen, onClose, record, onSave }: PromiseFormModalProps) {
  const [formData, setFormData] = useState<Partial<PromiseRecord>>({});

  useEffect(() => {
    if (isOpen) {
      if (record) {
        setFormData(record);
      } else {
        setFormData({
          id: `assam-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8)}`,
          title: '',
          category: '',
          promiseText: '',
          status: 'pending',
          sourceTitle: '',
          sourceDate: new Date().toISOString().split('T')[0],
          sourceRef: '',
          trackMetric: '',
          verificationRule: '',
          lastVerifiedAt: new Date().toISOString().split('T')[0],
        });
      }
    }
  }, [isOpen, record]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as PromiseRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="clay-card bg-surface w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-variant transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="font-heading text-2xl font-bold mb-6">
          {record ? 'Edit Promise' : 'Add New Promise'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Title</label>
              <input 
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                required
                className="w-full clay-input rounded-xl py-3 px-4 font-medium" 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Category</label>
              <input 
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                required
                className="w-full clay-input rounded-xl py-3 px-4 font-medium" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Status</label>
              <select
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
                className="w-full clay-input rounded-xl py-3 px-4 font-medium"
              >
                <option value="pending">Pending Review / Announced</option>
                <option value="in_progress">In Progress / Launched</option>
                <option value="fulfilled">Fulfilled / Passed</option>
                <option value="delayed">Delayed / Broken</option>
              </select>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Promise Text</label>
              <textarea 
                name="promiseText"
                value={formData.promiseText || ''}
                onChange={handleChange}
                rows={3}
                required
                className="w-full clay-input rounded-xl py-3 px-4 font-medium resize-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Source Title</label>
              <input 
                name="sourceTitle"
                value={formData.sourceTitle || ''}
                onChange={handleChange}
                className="w-full clay-input rounded-xl py-3 px-4 font-medium" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Source Date</label>
              <input 
                name="sourceDate"
                type="date"
                value={formData.sourceDate || ''}
                onChange={handleChange}
                className="w-full clay-input rounded-xl py-3 px-4 font-medium" 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Source Reference (URL/ID)</label>
              <input 
                name="sourceRef"
                value={formData.sourceRef || ''}
                onChange={handleChange}
                className="w-full clay-input rounded-xl py-3 px-4 font-medium" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Last Verified</label>
              <input 
                name="lastVerifiedAt"
                type="date"
                value={formData.lastVerifiedAt || ''}
                onChange={handleChange}
                className="w-full clay-input rounded-xl py-3 px-4 font-medium" 
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Track Metric</label>
              <input 
                name="trackMetric"
                value={formData.trackMetric || ''}
                onChange={handleChange}
                className="w-full clay-input rounded-xl py-3 px-4 font-medium" 
              />
            </div>
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Verification Rule (Admin Note)</label>
              <textarea 
                name="verificationRule"
                value={formData.verificationRule || ''}
                onChange={handleChange}
                rows={2}
                className="w-full clay-input rounded-xl py-3 px-4 font-medium resize-none" 
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-outline/20">
            <button 
              type="button" 
              onClick={onClose}
              className="clay-btn bg-surface px-6 py-3 rounded-xl font-bold"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="clay-btn bg-primary text-on-primary px-6 py-3 rounded-xl font-bold shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3)]"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
