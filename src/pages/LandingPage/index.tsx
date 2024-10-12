import NavBar from "./local-components/NavBar";
import BenefitsSection from "./local-components/BenefitsSection";
import FinanceOverview from "./local-components/FinanceOverview";
import Footer from "./local-components/Footer";
import MissionSection from "./local-components/MissionSection";
import ServicesSection from "./local-components/ServicesSection";
import { motion, Variants } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";

/**
 * LandingPage component that renders the main landing page of the application.
 * It includes various sections such as NavBar, FinanceOverview, BenefitsSection,
 * MissionSection, ServicesSection, and Footer. It also applies animations to
 * these sections based on the screen size.
 */
const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /**
   * Returns an animated section if the screen size is not mobile.
   * Otherwise, it returns a regular div containing the children.
   *
   * @param children - The content to be wrapped in the animated section.
   * @param variants - The animation variants to be applied.
   * @returns A motion.div or div containing the children.
   */
  const getAnimatedSection = (
    children: React.ReactNode,
    variants: Variants
  ) => {
    if (isMobile) {
      return <div>{children}</div>;
    }
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      <NavBar />
      {getAnimatedSection(<FinanceOverview />, sectionVariants)}
      {getAnimatedSection(<BenefitsSection />, sectionVariants)}
      {getAnimatedSection(<MissionSection />, sectionVariants)}
      {getAnimatedSection(<ServicesSection />, sectionVariants)}
      <Footer />
    </div>
  );
};

export default LandingPage;
