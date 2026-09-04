export default function DataTable({ columns = [], rows = [], keyField = 'id', emptyMessage = 'No data yet.' }) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-line bg-white/70 px-6 py-12 text-center text-sm text-ink-faint">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white/70">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-alt/60">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`whitespace-nowrap px-5 py-3 font-medium text-ink-soft ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[keyField]} className="border-b border-line/70 last:border-0 hover:bg-paper-alt/40">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-5 py-3.5 text-ink ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
