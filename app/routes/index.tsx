import { redirect } from "remix";
import type { LoaderFunction } from "remix";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  if (userId) {
    return redirect("/portal");
  } else {
    return redirect("/login");
  }
};
