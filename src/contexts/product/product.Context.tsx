'use client';

import { useProductsQuery } from '@framework/product/get-all-products';
import { Category, Collection, Product } from '@framework/types';
import React, { useMemo, useState } from 'react';
import { getSuggestionProducts } from './product.utils';
interface ResponseData {
  data?: Collection[] | null;
  isFetching: boolean;
  error?: Error | null;
  getAllProducts: (query: any) => Product[];
  getCategories: () => Category[];
  SuggestionProduct: (categoryGcode: number) => any;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
}
const ProductsContext = React.createContext<ResponseData | undefined>(
  undefined,
);

ProductsContext.displayName = 'ProductsContext';

export const useProcucts = () => {
  const context = React.useContext(ProductsContext);
  if (context === undefined)
    throw new Error(`useLang must be used within a LangSystemProvider`);
  return context;
};

export function ProductsProvider(props: React.PropsWithChildren<any>) {
  const { data, isFetching, error } = useProductsQuery({});
  let hasNextPage = false;

  const getCategories = () => {
    let categories: Category[] = [];
    data?.map((element: Collection) => {
      categories.push({
        gcode: element.gcode,
        name: element.name,
        icon: element.icon,
      });
    });
    return categories;
  };

  const getAllProducts = (query: any) => {
    var id = query.category ?? 0;
    var orderby = query.sort_by ?? 'lowest';

    let products: Product[] = [];
    if (id != 0) {
      data?.map((element: Collection) => {
        if (element.gcode == id) {
          products = [
            ...element.childrens?.map((item) => {
              return { ...item, categoryGcode: element.gcode };
            })!,
          ];
          if (orderby == 'lowest') products.sort((a, b) => a.cost - b.cost);
          else products.sort((a, b) => b.cost - a.cost);
        }
      });
      return products;
    } else {
      data?.map((element: Collection) => {
        element.childrens?.map((item) => {
          products.push({ ...item, categoryGcode: element.gcode });
        });
      });
      if (query.sort_by != null) {
        if (orderby == 'lowest') products.sort((a, b) => a.cost - b.cost);
        else products.sort((a, b) => b.cost - a.cost);
      }  
          
      return products;
    }
  };

  const SuggestionProduct = (categoryGcode: number) => {
    return getSuggestionProducts(data!, categoryGcode);
  };

  return (
    <ProductsContext.Provider
      value={{
        data: data,
        isFetching: isFetching,
        error: error,
        getAllProducts,
        getCategories,
        SuggestionProduct,
        hasNextPage,
      }}
      {...props}
    />
  );
}
