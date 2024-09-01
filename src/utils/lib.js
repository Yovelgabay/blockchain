import { ethers } from "ethers";
import { coinList, coinsListTest } from "./coinList";
import { getTickers } from "./data";
import { getTempWallet, setTempWallet } from "./storage";

// Connects to the Sepolia Ethereum testnet via Infura using a given API key.
const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/558115e7eba44a98a2148e3f38a8d525",
);

// Standardized paths used to generate addresses for various cryptocurrencies from a mnemonic seed.
const derivationPath = {
  ADA: "m/1852'/1815'/0'/",
  AVAX: "m/44'/9000'/0'/",
  BTC: "m/44'/0'/0'/",
  BCH: "m/44'/145'/0'/",
  BNB: "m/44'/714'/0'/",
  DASH: "m/44'/5'/0'/",
  DOGE: "m/44'/3'/0'/",
  DOT: "m/44'/354'/0'/",
  EOS: "m/44'/194'/0'/",
  ETH: "m/44'/60'/0'/",
  LTC: "m/44'/2'/0'/",
  MATIC: "m/44'/60'/0'/",
  SOL: "m/44'/501'/0'/",
};

// Generates a new random mnemonic phrase for wallet creation.
export const CreateMnemonic = async () => {
  const randomWallet = ethers.Wallet.createRandom();
  return randomWallet.mnemonic.phrase;
};

// Generates a wallet for a specific coin using the provided mnemonic and derivation path.
export const CreateWallet = async (coin, mnemonic, index = 0) => {
  const path = `${derivationPath[coin]}0/${index}`;
  const wallet = ethers.Wallet.fromMnemonic(mnemonic, path).connect(provider);
  const privateKey = wallet.privateKey;
  const address = wallet.address;
  const coinInfo = coinList[coin];
  return { coinInfo, address, privateKey };
};
// Creates a testnet wallet using provided address and private key.
export const CreateWalletTest = (coin, address, privateKey) => {
  const coinInfo = coinsListTest[coin];
  return { coinInfo, address, privateKey };
};
// Creates wallets for multiple coins from a new mnemonic.
export const CreateWallets = async (name) => {
  const mnemonic = await CreateMnemonic();
  return await RestoreWallets(name, mnemonic);
};
//  Restores wallets for multiple coins using an existing mnemonic.
export const RestoreWallets = async (name, mnemonic) => {
  // default mainnet accounts
  const BTC = await CreateWallet("BTC", mnemonic);
  const ETH = await CreateWallet("ETH", mnemonic);
  // default testnet accounts
  const wBTC = CreateWalletTest("wBTC", BTC.address, BTC.privateKey);
  const sETH = CreateWalletTest("sETH", ETH.address, ETH.privateKey);

  return {
    mnemonic,
    name: name,
    mainnet: {
      ETH: ETH,
      BTC: BTC,
    },
    testnet: {
      sETH: sETH,
      wBTC: wBTC,
    },
  };
};

export const getBalances = async (wallet, dispatch, network) => {
  // Fetch the balances for all coins
  const balances = await Promise.all(
    Object.entries(wallet[network]).map(async ([key, value]) => {
      // Fetch the balance from the provider
      const balance = await provider.getBalance(value.address);
      // Format the balance in Ether
      const formattedBalance = ethers.utils.formatEther(balance);
      return [key, parseFloat(formattedBalance)];
    }),
  ).then((results) => Object.fromEntries(results));

  // Fetch tickers and calculate the total USD balance
  const tickers = await getTickers();
  let totalBalanceInUSD = Object.entries(balances).reduce(
    (acc, [key, balance]) => {
      // Adjust the symbol based on the network
      const symbol =
        network === "testnet" ? key.substring(1).toLowerCase() : key;
      const ticker = tickers.find((t) => t.symbol === symbol);

      if (ticker) {
        // Calculate the USD value of the balance
        const price = parseFloat(ticker.current_price) || 0;
        acc += balance * price;
      }

      return acc;
    },
    0,
  );

  // Format the total balance in USD
  const balance = totalBalanceInUSD.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

  // Dispatch the updated state
  dispatch({ type: "SET_ALL", param: { wallet, tickers, balances, balance } });
};

// Sends cryptocurrency to a specified address, verifying the private key and checking the sender's balance before initiating the transaction.
export const send = async (address, coin, amount, pk) => {
  const recipientAddress = address;
  const wallet = getTempWallet();
  const valueToSend = parseInt(amount);
  let tempPk;

  let coinSelect = wallet.mainnet[coin];
  console.log(coinSelect);
  if (coinSelect === null || coinSelect === undefined) {
    coinSelect = wallet.testnet[coin];
    tempPk = wallet.testnet[coin].privateKey;
  } else {
    tempPk = wallet.mainnet[coin].privateKey;
  }

  if (pk !== tempPk) {
    console.log("wrong pk");
    return "wrong private key!";
  }

  const testWallet = new ethers.Wallet(pk, provider);
  let sendBalance;
  await provider.getBalance(testWallet.address).then((result) => {
    sendBalance = ethers.utils.formatEther(result);
  });

  if (sendBalance < amount || sendBalance <= 0) {
    console.log("wrong money");
    return "not enough money!";
  }

  console.log("wallet", wallet);
  console.log("sender: ", provider.getBalance(testWallet.address));
  console.log("reciver: ", provider.getBalance(recipientAddress));

  const tx = {
    to: recipientAddress,
    value: ethers.utils.parseEther(amount),
    gasLimit: 21000,
    gasPrice: ethers.BigNumber.from("20000000000"),
  };
  console.log(tx);

  //return
  const txHash = await testWallet.sendTransaction(tx);
  console.log(`Transaction hash: ${txHash}`);
  return "money sent!";
};
