import { json, Link, LoaderFunction, useLoaderData } from "remix";
import { getQuickAddLists } from "~/models/quick-add-list.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  quickAddLists: NonNullable<Awaited<ReturnType<typeof getQuickAddLists>>>;
};
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const quickAddLists = await getQuickAddLists({ userId });
  return json<LoaderData>({ quickAddLists });
};

export default function QuickAddIndexPage() {
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <div>Quick add index page</div>
      <ul>
        {data.quickAddLists.map((quickAddList) => (
          <li key={quickAddList.id}>
            <Link
              to={{
                pathname: `/portal/quick-add/${quickAddList.id}`,
              }}
            >
              {`${quickAddList.name} (${quickAddList._count.items} items)`}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
