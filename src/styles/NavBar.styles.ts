import { makeStyles } from '@mui/styles';

/**
 * Custom hook to generate styles for the NavBar component.
 */
const useStyles = makeStyles({
    /**
     * Styles for the root element of the NavBar.
     */
    root: {
        flexGrow: 1,
    },
    /**
     * Styles for the menu button element.
     */
    menuButton: {
        marginRight: 16,
    },
    /**
     * Styles for the title element.
     */
    title: {
        flexGrow: 1,
    },
});

export default useStyles;
