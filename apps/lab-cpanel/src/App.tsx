import { useState } from 'react';
import { Button } from '@orthedo/ui';
import {
  Boxes,
  Printer,
  CheckCircle,
  AlertTriangle,
  Clock,
  Layers,
  Sparkles,
  UploadCloud,
  Search
} from 'lucide-react';

interface BatchJob {
  batchId: string;
  orderCount: number;
  doctorName: string;
  clinic: string;
  type: 'Aligners' | 'Retainers' | 'Splints';
  step: '3D_PRINTING' | 'THERMOFORMING' | 'LASER_TRIMMING' | 'QA_INSPECTION' | 'PACKAGING';
  priority: 'urgent' | 'normal' | 'low';
  estCompletion: string;
}

const DUMMY_BATCHES: BatchJob[] = [
  {
    batchId: 'BATCH-8821',
    orderCount: 12,
    doctorName: 'Dr. Sarah Mitchell',
    clinic: 'Mitchell Orthodontics',
    type: 'Aligners',
    step: '3D_PRINTING',
    priority: 'urgent',
    estCompletion: 'Today, 4:30 PM',
  },
  {
    batchId: 'BATCH-8822',
    orderCount: 6,
    doctorName: 'Dr. James Chen',
    clinic: 'Chen Dental Care',
    type: 'Retainers',
    step: 'THERMOFORMING',
    priority: 'normal',
    estCompletion: 'Tomorrow, 10:00 AM',
  },
  {
    batchId: 'BATCH-8823',
    orderCount: 24,
    doctorName: 'Dr. Lisa Ray',
    clinic: 'Metro Smile Center',
    type: 'Aligners',
    step: 'QA_INSPECTION',
    priority: 'urgent',
    estCompletion: 'Today, 6:00 PM',
  },
  {
    batchId: 'BATCH-8824',
    orderCount: 4,
    doctorName: 'Dr. Marcus Brody',
    clinic: 'Brody Ortho Lab',
    type: 'Splints',
    step: 'PACKAGING',
    priority: 'low',
    estCompletion: 'Tomorrow, 2:00 PM',
  },
];

export default function LabCPanelApp() {
  const [filterStep, setFilterStep] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredBatches = DUMMY_BATCHES.filter((b) => {
    if (filterStep !== 'all' && b.step !== filterStep) return false;
    if (search && !b.batchId.toLowerCase().includes(search.toLowerCase()) && !b.doctorName.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-border bg-card px-8 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight">Apex Precision Dental Lab</h1>
                <span className="px-2 py-0.5 text-[0.6875rem] font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Online • 8 Printers Active
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Dental Fabrication & 3D Manufacturing Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <UploadCloud className="h-4 w-4 mr-1.5" />
              Import STL / OBJ
            </Button>
            <Button variant="default" size="sm">
              <Boxes className="h-4 w-4 mr-1.5" />
              Start Print Run
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-6">
        {/* Production Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-medium">Printers in Operation</span>
              <Printer className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">8 / 10</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">80% capacity utilization</div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-medium">Batches in Queue</span>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">14</div>
            <div className="text-xs text-muted-foreground mt-1">4 urgent priority</div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-medium">Pending QA Pass</span>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">3</div>
            <div className="text-xs text-muted-foreground mt-1">Inspection required</div>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-medium">Completed Today</span>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">46 Units</div>
            <div className="text-xs text-muted-foreground mt-1">Dispatched to clinics</div>
          </div>
        </div>

        {/* Manufacturing Queue */}
        <div className="rounded-xl bg-card border border-border shadow-xs overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Boxes className="h-5 w-5 text-primary" />
                Live Manufacturing & Print Queue
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage 3D printing jobs, thermoforming sequences, and quality verification
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search batch or doctor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-52"
                />
              </div>

              <div className="flex bg-muted/60 p-1 rounded-lg text-xs">
                {['all', '3D_PRINTING', 'QA_INSPECTION'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStep(s)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      filterStep === s ? 'bg-card text-foreground font-medium shadow-xs' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {s === 'all' ? 'All' : s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-3.5 px-6 font-medium">Batch ID & Type</th>
                  <th className="py-3.5 px-6 font-medium">Doctor / Clinic</th>
                  <th className="py-3.5 px-6 font-medium">Current Stage</th>
                  <th className="py-3.5 px-6 font-medium">Priority</th>
                  <th className="py-3.5 px-6 font-medium">Target Completion</th>
                  <th className="py-3.5 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBatches.map((b) => (
                  <tr key={b.batchId} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-foreground font-mono text-xs">{b.batchId}</div>
                      <div className="text-xs text-muted-foreground">{b.type} ({b.orderCount} models)</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-medium text-foreground text-xs">{b.doctorName}</div>
                      <div className="text-xs text-muted-foreground">{b.clinic}</div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        <Sparkles className="h-3 w-3" />
                        {b.step.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      {b.priority === 'urgent' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[0.6875rem] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          URGENT
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[0.6875rem] font-medium bg-muted text-muted-foreground">
                          Standard
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-xs text-muted-foreground font-medium">
                      {b.estCompletion}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Button variant="outline" size="sm">
                        Manage Job
                      </Button>
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
