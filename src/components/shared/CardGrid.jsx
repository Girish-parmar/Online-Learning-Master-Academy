const COLUMN_CLASSES = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export default function CardGrid({ items, renderItem, columns = 3, children, emptyMessage = 'Nothing to show yet.' }) {
  const colsClass = COLUMN_CLASSES[columns] ?? COLUMN_CLASSES[3];

  if (items) {
    if (!items.length) {
      return (
        <div className="rounded-2xl border border-line bg-white/70 px-6 py-12 text-center text-sm text-ink-faint">
          {emptyMessage}
        </div>
      );
    }

    return (
      <div className={`grid grid-cols-1 gap-4 ${colsClass}`}>
        {items.map((item, index) => (
          <div key={item.id ?? index}>{renderItem(item)}</div>
        ))}
      </div>
    );
  }

  return <div className={`grid grid-cols-1 gap-4 ${colsClass}`}>{children}</div>;
}
