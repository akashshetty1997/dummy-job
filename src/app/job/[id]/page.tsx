'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Job } from '@/types/job'

export default function JobPage() {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/jobs/${id}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then((data: Job) => setJob(data))
      .catch(err => console.error('Failed to load job:', err))
  }, [id])

  if (!job) return <p className="p-6">Loading job details…</p>

  return (
    <main className="p-6 prose max-w-none">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">
        {job.company} — {job.location}
      </p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {job.description}
      </ReactMarkdown>
    </main>
  )
}
