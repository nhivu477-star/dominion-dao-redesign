const hre = require('hardhat');
async function main(){ const dao = await (await hre.ethers.getContractFactory('DominionDAO')).deploy(); await dao.waitForDeployment(); console.log('DominionDAO:', await dao.getAddress()); }
main().catch(e=>{console.error(e);process.exitCode=1});
