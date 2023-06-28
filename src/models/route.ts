/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement } from 'react';

export enum RouteEnum {
  PUBLIC = '/public',
  PRIVATE = '/private',
}
export interface IRoute {
  path: string;
  element:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | null
    | undefined
    | any;
  name: string;
  roles: string[];
  private?: boolean;
}
