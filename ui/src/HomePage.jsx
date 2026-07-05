import { useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { SettingsContext } from './SettingsContext'
import './HomePage.css'

function HomePage(){
    const [account, setAccount] = useState([]);
    const [transactions, setTransactions] = useState([])
    const {richMode, setRichMode} = useContext(SettingsContext)
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8081/accounts')
        .then(res => res.json())
        .then(data => {
            setAccount(Array.isArray(data) ? data : [])
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:8081/transactions')
        .then(res => res.json())
        .then(data => {
            setTransactions(data.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,3))
        })
    }, [])

    return(
        <div className='container'>
            <div className='acct-box'>
            <h1>Accounts</h1>
            {account.map((acct) =>
            (
                <div className='account_item' key={acct.id} onClick={() => navigate(`/account/${acct.id}`)}>
                    <p>Account Number: {acct.acct_num}</p>
                    <p>Account Name: {acct.account_type}</p>
                    <p>${richMode === 'Rich Mode' ? (acct.balance * 10000).toLocaleString(): acct.balance.toLocaleString()}</p>
                </div>
            ))}
            </div>

            <div className='recent-transactions'>
                <h1>Recent Activity</h1>
                {transactions.map((t) =>
                (
                    <div className='transaction-box' key={t.time_stamp}>
                        <p>${t.amount}</p>
                        <p>{t.description}</p>
                    </div>
                ))}

            </div>
        </div>
    )

}

export default HomePage