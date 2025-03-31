import * as StellarSdk from '@stellar/stellar-sdk';

const pair = StellarSdk.Keypair.random();
// const pair = StellarSdk.Keypair.fromSecret('SDBIFZCQCTNP73254GW4C7FEI45V3FU2NSD7S43YGDNCD77W5U55AN3H');

console.log(pair.publicKey());
console.log(pair.secret());

(async function main() {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        pair.publicKey(),
      )}`,
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a new account :)\n", responseJSON);
  } catch (e) {
    console.error("ERROR!", e);
  }
})();