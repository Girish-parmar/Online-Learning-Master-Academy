import { DollarSign, Wallet, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StatTiles from '../../components/shared/StatTiles';
import { earningsSummary, earningsByCourse } from '../../data/mockData';
import { ACCENT_HEX } from '../../config/accent';

function formatCompactCurrency(value) {
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${value}`;
}

function EarningsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 shadow-sm">
      <div className="font-display text-sm font-semibold text-ink">${payload[0].value.toLocaleString()}</div>
      <div className="text-xs text-ink-faint">{label}</div>
    </div>
  );
}

const TILES = [
  { label: 'Gross earnings', key: 'gross', icon: DollarSign },
  { label: 'Net earnings', key: 'net', icon: Wallet },
  { label: 'This month', key: 'thisMonth', icon: TrendingUp },
];

export default function EarningsDashboard() {
  const tiles = TILES.map(({ label, key, icon }) => ({
    label,
    icon,
    accent: 'brand',
    value: `$${earningsSummary[key].toLocaleString()}`,
  }));

  return (
    <div className="space-y-6">
      <StatTiles tiles={tiles} columns={3} />

      <div className="rounded-2xl border border-line bg-white/70 p-5">
        <div className="mb-1 flex items-baseline justify-between">
          <h3 className="font-display text-base font-semibold text-ink">Earnings by course</h3>
          <span className="text-xs text-ink-faint">All-time gross</span>
        </div>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsByCourse} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#e7dcc3" strokeDasharray="0" vertical={false} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#837c6c', fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCompactCurrency}
                tick={{ fill: '#837c6c', fontSize: 12 }}
                width={44}
              />
              <Tooltip content={<EarningsTooltip />} cursor={{ fill: '#efe7d5' }} />
              <Bar dataKey="gross" fill={ACCENT_HEX.brand} radius={[4, 4, 0, 0]} maxBarSize={40}>
                <LabelList
                  dataKey="gross"
                  position="top"
                  formatter={formatCompactCurrency}
                  style={{ fill: '#211e18', fontSize: 12, fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
