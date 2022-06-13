export const fns = {
    counter: {
        impl_fns: {
            impl_from_for_account: 'impl From<VersionedAccount> for Account {\n'
                + 'fn from(account: VersionedAccount) -> Self {\n'
                +   'match account {\n'
                +        'VersionedAccount::Current(account) => account,\n'
                +        'VersionedAccount::V1(v1) => Account {\n'
                +           'vote: v1.vote,\n'
                +           'balance: v1.balance,\n'
                +           'bio: String::from("migrate bio"),\n'
                +           'last_change: 0\n'
                +       '},\n'
                +       'VersionedAccount::V2(v2) => Account {\n'
                +           'vote: v2.vote,\n'
                +           'balance: v2.balance,\n'
                +           'bio: v2.bio,\n'
                +           'last_change: 0\n'
                +       '}\n'
                +   '}\n'
                +    '}\n'
                + '}\n',


            impl_from_for_version_account: 'impl From<Account> for VersionedAccount {\n'
                + 'fn from(account: Account) -> Self {\n'
                +    'VersionedAccount::Current(account)\n'
                + '}\n'
                + '}\n',
        },
        contract_fns: {
            init: '#[init]\n'
            + 'pub fn new() -> Self {\n'
            +    '{$contract_name} { \n'
            +        'value: 0,\n' 
            +        'new_value: 0,\n'
            +        'accounts: LookupMap::new(StorageKey::AccountKey)\n'
            +    '}\n'
            + '}\n',

            get_num: 'pub fn get_num(&self) -> u8 {'
                + 'self.value'
            + '}',
        
            get_new_num: 'pub fn get_new_num(&self) -> u8 {'
                + 'self.new_value'
            + '}',
        
            set_num: '#[payable]'
            + 'pub fn set_num(&mut self, new_value: u8) {'
            +    'self.value = new_value;'
            + '}',
        
            increment: 'pub fn increment(&mut self) {'
            +    'self.value += 1;'
            + '}',
        
            get_account: 'pub fn get_account(&self, account_id: AccountId) -> Account {'
                + 'let v_account = self.accounts.get(&account_id).unwrap();'
        
                + 'Account::from(v_account)'
            + '}',
        
            add_account: 'pub fn add_account(&mut self) {'
                + 'let v_account = self.accounts.get(&env::predecessor_account_id());'
        
                + 'if v_account.is_none() {'
                +    'let account = Account::default();'
                +    'let v_account = VersionedAccount::from(account);'
                +    'self.accounts.insert(&env::predecessor_account_id(), &v_account);'
                + '}'
            + '}',
        }
    }
}