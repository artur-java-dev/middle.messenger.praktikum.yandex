import { RequestBody } from "../utils/HTTPTransport";


abstract class EntityBaseAPI {

  abstract create<T extends RequestBody = object>(data: T):
    Promise<XMLHttpRequest>


  abstract request<T extends RequestBody = object>(urlParams?: T):
    Promise<XMLHttpRequest>


  abstract requestById(id: number):
    Promise<XMLHttpRequest>


  abstract update<T extends RequestBody = object>(data: T):
    Promise<XMLHttpRequest>


  abstract delete<T extends RequestBody = object>(data: T):
    Promise<XMLHttpRequest>

}


export { EntityBaseAPI };
