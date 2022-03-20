import { json, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { getQuickAddList } from "~/models/quick-add-list.server";
import { requireUserId } from "~/session.server";
import type { LoaderFunction } from "remix";

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

export default function QuickAddDetailsPage() {
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <h2>{data.quickAddList.name}</h2>
    </>
  );
}
