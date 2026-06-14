import { ArrowLeft, RefreshCw, FileText, ExternalLink, Image as ImageIcon, ShieldCheck, CheckCircle, Activity, Link as LinkIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { usePromises } from "../context/PromiseContext";
import { getStatusStyles } from "../types";

export default function PromiseDetail() {
  const { id } = useParams();
  const { promises } = usePromises();

  const promise = promises.find(p => p.id === id);

  if (!promise) {
    return (
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center gap-2 mb-8 text-on-surface-variant">
          <ArrowLeft size={20} />
          <Link to="/promises" className="text-sm font-semibold cursor-pointer hover:text-primary transition-colors">Back to All Promises</Link>
        </div>
        <h1 className="font-heading text-2xl font-bold text-error">Promise Not Found</h1>
      </div>
    );
  }

  const styles = getStatusStyles(promise.status);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center gap-2 mb-8 text-on-surface-variant">
        <ArrowLeft size={20} />
        <Link to="/promises" className="text-sm font-semibold cursor-pointer hover:text-primary transition-colors">Back to All Promises</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-1 md:col-span-8 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-tertiary-fixed-dim/30">
                {promise.category}
              </span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 border ${styles.badge}`}>
                <span className={`w-2 h-2 rounded-full ${styles.bgColor}`}></span>
                {styles.label}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-on-surface mt-2 mb-4 leading-tight">
              {promise.title}
            </h1>
          </div>

          <div className="clay-card bg-surface rounded-xl p-8 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 ${styles.bgColor} opacity-20 rounded-bl-full -mr-16 -mt-16 pointer-events-none`}></div>
            <h2 className="font-heading text-xl font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="text-4xl leading-none -mt-4 text-primary/30 font-serif">"</span>
              Original Promise Text
            </h2>
            <p className="text-lg text-on-surface-variant relative z-10 font-medium">
              "{promise.promiseText}"
            </p>
            <div className="mt-6 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-on-surface-variant text-xs font-semibold">
              <span>Added to Tracker: {promise.lastVerifiedAt}</span>
              <span>Source: {promise.sourceTitle || 'Official'}</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <h3 className="font-heading text-2xl font-bold text-on-surface mb-2">Verification Methodology & Goals</h3>
            <div className="relative pl-6 border-l-4 border-surface-variant ml-4 space-y-8">
              
              <div className="relative">
                <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-surface clay-card border-2 border-primary z-10"></div>
                <div className="clay-card bg-surface rounded-lg p-6 border border-white">
                  <h4 className="font-heading text-xl font-medium text-on-surface mb-2 flex items-center gap-2">
                    <Activity size={20} className="text-primary" /> Track Metric
                  </h4>
                  <p className="text-sm text-on-surface-variant">{promise.trackMetric || 'Metric not specified.'}</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-surface clay-card border-2 border-tertiary z-10"></div>
                <div className="clay-card bg-surface rounded-lg p-6 border border-white">
                  <h4 className="font-heading text-xl font-medium text-on-surface mb-2 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-tertiary" /> Verification Rule
                  </h4>
                  <p className="text-sm text-on-surface-variant">{promise.verificationRule || 'Standard verification guidelines apply.'}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
          <div className="clay-card bg-surface rounded-xl p-8 flex flex-col items-center text-center border border-white">
            <h3 className="font-heading text-2xl font-bold text-on-surface mb-6 w-full text-left">Current Status</h3>
            
            <div className="relative w-48 h-48 rounded-full clay-recessed flex items-center justify-center mb-6">
              <div className="absolute inset-2 rounded-full border-[16px] border-surface-variant"></div>
              {styles.label === 'Fulfilled' && (
                 <div className={`absolute inset-2 rounded-full border-[16px] border-${styles.color.replace('text-', '')}`}></div>
              )}
               {styles.label === 'In Progress' && (
                 <div className={`absolute inset-2 rounded-full border-[16px] border-transparent border-t-${styles.color.replace('text-', '')} border-r-${styles.color.replace('text-', '')} border-b-${styles.color.replace('text-', '')} transform rotate-45`}></div>
              )}
               {styles.label === 'Pending Review' && (
                 <div className={`absolute inset-2 rounded-full border-[16px] border-transparent border-t-${styles.color.replace('text-', '')} transform rotate-45`}></div>
              )}
              
              <div className="absolute inset-8 rounded-full bg-surface clay-card flex flex-col items-center justify-center border border-white">
                {styles.label === 'Fulfilled' ? (
                  <CheckCircle size={48} className={styles.color} />
                ) : styles.label === 'In Progress' ? (
                  <RefreshCw size={40} className={styles.color} />
                ) : (
                  <span className={`font-heading text-sm font-bold ${styles.color} text-center px-2`}>{styles.label}</span>
                )}
              </div>
            </div>
          </div>

          <div className="clay-card bg-surface rounded-xl p-6 border border-white">
            <h3 className="font-heading text-2xl font-bold text-on-surface mb-4">Supporting Evidence</h3>
            <div className="flex flex-col gap-3">
              {(promise.sourceRef || promise.sourceUrl) ? (
                <div className="group clay-recessed bg-surface-container-low rounded-lg p-3 flex items-center gap-4 hover:bg-surface-container transition-colors">
                  <div className="bg-primary-container text-on-primary-container p-2 rounded-md shadow-sm">
                    {promise.sourceUrl ? (
                      <a href={promise.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <LinkIcon size={20} />
                      </a>
                    ) : (
                      <LinkIcon size={20} />
                    )}
                  </div>
                  <div className="flex-grow">
                    <span className="block text-sm font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {promise.sourceUrl ? (
                        <a href={promise.sourceUrl} target="_blank" rel="noopener noreferrer">
                          {promise.sourceTitle || 'Official Source'}
                        </a>
                      ) : (
                        promise.sourceTitle || 'Official Source'
                      )}
                    </span>
                    <span className="block text-xs font-medium text-on-surface-variant">Ref: {promise.sourceRef || 'Web'} • {promise.sourceDate}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-outline p-4 text-center">No additional documents linked yet.</div>
              )}
            </div>
          </div>

          <div className="clay-recessed bg-surface-container-high rounded-xl p-6 border-t-4 border-t-tertiary">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-tertiary" size={24} />
              <h3 className="font-heading text-xl font-semibold text-on-surface">Verification Log</h3>
            </div>
            <p className="text-sm font-medium text-on-surface-variant mb-4">
              Status and details verified according to strict methodology guidelines.
            </p>
            <div className="flex justify-between items-center text-xs font-semibold text-outline">
              <span>Last Verified: {promise.lastVerifiedAt || 'Recently'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
