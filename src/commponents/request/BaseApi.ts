import {AxiosInstance} from "axios";
import {createRequest, RequestOptions} from "./request";

export class BaseTrionesApi {
  protected request: AxiosInstance;

  constructor(options: RequestOptions) {
    this.request = createRequest(options);
  }
}
