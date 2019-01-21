declare module "@honeybadger-io/react" {
  import { Component } from "react";

  interface Props {
    honeybadger: void;
    children: React.ReactNode;
    ErrorComponent?: React.ReactNode | Function;
  }

  class ErrorBoundary extends Component<Props> {}

  namespace ErrorBoundary {}

  export = ErrorBoundary;
}
