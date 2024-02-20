import React from "react";

export interface IMetricsView<T> {
  displayName: string;
  value: T;
  icon: React.ReactNode;
}
