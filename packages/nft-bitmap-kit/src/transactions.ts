import { Mutex } from "async-mutex";
import { NftBitmapClient } from "./index.js";

import { AtomicTransactionComposer, type Transaction } from "algosdk";
import type { Color } from "./colors.js";
import type { WalletManager } from "@txnlab/use-wallet";

const typedClientMutex = new Mutex();
const executeMutex = new Mutex();
export function chunk<T>(txns: T[], size: number = 16) {
  const chunks: T[][] = [];
  for (let i = 0; i < txns.length; i += size) {
    chunks.push(txns.slice(i, i + size));
  }
  return chunks;
}

export function sendChunk(chunk: Transaction[], manager: WalletManager) {
  return executeMutex.runExclusive(() => {
    const atc = new AtomicTransactionComposer();
    chunk.forEach((txn) => {
      atc.addTransaction({ txn, signer: manager.transactionSigner });
    });
    return atc.execute(manager.algodClient, 16);
  });
}

export function bulkTransactionSend(
  manager: WalletManager,
  txns: Transaction[],
  groupSize: number = 16,
) {
  return Promise.all(
    chunk(txns, groupSize).map((chunk) => sendChunk(chunk, manager)),
  );
}
export function imageToTransactions(
  image: Color[][],
  nftClient: NftBitmapClient,
) {
  return Promise.all(
    image
      .flatMap((row, y) => row.map((color, x) => ({ x, y, color })))
      // .filter((_, i, a) => {
      //     if (i === 0) {
      //         console.log(a);
      //     }
      //     return i < 32;
      // })
      .map(({ x, y, color }) =>
        typedClientMutex.runExclusive(() =>
          nftClient
            ?.place([x, y, 1], {
              sendParams: {
                skipSending: true,
                populateAppCallResources: false,
              },
            })
            .then((r) => r.transaction),
        ),
      ),
  );
}
//
// export function executeChunk(chunk: Transaction[], nftClient: NftBitmapClient, algodClient: any, groupSize: number) {
//   return executeMutex.runExclusive(()=>{
//     chunk.forEach((txn)=>{
//       atc.addTransaction({txn, signer: manager.transactionSigner})
//     })
//     return atc.execute(algodClient, groupSize
//   })
// }
