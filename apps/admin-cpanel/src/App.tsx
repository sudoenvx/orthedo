import { useState } from 'react';

import { formatCurrency, formatNumber, formatDate } from '@orthedo/utils';
import {
  ShieldCheck,
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@orthedo/ui/components';

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Doctors', value: formatNumber(1420), change: '+12.5%', icon: Users, isPositive: true },
    { title: 'Active Labs', value: formatNumber(38), change: '+4.2%', icon: Layers, isPositive: true },
    { title: 'Revenue (MTD)', value: formatCurrency(184200), change: '+18.3%', icon: DollarSign, isPositive: true },
    { title: 'System Health', value: '99.98%', change: 'Optimal', icon: Activity, isPositive: true },
  ];

  const recentActivities = [
    { id: 'ACT-001', user: 'Dr. Sarah Mitchell', role: 'Orthodontist', action: 'Approved aligner batch #9821', time: formatDate(new Date(), { hour: 'numeric', minute: 'numeric' }) },
    { id: 'ACT-002', user: 'Apex Dental Lab', role: 'Lab Partner', action: 'Uploaded 3D scan model STL-4412', time: formatDate(new Date(), { hour: 'numeric', minute: 'numeric' }) },
    { id: 'ACT-003', user: 'Dr. James Chen', role: 'Orthodontist', action: 'Submitted new patient case #3319', time: formatDate(new Date(), { hour: 'numeric', minute: 'numeric' }) },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border p-6 flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight">Orthedo</h1>
              <p className="text-xs text-muted-foreground font-medium">Admin Control Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'doctors', label: 'Doctor Accounts', icon: Users },
              { id: 'labs', label: 'Dental Labs', icon: Layers },
              { id: 'database', label: 'Database & Logs', icon: Database },
              { id: 'settings', label: 'System Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold">Production Ready</span>
          </div>
          <p className="text-xs text-muted-foreground">Monorepo modules & theme synced across all apps.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="default">Open</Button>} />
          <DropdownMenuContent className="w-52" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Top Header */}
        <header className="h-16 border-b border-border px-8 flex items-center justify-between bg-card/60 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search doctors, labs, cases, logs..."
                className="w-full pl-9 pr-4 py-1.5 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-1.5" />
              Notifications
            </Button>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              New Organization
            </Button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 space-y-8 max-w-7xl">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">System Overview</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Global administration metrics, provider statistics, and platform status.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.title} className="p-6 rounded-xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-muted-foreground">{stat.title}</span>
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span>{stat.change}</span>
                    <span className="text-muted-foreground font-normal">vs last month</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Activity Section */}
          <div className="rounded-xl bg-card border border-border overflow-hidden shadow-xs">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base">Recent Platform Activity</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Live audit trail across Doctor Portal and Lab CPanel</p>
              </div>
              <Button variant="outline" size="sm">Export Audit Log</Button>
            </div>
            <div className="divide-y divide-border">
              {recentActivities.map((act) => (
                <div key={act.id} className="p-4 px-6 flex items-center justify-between text-sm hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-semibold text-xs text-secondary-foreground">
                      {act.user.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{act.user} <span className="text-xs text-muted-foreground">({act.role})</span></div>
                      <div className="text-xs text-muted-foreground">{act.action}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{act.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
