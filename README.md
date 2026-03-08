# 🌾 Krishi-Verify: Empowering Farmers with Transparency

**Krishi-Verify** is a full-stack digital ecosystem designed to bridge the gap between Indian farmers and Government Mandis. It ensures farmers get the **Minimum Support Price (MSP)** they deserve by eliminating middlemen, providing real-time price discovery via a multilingual voice assistant, and digitizing the procurement process.

---

## 🚀 Key Features

### 👨‍🌾 For Farmers
* **Slot Booking:** Avoid long mandi queues by scheduling your visit in advance.
* **Multilingual Voice Assistant:** Query real-time mandi prices in **English, Hindi, and Punjabi** using voice commands.
* **What-If Earnings Calculator:** Estimate your payout based on current MSP rates before you even reach the market.
* **Digital Tokens:** Receive a unique Token ID for a seamless "Check-in" experience.

### 🏢 For Mandi Operators
* **Token-Based Procurement:** Process farmers efficiently using their pre-booked Token IDs.
* **Quality Grading Desk:** Input actual weight, moisture content, and impurities to calculate precise net payouts.
* **Digital Receipts:** Automatically generate "verified" digital receipts that serve as proof of sale.

---

## 🛠️ Tech Stack

| Technology | Usage |
| :--- | :--- |
| **Next.js 15+** | Frontend Framework (App Router) |
| **Supabase** | Authentication & PostgreSQL Database |
| **Tailwind CSS** | Styling (Emerald/Sage for Farmers, Teal/Slate for Operators) |
| **Lucide React** | Iconography |
| **Web Speech API** | Voice recognition and synthesis |
| **CSV-Parser** | Rule-based data retrieval engine for Mandi prices |

---

## 📁 Project Structure

```text
├── app/
│   ├── api/            # Chatbot and Auth API routes
│   ├── farmer/         # Farmer Dashboard, Booking, and Calculator
│   ├── operator/       # Operator Command Center and Grading Desk
│   └── signup/         # Role-based registration logic
├── components/
│   ├── farming/        # VoiceAssistant & Calculator components
│   └── ui/             # Reusable Shadcn/UI components
├── lib/
│   ├── mandiEngine.ts  # Rule-based CSV search logic
│   └── supabaseClient.ts
└── data/
    └── mandi_prices.csv # Real-time commodity price dataset