'use client';

import React, { useCallback } from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { Item, getItem, inStock } from './cart.utils';
import { useLocalStorage } from '@utils/use-local-storage';
interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (gcode: Item['gcode']) => void;
  clearItemFromCart: (gcode: Item['gcode']) => void;
  getItemFromCart: (gcode: Item['gcode']) => any | undefined;
  isInCart: (gcode: Item['gcode']) => boolean;
  isInStock: (gcode: Item['gcode']) => boolean;
  resetCart: () => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined,
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export function CartProvider(props: React.PropsWithChildren<any>) {
  const [savedCart, saveCart] = useLocalStorage(
    `aceburger-cart`,
    JSON.stringify(initialState),
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!),
  );

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Item, quantity: number) => {
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
  };
  const removeItemFromCart = (gcode: Item['gcode']) =>
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', gcode });
  const clearItemFromCart = (gcode: Item['gcode']) =>
    dispatch({ type: 'REMOVE_ITEM', gcode });
  const isInCart = useCallback(
    (gcode: Item['gcode']) => !!getItem(state.items, gcode),
    [state.items],
  );
  const getItemFromCart = useCallback(
    (gcode: Item['gcode']) => getItem(state.items, gcode),
    [state.items],
  );
  const isInStock = useCallback(
    (gcode: Item['gcode']) => inStock(state.items, gcode),
    [state.items],
  );
  const resetCart = () => dispatch({ type: 'RESET_CART' });
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
    }),
    [getItemFromCart, isInCart, isInStock, state],
  );
  return <cartContext.Provider value={value} {...props} />;
}
