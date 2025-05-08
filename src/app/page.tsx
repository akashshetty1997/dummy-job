'use client'

import { useEffect, useState } from 'react'
import JobList from '@/components/JobList'
import Pagination from '@/components/Pagination'
import type { Job } from '@/types/job'

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => (res.ok ? res.json() : []))
      .then((data: Job[]) => setJobs(data))
      .catch(console.error)
  }, [])

  const totalPages = Math.ceil(jobs.length / itemsPerPage)
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Job Openings</h1>
      <JobList jobs={paginatedJobs} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  )
}
