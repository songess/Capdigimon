import NewsPaperSection from './NewsPaperSection';
import { fetchNews, fetchAllNews, fetchPapers, fetchAllPapers } from '@/app/api/newsApi';
import { NewsPaper } from '@/types/type';

interface NewsPaperWithCategory extends NewsPaper {
  category: string[];
}

interface Props {
  access_token?: string;
  search?: string;
}

export default async function NewsPaperSectionServer({ access_token, search }: Props) {
  const newsData = access_token ? await fetchNews(access_token) : await fetchAllNews();
  const papersData = access_token ? await fetchPapers(access_token) : await fetchAllPapers();

  const processedNewsData = newsData.map((response) => ({
    ...response.newspaper,
    category: response.categories || [],
  })) as NewsPaperWithCategory[];

  const processedPapersData = papersData.map((response) => ({
    ...response.newspaper,
    category: response.categories || [],
  })) as NewsPaperWithCategory[];

  const filteredNews = search
    ? processedNewsData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    : processedNewsData;
  const filteredPapers = search
    ? processedPapersData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    : processedPapersData;

  return <NewsPaperSection news={filteredNews} papers={filteredPapers} />;
}
