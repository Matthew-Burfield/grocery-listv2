import { Form } from "remix";

export function GroceryItem({
  id,
  name,
  isChecked,
  category,
}: {
  id: string;
  name: string;
  isChecked: boolean;
  category: string;
}) {
  const action = isChecked ? "uncheck" : "check";

  return (
    <li aria-label={name}>
      <Form replace method="post">
        <input type="hidden" name="id" value={id} />
        <button type="submit" aria-label={action} name="_action" value={action}>
          <input
            type="checkbox"
            defaultChecked={isChecked}
            className="pointer-events-none"
          />
        </button>
        {name}
        <button
          type="submit"
          aria-label={"delete"}
          name="_action"
          value={"delete"}
        >
          x
        </button>
      </Form>
    </li>
  );
}
