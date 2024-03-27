import { Card, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0]

    const referenceNum = searchQuery.get('reference')
  return (
    <div style={{height:'100vh' , display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
        <Card  style={{height:'200px', width:'300px', textAlign: 'center'}}>
            <Typography  variant='h5'style={{textTransform:'uppercase'}}>
            Order successful
            </Typography>
            <Typography  > Reference No : {referenceNum} </Typography>
        </Card>
    </div>
  )
}

export default PaymentSuccess