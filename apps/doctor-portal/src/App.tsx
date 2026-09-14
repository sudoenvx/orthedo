import { useState } from 'react';
import { Button } from '@orthedo/ui';
import { formatDate, getInitials } from '@orthedo/utils';
import {
  Stethoscope,
  Users,
  Calendar,
  Clock,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Eye,
  Smile
} from 'lucide-react';

interface PatientCase {
  id: string;
  patientName: string;
  age: number;
  treatmentType: string;
  stage: string;
  status: 'active' | 'review_required' | 'ready_for_pickup' | 'completed';
  lastVisit: string;
  assignedLab: string;
}

const DUMMY_CASES: PatientCase[] = [
  {
    id: 'CAS-1042',
    patientName: 'Emma Watson',
    age: 24,
    treatmentType: 'Clear Aligners (Step 12/24)',
    stage: 'Upper & Lower Refinement',
    status: 'review_required',
    lastVisit: '2026-09-10',
    assignedLab: 'Apex Precision Dental Lab',
  },
  {
    id: 'CAS-1043',
    patientName: 'Liam Johnson',
    age: 31,
    treatmentType: 'Retainer Fabrication',
    stage: 'Post-Treatment Retention',
    status: 'ready_for_pickup',
    lastVisit: '2026-09-12',
    assignedLab: 'SmileCraft Dental Studio',
  },
  {
    id: 'CAS-1044',
    patientName: 'Sophia Rodriguez',
    age: 19,
    treatmentType: 'Clear Aligners (Step 4/18)',
    stage: 'Initial Expansion',
    status: 'active',
    lastVisit: '2026-09-08',
    assignedLab: 'Apex Precision Dental Lab',
  },
  {
    id: 'CAS-1045',
    patientName: 'Oliver Smith',
    age: 28,
    treatmentType: 'Night Guard / Splint',
    stage: 'Final Inspection',
    status: 'completed',
    lastVisit: '2026-09-05',
    assignedLab: 'BioAlign Solutions',
  },
];

export default function DoctorPortalApp() {
  const [filter, setFilter] = useState<'all' | 'review' | 'active'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = DUMMY_CASES.filter((c) => {
    if (filter === 'review' && c.status !== 'review_required') return false;
    if (filter === 'active' && c.status !== 'active') return false;
    if (searchQuery && !c.patientName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-8 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight">Dr. Sarah Mitchell, DDS</h1>
                <span className="px-2 py-0.5 text-[0.6875rem] font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  Orthodontics
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Doctor Case Management Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-1.5" />
              Schedule ({formatDate(new Date(), { month: 'short', day: 'numeric' })})
            </Button>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              New Patient Case
            </Button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-6">
        {/* Quick metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-medium">Active Treatment Cases</span>
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">48</div>
            <div className="text-xs text-muted-foreground mt-1">3 scheduled today</div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-medium">Requires Doctor Review</span>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">4</div>
            <div className="text-xs text-muted-foreground mt-1">3D treatment setups ready</div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-medium">Aligners in Production</span>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground mt-1">At partner dental labs</div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-medium">Ready for Delivery</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">6</div>
            <div className="text-xs text-muted-foreground mt-1">Batches at clinic</div>
          </div>
        </div>

        {/* Patient Table Card */}
        <div className="rounded-xl bg-card border border-border shadow-xs overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Smile className="h-5 w-5 text-primary" />
                Patient Treatment Queue
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Track orthodontic stage, review dental scans, and communicate with labs
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search patient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-48"
                />
              </div>

              <div className="flex bg-muted/60 p-1 rounded-lg text-xs">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    filter === 'all' ? 'bg-card text-foreground font-medium shadow-xs' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All ({DUMMY_CASES.length})
                </button>
                <button
                  onClick={() => setFilter('review')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    filter === 'review' ? 'bg-card text-foreground font-medium shadow-xs' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Needs Review (1)
                </button>
              </div>
            </div>
          </div>

          {/* Cases List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-3.5 px-6 font-medium">Patient</th>
                  <th className="py-3.5 px-6 font-medium">Treatment & Stage</th>
                  <th className="py-3.5 px-6 font-medium">Status</th>
                  <th className="py-3.5 px-6 font-medium">Assigned Lab</th>
                  <th className="py-3.5 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCases.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center">
                          {getInitials(item.patientName)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{item.patientName}</div>
                          <div className="text-xs text-muted-foreground">{item.id} • {item.age} yrs</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-medium text-foreground text-xs">{item.treatmentType}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.stage}</div>
                    </td>

                    <td className="py-4 px-6">
                      {item.status === 'review_required' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <AlertCircle className="h-3 w-3" />
                          Review 3D Plan
                        </span>
                      )}
                      {item.status === 'active' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          <Clock className="h-3 w-3" />
                          In Progress
                        </span>
                      )}
                      {item.status === 'ready_for_pickup' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          Ready for Delivery
                        </span>
                      )}
                      {item.status === 'completed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-xs text-muted-foreground">
                      {item.assignedLab}
                    </td>

                    <td className="py-4 px-6 text-right">
                      {item.status === 'review_required' ? (
                        <Button variant="default" size="sm">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Approve Plan
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          View Case
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
