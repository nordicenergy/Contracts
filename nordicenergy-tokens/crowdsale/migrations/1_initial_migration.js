const token = artifacts.require('../contracts/NETToken.sol')
const crowdsale = artifacts.require('../contracts/NETCrowdsale.sol')
const setDefaultAccount = require('../scripts/setDefaultAccount.js')

module.exports = function(deployer, network, accounts) {
    const rate = new web3.BigNumber(50000)
    const wallet = '0x99738A8c762774e8A26044C8487C71e0c38C180f'
    const openingTime = (new Date('01.11.2020')).getTime/1000
    const closingTime = (new Date('31.05.2021')).getTime/1000
    const goal = 100000000
    const initialRate = 50000
    const finalRate = 25000
    const cap = 650000000
    // Setup default account
    setDefaultAccount(web3)
    const account = web3.eth.accounts.pop()
    // Get gas limit
    let gasLimit = web3.eth.getBlock('latest').gasLimit
    let gasPrice = web3.eth.gasPrice
    if (process.argv[4] === '--staging') {
        gasPrice *= 4
    }
    console.log(`Determined gas limit: ${gasLimit}; and gas price: ${gasPrice}; max deployment price is ${web3.fromWei(gasPrice * gasLimit, 'ether')} ETH`)
    // Deploy contract
    return deployer
        .then(() => {
            return deployer.deploy(token, { gas: gasLimit, gasPrice: gasPrice, from: account })
        })
        .then(() => {
            // Get gas limit
            gasLimit = web3.eth.getBlock('latest').gasLimit
            console.log(`Determined gas limit: ${gasLimit}; and gas price: ${gasPrice}; estimate max deployment price is ${web3.fromWei(gasPrice * gasLimit, 'ether')} ETH`)
            console.log('This might take a while, please, be patient')
            return deployer.deploy(
                crowdsale,
                token.address,
                rate,
                wallet,
                openingTime,
                closingTime,
                goal,
                initialRate,
                finalRate,
                cap,
                { gas: gasLimit, gasPrice: gasPrice, from: account },
            )
        })
        .then(() => {
            // Make smart-contract an owner
            var tokenContract = web3.eth.contract(token.abi).at(token.address)
            tokenContract.transferOwnership(crowdsale.address)
        });
}