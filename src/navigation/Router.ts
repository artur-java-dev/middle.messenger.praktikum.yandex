import { AuthAPI } from "../api/AuthAPI";
import { Nullable } from "../utils/common-types";
import { apiHasError } from "../utils/http-utils";
import { CompositeBlock } from "../view-base/CompositeBlock";
import { Route } from "./Route";


class Router {

  private static instance: Router;
  private routes: Route[];
  private history: History;
  private currentRoute: Nullable<Route>;
  private _rootQuery = "";


  private constructor() {

    this.routes = [];
    this.currentRoute = null;
    this.history = window.history;

  }

  public static get Instance() {

    if (this.instance)
      return this.instance;

    this.instance = new this();
    return this.instance;

  }


  public get rootQuery() {

    return this._rootQuery;

  }

  public set rootQuery(value) {

    this._rootQuery = value;

  }


  use(pathname: string, block: CompositeBlock) {

    const props = { rootQuery: this.rootQuery };
    const route = new Route(pathname, block, props);

    this.routes.push(route);

    return this;

  }


  start() {

    window.onpopstate = (e: PopStateEvent) => {

      const win = e.currentTarget as Window;
      this.onRoute(win.location.pathname);

    };

    this.onRoute(window.location.pathname);

  }


  go(pathname: string) {

    this.history.pushState({ page: pathname }, "", pathname);
    this.onRoute(pathname);

  }

  back() {

    this.history.back();

  }

  forward() {

    this.history.forward();

  }


  getRoute(pathname: string) {

    return this.routes.find(_ => _.match(pathname))
      ?? this.routes.find(_ => _.match(Pathname.Err404));

  }


  private onRoute(pathname: string) {

    this.doRedirect(pathname)
      .then(isRedir => {

        if (!isRedir)
          this.on(pathname);

      });

  }

  private on(pathname: string) {

    const route = this.getRoute(pathname);

    if (!route)
      return;

    if (route === this.currentRoute)
      return;

    if (this.currentRoute)
      this.currentRoute.leave();

    this.currentRoute = route;
    route.render();

  }

  private async doRedirect(pathname: string) {

    try {

      const res = await AuthAPI.me();
      if (apiHasError(res))
        return this.redirAuth(pathname);

      return this.redirChats(pathname);

    } catch (e) {

      return this.redirAuth(pathname);

    }

  }

  private redirChats(pathname: string) {

    if (pathname === Pathname.Login) {

      this.on(Pathname.Chats);
      return true;

    }

    return false;

  }

  private redirAuth(pathname: string) {

    if (pathname === Pathname.Registration) {

      this.on(Pathname.Registration);
      return false;

    }

    this.on(Pathname.Login);
    return true;

  }


}


export { Router }; export const enum Pathname {
  Login = "/",
  Registration = "/sign-up",
  Profile = "/settings",
  Password = "/set-password",
  Chats = "/messenger",
  Err404 = "/404-error",
  Err500 = "/500-error"
}

