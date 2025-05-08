import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import type { Job } from '@/types/job'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Destructure and await params
  const { id } = await params
  const docRef = doc(db, 'jobs', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    // Return a 404 JSON response
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    )
  }

  const data = docSnap.data() as Job
  return NextResponse.json({ id: docSnap.id, ...data })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const updates = await request.json()
  const docRef = doc(db, 'jobs', id)

  // Check existence first
  const existing = await getDoc(docRef)
  if (!existing.exists()) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    )
  }

  await updateDoc(docRef, updates)
  return NextResponse.json({ success: true })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const docRef = doc(db, 'jobs', id)

  // Check existence first
  const existing = await getDoc(docRef)
  if (!existing.exists()) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    )
  }

  await deleteDoc(docRef)
  return NextResponse.json({ success: true })
}
