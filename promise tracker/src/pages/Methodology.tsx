import { Search, ChevronDown, CheckCircle, CircleDot, Database, Users, ShieldCheck } from "lucide-react";

export default function Methodology() {
  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
          Our Methodology
        </h1>
        <p className="text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          How we track, verify, and report on government promises to ensure strict non-partisan accountability and data integrity.
        </p>
      </header>

      <div className="space-y-16">
        
        <section className="clay-card rounded-2xl p-8 md:p-10 border border-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-bl-[100px] pointer-events-none -mt-10 -mr-10"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="clay-recessed p-3 rounded-xl bg-surface text-primary">
              <Database size={28} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-on-surface">1. Data Collection</h2>
          </div>
          <p className="text-on-surface-variant text-lg leading-relaxed font-medium relative z-10">
            We extract manifesto promises directly from officially published election documents, government budget speeches, and verified press releases. Every single promise loaded into our database must have a verifiable primary source citation linked to a permanent record.
          </p>
        </section>

        <section className="clay-card rounded-2xl p-8 md:p-10 border border-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-bl-[100px] pointer-events-none -mt-10 -mr-10"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="clay-recessed p-3 rounded-xl bg-surface text-secondary">
              <ShieldCheck size={28} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-on-surface">2. Verification Process</h2>
          </div>
          <p className="text-on-surface-variant text-lg leading-relaxed font-medium relative z-10 mb-6">
             Status updates are never taken at face value. A promise is only moved to "Fulfilled" or "In Progress" when corroborated by at least two independent verifiable sources, such as:
          </p>
          <ul className="list-none space-y-3 font-medium text-on-surface-variant relative z-10">
            <li className="flex items-center gap-3"><CheckCircle className="text-secondary shrink-0" size={20} /> Published Government Tenders & Work Orders</li>
            <li className="flex items-center gap-3"><CheckCircle className="text-secondary shrink-0" size={20} /> Right to Information (RTI) Responses</li>
            <li className="flex items-center gap-3"><CheckCircle className="text-secondary shrink-0" size={20} /> Geo-tagged photographic evidence from established media</li>
            <li className="flex items-center gap-3"><CheckCircle className="text-secondary shrink-0" size={20} /> Independent ground reports by verified civic tech partners</li>
          </ul>
        </section>
        
        <section className="clay-card rounded-2xl p-8 md:p-10 border border-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-container/10 rounded-bl-[100px] pointer-events-none -mt-10 -mr-10"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="clay-recessed p-3 rounded-xl bg-surface text-tertiary">
              <CircleDot size={28} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-on-surface">3. Status Definitions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="clay-recessed bg-surface p-5 rounded-xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                 <span className="w-3 h-3 rounded-full bg-secondary"></span>
                 <h3 className="font-bold text-on-surface">Fulfilled</h3>
              </div>
              <p className="text-sm font-medium text-on-surface-variant">The promise has been delivered in its entirety as stated in the original document, backed by concrete evidence.</p>
            </div>
             <div className="clay-recessed bg-surface p-5 rounded-xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                 <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                 <h3 className="font-bold text-on-surface">In Progress</h3>
              </div>
              <p className="text-sm font-medium text-on-surface-variant">Budget is allocated, and tangible, verifiable on-ground work or implementation has officially commenced.</p>
            </div>
             <div className="clay-recessed bg-surface p-5 rounded-xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                 <span className="w-3 h-3 rounded-full bg-error"></span>
                 <h3 className="font-bold text-on-surface">Delayed / Broken</h3>
              </div>
              <p className="text-sm font-medium text-on-surface-variant">The timeline has lapsed without fulfillment, or policy changes indicate the promise has been abandoned.</p>
            </div>
             <div className="clay-recessed bg-surface p-5 rounded-xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                 <span className="w-3 h-3 rounded-full bg-outline"></span>
                 <h3 className="font-bold text-on-surface">Review Pending</h3>
              </div>
              <p className="text-sm font-medium text-on-surface-variant">Claims of completion exist, but independent verification data is currently insufficient or conflicting.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
