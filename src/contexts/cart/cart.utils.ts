import { AdditionalService } from '@framework/types';

export interface Item {
  gcode: string | number;
  name: string;
  cost: number;
  quantity?: number;
  stock?: number;
}

export interface UpdateItemInput extends Partial<Omit<Item, 'gcode'>> {}

export function addItemWithQuantity(
  items: Item[],
  item: Item,
  quantity: number,
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.gcode === item.gcode,
    // checkAditionalService(
    //   existingItem.additionalSelected!,
    //   item.additionalSelected!,
    // ),
  );

  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity! += 1;
    return newItems;
  }
  return [...items, { ...item, quantity }];
}

export function removeItemOrQuantity(
  items: Item[],
  gcode: Item['gcode'],
  quantity: number,
) {
  return items.reduce((acc: Item[], item) => {
    if (item.gcode === gcode) {
      const newQuantity = item.quantity! - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}
// function checkAditionalService(
//   additinal1: AdditionalService[],
//   additinal2: AdditionalService[],
// ) {
//   if (additinal1.length == 0 && additinal2.length == 0) return true;

//   if (additinal1.length !== additinal2.length) return false;

//   additinal1.every((item, index) => {
//     if (item.gcode != additinal2[index].gcode) return false;
//   });
//   return true;
// }

// Simple CRUD for Item
export function addItem(items: Item[], item: Item) {
  return [...items, item];
}

export function getItem(items: Item[], gcode: Item['gcode']) {
  return items.find((item) => item.gcode === gcode);
}

export function updateItem(
  items: Item[],
  gcode: Item['gcode'],
  item: UpdateItemInput,
) {
  return items.map((existingItem) =>
    existingItem.gcode === gcode ? { ...existingItem, ...item } : existingItem,
  );
}

export function removeItem(items: Item[], gcode: Item['gcode']) {
  return items.filter((existingItem) => existingItem.gcode !== gcode);
}

export function inStock(items: Item[], gcode: Item['gcode']) {
  const item = getItem(items, gcode);
  // if (item) return item['quantity']! < item['stock']!;
  return true;
}

export const calculateItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.cost * item.quantity!,
  }));

export const calculateTotal = (items: Item[]) =>
  items.reduce((total, item) => total + item.quantity! * item.cost, 0);

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;
