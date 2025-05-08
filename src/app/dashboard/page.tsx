'use client'

import { useState, useEffect } from 'react'
import type { Job } from '@/types/job'
import JobForm from '@/components/JobForm'

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Job | undefined>()

  useEffect(() => {
    loadJobs()
  }, [])

  async function loadJobs() {
    const res = await fetch('/api/jobs')
    if (res.ok) setJobs(await res.json())
    else console.error('Load jobs failed', await res.text())
  }

  function handleAddClick() {
    setFormData(undefined)
    setShowForm(true)
  }

  function handleEditClick(job: Job) {
    setFormData(job)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setFormData(undefined)
  }

  async function handleSubmit(data: any, isEdit: boolean) {
    if (isEdit && data.id) {
      const res = await fetch(`/api/jobs/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (res.ok) await loadJobs()
      else console.error('Update failed', await res.text())
    } else {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (res.ok) await loadJobs()
      else console.error('Create failed', await res.text())
    }
    setShowForm(false)
    setFormData(undefined)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this job?')) return
    const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' })
    if (res.ok) setJobs(prev => prev.filter(j => j.id !== id))
    else console.error('Delete failed', await res.text())
  }

  return (
    <main className="p-6 relative">
      <h1 className="text-3xl font-bold mb-4">Dashboard: Manage Jobs</h1>
      <button
        onClick={handleAddClick}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Job
      </button>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="border-t">
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2">{job.company}</td>
              <td className="px-4 py-2">{job.location}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEditClick(job)}
                  className="px-3 py-1 bg-yellow-400 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id!)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form */}
      {showForm && (
        <JobForm
          initialData={formData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </main>
  )
}