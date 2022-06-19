/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';
import { ACCOUNT, MARKET_CONTRACT } from 'Config/contract';
import { addContractToMarket, buildContract, deployContractLoan, makeContract } from './controllers/loanContract';

Route.post('/make_contract', async ({ }) => {
  const { exec } = require('node:child_process');
  const out = await (new Promise((resolve) => {
    exec(`./debug.sh`, { cwd: '/home/www-data/make_contract/build' }, async (error, stdout) => {
      resolve(stdout + error)
    })
  }))
  return { success: out }
})

Route.post('/make_contract_loan', async ({ request }) => {
  const body = request.body()
  const attributes = body.contract.attributes
  let creatorName = ''
  let contractName = ''
  attributes.map(attr => {
    if (attr.name == 'creator') {
      creatorName = attr.value
    }
    if (attr.name == 'contract_name') {
      contractName = attr.value
    }
  })
  const dt = (new Date()).getTime()
  const accountdeployed = `${dt}-deploy.${ACCOUNT.ACCOUNT_ADDRESS}`

  const contractPath = await makeContract(request)
  await buildContract(contractPath)
  const resDeploy = await deployContractLoan(accountdeployed, contractPath)

  await addContractToMarket(creatorName, accountdeployed, MARKET_CONTRACT.WEB_URL, contractName)
  return { success: true, smartcontract: accountdeployed, web: MARKET_CONTRACT.WEB_URL, contract_name: contractName, creator_name: creatorName, hash: resDeploy.transaction.hash }
})
