import { useState } from "react";
import "../App.css";

function Subscription({ onBack }) {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [showPurchaseMessage, setShowPurchaseMessage] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "0",
      period: "Forever",
      description: "Start your Hifz journey with essential tools.",
      features: [
        "Quran Reader",
        "Basic Hifz Progress",
        "Basic Revision",
        "Daily Hifz Tracking",
      ],
    },
    {
      id: "monthly",
      name: "Hifz Plus",
      price: "499",
      period: "per month",
      description: "Unlock more tools for focused memorization.",
      features: [
        "Everything in Free",
        "Voice Practice",
        "Advanced Revision",
        "Audio Recitation",
        "Achievement Rewards",
        "Detailed Progress Tracking",
      ],
    },
    {
      id: "yearly",
      name: "Hifz Pro",
      price: "4,499",
      period: "per year",
      description: "A complete experience for your long-term Hifz journey.",
      features: [
        "Everything in Hifz Plus",
        "Unlimited Voice Practice",
        "Advanced Hifz Insights",
        "Priority Features",
        "Exclusive Rewards",
        "Future Premium Features",
      ],
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    setShowPurchaseMessage(false);
  };

 const handleBuyPlan = (e) => {
  e.stopPropagation();
  setShowPurchaseMessage(false);
  setShowPaymentForm(true);
};

  return (
    <div className="subscription-page">
      <header className="subscription-header">
        <button className="subscription-back-btn" onClick={onBack}>
          ← Dashboard
        </button>

        <div className="subscription-title">
          <span>HIFZ MEMBERSHIP</span>
          <h1>Choose Your Plan</h1>
        </div>

        <div className="subscription-header-icon">
          💎
        </div>
      </header>

      <main className="subscription-content">
        <div className="subscription-intro">
          <span>SUBSCRIPTION</span>
          <h2>Build a stronger Hifz routine.</h2>
          <p>
            Choose the plan that fits your memorization journey and
            get the tools you need to practice consistently.
          </p>
        </div>

        <section className="subscription-plans">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={
                selectedPlan === plan.id
                  ? "subscription-plan selected"
                  : "subscription-plan"
              }
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.id === "monthly" && (
                <div className="popular-plan-badge">
                  MOST POPULAR
                </div>
              )}

              <div className="subscription-plan-icon">
                {plan.id === "free"
                  ? "🌱"
                  : plan.id === "monthly"
                  ? "✨"
                  : "💎"}
              </div>

              <span className="subscription-plan-name">
                {plan.name}
              </span>

              <div className="subscription-price">
                <strong>Rs. {plan.price}</strong>
                <span>{plan.period}</span>
              </div>

              <p className="subscription-description">
                {plan.description}
              </p>

              <div className="subscription-divider"></div>

              <div className="subscription-features">
                {plan.features.map((feature, index) => (
                  <div key={index}>
                    <span>✓</span>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>

              <div className="subscription-select-indicator">
                {selectedPlan === plan.id
                  ? "✓ Selected"
                  : "Select Plan"}
              </div>

              {selectedPlan === plan.id && (
                <button
                  type="button"
                  className="subscription-buy-btn"
                  onClick={handleBuyPlan}
                >
                  {plan.id === "free"
                    ? "Start Free Plan"
                    : `Buy ${plan.name} →`}
                </button>
              )}
            </div>
          ))}
        </section>

        <section className="subscription-note">
          <div className="subscription-note-icon">
            🔒
          </div>

          <div>
            <span>SECURE MEMBERSHIP</span>
            <h2>Your journey stays yours.</h2>
            <p>
              Subscription and payment functionality can be connected
              to a secure payment provider when the system is ready
              for real transactions.
            </p>
          </div>
        </section>

{showPaymentForm && (
  <div className="subscription-payment-form">
    <h2>Complete Your Purchase</h2>

    <p>
      You selected{" "}
      <strong>
        {plans.find((plan) => plan.id === selectedPlan)?.name}
      </strong>
      .
    </p>

    <div className="payment-field">
      <label>Cardholder Name</label>
      <input
        type="text"
        placeholder="Enter your name"
      />
    </div>

    <div className="payment-field">
      <label>Card Number</label>
      <input
        type="text"
        placeholder="1234 5678 9012 3456"
      />
    </div>

    <div className="payment-row">
      <div className="payment-field">
        <label>Expiry Date</label>
        <input
          type="text"
          placeholder="MM/YY"
        />
      </div>

      <div className="payment-field">
        <label>CVV</label>
        <input
          type="password"
          placeholder="123"
        />
      </div>
    </div>
<button
  type="button"
  className="payment-confirm-btn"
  onClick={() => {
    setShowPaymentForm(false);
    setPurchaseComplete(true);
  }}
>
  Confirm Purchase
</button>

  {showPurchaseMessage && (
  <div className="subscription-purchase-message">
    <h2>Purchase Ready 🎉</h2>

    <p>
      You selected{" "}
      <strong>
        {plans.find((plan) => plan.id === selectedPlan)?.name}
      </strong>
      .
    </p>

    <p>
      Your subscription is ready to be activated.
    </p>

    <button
      type="button"
      onClick={() => setShowPurchaseMessage(false)}
    >
      Close
    </button>
  </div>
)}

    <button
      type="button"
      className="payment-cancel-btn"
      onClick={() => setShowPaymentForm(false)}
    >
      Cancel
    </button>
  </div>
)}

{purchaseComplete && (
  <div className="subscription-purchase-message">
    <h2>Subscription Activated 🎉</h2>

    <p>
      Your{" "}
      <strong>
        {plans.find((plan) => plan.id === selectedPlan)?.name}
      </strong>{" "}
      plan has been selected successfully.
    </p>

    <p>
      Thank you for supporting your Hifz journey.
    </p>

    <button
      type="button"
      onClick={() => setPurchaseComplete(false)}
    >
      Done
    </button>
  </div>
)}

      </main>
    </div>
  );
}

export default Subscription;