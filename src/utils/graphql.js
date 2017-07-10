import { graphql } from 'react-apollo';
import get from 'lodash/get';
import set from 'lodash/set';
import merge from 'lodash/merge';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';

// Default options that will get extended by
const defaultOptions = {
  options: {
    fetchPolicy: 'network-only',
  },
};

/**
 * Extend props with loadMore function that resolves more items
 * @param {string} path Lodash style path to items array (eg. `job.applications.items`)
 * @param {object} props The target object to alter
 */
export const withLoadMore = (path, items = 'items', props) => {
  // Split by parts
  const parts = path.split('.');
  // Get root property name
  const root = path.split('.').shift();
  // Get path without root
  const pathWithoutRoot = parts.slice(1).join('.');
  // Get fetchMore method
  const fetchMore = get(props, `${root}.fetchMore`, () => {});
  // Check if cursor or offset based
  const isOffsetBased = typeof get(props, `${root}.variables.offset`, undefined) !== 'undefined';
  // Setup variables object
  const variables = {};

  if (!isOffsetBased) {
    // Set after to last cursor prop
    variables.after = get(props, `${path}.cursor`);
  } else {
    // Set offset to last items length
    variables.offset = get(props, `${path}.${items}`, []).length;
  }

  const result = {
    loadMore: () => fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult: next }) => {
        const res = cloneDeep(prev);
        const itemsPath = `${pathWithoutRoot && `${pathWithoutRoot}.`}${items}`;
        if (next) {
          merge(res, next);
          set(res, itemsPath, uniqBy(
            get(prev, itemsPath, []).concat(get(next, itemsPath, [])),
            n => n.id,
          ));
        }
        return res;
      },
    }),
  };

  const res = merge({}, props, {
    [root]: result,
  });

  return res;
};

/**
 * Composes a React Component with GraphQL but uses static property to apply query and config.
 * @param {React.Component}
 */
const graphqlDecorator = (ComposedComponent) => {
  const { query, ...options } = ComposedComponent.graphql;
  const config = merge({}, defaultOptions, options);
  return graphql(query, config)(ComposedComponent);
};

export default graphqlDecorator;
