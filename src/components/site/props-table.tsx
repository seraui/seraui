export const PropsTable = ({
  props,
}: {
  props: {
    name: string;
    type: string;
    default?: string;
    description: string;
    required?: boolean;
  }[];
}) => (
  <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 not-prose overflow-x-auto">
    <table className="w-full text-sm my-0">
      <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-700">
        <tr className="divide-x divide-zinc-200 dark:divide-zinc-700">
          <th className="px-4 py-2 text-left font-medium">Prop</th>
          <th className="px-4 py-2 text-left font-medium">Type</th>
          <th className="px-4 py-2 text-left font-medium">Default</th>
          <th className="px-4 py-2 text-left font-medium">Required</th>
          <th className="px-4 py-2 text-left font-medium">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
        {props.map((prop) => (
          <tr
            key={prop.name}
            className="font-medium text-sm divide-x divide-zinc-200 dark:divide-zinc-600 text-zinc-500 dark:text-zinc-400"
          >
            <td className="py-2 md:py-3 px-4 font-mono">{prop.name}</td>
            <td className="py-2 md:py-3 px-4 font-mono">{prop.type}</td>
            <td className="py-2 md:py-3 px-4 font-mono max-w-[150px] break-words">
              {prop.default ?? "-"}
            </td>
            <td className="py-2 md:py-3 px-4 font-mono">
              {prop.required ? "Yes" : "No"}
            </td>
            <td className="py-2 md:py-3 px-4">{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
