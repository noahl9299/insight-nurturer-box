import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, RotateCcw, Star, ExternalLink, CheckCircle, Ruler } from "lucide-react";
import { products, Product } from "@/data/products";
import { SEO } from "@/components/SEO";

// ── Wizard config ────────────────────────────────────────────────────────────

type StepId = "gewicht" | "schlafstil" | "praeferenzen";

interface Choice {
  id: string;
  emoji: string;
  label: string;
  sublabel: string;
}

interface Step {
  id: StepId;
  question: string;
  hint: string;
  choices: Choice[];
}

const STEPS: Step[] = [
  {
    id: "gewicht",
    question: "Wie schwer ist deine Katze?",
    hint: "Das Gewicht bestimmt die richtige Bettgröße.",
    choices: [
      { id: "xs",  emoji: "🐱", label: "Unter 3 kg",  sublabel: "Kitten / Kleine Rassen" },
      { id: "s",   emoji: "😺", label: "3 - 5 kg",    sublabel: "Durchschnittliche Hauskatze" },
      { id: "m",   emoji: "🐈", label: "5 - 7 kg",    sublabel: "Großes EKH / Kater" },
      { id: "xl",  emoji: "🦁", label: "Über 7 kg",   sublabel: "Maine Coon / Ragdoll" },
    ],
  },
  {
    id: "schlafstil",
    question: "Wie schläft deine Katze am liebsten?",
    hint: "Beobachte deine Katze - das verrät dir viel über den richtigen Typ.",
    choices: [
      { id: "eingerollt",  emoji: "🌀", label: "Eingerollt",     sublabel: "Kleine Kugel, eng und warm" },
      { id: "ausgestreckt",emoji: "😴", label: "Ausgestreckt",   sublabel: "Beine von sich gestreckt" },
      { id: "versteckt",   emoji: "🏠", label: "Versteckt",      sublabel: "Liebt dunkle Höhlen" },
      { id: "fenster",     emoji: "🪟", label: "Am Fenster",     sublabel: "Sonnenbaden & Ausblick" },
    ],
  },
  {
    id: "praeferenzen",
    question: "Was ist dir (und deiner Katze) wichtig?",
    hint: "Mehrere Antworten? Wähle einfach die wichtigste.",
    choices: [
      { id: "weich",      emoji: "🧸", label: "Extra weich",    sublabel: "Kuschelig & flauschig" },
      { id: "design",     emoji: "✨", label: "Schönes Design", sublabel: "Passt ins Wohnzimmer" },
      { id: "gesundheit", emoji: "💙", label: "Gesundheit",     sublabel: "Gelenkschonend, für Senioren" },
      { id: "budget",     emoji: "💰", label: "Gutes Preis-Leistung", sublabel: "Top-Qualität, fairer Preis" },
    ],
  },
];

// ── Recommendation logic ─────────────────────────────────────────────────────

interface Answers {
  gewicht: string;
  schlafstil: string;
  praeferenzen: string;
}

function getRecommendedSize(gewicht: string): string {
  return { xs: "40-45 cm", s: "50-55 cm", m: "55-60 cm", xl: "60-70 cm" }[gewicht] ?? "50-55 cm";
}

