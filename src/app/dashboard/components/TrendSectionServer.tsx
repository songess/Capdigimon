import TrendSection from './TrendSection';
import { fetchCategories, fetchTrends } from '@/app/api/newsApi';
import { fetchSubCategoryTrends } from '@/app/api/subCategoryTrends';

export default async function TrendSectionServer() {
  const categories = await fetchCategories();
  const trends = await fetchTrends();
  const subCategoryTrends = await fetchSubCategoryTrends();

  return <TrendSection trends={trends} subCategoryTrends={subCategoryTrends} categories={categories} />;
}
