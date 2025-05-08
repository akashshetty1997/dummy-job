import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import type { Job } from '@/types/job'

/**
 * Handler for GET, PUT, DELETE on /api/jobs/:id
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const docRef = doc(db, 'jobs', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }
    
    const data = docSnap.data() as Job
    return NextResponse.json({ id: docSnap.id, ...data })
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updates = await request.json()
    const docRef = doc(db, 'jobs', id)
    
    const existing = await getDoc(docRef)
    if (!existing.exists()) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }
    
    await updateDoc(docRef, updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating job:', error)
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const docRef = doc(db, 'jobs', id)
    
    const existing = await getDoc(docRef)
    if (!existing.exists()) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }
    
    await deleteDoc(docRef)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    )
  }
}