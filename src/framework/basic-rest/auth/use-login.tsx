import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

export interface LoginInputType {
  phonenumber: string;
}
async function login(input: LoginInputType) {
  return {
    token: `${input.phonenumber}`.split('').reverse().join(''),
  };
}
export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: (input: LoginInputType) => login(input),
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
