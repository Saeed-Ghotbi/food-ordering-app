import { AdditionalService } from '@framework/types';
import isEmpty from 'lodash/isEmpty';
interface Item {
  gcode: string | number;
  name: string;
  description: string;
  cost: number;
}
export function generateCartItem(item: Item) {
  let { gcode, name, description, cost } = item;

  // return {
  //   id,
  //   name,
  //   slug,
  //   image: image?.thumbnail,
  //   price: finalPrice,
  //   additionalSelected: !isEmpty(additionals) ? additionals : [],
  // };
}
