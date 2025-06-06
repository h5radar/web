interface PageHeadingProps {
  title: string;
  description: string;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ title, description }: PageHeadingProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
