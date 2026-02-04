type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "start" | "center";
};

const alignments = {
  start: "text-right",
  center: "text-center",
};

export default function SectionHeading({
  title,
  description,
  align = "start",
}: SectionHeadingProps) {
  return (
    <div className={`${alignments[align]} space-y-3`}>
      <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-foreground/70 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
