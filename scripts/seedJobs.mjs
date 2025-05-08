// Load environment variables
import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

// Your .env (Firebase) must be loaded via dotenv
const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID
} = process.env;

if (
  !NEXT_PUBLIC_FIREBASE_API_KEY ||
  !NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  !NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  !NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  !NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
  !NEXT_PUBLIC_FIREBASE_APP_ID
) {
  throw new Error('Missing Firebase env vars');
}

const firebaseConfig = {
  apiKey:            NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// Two rich descriptions to alternate
const webDesc = `
## About the job
DataAnnotation is committed to creating quality AI. Join our team to help train AI chatbots while gaining the flexibility of remote work and choosing your own schedule.

We are looking for a proficient **Web Developer** to join our team to train our AI chatbots to code. You will work with the chatbots that we are building in order to measure their progress, as well as write and evaluate code.

To apply to this role, you will need to be proficient in either **Python** and/or **JavaScript**. Your role will require proficiency in at least one programming language/framework (JavaScript, TypeScript, Python, C, C\#, C++, HTML/CSS, React, Go, Java, Kotlin, SQL, or Swift) in order to solve coding problems (think LeetCode, HackerRank, etc). For each coding problem, you must be able to explain how your solution solves the problem.

**Benefits:**
- This is a full‑time or part‑time REMOTE position  
- You’ll be able to choose which projects you want to work on  
- You can work on your own schedule  
- Projects are paid hourly, starting at $40+ USD per hour, with bonuses for high‑quality and high‑volume work

**Responsibilities:**
- Come up with diverse problems and solutions for a coding chatbot  
- Write high‑quality answers and code snippets  
- Evaluate code quality produced by AI models for correctness and performance

**Qualifications:**
- Fluency in English (native or bilingual level)  
- Proficient in either Python and/or JavaScript  
- Excellent writing and grammar skills  
- A bachelor’s degree (completed or in progress)  
- Previous experience as a Software Developer, Coder, Software Engineer, or Programmer

*Note: Payment is made via PayPal. We will never ask for any money from you. PayPal will handle any currency conversions from USD. This job is only available to those in the US, UK, Canada, Australia, or New Zealand.*  
`;

const fullstackDesc = `
## About the job
At Included Health, our mission is to serve members better and more affordable care, and to raise the standard of healthcare for everyone. We fill in the gaps of American healthcare to deliver you a seamless experience, instead of the fragmentation we've all encountered.

Our team, "Engage" delivers products, features, and services that supercharge member app experience and engagement.

### Your Responsibilities
- Design, create and maintain fullstack systems that power our member engagement.  
- Collaborate with Product, Design, Frontend, Mobile and Backend engineers and build solutions to help members engage in healthcare.  
- Lead cross‑functional technical projects and influence the roadmap.  
- Mentor other engineers within the team.

### You Will Have
- Fullstack development experience, from spinning up new services to expressing that data into our frontend user interfaces.  
- Experience designing and building user interfaces using single page application (SPA) frameworks like Vue, React, or Angular.  
- Desire to learn new technologies and remain on the cutting edge.  
- Passion to improve healthcare through the power of technology.  
- Ownership over what gets built, as well as the long term success of those products.  
- 2+ years experience in professional development environment.

**Compensation & Benefits**  
- Remote‑first culture  
- 401(k) savings plan through Fidelity  
- Comprehensive medical, vision, and dental coverage  
- Generous Paid Time Off (“PTO”) and Discretionary Time Off (“DTO”)  
- 12 weeks of 100% Paid Parental leave  

*Included Health is an Equal Opportunity Employer and takes fair chance hiring seriously.*  
`;

// Some example companies and locations
const companies = ['ACME Corp', 'Example Inc', 'TechSolutions', 'InnovateX', 'GlobalSoft'];
const locations = ['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK', 'Berlin, Germany'];

async function seed() {
  for (let i = 1; i <= 50; i++) {
    const isWeb = i % 2 === 0;
    const title = isWeb ? `Web Developer ${i}` : `Full Stack Developer ${i}`;
    const company = companies[i % companies.length];
    const location = locations[i % locations.length];
    const description = isWeb ? webDesc : fullstackDesc;

    const docRef = await addDoc(collection(db, 'jobs'), {
      title,
      company,
      location,
      description,
      postedAt: serverTimestamp(),
    });
    console.log(`Created job ${title} (${docRef.id})`);
  }
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
