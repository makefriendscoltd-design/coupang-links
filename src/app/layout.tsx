import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coupang Links",
  description: "추천 제품 링크 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
