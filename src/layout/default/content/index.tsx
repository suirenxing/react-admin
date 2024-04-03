export default function MainContent({ children }: WithChildren) {
  return <div className="overflow-y-auto h-full">{children}</div>;
}
