import { FieldPolicy, Reference } from "@hungphongbk/apollo-client";
import {
  RelayFieldPolicy,
  TExistingRelay,
  TRelayEdge,
  TRelayPageInfo,
} from "@hungphongbk/apollo-client/utilities/policies/pagination";
import { __rest } from "tslib";
import mergeDeep from "deepmerge";

type KeyArgs = FieldPolicy<any>["keyArgs"];

export function relayStylePagination<TNode = Reference>(
  keyArgs: KeyArgs = false
): RelayFieldPolicy<TNode> {
  return {
    keyArgs,

    read(existing, { canRead, readField }) {
      if (!existing) return existing;

      const edges: TRelayEdge<TNode>[] = [];
      let firstEdgeCursor = "";
      let lastEdgeCursor = "";
      existing.edges.forEach((edge) => {
        // Edges themselves could be Reference objects, so it's important
        // to use readField to access the edge.edge.node property.
        if (canRead(readField("node", edge))) {
          edges.push(edge);
          if (edge.cursor) {
            firstEdgeCursor = firstEdgeCursor || edge.cursor || "";
            lastEdgeCursor = edge.cursor || lastEdgeCursor;
          }
        }
      });

      const { startCursor, endCursor } = existing.pageInfo || {};

      return {
        ...getExtras(existing),
        edges,
        pageInfo: {
          ...existing.pageInfo,
          startCursor: startCursor || firstEdgeCursor,
          endCursor: endCursor || lastEdgeCursor,
        },
      };
    },

    merge(existing, incoming, { args, isReference, readField }) {
      if (!existing) {
        existing = makeEmptyData();
      }

      if (!incoming) {
        return existing;
      }

      const incomingEdges = incoming.edges
        ? incoming.edges.map((edge) => {
            if (isReference((edge = { ...edge }))) {
              // In case edge is a Reference, we read out its cursor field and
              // store it as an extra property of the Reference object.
              edge.cursor = readField<string>("cursor", edge);
            }
            return edge;
          })
        : [];

      if (incoming.pageInfo) {
        const { pageInfo } = incoming;
        const { startCursor, endCursor } = pageInfo;
        const firstEdge = incomingEdges[0];
        const lastEdge = incomingEdges[incomingEdges.length - 1];
        // In case we did not request the cursor field for edges in this
        // query, we can still infer cursors from pageInfo.
        if (firstEdge && startCursor) {
          firstEdge.cursor = startCursor;
        }
        if (lastEdge && endCursor) {
          lastEdge.cursor = endCursor;
        }
        // Cursors can also come from edges, so we default
        // pageInfo.{start,end}Cursor to {first,last}Edge.cursor.
        const firstCursor = firstEdge && firstEdge.cursor;
        if (firstCursor && !startCursor) {
          incoming = mergeDeep(incoming, {
            pageInfo: {
              startCursor: firstCursor,
            },
          });
        }
        const lastCursor = lastEdge && lastEdge.cursor;
        if (lastCursor && !endCursor) {
          incoming = mergeDeep(incoming, {
            pageInfo: {
              endCursor: lastCursor,
            },
          });
        }
      }

      let prefix = existing.edges;
      let suffix: typeof prefix = [];

      if (args?.paging?.after) {
        const index = prefix.findIndex(
          (edge) => edge.cursor === args.paging.after
        );
        if (index >= 0) {
          prefix = prefix.slice(0, index + 1);
          // suffix = []; // already true
        }
      } else if (args?.paging?.before) {
        const index = prefix.findIndex(
          (edge) => edge.cursor === args.paging.before
        );
        suffix = index < 0 ? prefix : prefix.slice(index);
        prefix = [];
      } else if (incoming.edges) {
        prefix = [];
      }

      const edges = [...prefix, ...incomingEdges, ...suffix];

      const pageInfo: TRelayPageInfo = {
        ...incoming.pageInfo,
        ...existing.pageInfo,
      };

      if (incoming.pageInfo) {
        const {
          hasPreviousPage,
          hasNextPage,
          startCursor,
          endCursor,
          ...extras
        } = incoming.pageInfo;

        Object.assign(pageInfo, extras);

        if (!prefix.length) {
          if (void 0 !== hasPreviousPage)
            pageInfo.hasPreviousPage = hasPreviousPage;
          if (void 0 !== startCursor) pageInfo.startCursor = startCursor;
        }
        if (!suffix.length) {
          if (void 0 !== hasNextPage) pageInfo.hasNextPage = hasNextPage;
          if (void 0 !== endCursor) pageInfo.endCursor = endCursor;
        }
      }

      return {
        ...getExtras(existing),
        ...getExtras(incoming),
        edges,
        pageInfo,
      };
    },
  };
}

// Returns any unrecognized properties of the given object.
const getExtras = (obj: Record<string, any>) => __rest(obj, notExtras);
const notExtras = ["edges", "pageInfo"];

function makeEmptyData(): TExistingRelay<any> {
  return {
    edges: [],
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: true,
      startCursor: "",
      endCursor: "",
    },
  };
}
