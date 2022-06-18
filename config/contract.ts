export const CWD_CONTRACT = {
    LOAN_TEMPLATE_PATH: '/home/hieutk/Documents/k5/x-team/make_contract/templates/p2p_loan',
    PATH: '/home/hieutk/Documents/k5/x-team/make_contract/tmp/uploads/${contract_folder}/templates/p2p_loan',
    getPath: (pathConfig, folderContract) => {
        return pathConfig.replace('${contract_folder}', folderContract)
    },
    getPathOut: (folderContract) => {
        return `/home/hieutk/Documents/k5/x-team/make_contract/tmp/uploads/${folderContract}/templates/p2p_loan/out/p2p_loan.wasm`
    }
}
export const ACCOUNT = {
    PRIVATE_KEY: 'ed25519:3kNoHXCVP6FHrkdVnBAJPY9PkrRyrHoJpCGJtUFkBpw6H4FfCmMYnXgwZofc3Mb1KiozcsRupSPtdVXRkPAEnap5',
    ACCOUNT_ADDRESS: 'xteam.testnet'
}