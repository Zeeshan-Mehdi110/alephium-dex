import { groupOfAddress } from '@alephium/web3'
import { default as devnetDeployment } from '../../artifacts/.deployments.devnet.json'
import { default as testnetDeployment } from '../../artifacts/.deployments.testnet.json'

export interface NetworkConfig {
  networkId: number
  groupIndex: number
  factoryId: string
  routerId: string
}

export type NetworkName = 'mainnet' | 'testnet' | 'devnet'

export const networkName: NetworkName = (import.meta.env.VITE_NETWORK) as NetworkName

export const network: NetworkConfig = getNetworkConfig(networkName)

export const checkTxConfirmedFrequency = networkName === 'devnet' ? 1 : 15 // seconds
export const eventPollingInterval = networkName === 'devnet' ? 1 : 15 // seconds

function getNetworkConfig(network: NetworkName): NetworkConfig {
  if (network === 'mainnet') {
    throw new Error('Not support now')
  }

  const deployment = (network === 'testnet' ? testnetDeployment : devnetDeployment) as any
  if (deployment.contracts === undefined) {
    throw new Error(`Please deploy the DEX contract to ${networkName} first`)
  }
  return {
    networkId: network === 'testnet' ? 1 : 4,
    groupIndex: groupOfAddress(deployment.deployerAddress),
    factoryId: deployment.contracts.TokenPairFactory.contractId,
    routerId: deployment.contracts.Router.contractId
  }
}
