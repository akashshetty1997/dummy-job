import type { Job } from '@/types/job'
import JobCard from './JobCard'

interface Props {
  jobs: Job[]
}

export default function JobList({ jobs }: Props) {
  return (
    <div className="space-y-4 p-4">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
