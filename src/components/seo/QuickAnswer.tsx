interface QuickAnswerProps {
  text: string;
  id?: string;
}

export function QuickAnswer({ text, id = 'quick-answer' }: QuickAnswerProps) {
  return (
    <section
      id={id}
      role="doc-abstract"
      data-speakable="true"
      data-aio="quick-answer"
      className="sr-only"
      aria-label="Quick answer summary"
    >
      <p>{text}</p>
    </section>
  );
}
