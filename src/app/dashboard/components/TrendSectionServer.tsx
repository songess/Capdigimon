import TrendSection from './TrendSection';
import { fetchCategories, fetchTrends } from '@/app/api/newsApi';

export default async function TrendSectionServer() {
  const categories = await fetchCategories();
  const trends = await fetchTrends();

  return <TrendSection trends={trends} categories={categories} />;
}