function scoreProduct(product: Product, answers: Answers): number {
  let score = 0;

  // --- Weight / size ---
  const dim = parseInt(product.groesse);
  if (!isNaN(dim)) {
    if (answers.gewicht === "xs" && dim <= 45) score += 3;
    else if (answers.gewicht === "s" && dim >= 46 && dim <= 55) score += 3;
    else if (answers.gewicht === "m" && dim >= 55 && dim <= 63) score += 3;
    else if (answers.gewicht === "xl" && dim >= 60) score += 3;
    else score += 1;
  }

  // --- Sleep style ---
  const typ = product.typ.toLowerCase();
  const kat = product.kategorie.toLowerCase();
  if (answers.schlafstil === "eingerollt") {
    if (typ.includes("donut") || typ.includes("nest")) score += 4;
  } else if (answers.schlafstil === "ausgestreckt") {
    if (typ.includes("klassisch") || typ.includes("sofa") || typ.includes("daybed") || typ.includes("ortho")) score += 4;
    if (kat === "sofa" || kat === "klassisches bett") score += 2;
  } else if (answers.schlafstil === "versteckt") {
    if (typ.includes("höhle") || typ.includes("hoehle") || typ.includes("iglu") || typ.includes("sack") || typ.includes("tunnel")) score += 4;
    if (kat === "hoehle") score += 2;
  } else if (answers.schlafstil === "fenster") {
    if (typ.includes("fenster") || typ.includes("hängematte") || kat === "fensterliege" || kat === "haengematte") score += 5;
  }

  // --- Preferences ---
  if (answers.praeferenzen === "weich") {
    if (product.material.toLowerCase().includes("pluesch") || product.material.toLowerCase().includes("kunstfell")) score += 3;
  } else if (answers.praeferenzen === "design") {
    if (product.material.toLowerCase().includes("cord") || product.material.toLowerCase().includes("holz") || product.material.toLowerCase().includes("leder")) score += 3;
    if (product.preis >= 40) score += 1;
  } else if (answers.praeferenzen === "gesundheit") {
    if (product.material.toLowerCase().includes("memory") || product.typ.toLowerCase().includes("ortho")) score += 5;
    if (kat === "orthopädisch") score += 3;
  } else if (answers.praeferenzen === "budget") {
    if (product.preis <= 25) score += 4;
    else if (product.preis <= 35) score += 2;
  }

  // --- Base quality bonus ---
  score += product.bewertung * 0.5;
  score += Math.min(product.anzahlBewertungen / 5000, 2);

  return score;
}

function getRecommendations(answers: Answers): Product[] {
  return [...products]
    .map((p) => ({ product: p, score: scoreProduct(p, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.product);
}

function getBedTypeLabel(answers: Answers): string {
  const map: Record<string, string> = {
    eingerollt: "Donut- oder Nestbett",
    ausgestreckt: "Flaches Kissen oder Katzensofa",
    versteckt: "Katzenhöhle oder Kuschelsack",
    fenster: "Fensterliege oder Hängematte",
  };
  return map[answers.schlafstil] ?? "Katzenbett";
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-primary">Schritt {step} von {total}</span>
        <span className="text-xs text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i + 1 < step ? "bg-primary text-primary-foreground" :
              i + 1 === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
              "bg-muted text-muted-foreground"
            }`}>
              {i + 1 < step ? "✓" : i + 1}
            </div>
            <span className={`text-xs hidden sm:block transition-colors ${i + 1 <= step ? "text-primary font-medium" : "text-muted-foreground"}`}>
              {["Gewicht", "Schlafstil", "Wünsche"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCard({
  step,
  selected,
  onSelect,
}: {
  step: Step;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="w-full animate-fade-up">
      <p className="text-xs uppercase tracking-wider font-semibold text-primary mb-2">{step.hint}</p>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 leading-tight">
        {step.question}
      </h2>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {step.choices.map((choice) => {
          const isSelected = selected === choice.id;
          return (
            <button
              key={choice.id}
              onClick={() => onSelect(choice.id)}
              className={`group relative flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 text-center cursor-pointer
                ${isSelected
                  ? "border-primary bg-primary/8 shadow-lg scale-[1.02]"
                  : "border-border bg-card hover:border-primary/40 hover:bg-accent/30 hover:scale-[1.01]"
                }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle size={12} className="text-primary-foreground" />
                </div>
              )}
              <span className="text-4xl md:text-5xl select-none leading-none">{choice.emoji}</span>
              <div>
                <p className={`font-semibold text-sm md:text-base transition-colors ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {choice.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{choice.sublabel}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({ product, rank }: { product: Product; rank: number }) {
  const isTop = rank === 1;
  return (
    <div className={`relative bg-card rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isTop ? "border-primary shadow-md" : "border-border"}`}>
      {isTop && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
      )}
      {isTop && (
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
          ⭐ Top-Empfehlung
        </div>
      )}
      {/* Image area */}
      <div className="h-36 bg-gradient-to-br from-accent via-background to-primary/10 flex items-center justify-center">
        <span className="text-5xl select-none">
          {product.typ.includes("Donut") ? "🍩" :
           product.typ.includes("Höhle") || product.typ.includes("Hoehle") || product.typ.includes("Iglu") ? "🏠" :
           product.typ.includes("Ortho") || product.typ.includes("Memory") ? "💙" :
           product.typ.includes("Fenster") ? "🪟" :
           product.typ.includes("Sofa") ? "🛋️" :
           product.typ.includes("Hänge") || product.typ.includes("Haenge") ? "🪢" :
           product.typ.includes("Beheizt") ? "🔥" : "😺"}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-medium mb-1">{product.marke}</p>
        <h3 className="font-display font-bold text-sm text-foreground leading-snug mb-2 line-clamp-2">
          {product.produktname}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} className={i < Math.round(product.bewertung) ? "text-primary fill-primary" : "text-muted"} />
          ))}
          <span className="text-xs text-muted-foreground">({product.anzahlBewertungen.toLocaleString("de-DE")})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-display font-bold text-foreground">
            {product.preis.toFixed(2).replace(".", ",")} €
          </span>
          <Link
            to={`/katzenbett/${product.slug}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            Details <ArrowRight size={11} />
          </Link>
        </div>
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener sponsored noreferrer"
          className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          Bei Amazon ansehen <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}

