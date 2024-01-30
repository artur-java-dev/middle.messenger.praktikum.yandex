import { Nullable } from "../utils/common-types";
import { CompositeBlock } from "../view-base/CompositeBlock";
import { Route } from "./Route";
import { Pathname } from "./RouteManagement";


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

    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);

  }

  back() {

    this.history.back();

  }

  forward() {

    this.history.forward();

  }


  getRoute(pathname: string) {

    return this.routes.find(_ => _.match(pathname)) ??
      this.routes.find(_ => _.match(Pathname.Err404));

  }


  private onRoute(pathname: string) {

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


}


export { Router };
