import { Form, json, redirect, useLoaderData } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { requireUserId } from "~/session.server";
import {
  createGroceryItem,
  createGroceryItems,
  deleteGroceryIetm,
  getGroceryItems,
  updateGroceryItem,
} from "~/models/grocery-item.server";
// import { useUser } from "~/utils";
import React from "react";
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
    case "create_many": {
      const itemsStr = formData.get("checkedItems") as string;
      if (itemsStr) {
        const items: Array<{ id: string; name: string; category: string }> =
          JSON.parse(itemsStr);
        await createGroceryItems({ userId, items });
        return redirect("/");
      }
      return false;
    }
  }
};

export default function Index() {
  const data = useLoaderData() as LoaderData;
  // const user = useUser();
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <>
      <h1>Grocery List</h1>
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
            <GroceryItem key={item.id} {...item} />
          ))}
      </ul>
    </>
  );
}
