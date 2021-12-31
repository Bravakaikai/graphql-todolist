import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueApollo from "vue-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";

import vuetify from "./plugins/vuetify";

Vue.use(VueApollo);

Vue.config.productionTip = false;

// Create an http link:
const queryLink = new HttpLink({
  uri: "http://35.189.161.175:8080/v1/graphql",
  fetch,
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": "myadminsecretkey",
  },
});

// Create a webSocket link:
const subscriptionLink = new WebSocketLink({
  uri: "ws://35.189.161.175:8080/v1/graphql",
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: () => {
      return {
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "myadminsecretkey",
        },
      };
    },
  },
});

export const client = new ApolloClient({
  link: process.env.VUE_APP_TITLE == "Query" ? queryLink : subscriptionLink,
  cache: new InMemoryCache({
    addTypename: true,
  }),
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

new Vue({
  router,
  apolloProvider,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
