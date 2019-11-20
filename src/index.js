import React from "react";
import { render } from "react-dom";
import {
  useQuery,
  ApolloProvider,
  ApolloClient,
  gql,
  InMemoryCache
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "EUR") {
        currency
        rate
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates
    .filter(({ currency }) => ["USD", "GBP", "RUB"].includes(currency))
    .map(({ currency, rate }) => (
      <div key={currency}>
        <p>
          {currency}: {rate}
        </p>
      </div>
    ));
}

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>
        EUR Rate Exchange
        <span role="img" aria-label="rocket">
          &nbsp;🚀&nbsp;
        </span>
        with @apollo/client
      </h2>
      <ExchangeRates />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
