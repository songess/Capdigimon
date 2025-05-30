import { fetchAllNews, fetchAllPapers, fetchKeywordSearch } from '@/app/api/newsApi';
import EntityCard from '@/components/EntityCard';

interface Props {
  id: string;
  type: string;
}

export default async function EntityCardSectionServer({ id, type }: Props) {
  let contents = '';

  if (type === 'news') {
    const newsData = await fetchAllNews();
    const selectedNews = newsData.find((news) => news.newspaper.id === Number(id));
    if (selectedNews) {
      contents = selectedNews.newspaper.contents;
    }
  } else {
    const papersData = await fetchAllPapers();
    const selectedPaper = papersData.find((paper) => paper.newspaper.id === Number(id));
    if (selectedPaper) {
      contents = selectedPaper.newspaper.contents;
    }
  }

  if (!contents) {
    return null;
  }

  const keywordData = await fetchKeywordSearch(contents);
  return <EntityCard keyword={keywordData.keyword} contexts={keywordData.contexts} />;
}
