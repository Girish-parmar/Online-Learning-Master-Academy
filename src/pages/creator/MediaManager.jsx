import DataTable from '../../components/shared/DataTable';
import StatusPill from '../../components/shared/StatusPill';
import { studioCourse, mediaAssets } from '../../data/mockData';

const TRANSCODE_TONE = { Ready: 'positive', Processing: 'info', Failed: 'negative' };
const CAPTION_TONE = { Ready: 'positive', Processing: 'info', Pending: 'neutral' };

const COLUMNS = [
  {
    key: 'fileName',
    label: 'File',
    render: (row) => (
      <div>
        <div className="font-medium text-ink">{row.fileName}</div>
        <div className="text-xs text-ink-faint">Linked to {row.linkedLesson}</div>
      </div>
    ),
  },
  { key: 'sizeMb', label: 'Size', render: (row) => `${row.sizeMb} MB` },
  {
    key: 'transcodeStatus',
    label: 'Transcode',
    render: (row) => <StatusPill label={row.transcodeStatus} tone={TRANSCODE_TONE[row.transcodeStatus]} />,
  },
  {
    key: 'captionStatus',
    label: 'Captions',
    render: (row) => <StatusPill label={row.captionStatus} tone={CAPTION_TONE[row.captionStatus]} />,
  },
  { key: 'uploadedAt', label: 'Uploaded' },
];

export default function MediaManager() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-faint">
        Editing <span className="font-medium text-ink">{studioCourse.title}</span> — {mediaAssets.length} files
        uploaded so far.
      </p>
      <DataTable columns={COLUMNS} rows={mediaAssets} emptyMessage="No media uploaded yet." />
    </div>
  );
}
