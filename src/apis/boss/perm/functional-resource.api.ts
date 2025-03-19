import {BaseBossApi} from "@apis/boss/base-boss.api.ts";


export class FunctionalResourceApi extends BaseBossApi {
    private baseUri = '/perm';

    //region resource draft
    createFunctionalResourceDraft(data: any) {
        return this.request.post(`${this.baseUri}/functional-resource-drafts`, data);
    }

    deleteFunctionalResourceDraftById(id: string) {
        return this.request.delete(`${this.baseUri}/functional-resource-drafts/${id}`);
    }

    updateFunctionalResourceDraftById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/functional-resource-drafts/${id}`, data);
    }

    queryFunctionalResourceDraftById(id: string) {
        return this.request.get(`${this.baseUri}/functional-resource-drafts/${id}`);
    }

    queryFunctionalResourceDraftTree(params: any) {
        return this.request.get(`${this.baseUri}/functional-resource-draft/tree`, {params});
    }

    releaseFunctionalResourceDrafts(data: { appCode?: string, clientType: any }) {
        return this.request.put(`${this.baseUri}/functional-resource-draft/release`, data);
    }

    syncResourceDraftFromRelease(data: { appCode?: string, clientType: any }){
        return this.request.put(`${this.baseUri}/functional-resource-draft/sync-from-release`, data);
    }

    //endregion


    queryFunctionalResourceById(id: string) {
        return this.request.get(`${this.baseUri}/functional-resources/${id}`);
    }

    queryFunctionalResourceTree(params: any) {
        return this.request.get(`${this.baseUri}/functional-resource/tree`, {params});
    }




}