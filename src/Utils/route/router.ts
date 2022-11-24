import { NextRouter, useRouter } from "next/router";

// Define list of pages
type PageList = "/login" | "/register" | "/dashboard" | "/unauthorized";

// Define type of param required to passed on the page
type PageParam = {
  "/login": null;
  "/register": null;
  "/dashboard": null;
  "/unauthorized": null;
};

// Keep it as reference
// let ALL_PAGE = [
//   {
//     name: "login",
//     param: {
//     },
//   },
//   {
//     name: "register",
//     param: {},
//   },
// ] as const
// type PageName = typeof ALL_PAGE[number]["name"]

/**
 * Basically typical useRouter() instance
 *
 * The only difference is the push method of this class
 * is the page list and param required to passed on destination page already defined
 */
class Router {
  router: NextRouter = useRouter();

  // Ref: https://stackoverflow.com/questions/74555558/is-it-possible-to-have-dynamic-type-based-on-another-type-in-typescript/74555628#74555628
  push<T extends PageList>(pageName: T, query: PageParam[T]) {
    this.router.push({
      pathname: pageName,
      query: query,
    });
  }
}

export { Router };
