interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  className: string;
}

export function ContentLayout({
  children,
  className,
  title,
}: ContentLayoutProps) {
  return (
    <div className="pt-8 pb-8 px-4 sm:px-8 space-y-8">
      {title && <h1 className="text-2xl font-bold">{title}</h1>}
      <div className={className}>{children}</div>
    </div>
  );
}
