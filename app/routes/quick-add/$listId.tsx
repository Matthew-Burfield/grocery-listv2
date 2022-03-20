import { ActionFunction, Form, json, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { getQuickAddList } from "~/models/quick-add-list.server";
import { requireUserId } from "~/session.server";
import type { LoaderFunction } from "remix";
import {
  createQuickAddListItem,
  deleteQuickAddListItem,
} from "~/models/quick-add-list-item.server";

type LoaderData = {
  quickAddList: NonNullable<Awaited<ReturnType<typeof getQuickAddList>>>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.listId, "Quick list id not found");

  const quickAddList = await getQuickAddList({ userId, id: params.listId });
  if (quickAddList === null) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ quickAddList });
};

async function checkQuickListBelongsToCurrentUser(
  userId: string,
  quickListId: string
) {
  const quickAddList = await getQuickAddList({ userId, id: quickListId });

  if (quickAddList === null) {
    throw new Response("Not Found", { status: 404 });
  }

  return true;
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.listId, "Quick list id not found");

  if (await checkQuickListBelongsToCurrentUser(userId, params.listId)) {
    // We have the quick add list and it definitely belongs to this user.
    // Let's add the item
    const formData = await request.formData();
    const action = formData.get("_action");
    const id = formData.get("id") as string;

    switch (action) {
      case "create": {
        return createQuickAddListItem({
          name: formData.get("name") as string,
          quickAddListId: params.listId,
        });
      }
      // case "check": {
      //   return updateGroceryItem({ id, data: { isChecked: true } });
      // }
      // case "uncheck": {
      //   return updateGroceryItem({ id, data: { isChecked: false } });
      // }
      case "delete": {
        return deleteQuickAddListItem({ id });
      }
    }
  }
};

export default function QuickAddDetailsPage() {
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <h2>{data.quickAddList.name}</h2>
      <ul>
        {data.quickAddList.items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Form replace method="post">
        <label>
          Item: <input name="name" />
        </label>
        <button type="submit" name="_action" value="create">
          Submit
        </button>
      </Form>
    </>
  );
}
