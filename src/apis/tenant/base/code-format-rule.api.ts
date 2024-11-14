import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";

export class CodeFormatRuleApi extends BaseTenantApi {
    private baseUri = '/base';

    createCodeFormatRule(data: any) {
        return this.request.post(`${this.baseUri}/code-format-rules`, data)
    }

    deleteCodeFormatRuleById(id: string) {
        return this.request.delete(`${this.baseUri}/code-format-rules/${id}`)
    }

    updateCodeFormatRuleById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/code-format-rules/${id}`, data)
    }

    getCodeFormatRuleById(id: string) {
        return this.request.get(`${this.baseUri}/code-format-rules/${id}`)
    }

    queryCodeFormatRuleList(params: any) {
        return this.request.get(`${this.baseUri}/code-format-rule/list`, {params})
    }

}