import {BaseBossApi} from "../boss.api.ts";

export class FunctionalResourceApi extends BaseBossApi {
    private baseUri = '/perm';

    createFunctionalResourceDraft(data: any) {
        return this.request.post(`${this.baseUri}/functional-resource/drafts`, data);
    }

    deleteFunctionalResourceDraftById(id: string) {
        return this.request.delete(`${this.baseUri}/functional-resource/drafts/${id}`);
    }

    updateFunctionalResourceDraftById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/functional-resource/drafts/${id}`, data);
    }

    queryFunctionalResourceDraftById(id: string) {
        return this.request.get(`${this.baseUri}/functional-resource/drafts/${id}`);
    }

    queryFunctionalResourceDraftTree(params: any) {
        return this.request.get(`${this.baseUri}/functional-resource/draft/tree`, {params});
    }

    releaseFunctionalResourceDrafts(data: { clientType: any }) {
        return this.request.put(`${this.baseUri}/functional-resource/draft/release`, data);
    }

    queryFunctionalResourceTree(params: any) {
        return this.request.get(`${this.baseUri}/functional-resource/tree`, {params});
    }

}