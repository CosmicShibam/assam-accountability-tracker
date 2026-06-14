import { useState } from "react";
import { Clock, Search, Filter, Plus, Edit2, Trash2 } from "lucide-react";
import { usePromises } from "../context/PromiseContext";
import { getNormalizedStatus, getStatusStyles, PromiseRecord } from "../types";
import PromiseFormModal from "../components/PromiseFormModal";

export default function AdminDashboard() {
  const { promises, addPromise, updatePromise, deletePromise } = usePromises();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PromiseRecord | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  const total = promises.length;
  const fulfilledCount = promises.filter(p => getNormalizedStatus(p.status) === 'fulfilled').length;
  const inProgressCount = promises.filter(p => getNormalizedStatus(p.status) === 'in_progress').length;
  const delayedCount = promises.filter(p => getNormalizedStatus(p.status) === 'delayed').length;

  const filteredPromises = promises.filter(p => 
    !searchQuery || 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingRecord(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (record: PromiseRecord) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleSave = (record: PromiseRecord) => {
    if (editingRecord) {
      updatePromise(record);
    } else {
      addPromise(record);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="font-heading text-3xl font-bold text-on-surface mb-1">Editor Dashboard</h1>
          <p className="text-on-surface-variant font-medium">Manage database records and evidence.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="clay-btn bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
        >
          <Plus size={20} /> Add New Promise
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Tracked", val: total, color: "text-primary" },
          { label: "Fulfilled", val: fulfilledCount, color: "text-secondary" },
          { label: "In Progress", val: inProgressCount, color: "text-tertiary" },
          { label: "Delayed", val: delayedCount, color: "text-error" },
        ].map((stat, i) => (
          <div key={i} className="clay-card bg-surface rounded-2xl p-6 border border-white">
            <p className="text-on-surface-variant font-bold text-sm mb-2">{stat.label}</p>
            <h3 className={`font-heading text-4xl font-black ${stat.color}`}>{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="clay-card bg-surface rounded-2xl border border-white overflow-hidden">
        <div className="p-6 border-b border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="font-heading text-xl font-bold text-on-surface w-full sm:w-auto">Recent Updates</h2>
          <div className="flex w-full sm:w-auto gap-3">
             <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" size={18} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full clay-input rounded-lg py-2.5 pl-10 pr-3 text-sm font-medium" 
                placeholder="Search Title..." 
                type="text" 
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-bold text-sm">
                <th className="p-4 pl-6 font-medium">Promise Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Last Verified</th>
                <th className="p-4 pr-6 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-medium">
              {filteredPromises.map((row) => {
                const styles = getStatusStyles(row.status);
                return (
                  <tr key={row.id} className="hover:bg-surface-variant/20 transition-colors">
                    <td className="p-4 pl-6 text-on-surface font-semibold max-w-xs truncate">{row.title}</td>
                    <td className="p-4 text-sm text-outline font-bold">{row.category}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}>
                        {styles.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant flex items-center gap-1.5">
                      <Clock size={14} />{row.lastVerifiedAt || '-'}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2 text-outline">
                        <button onClick={() => handleOpenEdit(row)} className="clay-recessed p-2 rounded-lg bg-surface hover:text-primary transition-colors" title="Edit"><Edit2 size={16} /></button>
                        <button onClick={() => deletePromise(row.id)} className="clay-recessed p-2 rounded-lg bg-surface hover:text-error transition-colors" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <PromiseFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={editingRecord}
        onSave={handleSave}
      />
    </div>
  );
}
