import Header from "@/components/Home/Header";
import type { Metadata } from "next";

import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "영화예매 시스템",
  description: "영화예매 시스템 입니다",
  icons: {
    icon: [
      {
        url: "/images/movie.png",
        href: "/images/movie.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* suppressHydrationWarning : "app-index.js:35 Warning: Extra attributes from the server: data-redeviation-bs-uid" warning 해결 */}
      <html lang="en" suppressHydrationWarning>
        <body>
          {/* 헤더 -> html 태그 바로 자식 영역에 다른 body 외의 다른 태그가 들어가면 hydration 에러가 발생 ! 반드시 body 내부에 작성 */}
          <Header />
          {/* 라우팅 될 다른 컴포넌트 들 */}
          {children}
        </body>
      </html>
    </>
  );
}
