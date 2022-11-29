/**
 * @typedef {object} FirstTimeState
 * @property {object} config Initial configuration parameters
 * @property {object} NetworkController Network controller state
 */

import {
  NETWORK_TYPES,
  getRpcUrl,
  TEST_NETWORK_TICKER_MAP,
  CURRENCY_SYMBOLS,
  CHAIN_IDS,
} from '../../shared/constants/network';

/**
 * @type {FirstTimeState}
 */
const initialState = {
  config: {},
  PreferencesController: {
    frequentRpcListDetail: [
      {
        label: NETWORK_TYPES.MAINNET,
        nickname: 'Ethereum Mainnet',
        iconColor: '#29B6AF',
        providerType: NETWORK_TYPES.MAINNET,
        rpcUrl: getRpcUrl({
          network: NETWORK_TYPES.MAINNET,
          excludeProjectId: true,
        }),
        chainId: CHAIN_IDS.MAINNET,
        ticker: CURRENCY_SYMBOLS.ETH,
        blockExplorerUrl: 'https://etherscan.io',
      },
      {
        label: NETWORK_TYPES.GOERLI,
        nickname: 'Georli test network',
        iconColor: '#3099f2',
        providerType: NETWORK_TYPES.GOERLI,
        rpcUrl: getRpcUrl({
          network: NETWORK_TYPES.GOERLI,
          excludeProjectId: true,
        }),
        chainId: CHAIN_IDS.GOERLI,
        ticker: TEST_NETWORK_TICKER_MAP[NETWORK_TYPES.GOERLI],
        blockExplorerUrl: 'https://goerli.etherscan.io',
      },
      {
        label: NETWORK_TYPES.SEPOLIA,
        nickname: 'Sepolia test network',
        iconColor: '#CFB5F0',
        providerType: NETWORK_TYPES.SEPOLIA,
        rpcUrl: getRpcUrl({
          network: NETWORK_TYPES.SEPOLIA,
          excludeProjectId: true,
        }),
        chainId: CHAIN_IDS.SEPOLIA,
        ticker: TEST_NETWORK_TICKER_MAP[NETWORK_TYPES.SEPOLIA],
        blockExplorerUrl: 'https://sepolia.etherscan.io',
      },
      {
        label: 'Localhost 8545',
        nickname: 'Localhost 8545',
        rpcUrl: 'http://localhost:8545',
        chainId: '0x539',
        ticker: 'ETH',
        iconColor: 'var(--color-icon-alternative)',
        providerType: NETWORK_TYPES.LOCALHOST,
        rpcPrefs: {},
        blockExplorerUrl: '',
      },
    ],
  },
};

export default initialState;
