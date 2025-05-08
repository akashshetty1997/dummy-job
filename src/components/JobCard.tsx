import Link from 'next/link';
import type { Job } from '@/types/job';

interface Props { job: Job }

export default function JobCard({ job }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company} — {job.location}</p>
      {/* Remove the nested <a>—Link now renders its own anchor */}
      <Link
        href={`/job/${job.id}`}
        className="mt-2 inline-block text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
