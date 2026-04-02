// v0.2.8 - force clean build
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/login');
}