import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { RequestNetwork } from '@requestnetwork/request-client.js';

import { createWalletClient, http } from 'viem'
import { sepolia } from 'viem/chains'

export const initializeRequestNetworkDummy = () => {
  try {

    const client = createWalletClient({
      chain: sepolia,
      transport: http()
    })

    const web3SignatureProvider = new Web3SignatureProvider(client);

    // Initialize HttpRequestNetwork with minimal configuration
    const requestNetwork = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL: 'https://gnosis.gateway.request.network/', // Minimalistic node configuration
      },
      signatureProvider: web3SignatureProvider,
      httpConfig: {
        getConfirmationMaxRetry: 120,
      },
    });

    return requestNetwork; // Set the RequestNetwork instance
  } catch (error) {
    console.error('Failed to initialize the dummy Request Network:', error);
    
  }
};