import AppInset from "~/layouts/app/app-inset";
import SectionFeature from "./sections/section-feature";
import SectionHero from "./sections/section-hero";

const Index = () => {
  return (
    <AppInset>
      <SectionHero />
      <SectionFeature />
    </AppInset>
  );
};

export default Index;
