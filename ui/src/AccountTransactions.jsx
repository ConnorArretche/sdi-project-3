import { useState, useEffect} from 'react'
import './AccountTransactions.css'


function AccountTransactions(){
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
    fetch('http://localhost:8081/transactions')
    .then(res => res.json())
    .then(data => {
        setTransaction(data)
    })
}, [])

    return(
        <div>
            <div className='recent-transactions-box'>
                <h1>Transactions</h1>
                {transaction.map((t) =>
                (
                    <div className='acct-trs-box' key={t.id}>
                        <p className='trs-amount'>${t.amount}</p>
                        <p className='trs-desc'>{t.description}</p>
                        <p className='trs-category'>Category: {t.name}</p>
                    </div>
                ))}

            </div>
        </div>
    )

}

export default AccountTransactions