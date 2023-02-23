// @flow

type GqlErrorLocation = {|
  line: number,
  column: number
|};

type GqlError = {|
  message: string,
  locations?: Array<GqlErrorLocation>
|};

type GqlRequest<Variables: void | Object = void> = {|
  operation: string,
  variables?: Variables
|};

type GqlRequestCompat<Variables: void | Object = void> = {|
  query: string,
  variables?: Variables
|};

type GqlResponse<Data> = {|
  data?: Data,
  errors?: Array<GqlError>
|};

type GqlOperationType = "mutation" | "query" | "subscription";

export type {
  GqlError,
  GqlOperationType,
  GqlRequest,
  GqlRequestCompat,
  GqlResponse
};
