import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Job } from '@/types/job';

export async function GET() {
  try {
    const snap = await getDocs(collection(db, 'jobs'));
    const jobs: Job[] = snap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Job),
      // ensure postedAt is a string
      postedAt: (doc.data() as any).postedAt?.toDate
        ? (doc.data() as any).postedAt.toDate().toISOString()
        : (doc.data() as any).postedAt || ''
    }));
    return NextResponse.json(jobs);
  } catch (err) {
    console.error('🔥 GET /api/jobs error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const job = (await request.json()) as Omit<Job, 'id' | 'postedAt'>;
    const docRef = await addDoc(collection(db, 'jobs'), {
      ...job,
      postedAt: serverTimestamp(),
    });
    return NextResponse.json({
      id: docRef.id,
      ...job,
      postedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('🔥 POST /api/jobs error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
