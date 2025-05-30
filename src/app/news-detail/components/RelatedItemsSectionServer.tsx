import { fetchRelatedNews } from '@/app/api/newsApi';
import RelatedItemsSection from './RelatedItemsSection';

interface Props {
  id: string;
  type: string;
}

export default async function RelatedItemsSectionServer({ id, type }: Props) {
  const related = await fetchRelatedNews(Number(id), type);
  const renderRelated = related.results.filter((item) => item.sim_score !== 1).slice(0, 3);
  return <RelatedItemsSection items={renderRelated} type={type} />;
}
