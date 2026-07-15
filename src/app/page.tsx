import { LandingHtml } from './LandingHtml';
import Script from 'next/script';

export default function HomePage() {
  return (
    <>
      <link rel="stylesheet" href="/landing.css" />
      <LandingHtml />
    </>
  );
}
