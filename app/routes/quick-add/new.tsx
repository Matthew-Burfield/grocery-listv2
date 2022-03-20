// import * as React from "react";
import { Form, redirect } from "remix";
import type {  ActionFunction } from "remix";
import { requireUserId } from "~/session.server";
import { createQuickAddList } from "~/models/quick-add-list.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const newList = await createQuickAddList({
    name: formData.get('name') as string,
    userId,
  });

  console.log({ newList });

  return redirect(`/quick-add/${newList.id}`);
};

export default function NewQuickListPage() {
  return (
    <Form replace method="post">
      <label>
        Title: <input name="name" />
      </label>
      <button type="submit">Next</button>
    </Form>
  );
}
