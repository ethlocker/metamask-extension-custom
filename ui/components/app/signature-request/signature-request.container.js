import { connect } from 'react-redux';
import {
  accountsWithSendEtherInfoSelector,
  doesAddressRequireLedgerHidConnection,
  getCurrentChainId,
  getRpcPrefsForCurrentProvider,
  getSubjectMetadata,
} from '../../../selectors';
import { isAddressLedger } from '../../../ducks/metamask/metamask';
import { getAccountByAddress } from '../../../helpers/utils/util';
import { MESSAGE_TYPE } from '../../../../shared/constants/app';
import SignatureRequest from './signature-request.component';

function mapStateToProps(state, ownProps) {
  const { txData } = ownProps;
  const {
    msgParams: { from },
  } = txData;
  const hardwareWalletRequiresConnection =
    doesAddressRequireLedgerHidConnection(state, from);
  const isLedgerWallet = isAddressLedger(state, from);
  const chainId = getCurrentChainId(state);
  const rpcPrefs = getRpcPrefsForCurrentProvider(state);
  const subjectMetadata = getSubjectMetadata(state);

  const { iconUrl: siteImage = '' } =
    subjectMetadata[txData.msgParams.origin] || {};

  return {
    isLedgerWallet,
    hardwareWalletRequiresConnection,
    chainId,
    rpcPrefs,
    siteImage,
    // not forwarded to component
    allAccounts: accountsWithSendEtherInfoSelector(state),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {
    allAccounts,
    isLedgerWallet,
    hardwareWalletRequiresConnection,
    chainId,
    rpcPrefs,
    siteImage,
  } = stateProps;
  const {
    signPersonalMessage,
    signTypedMessage,
    cancelPersonalMessage,
    cancelTypedMessage,
    signMessage,
    cancelMessage,
    txData,
  } = ownProps;

  const {
    type,
    msgParams: { from },
  } = txData;

  const fromAccount = getAccountByAddress(allAccounts, from);

  let cancel;
  let sign;

  if (type === MESSAGE_TYPE.PERSONAL_SIGN) {
    cancel = cancelPersonalMessage;
    sign = signPersonalMessage;
  } else if (type === MESSAGE_TYPE.ETH_SIGN_TYPED_DATA) {
    cancel = cancelTypedMessage;
    sign = signTypedMessage;
  } else if (type === MESSAGE_TYPE.ETH_SIGN) {
    cancel = cancelMessage;
    sign = signMessage;
  }

  return {
    ...ownProps,
    ...dispatchProps,
    fromAccount,
    txData,
    cancel,
    sign,
    isLedgerWallet,
    hardwareWalletRequiresConnection,
    chainId,
    rpcPrefs,
    siteImage,
  };
}

export default connect(mapStateToProps, null, mergeProps)(SignatureRequest);
