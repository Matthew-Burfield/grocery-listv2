import { useFetcher } from "remix";

export function GroceryItem({
  name,
  isChecked,
}: {
  name: string;
  isChecked: boolean;
}) {
  const fetcher = useFetcher();

  return <li>{name}</li>;
}
