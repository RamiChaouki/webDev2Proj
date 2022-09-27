import { SearchInput } from 'react-admin';
import { Chip } from '@mui/material';
import useTranslate from 'react';

const QuickFilter = ({ label }) => {
    const translate = useTranslate();
    return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};

const userFilters = [
    <SearchInput source="q" alwaysOn />,
    <QuickFilter source="role" label="Role (Admin)" defaultValue={"admin"} />,
    <QuickFilter source="status" label="Status (Banned)" defaultValue={"banned"} />,
];

export default userFilters;