// ── Summary box ──────────────────────────────────────────────────────────────

function SummaryBadge({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-card rounded-xl border border-border px-4 py-3">
      <span className="text-xl">{emoji}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

type WizardState = "intro" | "steps" | "result";

export default function GrössenberaterPage() {
  const [wizardState, setWizardState] = useState<WizardState>("intro");
  const [currentStep, setCurrentStep] = useState(0); // 0-indexed
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const step = STEPS[currentStep];
  const totalSteps = STEPS.length;
  const isLastStep = currentStep === totalSteps - 1;
  const allAnswers = answers as Answers;

  function handleSelect(id: string) {
    setSelected(id);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [step.id]: selected };
    setAnswers(newAnswers);

    if (isLastStep) {
      setWizardState("result");
    } else {
      setCurrentStep((s) => s + 1);
      setSelected(answers[STEPS[currentStep + 1]?.id] ?? null);
    }
  }

  function handleBack() {
    if (currentStep === 0) {
      setWizardState("intro");
      setCurrentStep(0);
      setAnswers({});
      setSelected(null);
    } else {
      const prevStep = STEPS[currentStep - 1];
      setSelected(answers[prevStep.id] ?? null);
      setCurrentStep((s) => s - 1);
    }
  }

  function handleReset() {
    setWizardState("intro");
    setCurrentStep(0);
    setAnswers({});
    setSelected(null);
  }

  const recommendations = wizardState === "result" ? getRecommendations(allAnswers) : [];
  const recommendedSize = wizardState === "result" ? getRecommendedSize(allAnswers.gewicht) : "";
  const bedTypeLabel = wizardState === "result" ? getBedTypeLabel(allAnswers) : "";

  const sizeLabels: Record<string, string> = { xs: "Unter 3 kg", s: "3 – 5 kg", m: "5 – 7 kg", xl: "Über 7 kg" };
  const sleepLabels: Record<string, string> = { eingerollt: "Eingerollt", ausgestreckt: "Ausgestreckt", versteckt: "Versteckt", fenster: "Am Fenster" };
  const prefLabels: Record<string, string> = { weich: "Extra weich", design: "Schönes Design", gesundheit: "Gesundheit", budget: "Gutes Preis-Leistung" };

  return (
    <>
      <SEO
        title="Katzenbett Größenberater – Welches Bett passt zu deiner Katze?"
        description="In 3 Schritten zur perfekten Empfehlung: Unser Größenberater findet das ideale Katzenbett basierend auf Gewicht, Schlafstil und deinen Wünschen."
        canonical="https://katzenbett.de/groessenberater"
        type="website"
      />

      {/* Page shell */}
      <div className="min-h-screen bg-gradient-to-b from-accent/40 via-background to-background pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">

          {/* ── INTRO ────────────────────────────────────────────────── */}
          {wizardState === "intro" && (
            <div className="text-center py-12 animate-fade-up">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-4xl">
                📏
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
                <Ruler size={14} /> Kostenlos & unverbindlich
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
                Der Katzenbett-Größenberater
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                3 kurze Fragen – wir empfehlen dir das perfekte Katzenbett für deinen Liebling. Kein Registrieren, keine E-Mail.
              </p>

              {/* What to expect */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-sm mx-auto">
                {[
                  { emoji: "⚖️", label: "Gewicht", desc: "Schritt 1" },
                  { emoji: "😴", label: "Schlafstil", desc: "Schritt 2" },
                  { emoji: "✨", label: "Wünsche", desc: "Schritt 3" },
                ].map((item) => (
                  <div key={item.label} className="bg-card rounded-2xl border border-border p-4 flex flex-col items-center gap-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="text-xs font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setWizardState("steps"); setSelected(null); }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl shadow-lg"
                style={{ background: "hsl(var(--primary))" }}
              >
                Jetzt starten <ArrowRight size={18} />
              </button>

              <p className="text-xs text-muted-foreground mt-4">
                Dauert ca. 30 Sekunden · 100% kostenlos
              </p>
            </div>
          )}

          {/* ── STEPS ────────────────────────────────────────────────── */}
          {wizardState === "steps" && (
            <div className="py-8">
              <ProgressBar step={currentStep + 1} total={totalSteps} />

              <div className="mt-10 mb-8">
                <StepCard
                  key={step.id}
                  step={step}
                  selected={selected}
                  onSelect={handleSelect}
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4 mt-2">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all"
                >
                  <ArrowLeft size={15} /> Zurück
                </button>

                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className={`flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-primary-foreground transition-all ${
                    selected
                      ? "hover:-translate-y-0.5 hover:shadow-lg opacity-100"
                      : "opacity-40 cursor-not-allowed"
                  }`}
                  style={{ background: "hsl(var(--primary))" }}
                >
                  {isLastStep ? "Ergebnis anzeigen" : "Weiter"}
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* ── RESULT ───────────────────────────────────────────────── */}
          {wizardState === "result" && (
            <div className="py-8 animate-fade-up">
              {/* Result header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-3xl">
                  🎯
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                  Deine persönliche Empfehlung
                </h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Basierend auf deinen Angaben empfehlen wir ein <strong className="text-foreground">{bedTypeLabel}</strong> in der Größe <strong className="text-foreground">{recommendedSize}</strong>.
                </p>
              </div>

              {/* Answer summary */}
              <div className="grid grid-cols-3 gap-2 mb-8">
                <SummaryBadge emoji="⚖️" label="Gewicht" value={sizeLabels[allAnswers.gewicht] ?? "–"} />
                <SummaryBadge emoji="😴" label="Schlafstil" value={sleepLabels[allAnswers.schlafstil] ?? "–"} />
                <SummaryBadge emoji="✨" label="Wunsch" value={prefLabels[allAnswers.praeferenzen] ?? "–"} />
              </div>

              {/* Size recommendation card */}
              <div className="bg-primary/8 border border-primary/20 rounded-2xl p-5 mb-8 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 text-xl">📐</div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Empfohlene Bettgröße</p>
                  <p className="text-2xl font-display font-bold text-primary mb-1">{recommendedSize}</p>
                  <p className="text-xs text-muted-foreground">
                    Für das beste Ergebnis: Körperlänge deiner Katze + 10–15 cm Komfortpuffer.
                  </p>
                </div>
              </div>

              {/* Product grid */}
              <h3 className="font-display font-bold text-lg text-foreground mb-4">
                🐾 Unsere Top-{recommendations.length} Empfehlungen für dich
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {recommendations.map((product, i) => (
                  <ResultCard key={product.slug} product={product} rank={i + 1} />
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-full border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all"
                >
                  <RotateCcw size={14} /> Neu starten
                </button>
                <Link
                  to="/katzenbetten"
                  className="flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-full text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "hsl(var(--primary))" }}
                >
                  Alle Katzenbetten ansehen <ArrowRight size={14} />
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground text-center mt-5">
                ℹ️ Empfehlungen basieren auf Produktdaten & Bewertungen. Bei Kauf über unsere Links erhalten wir eine Provision – für dich bleibt der Preis gleich.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
