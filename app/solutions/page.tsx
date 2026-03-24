import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { ProductSurfaceGrid } from "@/components/monolith/ProductSurfaceGrid";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SolutionsHub() {
  const solutions = [
    {
      name: "Packaging",
      description: "Complex dielines, materials, and volumes — fully calculated and validated. Built for intricate modern production.",
      code: "COMPLEXITY",
      href: "https://budget.printprice.pro",
      ctaText: "Calculate packaging cost →",
      icon: "box"
    },
    {
      name: "Large Format",
      description: "Massive files, tiling, and installation workflows — validated automatically across entire fleets.",
      code: "SCALE",
      href: "/products/preflight",
      ctaText: "Validate large format files →",
      icon: "expand"
    },
    {
      name: "Commercial Print",
      description: "High-volume jobs, fast turnaround, and optimized production routing. Designed for speed and volume.",
      code: "VOLUME",
      href: "/products/control",
      ctaText: "Optimize print run →",
      icon: "layers"
    }
  ];

  return (
    <div className="solutions-hub">
      {/* Solutions Hero - Monolith Enforcement */}
      <HeroPlatform 
        label="PRODUCTION SCENARIOS"
        title={<>BUILT FOR EVERY <br/> PRINT <span style={{ color: 'var(--accent-primary)' }}>PRODUCTION</span></>}
        slogan={["PRICE IT.", "FIX IT.", "PRINT IT."]}
        isHeadlineSlogan={false}
        subheadline="Calculate costs, validate files, and produce — no matter your print workflow. From packaging to large format, one system to control everything."
        primaryAction={{ label: "Start your project →", href: "https://budget.printprice.pro" }}
        secondaryAction={{ label: "See how it works →", href: "#use-cases" }}
      />

      {/* Solutions Grid - Component Enforcement */}
      <div id="use-cases">
        <ProductSurfaceGrid 
          title="Where it works"
          subtitle="Trusted across packaging, publishing, and industrial print. One system, every production reality."
          variant="secondary"
          products={solutions as any}
        />
      </div>

      {/* Extensibility - Tonal Separation */}
      <ActionCTA 
        slogan="PLATFORM CAPABILITY"
        title="One system. Every production flow."
        description="PrintPrice Pro is a programmable system that adapts to your industry. No setup required. Start your project now and take control of your production."
        buttonLabel="Start your project now"
        buttonHref="https://budget.printprice.pro"
        trackingAction="solutions_cta_start_final"
      />
    </div>
  );
}
