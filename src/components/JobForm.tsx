// File: src/components/JobForm.tsx
'use client'

import { useState, FormEvent, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Job } from '@/types/job'

interface JobFormProps {
  initialData?: Job
  onSubmit: (
    data: Omit<Job, 'id' | 'postedAt'> | Partial<Job>,
    isEdit: boolean
  ) => void
  onCancel: () => void
}

export default function JobForm({
  initialData,
  onSubmit,
  onCancel
}: JobFormProps) {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setCompany(initialData.company)
      setLocation(initialData.location)
      setDescription(initialData.description)
    } else {
      setTitle('')
      setCompany('')
      setLocation('')
      setDescription('')
    }
  }, [initialData])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit(
      initialData
        ? { id: initialData.id, title, company, location, description }
        : { title, company, location, description },
      Boolean(initialData)
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? 'Edit Job' : 'Add New Job'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form fields */}
          <div className="space-y-4">
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="company"
              type="text"
              placeholder="Company"
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="location"
              type="text"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description (Markdown supported)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border p-2 rounded h-40"
              required
            />
          </div>

          {/* Preview panel */}
          <div className="prose overflow-auto max-h-[60vh] p-4 border rounded bg-gray-50">
            <h3 className="font-medium mb-2">Preview</h3>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description}
            </ReactMarkdown>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {initialData ? 'Save Changes' : 'Add Job'}
          </button>
        </div>
      </form>
    </div>
  )
}
