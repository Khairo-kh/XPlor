import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BigNum from "bn.js";

export function lamportsToSol(lamports: number | BigNum): string {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  if (typeof lamports === "number") {
    return formatter.format(Math.abs(lamports) / LAMPORTS_PER_SOL);
  }

  let signMultiplier = 1;

  lamports.isNeg() ? (signMultiplier = -1) : (signMultiplier = 1);

  const absLamportsVal = lamports.abs();
  const lamportsString = absLamportsVal.toString(10).padStart(10, "0");
  const splitIndex = lamportsString.length - 9;
  const solString =
    lamportsString.slice(0, splitIndex) +
    "." +
    lamportsString.slice(splitIndex);
  return formatter.format(signMultiplier * parseFloat(solString));
}