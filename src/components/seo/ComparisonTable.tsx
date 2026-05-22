interface ComparisonRow {
  attribute: string;
  optionA: string;
  optionB: string;
}

interface ComparisonTableProps {
  id: string;
  title: string;
  description: string;
  optionALabel: string;
  optionBLabel: string;
  rows: ComparisonRow[];
}

export function ComparisonTable({ id, title, description, optionALabel, optionBLabel, rows }: ComparisonTableProps) {
  return (
    <figure id={id} className="my-12" role="figure" aria-labelledby={`${id}-title`}>
      <figcaption id={`${id}-title`} className="text-xl font-display text-chalk mb-2">{title}</figcaption>
      <p id={`${id}-desc`} className="text-sm text-iron-grey mb-4">{description}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm" aria-describedby={`${id}-desc`}>
          <thead>
            <tr className="border-b-2 border-brushed-bronze/30">
              <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-brushed-bronze">Attribute</th>
              <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-brushed-bronze">{optionALabel}</th>
              <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-brushed-bronze">{optionBLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-hammered-steel/30 hover:bg-anthracite/50 transition-colors">
                <td className="py-3 px-4 text-chalk font-medium">{row.attribute}</td>
                <td className="py-3 px-4 text-iron-grey">{row.optionA}</td>
                <td className="py-3 px-4 text-iron-grey">{row.optionB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
