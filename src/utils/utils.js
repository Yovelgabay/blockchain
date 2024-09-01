export const price = (state, sym, num) => {
  if (!sym) sym = state.selectedCoin;
  const s = state.testnet ? sym.substr(1).toLowerCase() : sym.toLowerCase();
  const ticker = state.tickers?.find((t) => t.symbol === s);
  if (ticker) {
    const price = ticker.current_price;
    return num
      ? price
      : price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  return "";
};

export const change = (state, sym) => {
  if (!sym) sym = state.selectedCoin;
  const s = state.testnet ? sym.substr(1).toLowerCase() : sym.toLowerCase();
  const ticker = state.tickers?.find((t) => t.symbol === s);
  if (ticker) {
    const ch = ticker.price_change_percentage_24h;
    if (ch !== undefined) {
      const color = ch > 0 ? "text-green-500" : "text-red-500";
      const sign = ch > 0 ? "+" : "";
      return { color, change: `${sign}${ch.toFixed(2)}%` };
    }
  }
  return { color: "", change: "" };
};

export const cost = (state, sym) => {
  const keyMapping = {
    sETH: "ethereum",
    wBTC: "bitcoin",
  };
  const tickerKey = keyMapping[sym] || sym;
  const balance = parseFloat(state.balances[sym]) || 0;
  const ticker = state.tickers?.find((t) => t.id === tickerKey);
  if (ticker) {
    const price = parseFloat(ticker.current_price) || 0;
    return (balance * price).toFixed(2);
  }
  return "0.00";
};

export const round = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

export const getBalances = async (wallet, dispatch, network) => {
  // Step 1: Retrieve the balances for each coin in the wallet
  let balances = await Promise.all(
    Object.entries(wallet[network]).map(([key, value]) =>
      provider
        .getBalance(value.address)
        .then((result) => [key, ethers.utils.formatEther(result)]),
    ),
  ).then((results) => Object.fromEntries(results));

  // Step 2: Fetch the latest cryptocurrency prices
  await getTickers().then((tickers) => {
    // Map of wallet keys to ticker keys
    const keyMapping = {
      wBTC: "bitcoin",
      sETH: "ethereum",
    };

    // Step 3: Calculate the total balance in USD
    let totalBalanceUSD = Object.entries(balances).reduce((acc, [k, v]) => {
      // If the network is testnet, strip the leading character
      if (network === "testnet") {
        k = k.substring(1);
      }

      // Map the balance key to the appropriate ticker key
      const tickerKey = keyMapping[k] || k.toLowerCase();
      console.log("tickerKey", tickerKey);

      const ticker = tickers?.find((t) => t.id === tickerKey);
      if (ticker) {
        const price = parseFloat(ticker.current_price) || 0;
        acc += parseFloat(v) * price;
        console.log("acc", acc);
      } else {
        console.log(`No ticker found for ${k}`);
      }

      return acc;
    }, 0);

    // Format the total balance in USD
    totalBalanceUSD = totalBalanceUSD.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
    console.log("Final totalBalanceUSD:", totalBalanceUSD);

    // Update the application state with balances and total balance
    dispatch({
      type: "SET_ALL",
      param: { wallet, tickers, balances, balance: totalBalanceUSD },
    });
  });
};
