import { Flame, Clock, Target } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StatTiles from '../../components/shared/StatTiles';
import { currentSubscriber, learningStats, weeklyLearningHours } from '../../data/mockData';
import { ACCENT_HEX } from '../../config/accent';

function HoursTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 shadow-sm">
      <div className="font-display text-sm font-semibold text-ink">{payload[0].value}h</div>
      <div className="text-xs text-ink-faint">{label}</div>
    </div>
  );
}

export default function ProgressDashboard() {
  const tiles = [
    { label: 'Current streak', value: `${learningStats.streakDays} days`, icon: Flame, accent: 'brand' },
    { label: 'Hours learned', value: `${currentSubscriber.hoursLearned}h`, icon: Clock, accent: 'brand' },
    { label: 'Avg quiz score', value: `${learningStats.avgQuizScore}%`, icon: Target, accent: 'brand' },
  ];

  return (
    <div className="space-y-6">
      <StatTiles tiles={tiles} columns={3} />

      <div className="rounded-2xl border border-line bg-white/70 p-5">
        <div className="mb-1 flex items-baseline justify-between">
          <h3 className="font-display text-base font-semibold text-ink">Weekly learning hours</h3>
          <span className="text-xs text-ink-faint">Last 6 weeks</span>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyLearningHours} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#e7dcc3" strokeDasharray="0" vertical={false} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#837c6c', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#837c6c', fontSize: 12 }} width={28} />
              <Tooltip content={<HoursTooltip />} cursor={{ stroke: '#ddd2b8', strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="hours"
                stroke={ACCENT_HEX.brand}
                strokeWidth={2}
                fill={ACCENT_HEX.brand}
                fillOpacity={0.1}
                dot={(dotProps) => {
                  const { cx, cy, index } = dotProps;
                  if (index !== weeklyLearningHours.length - 1) return null;
                  return (
                    <circle key="end-dot" cx={cx} cy={cy} r={5} fill={ACCENT_HEX.brand} stroke="#f6f1e7" strokeWidth={2} />
                  );
                }}
                activeDot={{ r: 5, fill: ACCENT_HEX.brand, stroke: '#f6f1e7', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
