import { Box } from "@mui/material";
import PageHeader from "../../components/PageHeader";

export const ProfilePage = () => {
    return <>
        <PageHeader titleKey="PROFILE_PAGE" />
        <Box sx={{ p: 2 }}>
            <h1>Profile Page</h1>
            <p>Profile page content</p>
        </Box>
    </>;
}