import { adminState } from "../atoms/admin";
import {selector} from "recoil";

export const isAdminLoading = selector({
  key: 'AdminLoadingState',
  get: ({get}) => {
    const state = get(adminState);

    return state.isLoading;
  },
});