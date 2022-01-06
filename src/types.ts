import {
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryResult,
} from "@apollo/client/react/types/types";

export type QueryHooks<TD = any, TV = any> = (
  baseOptions: QueryHookOptions<TD, TV>
) => QueryResult<TD, TV>;
export type MutationHooks<TD = any, TV = any> = (
  baseOptions: MutationHookOptions<TD, TV>
) => MutationTuple<TD, TV>;
