import HighlightSection from './HighlightSection';
import { fetchNewsHighlight } from '@/app/api/newsApi';

export default async function HighlightSectionServer() {
  const highlights = await Promise.all([fetchNewsHighlight('CS'), fetchNewsHighlight('EE'), fetchNewsHighlight('IT')]);

  const categoryHighlight = highlights.map((data) => ({
    title: data[0]?.newspaper.title || '',
    summary: data[0]?.newspaper.summary || '',
  }));

  return <HighlightSection highlights={categoryHighlight} />;
}
