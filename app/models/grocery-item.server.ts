import { prisma } from "~/db.server";
import { Prisma } from "@prisma/client";

export function getGroceryItems({ userId }: { userId: string }) {
  return prisma.groceryItem.findMany({
    where: { userId: userId },
    select: { id: true, name: true, category: true, isChecked: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function createGroceryItems({
  userId,
  items,
}: {
  userId: string,
  items: Array<{ name: string, category?: string, isChecked?: boolean }>,
}) {
  // TODO: If I end up changing away from SQLLite, look into prisma "createMany"
  const createAll = items.map(({ name, category, isChecked }) => createGroceryItem({ name, category, isChecked, userId }));
  return Promise.all(createAll);
};

export function createGroceryItem({
  name,
  category,
  isChecked,
  userId,
}: {
  name: string;
  category?: string;
  isChecked?: boolean;
  userId: string;
}) {
  return prisma.groceryItem.create({
    data: {
      name,
      category,
      isChecked,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function updateGroceryItem({
  id,
  data,
}: {
  id: string;
  data: Prisma.GroceryItemUpdateInput;
}) {
  return prisma.groceryItem.update({
    data,
    where: { id },
  });
}

export function deleteGroceryIetm({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  return prisma.groceryItem.deleteMany({
    where: { id, userId },
  });
}

export type { GroceryItem } from "@prisma/client";
