import env from '../lib/env';

export default function Home() {
  return <main>hoho:{env.API_URL}</main>;
}
