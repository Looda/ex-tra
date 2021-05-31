import Typography from '@material-ui/core/Typography'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import RecordsList from './components/RecordsList'

const Records: React.FC = () => {
    return (
        <div>
            <Typography variant="h4">
                <FormattedMessage id="records.title" />
            </Typography>
            <RecordsList />
        </div>
    )
}

export default Records
