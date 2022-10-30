/**
 * Define the application main flow
 * used to determine the authentication state required
 * by the pages consumed it
 * - auth: allow only unauthenticated users
 * - public: allow all users
 * - main: allow only authenticated users
 */

export type AppMainFlow = "auth" | "public" | "main";

export interface StaticPageProps {
  props: PageProps
}

export interface PageProps {
  flow?: AppMainFlow 
}
