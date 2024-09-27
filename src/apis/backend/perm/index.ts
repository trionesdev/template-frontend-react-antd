import {FunctionalResourceApi} from "./functional-resource.api.ts";
import {RoleApi} from "@apis/backend/perm/role.api.ts";
import {PolicyApi} from "@apis/backend/perm/policy.api.ts";

export const functionalResourceApi = new FunctionalResourceApi()
export const roleApi = new RoleApi()
export const policyApi = new PolicyApi()