import type { Metadata } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/Layout/ThemeProvider';

export const metadata: Metadata = {
  title: 'NetWeave — YAML to network topology',
  description:
    'Turn network topology YAML (NetWeave or ContainerLab) into a modern, interactive diagram in your browser.',
  icons: [{ rel: 'icon', url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`, type: 'image/svg+xml' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
