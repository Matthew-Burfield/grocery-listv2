import { Form, json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { requireUserId } from "~/session.server";
import { getGroceryItems } from "~/models/note.server";
// import { useUser } from "~/utils";
import React from "react";
import FloatingQuickAddMenu from "~/components/FloatingQuickAddMenu";

type LoaderData = {
  groceryItems: Awaited<ReturnType<typeof getGroceryItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const groceryItems = await getGroceryItems({ userId });
  return json<LoaderData>({ groceryItems });
};

export default function Index() {
  const data = useLoaderData() as LoaderData;
  // const user = useUser();
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <ul>
        {data.groceryItems
          .filter((item) => !item.isChecked)
          .map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
      </ul>
      <Form replace method="post" ref={formRef}>
        <label>
          Item: <input name="name" />
        </label>
        <button type="submit" name="_action" value="create">
          Submit
        </button>
      </Form>
      <ul>
        {data.groceryItems
          .filter((item) => item.isChecked)
          .map((item) => (
            <li key={item.id}>
              <li key={item.id}>{item.name}</li>
            </li>
          ))}
      </ul>
      <FloatingQuickAddMenu />
    </main>
  );
}
