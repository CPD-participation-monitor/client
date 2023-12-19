import { toast } from 'react-toastify';

export function successToast(message) {
  if (message) toast.success(message, {});
}

export function errorToast(message) {
  if (message) toast.error(message, {});
}