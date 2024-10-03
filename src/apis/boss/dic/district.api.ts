import {BaseBossApi} from "@apis/boss/boss.api.ts";

export class DistrictApi extends BaseBossApi {
    private baseUri = '/dic';

    queryDistrictById(id: string) {
        return this.request.get(`${this.baseUri}/districts/${id}`);
    }

    queryDistrictList(params?: any) {
        return this.request.get(`${this.baseUri}/district/list`, {params});
    }

    queryDistrictTree() {
        return this.request.get(`${this.baseUri}/district/tree`);
    }

}