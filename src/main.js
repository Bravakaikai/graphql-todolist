import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueApollo from "vue-apollo";

import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import vuetify from "./plugins/vuetify";

Vue.use(VueApollo);

Vue.config.productionTip = false;

// Create an http link:
const link = new HttpLink({
  uri: "http://35.189.161.175:8080/v1/graphql",
  fetch,
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": "myadminsecretkey",
  },
});
const client = new ApolloClient({
  link: link,
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
