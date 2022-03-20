import { prisma } from "~/db.server";

export function getQuickAddList({
  userId,
  id,
}: {
  userId: string;
  id: string;
}) {
  return prisma.quickAddList.findFirst({
    where: { id, userId },
    select: { id: true, name: true, items: true },
  });
}

export function createQuickAddList({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
  return prisma.quickAddList.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

// export function updateGroceryItem({
//   id,
//   data,
// }: {
//   id: string;
//   data: Prisma.GroceryItemUpdateInput;
// }) {
//   return prisma.groceryItem.update({
//     data,
//     where: { id },
//   });
// }
//
// export function deleteGroceryIetm({
//   id,
//   userId,
// }: {
//   id: string;
//   userId: string;
// }) {
//   return prisma.groceryItem.deleteMany({
//     where: { id, userId },
//   });
// }
//
export type { GroceryItem } from "@prisma/client";
