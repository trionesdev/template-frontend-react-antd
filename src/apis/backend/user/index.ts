import {UserAccountApi} from "@apis/backend/user/user-account.api.ts";
import {UserApi} from "@apis/backend/user/user.api.ts";

export const userAccountApi = new UserAccountApi();
export const userApi = new UserApi()