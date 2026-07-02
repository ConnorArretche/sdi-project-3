import { useState, useEffect, useContext } from 'react'
import { useParams} from 'react-router-dom'

function AccountDetails(){
    let {id} = useParams();
    let [account, setAccount] = useState(null);
    let [transactions, setTransactions] = useState([]);

    useEffect(() => {
    fetch(`http://localhost:8081/accounts/${id}`)
    .then(res => res.json())
    .then(data => {
        setAccount(data)
    })
}, [id])

    useEffect(() => {
    fetch(`http://localhost:8081/accounts/${id}/transactions`)
    .then(res => res.json())
    .then(data => {
        setTransactions(Array.isArray(data) ? data : [])
    })
    }, [id])

    if (!account) return <p>Loading...</p>

    return(
        <div>
            <h1>Account</h1>
                <div className='account-box'>
                    <p>Account Number: {account.acct_num}</p>
                    <p>Account Type: {account.account_type}</p>
                    <p>Balance: ${account.balance}</p>
                </div>



            <div className='transaction-box'>
            <h1>Transactions</h1>
            {transactions.map((t) =>
            (
                <div className='account_item' key={t.id}>
                    <p>Amount {t.amount}</p>
                    <p>Description: {t.description}</p>
                </div>
            ))}
            </div>
        </div>
    )


}

export default AccountDetails