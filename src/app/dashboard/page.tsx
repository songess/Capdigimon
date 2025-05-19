import { cookies } from 'next/headers';
import DashboardClient from './DashboardClient';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access_token')?.value;

  return <DashboardClient access_token={access_token} />;
}
