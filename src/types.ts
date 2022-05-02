import {
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryResult,
} from "@hungphongbk/apollo-client/react/types/types";
import { DocumentNode } from "@hungphongbk/apollo-client";

export type RefetchQueryHooks<TD = any, TV = any> = {
  query: DocumentNode;
  variables: TV;
};
export type QueryHooks<TD = any, TV = any> = (
  baseOptions: QueryHookOptions<TD, TV>
) => QueryResult<TD, TV>;
export type MutationHooks<TD = any, TV = any> = (
  baseOptions: MutationHookOptions<TD, TV>
) => MutationTuple<TD, TV>;
