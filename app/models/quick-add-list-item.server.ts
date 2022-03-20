import { prisma } from "~/db.server";
import { Prisma } from "@prisma/client";

// export function getQuickAddListItems({ userId }: { userId: string }) {
//   return prisma.groceryItem.findMany({
//     where: { userId: userId },
//     select: { id: true, name: true, category: true, isChecked: true },
//     orderBy: { updatedAt: "desc" },
//   });
// }

export function createQuickAddListItem({
  name,
  category,
  quickAddListId,
}: {
  name: string;
  category?: string;
  quickAddListId: string;
}) {
  return prisma.quickAddItem.create({
    data: {
      name,
      category,
      quickAddList: {
        connect: {
          id: quickAddListId,
        },
      },
    },
  });
}

export function updateQuickAddListItem({
  id,
  data,
}: {
  id: string;
  data: Prisma.QuickAddItemUpdateInput;
}) {
  return prisma.groceryItem.update({
    data,
    where: { id },
  });
}

export function deleteQuickAddListItem({ id }: { id: string }) {
  return prisma.groceryItem.deleteMany({
    where: { id },
  });
}

export type { QuickAddItem } from "@prisma/client";
