import {
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryResult,
} from "@apollo/client/react/types/types";
import { DocumentNode } from "@apollo/client";

export type RefetchQueryHooks<TD = any, TV = any> = (variables: TV) => {
  query: DocumentNode;
  variables: TV;
};
export type QueryHooks<TD = any, TV = any> = (
  baseOptions: QueryHookOptions<TD, TV>
) => QueryResult<TD, TV>;
export type MutationHooks<TD = any, TV = any> = (
  baseOptions: MutationHookOptions<TD, TV>
) => MutationTuple<TD, TV>;
