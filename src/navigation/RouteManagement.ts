import { Router } from "./Router";


class RouteManagement {

  private static router = Router.Instance;

  static go(path: string) {

    return this.router.go(path);

  }

}


export { RouteManagement };
