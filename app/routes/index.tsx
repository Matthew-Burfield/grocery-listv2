import { Form, json, useLoaderData } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { requireUserId } from "~/session.server";
import {
  createGroceryItem,
  deleteGroceryIetm,
  getGroceryItems,
  updateGroceryItem,
} from "~/models/grocery-item.server";
// import { useUser } from "~/utils";
import React from "react";
import FloatingQuickAddMenu from "~/components/FloatingQuickAddMenu";
import { GroceryItem } from "~/components/GroceryItem";

type LoaderData = {
  groceryItems: Awaited<ReturnType<typeof getGroceryItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const groceryItems = await getGroceryItems({ userId });
  return json<LoaderData>({ groceryItems });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const action = formData.get("_action");
  const id = formData.get("id") as string;

  switch (action) {
    case "create": {
      return createGroceryItem({
        name: formData.get("name") as string,
        userId,
      });
    }
    case "check": {
      return updateGroceryItem({ id, data: { isChecked: true } });
    }
    case "uncheck": {
      return updateGroceryItem({ id, data: { isChecked: false } });
    }
    case "delete": {
      return deleteGroceryIetm({ id, userId });
    }
  }
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
            <GroceryItem key={item.id} {...item} />
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
{item.name}
            </li>
          ))}
      </ul>
      <FloatingQuickAddMenu />
    </main>
  );
}
