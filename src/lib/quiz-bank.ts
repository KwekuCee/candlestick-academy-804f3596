// Pure quiz question builder shared by the browser and the server grader.
export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export function generateAutoQuizQuestions(
  courseId: string,
  lessonTitle: string,
  lessonDescription: string,
  keyTakeaways: string[]
): QuizQuestionItem[] {
  const cleanTitle = lessonTitle.trim() || "Market Execution";
  const cleanDesc = lessonDescription.trim() || "Understanding structure and risk discipline.";
  const takeaways =
    keyTakeaways.filter(Boolean).length > 0
      ? keyTakeaways.filter(Boolean)
      : [
          `Identify the core market structure principles taught in ${cleanTitle}`,
          "Wait for candle closure confirmation before executing entries",
          "Always define invalidation and stop-loss before calculating lot size",
        ];

  const generated: QuizQuestionItem[] = [
    {
      id: `${courseId}-q1-${Date.now()}`,
      question: `In "${cleanTitle}", what is the primary objective before entering a live market position?`,
      options: [
        takeaways[0] || `Confirm structure alignment and define invalidation levels`,
        "Enter immediately on the 1-minute chart without waiting for session liquidity",
        "Double the lot size after a previous losing trade to recover drawdown",
        "Remove the stop-loss during high-impact economic news releases",
      ],
      correctIndex: 0,
      explanation: `Correct. ${cleanDesc}`,
    },
    {
      id: `${courseId}-q2-${Date.now() + 1}`,
      question: `According to "${cleanTitle}", how should a trader confirm a valid setup?`,
      options: [
        "Chase impulse candles mid-move before the candle closes",
        takeaways[1] || "Wait for clean candle closure and displacement at a key level",
        "Trade every minor fluctuation during low-liquidity Asian rollover",
        "Rely solely on social media sentiment without checking higher-timeframe bias",
      ],
      correctIndex: 1,
      explanation: "Waiting for candle closure prevents premature entries on liquidity wicks.",
    },
    {
      id: `${courseId}-q3-${Date.now() + 2}`,
      question: `How does "${cleanTitle}" integrate risk management into trade execution?`,
      options: [
        "Risking 25% of account equity on a single high-conviction setup",
        "Moving the stop-loss further away when price approaches invalidation",
        takeaways[2] || "Defining the exact stop-loss invalidation point and sizing lots to 1%–2% max risk",
        "Opening multiple correlated positions simultaneously without calculating margin",
      ],
      correctIndex: 2,
      explanation: "Capital preservation requires pre-defining invalidation and keeping per-trade risk controlled.",
    },
  ];

  if (courseId === "forex-foundations") {
    generated.push(
      {
        id: `${courseId}-q4`,
        question: "Which trading session overlap provides the deepest institutional liquidity for EUR/USD and XAU/USD?",
        options: [
          "Sydney and Tokyo overlap",
          "London and New York session overlap (1:00 PM – 5:00 PM GMT)",
          "Late Friday market close",
          "Sunday market open rollover",
        ],
        correctIndex: 1,
        explanation: "London & New York overlap accounts for the highest institutional volume.",
      },
      {
        id: `${courseId}-q5`,
        question: "If your account balance is $100 and you risk 1% with a 10-pip stop-loss on EUR/USD, what is your maximum dollar risk?",
        options: ["$10.00", "$1.00", "$5.00", "$0.10"],
        correctIndex: 1,
        explanation: "1% of $100 is $1.00 maximum risk.",
      }
    );
  } else if (courseId === "technical-analysis") {
    generated.push(
      {
        id: `${courseId}-q4`,
        question: "What confirms a true Break of Structure (BOS) in an uptrend?",
        options: [
          "A brief wick above the previous swing high that closes back inside the range",
          "A full-body candle close above the previous swing high",
          "An Equal High formation with decreasing volume",
          "A 1-minute doji inside a 4-hour consolidation",
        ],
        correctIndex: 1,
        explanation: "Institutional BOS requires a full candle body closure beyond the structural high.",
      },
      {
        id: `${courseId}-q5`,
        question: "Why do institutional traders watch liquidity pools above equal highs and below equal lows?",
        options: [
          "Retail stop-orders cluster there, providing liquidity for institutional order fills",
          "Price never revisits equal highs or lows",
          "Spreads are permanently zero at equal highs",
          "Indicators automatically turn off at those levels",
        ],
        correctIndex: 0,
        explanation: "Equal highs/lows hold resting buy-stops and sell-stops targeted during liquidity sweeps.",
      }
    );
  } else if (courseId === "risk-psychology") {
    generated.push(
      {
        id: `${courseId}-q4`,
        question: "After hitting your maximum daily drawdown limit (e.g., 2 consecutive losses), what is the correct protocol?",
        options: [
          "Switch to a lower timeframe to win the money back immediately",
          "Close the charts for the session and review your trade journal objectively",
          "Triple the lot size on XAU/USD",
          "Copy random setups outside your trading plan",
        ],
        correctIndex: 1,
        explanation: "Stepping away after hitting your daily loss circuit breaker prevents revenge trading.",
      },
      {
        id: `${courseId}-q5`,
        question: "With a 1 : 2.5 Risk-to-Reward ratio, what minimum win rate is needed to remain profitable over 20 trades?",
        options: ["90% win rate", "At least 30%–35% win rate", "75% win rate", "100% win rate"],
        correctIndex: 1,
        explanation: "At 1:2.5 R:R, winning just 30%–35% of setups yields positive net expectancy.",
      }
    );
  } else {
    generated.push(
      {
        id: `${courseId}-q4`,
        question: "What characterizes a high-probability institutional displacement candle after a session liquidity sweep?",
        options: [
          "Small overlapping indecision candles with long wicks on both sides",
          "Large-bodied impulse expansion that leaves a Fair Value Gap (imbalance) and breaks structure",
          "Low-volume sideways chop during bank holidays",
          "Trading directly into high-impact NFP release 10 seconds before announcement",
        ],
        correctIndex: 1,
        explanation: "Displacement leaves a clear Fair Value Gap and confirms institutional sponsorship.",
      },
      {
        id: `${courseId}-q5`,
        question: "When price sweeps the London session low at New York open and reclaims structure, what is the primary bias?",
        options: [
          "Bullish reversal targeting internal and external range liquidity highs",
          "Immediate short entry at the very bottom of the sweep wick",
          "No-trade zone for the rest of the month",
          "Ignore structure and trade counter-trend without confirmation",
        ],
        correctIndex: 0,
        explanation: "A sweep of sell-side liquidity followed by a bullish MSS targets buy-side liquidity.",
      }
    );
  }

  return generated;
}
