declare module "@honeybadger-io/react" {
  import { Component } from "react";
  import Honeybadger from "@honeybadger-io/js";

  interface Props {
    honeybadger: typeof Honeybadger;
    children: React.ReactNode;
    ErrorComponent?: React.ReactNode | Function;
  }

  class ErrorBoundary extends Component<Props> {}

  namespace ErrorBoundary {}

  export = ErrorBoundary;
}
