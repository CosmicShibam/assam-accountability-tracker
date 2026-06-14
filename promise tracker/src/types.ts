export interface PromiseRecord {
  id: string;
  title: string;
  category: string;
  promiseText: string;
  status: string;
  sourceTitle?: string;
  sourceDate?: string;
  sourceRef?: string;
  sourceUrl?: string;
  trackMetric: string;
  verificationRule: string;
  lastVerifiedAt: string;
}

export type PromiseStatus = 'fulfilled' | 'in_progress' | 'pending' | 'delayed';

export function getNormalizedStatus(rawStatus: string): PromiseStatus {
  const s = rawStatus?.toLowerCase() || '';
  if (['passed', 'fulfilled', 'completed'].includes(s)) return 'fulfilled';
  if (['in_progress', 'launched', 'in progress'].includes(s)) return 'in_progress';
  if (['announced', 'target', 'pending', 'review pending'].includes(s)) return 'pending';
  if (['delayed', 'broken'].includes(s)) return 'delayed';
  return 'pending'; // fallback
}

export function getStatusStyles(rawStatus: string) {
  const status = getNormalizedStatus(rawStatus);
  switch (status) {
    case 'fulfilled':
      return { label: 'Fulfilled', color: 'text-secondary', bgColor: 'bg-secondary', badge: 'text-secondary bg-secondary-container/30 border-secondary/20' };
    case 'in_progress':
      return { label: 'In Progress', color: 'text-tertiary', bgColor: 'bg-tertiary', badge: 'text-tertiary bg-tertiary-container/30 border-tertiary/20' };
    case 'delayed':
      return { label: 'Delayed', color: 'text-error', bgColor: 'bg-error', badge: 'text-error bg-error-container/30 border-error/20' };
    case 'pending':
    default:
      return { label: 'Pending Review', color: 'text-outline', bgColor: 'bg-outline', badge: 'text-outline bg-outline/20 border-outline/20' };
  }
}
