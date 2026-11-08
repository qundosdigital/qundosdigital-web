import { motion } from "framer-motion";

const PageTransition = () => {
  const transition = { duration: 0.5, ease: [0.76, 0, 0.24, 1] };

  return (
    <>
      {/* THIS LAYER ONLY RUNS WHEN LEAVING (EXITING) A PAGE.
          It slides UP to cover the screen.
      */}
      <motion.div
        style={{
          position: "fixed",
          bottom: 0, // Start at the bottom
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "#fbfbfb",
          zIndex: 100,
        }}
        initial={{ height: 0 }}
        animate={{ height: 0 }}
        exit={{ height: "100vh" }} // Grows to cover the screen on exit
        transition={transition}
      />

      {/* THIS LAYER ONLY RUNS WHEN ENTERING THE NEW PAGE.
          It starts at 100% height and shrinks to 0.
      */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, // Stay at the top
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "#fbfbfb",
          zIndex: 100,
        }}
        initial={{ height: "100vh" }} // Starts covering the screen
        animate={{ height: 0 }}      // Shrinks to reveal the page
        transition={{ ...transition, delay: 0.2 }} // Small delay so the eye settles
      />
    </>
  );
};

export default PageTransition;