import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://open-ussd-sn.vercel.app'),
  title: 'Codes USSD Sénégal | Tous les codes des opérateurs',
  description:
    'Tous les codes USSD des opérateurs au Sénégal - Orange, Free, Expresso et Plus. Trouvez facilement les codes pour la recharge, les forfaits et plus encore.',
  keywords: [
    'USSD',
    'Sénégal',
    'codes',
    'Orange',
    'Free',
    'Expresso',
    'recharge',
    'forfaits',
    'mobile',
  ],
  authors: [{ name: 'Open USSD SN' }],
  openGraph: {
    type: 'website',
    url: 'https://open-ussd-sn.vercel.app/',
    title: 'Codes USSD Sénégal | Tous les codes des opérateurs',
    description:
      'Tous les codes USSD des opérateurs au Sénégal - Orange, Free, Expresso et Plus. Trouvez facilement les codes pour la recharge, les forfaits et plus encore.',
    siteName: 'Open USSD SN',
    images: [
      {
        url: '/images/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Codes USSD Sénégal',
      },
    ],
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codes USSD Sénégal | Tous les codes des opérateurs',
    description:
      'Tous les codes USSD des opérateurs au Sénégal - Orange, Free, Expresso et Plus.',
    images: ['/images/opengraph-image.jpg'],
  },
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} relative antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_90%,var(--background)_40%,var(--secondary)_100%)]"></div>
          </div>
          <main className="relative">
            {children}
            <Toaster richColors />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
