import { prisma } from "~/db.server";
import { Prisma } from "@prisma/client";

// export function getGroceryItems({ userId }: { userId: string }) {
//   return prisma.groceryItem.findMany({
//     where: { userId: userId },
//     select: { id: true, name: true, category: true, isChecked: true },
//     orderBy: { updatedAt: "desc" },
//   });
// }

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
