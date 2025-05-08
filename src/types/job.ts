export interface Job {
  id?: string;          // optional on creation
  title: string;
  company: string;
  location: string;
  description: string;
  postedAt: string;     // ISO date string
}
