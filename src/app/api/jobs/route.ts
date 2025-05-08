import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import type { Job } from '@/types/job';

interface FirestoreJobData extends Omit<Job, 'postedAt'> {
  postedAt?: Timestamp | string;
}

export async function GET() {
  try {
    const snap = await getDocs(collection(db, 'jobs'));
    const jobs: Job[] = snap.docs.map(doc => {
      const data = doc.data() as FirestoreJobData;
      
      let postedAtString = '';
      if (data.postedAt instanceof Timestamp) {
        postedAtString = data.postedAt.toDate().toISOString();
      } else if (typeof data.postedAt === 'string') {
        postedAtString = data.postedAt;
      }

      return {
        id: doc.id,
        title: data.title,
        company: data.company,
        location: data.location,
        description: data.description,
        postedAt: postedAtString
      };
    });
    
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