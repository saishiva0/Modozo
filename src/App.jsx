import React from 'react';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import BreakdownSection from './components/BreakdownSection';
import WorkflowSection from './components/WorkflowSection';
import FeaturesSection from './components/FeaturesSection';
import StakeholdersSection from './components/StakeholdersSection';
import ImpactSection from './components/ImpactSection';
import FinalCTA from './components/FinalCTA';

function App() {
  return (
    <div className="font-sans text-brand-navy min-h-screen bg-brand-bg-blue">
      <div id="home"><HeroSection /></div>
      <div id="challenges"><ProblemSection /></div>
      <div id="structure"><BreakdownSection /></div>
      <div id="workflow"><WorkflowSection /></div>
      <div id="features"><FeaturesSection /></div>
      <StakeholdersSection />
      <div id="impact"><ImpactSection /></div>
      <FinalCTA />
    </div>
  );
}

export default App;
