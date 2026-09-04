import { useState } from 'react';
import { Activity, Users, DollarSign, UserMinus, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StatTiles from '../../components/shared/StatTiles';
import StatusPill from '../../components/shared/StatusPill';
import { platformMetrics, gmvTrend, notifications } from '../../data/mockData';
import { ACCENT_HEX } from '../../config/accent';
import { getStatusClasses } from '../../config/status';

const NOTIFICATION_META = {
  info: { tone: 'info', icon: Info },
  success: { tone: 'positive', icon: CheckCircle2 },
  warning: { tone: 'warning', icon: AlertTriangle },
  alert: { tone: 'negative', icon: AlertCircle },
};

const TILES = [
  { key: 'uptime', icon: Activity },
  { key: 'activeUsers', icon: Users },
  { key: 'gmvThisMonth', icon: DollarSign },
  { key: 'churnRate', icon: UserMinus },
];

function formatCompactCurrency(value) {
  return `$${Math.round(value / 1000)}K`;
}

function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 shadow-sm">
      <div className="font-display text-sm font-semibold text-ink">{formatCompactCurrency(payload[0].value)}</div>
      <div className="text-xs text-ink-faint">{label}</div>
    </div>
  );
}

export default function GlobalSummary() {
  const [alertStatus, setAlertStatus] = useState({});

  const tiles = TILES.map(({ key, icon }) => ({
    ...platformMetrics[key],
    icon,
    accent: 'brand',
  }));

  function handleAlertAction(id, action) {
    setAlertStatus((prev) => ({ ...prev, [id]: action }));
  }

  return (
    <div className="space-y-6">
      <StatTiles tiles={tiles} columns={4} />

      <div className="rounded-2xl border border-line bg-white/70 p-5">
        <div className="mb-1 flex items-baseline justify-between">
          <h3 className="font-display text-base font-semibold text-ink">GMV trend</h3>
          <span className="text-xs text-ink-faint">Last 6 months</span>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gmvTrend} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#e7dcc3" strokeDasharray="0" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#837c6c', fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCompactCurrency}
                tick={{ fill: '#837c6c', fontSize: 12 }}
                width={44}
              />
              <Tooltip content={<TrendTooltip />} cursor={{ stroke: '#ddd2b8', strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="gmv"
                stroke={ACCENT_HEX.brand}
                strokeWidth={2}
                fill={ACCENT_HEX.brand}
                fillOpacity={0.1}
                dot={(dotProps) => {
                  const { cx, cy, index } = dotProps;
                  if (index !== gmvTrend.length - 1) return null;
                  return <circle key="end-dot" cx={cx} cy={cy} r={5} fill={ACCENT_HEX.brand} stroke="#f6f1e7" strokeWidth={2} />;
                }}
                activeDot={{ r: 5, fill: ACCENT_HEX.brand, stroke: '#f6f1e7', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/70 p-5">
        <h3 className="mb-1 font-display text-base font-semibold text-ink">Alerts</h3>
        <ul className="divide-y divide-line/70">
          {notifications.map((item) => {
            const meta = NOTIFICATION_META[item.type] ?? NOTIFICATION_META.info;
            const Icon = meta.icon;
            const toneClasses = getStatusClasses(meta.tone);
            const status = alertStatus[item.id];

            return (
              <li key={item.id} className="flex items-start gap-3 py-3.5 first:pt-3 last:pb-0">
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${toneClasses.softBg}`}>
                  <Icon className={`h-4 w-4 ${toneClasses.text}`} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink">{item.message}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">{item.time}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {status ? (
                    <StatusPill
                      label={status === 'acknowledged' ? 'Acknowledged' : 'Escalated'}
                      tone={status === 'acknowledged' ? 'positive' : 'negative'}
                    />
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAlertAction(item.id, 'acknowledged')}
                        className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition hover:bg-paper-alt/60"
                      >
                        Acknowledge
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAlertAction(item.id, 'escalated')}
                        className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition hover:bg-paper-alt/60"
                      >
                        Escalate
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
