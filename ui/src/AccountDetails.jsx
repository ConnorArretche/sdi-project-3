import { useState, useEffect, useContext } from 'react'
import { useParams} from 'react-router-dom'
import { SettingsContext } from './SettingsContext';

function AccountDetails(){
    let {id} = useParams();
    let [account, setAccount] = useState(null);
    let [transactions, setTransactions] = useState([]);
    let [transactionForm, setTransactionForm] = useState(false);
    let [formData, setFormData] = useState({amount: '', description: ''});
    let [status, setStatus] = useState('');
    let [refresh, setRefresh] = useState(0);
    let [accountData, setAccountData] = useState({account_type: ''})
    let [accountEdit, setAccountEdit] = useState();
    let [accountForm, setAccountForm] = useState(false);

    const {richMode, setRichMode} = useContext(SettingsContext)


    useEffect(() => {
    fetch(`http://localhost:8081/accounts/${id}`)
    .then(res => res.json())
    .then(data => {
        setAccount(data)
    })
}, [id, refresh])

    useEffect(() => {
    fetch(`http://localhost:8081/accounts/${id}/transactions`)
    .then(res => res.json())
    .then(data => {
        setTransactions(Array.isArray(data) ? data : [])
    })
    }, [refresh])

    let inputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    let accountChange = (e) => {
    const {name, value} = e.target;
    setAccountData({
        ...accountData,
        [name]: value
    })
}
    let handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Saving...');
        try {
            const response = await fetch(`http://localhost:8081/accounts/${id}/transactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setStatus('Transaction Saved!');
                setFormData({amount: '', description: ''});
                setTransactionForm(false);
                setRefresh(refresh + 1)
            } else {
                setStatus('Failed to Save Transaction')
            }
        } catch (error) {
            console.error('Error updating database:', error);
            setStatus('An Error Occurred.')
        }
    }

    let handleDelete = async (transactionId) => {
        setStatus('Deleting...');
        try {
            const response = await fetch(`http://localhost:8081/transactions/${transactionId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
            });
            if (response.ok) {
                setTransactions(transactions.filter(t => t.id !== transactionId));
            } else {
                console.error('Failed to Delete Transaction', error)
            }
        } catch(error) {
            console.error('Error updating database:', error);
            setStatus('ERROR')
        }
    }

    let editAccount = async (e) => {
        e.preventDefault();
        setStatus('Saving Account...')
        try {
            const response = await fetch(`http://localhost:8081/accounts/${id}`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(accountData)
            });
                if (response.ok) {
                    setStatus('Account Updated')
                    setAccountForm(false)
                    setAccountData({account_type: ''})
                    setRefresh(refresh + 1)
                } else {
                    setStatus('Failed to Save Account')
                }
        } catch(error) {
            console.error('Error updating Database:', error);
            setStatus('Error on Accounts')
        }
    }

    if (!account) return <p>Loading...</p>

    return(
        <div>
            <h1>Account</h1>
                <div className='account-box'>
                    <p>Account Number: {account.acct_num}</p>
                    <p>Account Type: {account.account_type}</p>
                    <p>${richMode === 'Rich Mode' ? (account.balance * 10000).toLocaleString(): account.balance.toLocaleString()}</p>
                    <button onClick={() => setAccountForm(!accountForm)}>{accountForm ? 'Cancel': 'Edit Account'}</button>
                    {accountForm && (
                        <form className='account-form' onSubmit={editAccount}>
                            <label>
                                Edit Account Type:
                                <input type="text" placeholder='Enter Account Type' name="account_type" value={accountData.account_type} onChange={accountChange}/>
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>

            <div className='transaction-box'>
            <h1>Transactions</h1>
            <button onClick={() => setTransactionForm(!transactionForm)}>{transactionForm ? 'Cancel' : 'Add Transaction'}</button>
            {transactionForm && (
                <form className='transaction-form' onSubmit={handleSubmit}>
                    <label>
                        Amount:
                        <input type="text" placeholder='Enter an Amount' name="amount" value={formData.amount} onChange={inputChange}/>
                    </label>
                    <label>
                        Description:
                        <input type="text" placeholder='Enter a Description' name="description" value={formData.description} onChange={inputChange}/>
                    </label>
                    <button type="submit">Submit</button>

                </form>
            )}
            {transactions.map((t) =>
            (
                <div className='account_item' key={t.id}>
                    <p>Amount {t.amount}</p>
                    <p>Description: {t.description}</p>
                    <button onClick={() => handleDelete(t.id)}>Delete</button>
                </div>
            ))}
            </div>
        </div>
    )


}

export default AccountDetails