import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class OperationLogApi extends BaseTenantApi{
    private baseUri = '/log';

    queryOperationLogsPage(params: PageQueryParams) {
        return this.request.get(this.baseUri + '/operation/page', {params});
    }

}