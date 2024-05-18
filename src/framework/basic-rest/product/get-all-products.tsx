import { QueryOptionsType, Product, Collection } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async ({ newQuery }: any) => {
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  console.log('request Api');

  // if (newQuery.category != undefined && newQuery.category != '') {
  //   data.map((element: Collection) => {
  //     if (element.gcode == Number.parseInt(newQuery.category)) {
  //       products = [...element.childrens!];
  //     }
  //   });
  //   return products;
  // }

  // data.map((element: Collection) => {
  //   if (element.gcode == 40593) {
  //     products = [...element.childrens!];
  //   }
  // });

  return data;
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Collection[], Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: () => fetchProducts(options),
  });
};

export { useProductsQuery, fetchProducts };
