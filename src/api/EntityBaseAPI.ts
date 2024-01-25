abstract class EntityBaseAPI {

  abstract create(data: object): Promise<XMLHttpRequest>

  abstract request(urlParams: object): Promise<XMLHttpRequest>

  abstract requestById(id: number): Promise<XMLHttpRequest>

  abstract update(data: object): Promise<XMLHttpRequest>

  abstract delete(data: object): Promise<XMLHttpRequest>

}


export { EntityBaseAPI };
