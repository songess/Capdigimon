import { fetchAllNews, fetchAllPapers } from '@/app/api/newsApi';
import NewsDetailSection from './NewsDetailSection';

interface Props {
  id: string;
  type: string;
}

export default async function NewsDetailSectionServer({ id, type }: Props) {
  let item = null;

  if (type === 'news') {
    const newsData = await fetchAllNews();
    const selectedNews = newsData.find((news) => news.newspaper.id === Number(id));
    if (selectedNews) {
      item = selectedNews.newspaper;
    }
  } else {
    const papersData = await fetchAllPapers();
    const selectedPaper = papersData.find((paper) => paper.newspaper.id === Number(id));
    if (selectedPaper) {
      item = selectedPaper.newspaper;
    }
  }

  if (!item) {
    return null;
  }

  return <NewsDetailSection item={item} />;
}
