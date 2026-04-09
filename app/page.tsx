import homeContent from '@/content/page/home.json';
import HomePage from '@/tina/pages/HomePage';

export default async function Page() {
  return <HomePage page={homeContent} />;
}
