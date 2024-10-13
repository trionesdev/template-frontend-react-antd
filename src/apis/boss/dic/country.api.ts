import {BaseBossApi} from "@apis/boss/boss.api.ts";

export class CountryApi extends BaseBossApi {
    private baseUri = '/dic';

    queryCountryList(params: any) {
        return this.request.get(`${this.baseUri}/country/list`, params)
    }
}