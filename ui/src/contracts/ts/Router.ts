/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  SubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
} from "@alephium/web3";
import { default as RouterContractJson } from "../dex/router.ral.json";

// Custom types for the contract
export namespace RouterTypes {
  export type State = Omit<ContractState<any>, "fields">;
}

class Factory extends ContractFactory<RouterInstance, {}> {
  at(address: string): RouterInstance {
    return new RouterInstance(address);
  }

  async testAddLiquidity_Method(
    params: Omit<
      TestContractParams<
        never,
        {
          reserve0: bigint;
          reserve1: bigint;
          amount0Desired: bigint;
          amount1Desired: bigint;
          amount0Min: bigint;
          amount1Min: bigint;
        }
      >,
      "initialFields"
    >
  ): Promise<TestContractResult<[bigint, bigint]>> {
    return testMethod(this, "addLiquidity_", params);
  }

  async testAddLiquidityMethod(
    params: Omit<
      TestContractParams<
        never,
        {
          tokenPair: HexString;
          sender: HexString;
          amount0Desired: bigint;
          amount1Desired: bigint;
          amount0Min: bigint;
          amount1Min: bigint;
          deadline: bigint;
        }
      >,
      "initialFields"
    >
  ): Promise<TestContractResult<[bigint, bigint, bigint]>> {
    return testMethod(this, "addLiquidity", params);
  }

  async testRemoveLiquidityMethod(
    params: Omit<
      TestContractParams<
        never,
        {
          tokenPairId: HexString;
          sender: HexString;
          liquidity: bigint;
          amount0Min: bigint;
          amount1Min: bigint;
          deadline: bigint;
        }
      >,
      "initialFields"
    >
  ): Promise<TestContractResult<[bigint, bigint]>> {
    return testMethod(this, "removeLiquidity", params);
  }

  async testGetReserveInAndReserveOutMethod(
    params: Omit<
      TestContractParams<never, { tokenPair: HexString; tokenInId: HexString }>,
      "initialFields"
    >
  ): Promise<TestContractResult<[bigint, bigint]>> {
    return testMethod(this, "getReserveInAndReserveOut", params);
  }

  async testSwapExactTokenForTokenMethod(
    params: Omit<
      TestContractParams<
        never,
        {
          tokenPair: HexString;
          sender: HexString;
          tokenInId: HexString;
          amountIn: bigint;
          amountOutMin: bigint;
          deadline: bigint;
        }
      >,
      "initialFields"
    >
  ): Promise<TestContractResult<null>> {
    return testMethod(this, "swapExactTokenForToken", params);
  }

  async testSwapTokenForExactTokenMethod(
    params: Omit<
      TestContractParams<
        never,
        {
          tokenPair: HexString;
          sender: HexString;
          tokenInId: HexString;
          amountInMax: bigint;
          amountOut: bigint;
          deadline: bigint;
        }
      >,
      "initialFields"
    >
  ): Promise<TestContractResult<null>> {
    return testMethod(this, "swapTokenForExactToken", params);
  }
}

// Use this object to test and deploy the contract
export const Router = new Factory(
  Contract.fromJson(
    RouterContractJson,
    "",
    "dc75c12ca63a4824309f3d22036c6f0b690d3f82881f50b81afe382a43238bee"
  )
);

// Use this class to interact with the blockchain
export class RouterInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<RouterTypes.State> {
    return fetchContractState(Router, this);
  }

  async callAddLiquidityMethod(
    params: CallContractParams<{
      tokenPair: HexString;
      sender: HexString;
      amount0Desired: bigint;
      amount1Desired: bigint;
      amount0Min: bigint;
      amount1Min: bigint;
      deadline: bigint;
    }>
  ): Promise<CallContractResult<[bigint, bigint, bigint]>> {
    return callMethod(Router, this, "addLiquidity", params);
  }

  async callRemoveLiquidityMethod(
    params: CallContractParams<{
      tokenPairId: HexString;
      sender: HexString;
      liquidity: bigint;
      amount0Min: bigint;
      amount1Min: bigint;
      deadline: bigint;
    }>
  ): Promise<CallContractResult<[bigint, bigint]>> {
    return callMethod(Router, this, "removeLiquidity", params);
  }
}
