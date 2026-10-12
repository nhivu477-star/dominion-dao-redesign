require('@nomicfoundation/hardhat-ethers');
const { subtask } = require('hardhat/config');
const { TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD } = require('hardhat/builtin-tasks/task-names');
subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD).setAction(async ({solcVersion}, hre, runSuper) => {
  if (solcVersion === '0.8.19') return {compilerPath: require.resolve('solc/soljson.js'), isSolcJs: true, version: solcVersion, longVersion: require('solc').version()};
  return runSuper();
});
module.exports = {solidity: {version:'0.8.19', settings:{optimizer:{enabled:true,runs:200}}}, networks:{localhost:{url:'http://127.0.0.1:8545'}}};
