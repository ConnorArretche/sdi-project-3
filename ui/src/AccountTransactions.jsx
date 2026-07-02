import { useState, useEffect} from 'react'


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
            <div className='recent-transactions'>
                <h1>Transactions</h1>
                {transaction.map((t) =>
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

export default AccountTransactions