import { useState } from "react";
import { FileText, Download, ExternalLink, Calendar, Search, Filter, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { usePromises } from "../context/PromiseContext";

export default function Evidence() {
  const { promises } = usePromises();
  const [searchQuery, setSearchQuery] = useState("");

  const evidenceItems = promises
    .filter(p => (p.sourceTitle || p.sourceRef) && (!searchQuery || (p.sourceTitle || '').toLowerCase().includes(searchQuery.toLowerCase()) || p.title.toLowerCase().includes(searchQuery.toLowerCase())))
    .sort((a, b) => new Date(b.sourceDate || 0).getTime() - new Date(a.sourceDate || 0).getTime());

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-6">
          Evidence Library
        </h1>
        <p className="text-xl text-on-surface-variant max-w-3xl leading-relaxed mb-8">
          Browse the collection of documents, reports, and media verifying the progress of government promises. Transparency requires verifiable proof.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" size={20} />
            <input 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="clay-input w-full rounded-xl py-3 pl-12 pr-4 focus:outline-none" 
              placeholder="Search documents..." 
              type="text" 
            />
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {evidenceItems.map((item) => (
          <div key={item.id} className="clay-card bg-surface rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-surface-variant/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="clay-recessed p-3 rounded-lg bg-surface shrink-0 text-primary">
                <LinkIcon size={24} className="text-tertiary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">{item.sourceTitle || 'Official Source Reference'}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-on-surface-variant">
                  <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-xs border border-outline/10">{item.category}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-outline" /> {item.sourceDate || item.lastVerifiedAt}</span>
                  <span className="flex items-center gap-1.5 shrink-0 text-outline">Ref: {item.sourceRef}</span>
                </div>
                <Link to={`/promises/${item.id}`} className="text-xs text-primary font-bold mt-2 inline-block hover:underline">
                  Linked to Promise: {item.title}
                </Link>
              </div>
            </div>
            
            {item.sourceUrl ? (
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="clay-btn bg-primary-container text-on-primary-container p-3 rounded-lg self-start sm:self-center hover:bg-primary hover:text-on-primary transition-colors">
                <ExternalLink size={20} />
              </a>
            ) : (
              <div className="clay-recessed p-3 rounded-lg self-start sm:self-center opacity-50 cursor-not-allowed">
                <ExternalLink size={20} />
              </div>
            )}
          </div>
        ))}
        {evidenceItems.length === 0 && (
          <div className="text-center text-outline p-12">
            No evidence documents linked yet.
          </div>
        )}
      </div>
    </div>
  );
}
