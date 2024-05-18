import { Collection, Product } from '@framework/types';
import { shuffle } from 'lodash';

export const getSuggestionProducts = (
  data: Collection[],
  categoryGcode: number,
) => {
  if (data == null) return null;

  let products1: Product[] = [];
  let products2: Product[] = [];
  if (!categoryGcode) return null;
  let sugg = suggestionProducts(categoryGcode);
  data?.map((element: Collection) => {
    if (element.gcode == sugg![0].categoryId) {
      products1 = [
        ...shuffle(element.childrens)
          ?.slice(
            0,
            element.childrens!.length > 5 ? 5 : element.childrens!.length,
          )
          ?.map((item, index) => {
            return { ...item, categoryGcode: element.gcode };
          })!,
      ];
    }
    if (element.gcode == sugg![1].categoryId) {
      products2 = [
        ...shuffle(element.childrens)
          ?.slice(
            0,
            element.childrens!.length > 5 ? 5 : element.childrens!.length,
          )
          ?.map((item) => {
            return { ...item, categoryGcode: element.gcode };
          })!,
      ];
    }
  });

  return [
    {
      id: sugg![0].categoryId,
      title: sugg![0].title,
      data: products1,
    },
    {
      id: sugg![1].categoryId,
      title: sugg![1].title,
      data: products2,
    },
  ];
};

function suggestionProducts(categoryId: number) {
  switch (categoryId) {
    case 40593: // burger
      return [
        { title: 'Would-drink?', categoryId: 40596 },
        { title: 'Would-appetizer?', categoryId: 40594 },
      ];
    case 40594: // pishghaza
      return [
        { title: 'Would-burger?', categoryId: 40593 },
        { title: 'Would-sokhari?', categoryId: 40595 },
      ];
    case 40595: // sokhari
      return [
        { title: 'Would-drink?', categoryId: 40596 },
        { title: 'Would-appetizer?', categoryId: 40594 },
      ];
    case 40596: //drink
      return [
        { title: 'Would-burger?', categoryId: 40593 },
        { title: 'Would-sokhari?', categoryId: 40595 },
      ];
  }
}
