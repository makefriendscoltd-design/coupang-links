export default function LinksLayout({ children }: { children: React.ReactNode }) {
  // 루트 layout이 html/body를 제공하므로 여기서는 children만 패스
  return <>{children}</>;
}
