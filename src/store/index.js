import { ApolloClient, createNetworkInterface } from 'react-apollo';
import User from './User';
import UI from './UI';

// Create network interface for Apollo Client
const networkInterface = createNetworkInterface({
  uri: 'https://ueno-graphql-dev.herokuapp.com/graphql',
});

export default class Store {

  constructor() {
    this.setupNetworkInterfaceMiddleware();
  }

  user = new User();
  ui = new UI();
  apolloClient = new ApolloClient({ networkInterface });

  setupNetworkInterfaceMiddleware() {
    networkInterface.use([{
      applyMiddleware: (req, next) => {
        const { idToken } = this.user.user;
        req.options.headers = req.options.headers || {};
        req.options.headers.authorization = idToken ? `Bearer ${idToken}` : null;
        next();
      },
    }]);
  }
}
