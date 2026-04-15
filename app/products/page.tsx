import { HeroPlatform } from "@/components/monolith/HeroPlatform";
import { ProductSurfaceGrid } from "@/components/monolith/ProductSurfaceGrid";
import { Section } from "@/components/ui/Section";
import { ActionCTA } from "@/components/monolith/ActionCTA";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ProductsHub() {
  const categories = [
    {
      title: "Commercial & Sales",
      products: [
        { name: "Budget", description: "Enterprise-grade pricing engine for complex estimations. Substrate-aware logic and MIS sync.", href: "/products/budget", code: "E-01", icon: "calculator", ctaText: "CALCULATE COST" }
      ]
    },
    {
      title: "Marketing & Visualization",
      products: [
        { name: "Mockup Engine", description: "AI-powered workstation for high-fidelity book visualization and retail-ready renders.", href: "/products/mockup", code: "M-04", icon: "camera", ctaText: "VISUALIZE ASSETS" }
      ]
    },
    {
      title: "Operations & Quality",
      products: [
        { name: "Preflight", description: "Internal AI-driven validation layer and auto-fix engine. Certified production safe.", href: "/products/preflight", code: "V-02", icon: "shield", ctaText: "VALIDATE FILES" }
      ]
    },
    {
      title: "Operational Control Plane",
      products: [
        { name: "Control Plane", description: "Monitor, track, and orchestrate every job and infrastructure node in real time. The operational brain.", href: "/products/control", code: "O-03", icon: "activity", ctaText: "MANAGE JOBS" }
      ]
    }
  ];

  return (
    <div className="products-hub">
      {/* Hero Section - Monolith Enforcement */}
      <HeroPlatform
        label="Capability Portfolio / v2.4"
        title={<>THE COMMAND <br /> <span style={{ color: 'var(--accent-primary)' }}>SURFACES</span></>}
        subheadline="A comprehensive suite of applications engineered to orchestrate the world's most complex print production environments from a unified platform."
        variant="particles"
      />

      {/* Layered Product Grids - Component Enforcement */}
      {categories.map((cat, i) => (
        <ProductSurfaceGrid
          key={cat.title}
          title={cat.title}
          variant={i % 2 === 0 ? 'secondary' : 'primary'}
          products={cat.products as any}
        />
      ))}

      {/* Final Call to Action */}
      <ActionCTA
        slogan="INFRASTRUCTURE SCALING"
        title="Scaling Your Facility?"
        description="Our architects can help you design the perfect infrastructure stack for your high-stakes production environment."
        buttonLabel="Consult an Architect"
        buttonHref="/contact"
        trackingAction="products_cta_architect"
      />
    </div>
  );
}
