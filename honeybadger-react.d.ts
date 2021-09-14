declare module "@honeybadger-io/react" {
  import React from "react";
  import BrowserClient from "@honeybadger-io/js/dist/browser/types/core/client";
  import ServerClient from "@honeybadger-io/js/dist/server/types/core/client";

  interface Props {
    honeybadger: BrowserClient & ServerClient;
    children: React.ReactNode;
    ErrorComponent?: React.ReactNode | Function;
  }

  declare const ErrorBoundary: React.ComponentType<Props>;

  export default ErrorBoundary;
}
