import {BaseBossApi} from "@apis/boss/base-boss.api.ts";


export class DictionaryApi extends BaseBossApi {
    private baseUri = '/dic';

    createDictionary(data: any) {
        return this.request.post(`${this.baseUri}/dictionaries`, data)
    }

    updateDictionaryById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/dictionaries/${id}`, data)
    }

    queryDictionaryById(id?: string) {
        return this.request.get(`${this.baseUri}/dictionaries/${id}`)
    }

    queryDictionaryList(params?: any) {
        return this.request.get(`${this.baseUri}/dictionary/list`, {params})
    }
}