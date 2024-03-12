import { Component, ReactNode } from "react";

import styles from "./ErrorBoundary.module.scss";

type IProps = {
  children: ReactNode;
};

type IState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className={styles.errorMessage}>Something went wrong. Please refresh the app.</div>;
    }

    return this.props.children;
  }
}
