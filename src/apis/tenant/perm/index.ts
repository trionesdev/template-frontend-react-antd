import {FunctionalResourceApi} from "./functional-resource.api.ts";
import {RoleApi} from "@apis/tenant/perm/role.api.ts";
import {PolicyApi} from "@apis/tenant/perm/policy.api.ts";

export const functionalResourceApi = new FunctionalResourceApi()
export const roleApi = new RoleApi()
export const policyApi = new PolicyApi()