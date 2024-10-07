import {DepartmentApi} from "./department.api.ts";
import {TenantApi} from "./tenant.api.ts";
import {TenantAccountApi} from "@apis/backend/org/tenant-account.api.ts";

export const tenantAccountApi = new TenantAccountApi()
export const tenantApi = new TenantApi()
export const departmentApi = new DepartmentApi()