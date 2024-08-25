export const getTickers = async () => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano";
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
