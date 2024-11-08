import { Tooltip, Fab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

interface HomeFloatingButtonProps {
    onLandingPageClick: () => void;
}

export const HomeFloatingButton = ({
    onLandingPageClick,
}: HomeFloatingButtonProps) => {
    return (
        <Tooltip title="Back to Landing" aria-label="back-to-landing">
            <Fab
                color="primary"
                aria-label="back-to-landing"
                onClick={onLandingPageClick}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    left: 16,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.2)",
                        bgcolor: "primary.dark",
                    },
                }}
            >
                <HomeIcon />
            </Fab>
        </Tooltip>
    );
};
