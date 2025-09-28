import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://open-ussd-sn.vercel.app/sitemap.xml',
    host: 'https://open-ussd-sn.vercel.app',
  };
}
