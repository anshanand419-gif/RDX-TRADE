import { Book, PDFItem, Course, LivePlan } from '../types';

export const UPI_CONFIG = {
  payeeName: 'Mukesh Kumar',
  upiId: 'mukeshkumae078@okicici',
  instagramHandle: 'griffin.arnav002',
  instagramUrl: 'https://instagram.com/griffin.arnav002',
  brandName: 'TRADING WITH RDX',
  defaultOwnerPin: 'RDX2026',
};

export const LIVE_PLANS: LivePlan[] = [
  {
    id: 'plan_2m',
    duration: '2 Months',
    durationLabel: '2 Months Live Access',
    priceInr: 99,
    originalPriceInr: 1499,
    badge: 'Special Entry Pass',
    description: 'Perfect for beginners starting their journey in Price Action & Live Intraday Market analysis.',
    recommendedFor: 'Beginner & Part-time Traders',
    features: [
      'Daily Live Market Commentary (Pre-Open & Market Hours)',
      'Nifty & BankNifty Key Support & Resistance Breakout Levels',
      'Weekly Live Doubt-Clearing & Chart Breakdown Session',
      'Instant Access to Curated Trading Book Summaries & PDFs',
      'Regular Trade Alerts & Market Updates on IG @griffin.arnav002',
      'Digital Verified Student Access Certificate',
    ],
  },
  {
    id: 'plan_5m',
    duration: '5 Months',
    durationLabel: '5 Months Live Mentorship',
    priceInr: 399,
    originalPriceInr: 3999,
    popular: true,
    badge: 'Most Popular Choice',
    description: 'High-intensity swing trading, options buying, and live screen-sharing trading floor access.',
    recommendedFor: 'Active Intraday Scalpers & Swing Traders',
    features: [
      'Everything in 2 Months Pass included',
      'Live Screen-Share Trading Floor (9:15 AM - 11:30 AM IST)',
      'Real-Time Breakout & Reversal Trade Setups with SL & Target',
      'Options Buying & Expiry Hero-or-Zero Strategy Playbook',
      'Smart Money Order Block & Fair Value Gap (FVG) Live Scanning',
      'Private VIP Discord & WhatsApp Community Access',
      'Full Library of Session Recordings & Case Studies',
    ],
  },
  {
    id: 'plan_1yr',
    duration: '1 Year',
    durationLabel: '1 Year Institutional Mastery',
    priceInr: 799,
    originalPriceInr: 8999,
    bestValue: true,
    badge: 'Ultimate Value · 12 Months',
    description: 'Full 365-day institutional mentorship, 1-on-1 risk audit, and algorithmic market edge.',
    recommendedFor: 'Serious Traders Aiming for Full-Time Consistency',
    features: [
      'Full 365-Day Daily Live Trading Floor Access',
      'Institutional Smart Money Concepts (SMC) & ICT Advanced Blueprint',
      '1-on-1 Portfolio & Risk Management Audit with RDX Team',
      'Algorithmic & Indicator-Free Price Action Mastery System',
      'Lifetime Access to All Masterclass Video Archives & PDF Updates',
      'Priority Direct Access & Q&A with Mentor on Instagram/WhatsApp',
      'Exclusive Physical-Grade PDF Cheatsheets Pack & Trade Journal',
    ],
  },
];

export const TRENDING_BOOKS: Book[] = [
  {
    id: 'trading-in-the-zone',
    title: 'Trading in the Zone',
    author: 'Mark Douglas',
    category: 'psychology',
    rating: 4.9,
    reviewsCount: 1420,
    pages: 216,
    year: 2000,
    badge: 'Must Read #1',
    description:
      'The timeless bible on trading psychology. Mark Douglas dismantles the illusion of market certainty and teaches you to think in probabilities, eliminate fear, and develop unshakable trading consistency.',
    keyTakeaways: [
      'The 5 Fundamental Truths of the Market: Anything can happen, you do not need to know what will happen next to make money, and every moment is unique.',
      'Accepting Risk 100%: If you fear losing, you will hesitate, chase, or revenge trade. Real pros accept the loss before entering.',
      'The Probability Mindset: A series of 20 trades will have a statistical distribution of wins and losses; individual outcomes do not define your edge.',
      'Eliminating Emotional Pain: Market movements are neutral; your perception creates fear or greed.',
    ],
    corePrinciples: [
      {
        title: 'The Edge vs The Outcome',
        explanation: 'An edge is nothing more than an indication of a higher probability of one thing happening over another. Individual trade outcomes are random; aggregate outcomes are predictable.',
      },
      {
        title: 'The 7 Principles of Consistency',
        explanation: '1. I objectively identify my edges. 2. I predefine the risk of every trade. 3. I completely accept the risk. 4. I act without hesitation. 5. I pay myself as the market makes money available. 6. I continually monitor my susceptibility for making errors. 7. I understand the absolute necessity of these principles.',
      },
      {
        title: 'Mastering the State of Mind',
        explanation: 'The best traders stay in a carefree, objective state of mind where market information flows without judgment.',
      },
    ],
    chapterList: [
      'Chapter 1: The Road to Success: Fundamental, Technical, or Mental Analysis?',
      'Chapter 2: The Lure (and the Dangers) of Trading',
      'Chapter 3: Taking Responsibility',
      'Chapter 4: Consistency: A State of Mind',
      'Chapter 5: The Dynamics of Perception',
      'Chapter 6: The Market’s Perspective',
      'Chapter 7: The Trader’s Edge: Thinking in Probabilities',
      'Chapter 8: Working with Your Beliefs',
      'Chapter 9: The Nature of Beliefs',
      'Chapter 10: The Impact of Beliefs on Trading',
      'Chapter 11: Thinking Like a Trader',
    ],
    excerpt:
      'What separates the consistently successful traders from everyone else is not superior market insight or a secret indicator. It is a completely different mental framework. When you truly accept that any given trade can fail regardless of how perfect the pattern appears, you trade without fear. Without fear, you do not pull the trigger too late, you do not close winning trades prematurely, and you do not hold losing positions hoping they reverse.',
    downloadFilename: 'Trading_in_the_Zone_Summary_RDX.pdf',
  },
  {
    id: 'japanese-candlestick-techniques',
    title: 'Japanese Candlestick Charting Techniques',
    author: 'Steve Nison',
    category: 'price-action',
    rating: 4.8,
    reviewsCount: 980,
    pages: 320,
    year: 1991,
    badge: 'Foundation Essential',
    description:
      'The definitive authority that brought Eastern candlestick analysis to Western financial markets. Master single, double, and triple candlestick reversal and continuation patterns with real-world chart context.',
    keyTakeaways: [
      'Candles reflect the immediate battle between buyers (bulls) and sellers (bears) in real time.',
      'Reversal patterns do not guarantee a trend change; they signal a change in market momentum and exhaustion.',
      'Context is King: A hammer at major support is 5x more potent than a hammer in the middle of a consolidating range.',
      'Confirmation is required: Never trade a single candle in isolation without follow-through volume or key level alignment.',
    ],
    corePrinciples: [
      {
        title: 'Single Candle Reversals (Hammer, Hanging Man, Doji)',
        explanation: 'A long lower shadow indicates strong rejection of lower prices by institutional buyers. When confirmed by the subsequent candle, it provides high risk-to-reward long entries.',
      },
      {
        title: 'Engulfing Patterns (Bullish & Bearish)',
        explanation: 'When the real body of the current candle completely covers the prior candle, it indicates a decisive takeover by the opposing market force.',
      },
      {
        title: 'Window (Gap) Theory',
        explanation: 'In Japanese charting, windows act as natural support and resistance zones. A window once opened will often be tested before continuation.',
      },
    ],
    chapterList: [
      'Chapter 1: Introduction to Eastern Charting',
      'Chapter 2: Historical Background of the Candlestick',
      'Chapter 3: Constructing the Candlestick Lines',
      'Chapter 4: Reversal Patterns: Hammers and Hanging Men',
      'Chapter 5: Reversal Patterns: The Engulfing and Dark Cloud Cover',
      'Chapter 6: The Piercing Pattern and Morning/Evening Stars',
      'Chapter 7: Continuation Patterns: Windows and Three Methods',
      'Chapter 8: The Magic Doji: Indecision at Key Inflection Zones',
      'Chapter 9: Putting It All Together: Confluence with Western Technicals',
    ],
    excerpt:
      'A candlestick is a mirror into the psychology of all market participants at that exact timeframe. The real body shows the conviction of the session, while the shadows reveal rejection. If price moves into a zone and leaves behind a tall wick, the market has rejected that price level. That rejection is where smart money leaves its footprints.',
    downloadFilename: 'Japanese_Candlesticks_Mastery_RDX.pdf',
  },
  {
    id: 'technical-analysis-financial-markets',
    title: 'Technical Analysis of the Financial Markets',
    author: 'John J. Murphy',
    category: 'technical',
    rating: 4.9,
    reviewsCount: 1150,
    pages: 542,
    year: 1999,
    badge: 'The Wall St Standard',
    description:
      'The ultimate encyclopedia of market action, Dow theory, trend analysis, chart patterns, oscillators, moving averages, and intermarket relationships used by institutional floor traders worldwide.',
    keyTakeaways: [
      'Market Action Discounts Everything: Fundamental news, interest rates, and earnings are already reflected in the price chart.',
      'Prices Move in Trends: An established trend is far more likely to continue than reverse until clear structural breakdown occurs.',
      'History Repeats Itself: Chart patterns work because human greed and fear remain constant across centuries.',
      'Volume Precedes Price: Volume must expand in the direction of the dominant trend to validate healthy continuation.',
    ],
    corePrinciples: [
      {
        title: 'Support and Resistance Polarity',
        explanation: 'Once a major resistance level is broken with high volume, it flips into future support (Role Reversal Principle).',
      },
      {
        title: 'Trendlines & Channels',
        explanation: 'A valid trendline requires at least three touches. The steeper the angle, the less sustainable the advance.',
      },
      {
        title: 'Oscillator Divergence',
        explanation: 'When price makes a higher high but the RSI/MACD oscillator makes a lower high, momentum is drying up and institutional distribution is underway.',
      },
    ],
    chapterList: [
      'Chapter 1: Philosophy of Technical Analysis',
      'Chapter 2: Dow Theory Foundation',
      'Chapter 3: Chart Construction and Types',
      'Chapter 4: Basic Concepts of Trend and Support/Resistance',
      'Chapter 5: Major Reversal Patterns (Head & Shoulders, Double Tops)',
      'Chapter 6: Continuation Patterns (Triangles, Flags, Pennants)',
      'Chapter 7: Volume and Open Interest in Futures & Equities',
      'Chapter 8: Moving Averages & Moving Average Envelopes',
      'Chapter 9: Momentum Oscillators & Divergences',
      'Chapter 10: Intermarket Analysis and Global Linkages',
    ],
    excerpt:
      'Technical analysis is the study of market action, primarily through the use of charts, for the purpose of forecasting future price trends. The chart is not a crystal ball, but a roadmap of market psychology. By understanding support, resistance, and volume confirmation, you align yourself with the path of least resistance.',
    downloadFilename: 'Technical_Analysis_Murphy_Summary_RDX.pdf',
  },
  {
    id: 'reminiscences-stock-operator',
    title: 'Reminiscences of a Stock Operator',
    author: 'Edwin Lefèvre',
    category: 'classics',
    rating: 4.8,
    reviewsCount: 890,
    pages: 290,
    year: 1923,
    badge: 'Legendary Classic',
    description:
      'The biographical masterpiece chronicling the trading career of Jesse Livermore (Larry Livingston). Packed with timeless wisdom on liquidity, big money trends, and letting profits run.',
    keyTakeaways: [
      'It was never my thinking that made the big money for me. It was always my sitting. Sitting tight in the big swing.',
      'There is only one side of the market and it is not the bull side or the bear side, but the right side.',
      'Never average down on a losing trade. A loss is proof that your timing was wrong.',
      'The market does not beat them; they beat themselves because they cannot sit still and wait for high-probability setups.',
    ],
    corePrinciples: [
      {
        title: 'Pivotal Points & Line of Least Resistance',
        explanation: 'Wait for price to test a pivotal breakout level before executing. If it moves smoothly in your direction immediately, you have the market on your side.',
      },
      {
        title: 'Cutting Losses Without Regret',
        explanation: 'A speculative trader who does not take small losses immediately will eventually be wiped out by one uncontrollable runaway move.',
      },
      {
        title: 'Tape Reading & Market Sentiment',
        explanation: 'Observe how the market reacts to bad news. If prices refuse to fall on bad news, the underlying market is powerfully bullish.',
      },
    ],
    chapterList: [
      'Chapter 1: Boy Plunger of the Bucket Shops',
      'Chapter 2: The First Lessons in Big Money and Tape Reading',
      'Chapter 3: There is Always Another Opportunity',
      'Chapter 4: The Line of Least Resistance',
      'Chapter 5: Playing for the Big Swings',
      'Chapter 6: The Danger of Tips and Inside Information',
      'Chapter 7: Taking Profits and Pyramiding Winners',
      'Chapter 8: Market Corners and Liquidity Traps',
    ],
    excerpt:
      'Men who can both be right and sit tight are uncommon. I found it one of the hardest things to learn. But it is only after a stock operator has firmly grasped this that he can make big money. When you have a position in a trending market, let the market do the work. Do not sell simply because you have a small profit.',
    downloadFilename: 'Reminiscences_Jesse_Livermore_RDX.pdf',
  },
  {
    id: 'psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'psychology',
    rating: 4.9,
    reviewsCount: 2100,
    pages: 256,
    year: 2020,
    badge: 'Modern Essential',
    description:
      'Doing well with money has a little to do with how smart you are and a lot to do with how you behave. Essential reading for risk preservation and surviving drawdowns.',
    keyTakeaways: [
      'Getting money is one thing; keeping money is another. Survival is the single greatest superpower in markets.',
      'Room for Error (Margin of Safety): The most important part of any financial plan is to plan on your plan not going according to plan.',
      'Compounding works only when you do not interrupt it unnecessarily with blown accounts.',
      'Control over your time is the highest dividend money pays.',
    ],
    corePrinciples: [
      {
        title: 'Survival Over Optimization',
        explanation: 'Do not seek maximum theoretical leverage. A conservative risk profile that ensures you never blow up yields far higher long-term compounding.',
      },
      {
        title: 'The Tails Drive Everything',
        explanation: 'In trading, as in venture capital, a small handful of winning trades will account for 90% of your net annual PnL. You can be wrong 50% of the time and still make a fortune.',
      },
      {
        title: 'Never Risk What You Have for What You Do Not Need',
        explanation: 'Revenge trading to hit arbitrary daily targets is the fastest route to account destruction.',
      },
    ],
    chapterList: [
      'Chapter 1: No One’s Crazy',
      'Chapter 2: Luck & Risk',
      'Chapter 3: Never Enough: Knowing When to Stop',
      'Chapter 4: Confounding Compounding',
      'Chapter 5: Getting Wealthy vs Staying Wealthy',
      'Chapter 6: Tails, You Win',
      'Chapter 7: Freedom and Time Autonomy',
      'Chapter 8: Man in the Car Paradox',
      'Chapter 9: Wealth is What You Don’t See',
      'Chapter 10: Room for Error: The Power of Margin of Safety',
    ],
    excerpt:
      'The ability to do what you want, when you want, with who you want, for as long as you want, is priceless. In trading, the greatest traders are not those who make 500% in a lucky month and lose it in the next; they are the disciplined operators who survive year after year.',
    downloadFilename: 'Psychology_of_Money_Summary_RDX.pdf',
  },
  {
    id: 'smart-money-concepts-blueprint',
    title: 'Smart Money Concepts (SMC) & ICT Institutional Trading',
    author: 'RDX Master Trader',
    category: 'price-action',
    rating: 5.0,
    reviewsCount: 740,
    pages: 180,
    year: 2026,
    badge: 'Exclusive RDX Guide',
    description:
      'How banks and institutional algorithms engineer liquidity, sweep retail stop losses, and create Order Blocks and Fair Value Gaps (FVG) across intraday sessions.',
    keyTakeaways: [
      'Retail support and resistance zones are engineered liquidity pools for institutional fills.',
      'Break of Structure (BOS) confirms trend expansion; Change of Character (CHoCH) signals early trend reversal.',
      'Fair Value Gaps (FVG) represent aggressive single-side imbalance that price will return to rebalance.',
      'Killzones: High-probability setups occur during London Open and New York Open algorithmic session windows.',
    ],
    corePrinciples: [
      {
        title: 'Order Block Identification',
        explanation: 'The last opposing candle before an aggressive multi-candle impulsive displacement that breaks structure. Institutions use this zone to mitigate remaining orders.',
      },
      {
        title: 'Liquidity Sweeps (Judas Swings)',
        explanation: 'A false breakout above previous highs or below previous lows that triggers retail stops, followed by an immediate sharp reversal.',
      },
      {
        title: 'Premium vs Discount Arrays',
        explanation: 'Use Fibonacci 0.5 equilibrium to ensure you only buy in Discount (below 50%) and sell in Premium (above 50%).',
      },
    ],
    chapterList: [
      'Chapter 1: The Liquidity Paradigm: How Markets Actually Move',
      'Chapter 2: Market Structure: Swing Highs, Swing Lows, and BOS',
      'Chapter 3: Change of Character (CHoCH) vs Minor Pullbacks',
      'Chapter 4: Order Blocks: High Probability vs Low Probability',
      'Chapter 5: Fair Value Gaps (FVG) and Imbalance Fills',
      'Chapter 6: Liquidity Pools: Equal Highs (EQH) and Equal Lows (EQL)',
      'Chapter 7: Time and Price: Session Killzones and Daily Biases',
      'Chapter 8: The 5-Step RDX Institutional Entry Checklist',
    ],
    excerpt:
      'The retail trader asks: "Is this support holding?" The institutional trader asks: "Where are the retail stop losses resting, and how much liquidity is waiting there for our orders to fill?" Once you shift your perspective from indicators to liquidity, trading transforms from gambling to mathematical certainty.',
    downloadFilename: 'SMC_ICT_Mastery_Blueprint_RDX.pdf',
  },
];

export const TRENDING_PDFS: PDFItem[] = [
  {
    id: 'candlestick-bible-2026',
    title: 'Master Candlestick Pattern Bible (Win-Rate Edition)',
    category: 'candlesticks',
    fileSize: '4.8 MB',
    pages: 42,
    downloadCount: 3840,
    description:
      'Complete visual guide covering 28 single, double, and triple candlestick setups with verified statistical win-rates, optimal stop-loss placement, and entry triggers.',
    highlights: [
      '28 Visual Candlestick Pattern Diagrams with Entry/Exit annotations',
      'Historical Backtested Win-Rates across Equities, Forex, and Crypto',
      'How to avoid false breakout wicks during high-volatility sessions',
      'Volume confirmation checklist for bullish and bearish engulfing candles',
    ],
    contentSections: [
      {
        heading: '1. The Bullish Hammer & Inverted Hammer',
        description: 'Occurs at the bottom of a downtrend when sellers push prices lower, but institutional buyers aggressively step in, creating a lower shadow at least 2x the body.',
        bulletPoints: [
          'Requirement: Long lower shadow at least 2 times the length of the real body.',
          'Location: Must test an established daily or 4-hour support zone or dynamic 50 EMA.',
          'Entry: Enter on the break of the hammer high on the subsequent candle.',
          'Stop Loss: 2-3 ticks below the low of the hammer shadow.',
        ],
        proTip: 'Never enter a hammer if the volume is below the 20-period volume moving average.',
      },
      {
        heading: '2. Bullish & Bearish Engulfing Patterns',
        description: 'A two-candle reversal where the second candle completely swallows the body of the previous candle, signaling massive momentum shift.',
        bulletPoints: [
          'High win-rate variant: The second candle volume is at least 150% of the first candle.',
          'Key confirmation: Second candle closes near its high (for bullish) or low (for bearish).',
          'Avoid trading when: The pattern forms in the middle of a tight choppy range.',
        ],
        proTip: 'Combine with RSI divergence on the 15-minute timeframe for high-confidence scalps.',
      },
      {
        heading: '3. Morning Star & Evening Star Formations',
        description: 'Three-candle reversal pattern with an 72% backtested accuracy at key macro inflection levels.',
        bulletPoints: [
          'Candle 1: Strong directional candle matching prevailing trend.',
          'Candle 2: Small star candle (or Doji) showing hesitation and momentum drain.',
          'Candle 3: Powerful reversal candle closing past 50% of Candle 1 body.',
        ],
        proTip: 'The third candle is your confirmation. Do not anticipate the pattern on Candle 2.',
      },
    ],
    downloadFilename: 'RDX_Candlestick_Pattern_Bible.pdf',
  },
  {
    id: 'chart-patterns-cheat-sheet',
    title: 'High-Probability Chart Patterns Cheat Sheet',
    category: 'patterns',
    fileSize: '3.6 MB',
    pages: 36,
    downloadCount: 2950,
    description:
      'High-resolution visual cheat sheets of Head & Shoulders, Double Tops/Bottoms, Ascending/Descending Triangles, Bull & Bear Flags, and Cup & Handle setups.',
    highlights: [
      'Continuation vs Reversal pattern taxonomy for quick desk reference',
      'Measured move target calculation formula for breakout targets',
      'False breakout trap mechanics and retest entry strategies',
      'Clean diagrams optimized for mobile and desktop screens',
    ],
    contentSections: [
      {
        heading: '1. Head & Shoulders Reversal Pattern',
        description: 'One of the most reliable reversal patterns in market history, reflecting the transition from an uptrend to a downtrend.',
        bulletPoints: [
          'Left Shoulder: Price creates a high on heavy volume and pulls back.',
          'Head: Price creates a higher high on diminishing volume.',
          'Right Shoulder: Price rallies but fails to reach the head level.',
          'Neckline Break: Decisive breakdown with expanding volume confirms entry.',
        ],
        proTip: 'Measured move target is equal to the vertical distance from the Head to the Neckline projected downward.',
      },
      {
        heading: '2. Bull Flags & Pennants (Trend Continuation)',
        description: 'Sharp impulsive pole followed by a tight consolidating flag channel with declining volume.',
        bulletPoints: [
          'The Pole: Strong momentum move of 3-5 consecutive bullish candles.',
          'The Flag: Low volume, shallow consolidation sloping against the trend.',
          'Breakout: Enter as price closes above the upper trendline with volume spike.',
        ],
        proTip: 'If the flag retraces more than 50% of the pole, the probability drops significantly.',
      },
    ],
    downloadFilename: 'RDX_Chart_Patterns_Cheat_Sheet.pdf',
  },
  {
    id: 'smc-ict-quick-reference',
    title: 'Smart Money Concepts & ICT Reference Card',
    category: 'smc',
    fileSize: '5.2 MB',
    pages: 28,
    downloadCount: 4120,
    description:
      'Institutional order block identification, Fair Value Gap (FVG) rebalances, Break of Structure (BOS), Change of Character (CHoCH), and London/NY Killzones.',
    highlights: [
      'Step-by-step institutional order flow schematic',
      'How to spot valid Fair Value Gaps vs low-volume gaps',
      'Breaker block and Mitigation block cheat sheet',
      'Exact session timings for London and New York algorithmic expansion',
    ],
    contentSections: [
      {
        heading: '1. Identifying Valid Order Blocks (OB)',
        description: 'An order block is valid only when it creates a displacement and causes a clear Break of Structure (BOS).',
        bulletPoints: [
          'Must produce a Fair Value Gap (FVG) immediately following the order block.',
          'Must break a major swing high/low (BOS), not just internal structure.',
          'Entry: Place limit order at 50% (Mean Threshold) or at the open of the Order Block.',
        ],
        proTip: 'If an order block is mitigated more than twice, consider it exhausted and invalid.',
      },
      {
        heading: '2. Liquidity Sweeps and Traps',
        description: 'Banks trigger retail buy stops resting above obvious double tops before driving price into discount levels.',
        bulletPoints: [
          'Look for Equal Highs (EQH) on the 1-hour or 15-minute chart.',
          'Watch for a rapid spike above EQH during London Open (Judas Swing).',
          'Once price closes back inside the range, enter the counter-move with tight risk.',
        ],
        proTip: 'The faster the rejection wick after the sweep, the stronger the institutional conviction.',
      },
    ],
    downloadFilename: 'RDX_SMC_ICT_Quick_Reference.pdf',
  },
  {
    id: 'option-greeks-playbook',
    title: 'Option Greeks & Expiry Day Strategy Matrix',
    category: 'options',
    fileSize: '3.1 MB',
    pages: 34,
    downloadCount: 2280,
    description:
      'Master Delta, Gamma, Theta, and Vega. Strategies for Weekly Options Expiring, Hero-or-Zero setups, Strangle/Straddle adjustment rules, and Volatility Skew.',
    highlights: [
      'Delta vs Gamma acceleration on expiry day (0DTE)',
      'Theta decay curve visualization and the 30-day acceleration zone',
      'Intraday option buyer checklist for momentum breakouts',
      'Option seller margin and hedging playbook',
    ],
    contentSections: [
      {
        heading: '1. Delta & Gamma Dynamics on Expiry Day',
        description: 'On expiry day, At-The-Money (ATM) options experience extreme Gamma explosion where Delta shifts from 0.50 to 1.00 in minutes.',
        bulletPoints: [
          'Option buyers must target high-momentum momentum triggers to outpace Theta decay.',
          'Never hold Out-of-the-Money (OTM) options past 1:30 PM on expiry day unless risking small capital.',
          'Strike selection: ATM or 1 strike In-the-Money (ITM) preserves capital against decay.',
        ],
        proTip: 'Theta decay accelerates non-linearly during the final 3 hours before market close.',
      },
    ],
    downloadFilename: 'RDX_Option_Greeks_Playbook.pdf',
  },
  {
    id: 'risk-management-matrix',
    title: '1% Rule & Position Sizing Risk Matrix',
    category: 'risk-management',
    fileSize: '2.4 MB',
    pages: 20,
    downloadCount: 3100,
    description:
      'The mathematics of drawdown survival. Exact formulas for lot sizing, position allocation, risk-to-reward matrices, and maximum daily loss circuit breakers.',
    highlights: [
      'The 1% and 2% risk capital preservation table across ₹10K to ₹1Cr accounts',
      'The Drawdown Recovery Curve: Why losing 50% requires a 100% gain to break even',
      'Max Daily Loss circuit breaker rule to eliminate revenge trading',
      'Position sizing formula: Position Size = (Account Capital * Risk %) / (Entry - StopLoss)',
    ],
    contentSections: [
      {
        heading: '1. The Mathematics of Capital Preservation',
        description: 'No trading strategy can compensate for reckless position sizing. A string of 5 losses is statistically inevitable for every trader.',
        bulletPoints: [
          'A trader risking 1% per trade can withstand 20 consecutive losses and retain 81% capital.',
          'A trader risking 10% per trade is wiped out after 8 consecutive losses.',
          'Rule: Never exceed 1.5% risk of total trading capital on any single intraday trade.',
        ],
        proTip: 'When in a drawdown of more than 5%, cut your position sizing in half until rhythm is restored.',
      },
    ],
    downloadFilename: 'RDX_Risk_Management_Matrix.pdf',
  },
  {
    id: 'daily-trading-journal-template',
    title: 'Daily Trading Routine & Journal System',
    category: 'journal',
    fileSize: '1.9 MB',
    pages: 18,
    downloadCount: 2640,
    description:
      'Comprehensive pre-market preparation routine, trade log template with screenshot audit columns, psychological state tracker, and weekly performance review rubric.',
    highlights: [
      'Pre-Market 8:30 AM checklist: Global cues, FII/DII data, Key Pivot levels',
      'Execution checklist: Edge verification, SL defined, RR >= 1:2',
      'Post-Market review questions to identify psychological leaks',
      'Printable trade tracking sheets and Excel/Google Sheets template guide',
    ],
    contentSections: [
      {
        heading: '1. Pre-Market Ritual (8:30 AM - 9:00 AM)',
        description: 'Successful trading is 80% preparation and 20% disciplined execution.',
        bulletPoints: [
          'Step 1: Check GIFT Nifty, US markets close, and crude oil prices.',
          'Step 2: Mark Previous Day High (PDH), Previous Day Low (PDL), and Opening Range.',
          'Step 3: Identify institutional high-volume nodes and Fair Value Gaps on the 1-hour chart.',
          'Step 4: Formulate "If-Then" trading scenarios before the bell rings.',
        ],
        proTip: 'Never initiate a trade in the first 5 minutes unless executing a pre-planned opening drive setup.',
      },
    ],
    downloadFilename: 'RDX_Daily_Trading_Journal.pdf',
  },
];

export const TRENDING_COURSES: Course[] = [
  {
    id: 'course-price-action-masterclass',
    title: 'Price Action & Market Structure Masterclass 2026',
    instructor: 'RDX Lead Market Analyst',
    level: 'All Levels',
    duration: '18 Hours',
    modulesCount: 5,
    rating: 4.95,
    studentsCount: 2840,
    category: 'price-action',
    thumbnail: '/src/assets/images/course_price_action_1792054218118.jpg',
    description:
      'Master raw price charts without lagging indicators. Learn pure market structure, multi-timeframe fractal alignment, liquidity traps, and institutional breakout confirmations.',
    whatYouWillLearn: [
      'Read pure candlestick action across 5m, 15m, 1h, and Daily charts',
      'Identify genuine breakouts vs bull/bear traps with high precision',
      'Execute high Risk-to-Reward trades with 1:3 and 1:5 targets',
      'Master trailing stop losses to capture massive multi-hundred point trending days',
    ],
    modules: [
      {
        moduleNumber: 1,
        title: 'Foundation of Market Structure',
        lessons: [
          { id: 'l1', title: 'Understanding Higher Highs, Higher Lows & Trend Identification', duration: '28 min', type: 'video', description: 'How to map swing points objectively without clutter.', keyTakeaway: 'Trends only change when swing points break, not when prices fluctuate within a range.' },
          { id: 'l2', title: 'Break of Structure (BOS) vs Minor Market Noise', duration: '34 min', type: 'video', description: 'Differentiating real structural expansion from temporary pullbacks.', keyTakeaway: 'Always look for candle body closes beyond swing highs to confirm valid structure.' },
          { id: 'l3', title: 'Support & Resistance Role Reversal Principles', duration: '25 min', type: 'video', description: 'Trading the polarity flip where old resistance becomes new support.', keyTakeaway: 'Wait for the retest with declining seller volume before entering.' },
        ],
      },
      {
        moduleNumber: 2,
        title: 'Candlestick Dynamics & Rejection Zones',
        lessons: [
          { id: 'l4', title: 'Decoding Wick Rejections & Absorption', duration: '32 min', type: 'video', description: 'What wicks tell you about aggressive institutional counter-orders.', keyTakeaway: 'Long wicks at key levels show aggressive order absorption.' },
          { id: 'l5', title: 'Inside Bar & Range Contraction Explosions', duration: '26 min', type: 'video', description: 'Catching explosive volatility expansions from tight ranges.', keyTakeaway: 'Volatility is cyclical: low volatility always precedes high volatility.' },
        ],
      },
      {
        moduleNumber: 3,
        title: 'High-Probability Entry Models',
        lessons: [
          { id: 'l6', title: 'The Opening Range Breakout (ORB) Strategy', duration: '40 min', type: 'video', description: 'Executing the 15-minute opening range with strict stop loss rules.', keyTakeaway: 'Never chase the initial bar; enter on the retest of the range boundary.' },
          { id: 'l7', title: 'The 5-Minute Pullback Continuation Setup', duration: '35 min', type: 'video', description: 'Our highest win-rate intraday bread-and-butter model.', keyTakeaway: 'Risk 1R to make 3R by entering on micro-flag breaks in direction of the 1-hour trend.' },
        ],
      },
    ],
  },
  {
    id: 'course-options-zero-to-hero',
    title: 'Options Buying & Selling: Zero to Hero',
    instructor: 'RDX Derivatives Specialist',
    level: 'Intermediate',
    duration: '22 Hours',
    modulesCount: 6,
    rating: 4.9,
    studentsCount: 3120,
    category: 'options',
    thumbnail: '/src/assets/images/course_smart_money_1792054216848.jpg',
    description:
      'Complete derivatives curriculum covering option pricing mechanics, Delta/Gamma bursts, weekly expiry trading, iron condors, and intraday index option scalp setups.',
    whatYouWillLearn: [
      'Master Option Greeks: Delta, Theta, Gamma, Vega, and IV Skew',
      'Identify intraday option buying setups with strict SL to prevent premium decay',
      'Execute non-directional option selling with margin-efficient hedged spreads',
      'Master Weekly Expiry Hero-or-Zero calculation and trade selection',
    ],
    modules: [
      {
        moduleNumber: 1,
        title: 'Derivatives Architecture & The Greeks',
        lessons: [
          { id: 'o1', title: 'How Strike Prices and Premiums are Really Calculated', duration: '30 min', type: 'video', description: 'Intrinsic value vs extrinsic time value demystified.', keyTakeaway: 'Time value belongs to the seller until momentum arrives.' },
          { id: 'o2', title: 'Delta & Gamma: The Velocity of Options', duration: '45 min', type: 'video', description: 'Why ATM options yield the highest percentage gains on fast moves.', keyTakeaway: 'Trade ATM or ITM strikes to minimize bid-ask spread and slippage.' },
        ],
      },
      {
        moduleNumber: 2,
        title: 'Intraday Option Buying Execution',
        lessons: [
          { id: 'o3', title: 'The Momentum Squeeze Setup for Option Buyers', duration: '38 min', type: 'video', description: 'Entering right before the explosive surge so theta does not hurt you.', keyTakeaway: 'If momentum stalls for more than 15 minutes, exit the trade.' },
          { id: 'o4', title: 'Expiry Day 1:30 PM Setup (Hero-to-Super Hero)', duration: '52 min', type: 'video', description: 'The exact criteria to capture 100% to 300% moves with capped risk.', keyTakeaway: 'Risk only 0.5% of your capital on expiry day lottery setups.' },
        ],
      },
    ],
  },
  {
    id: 'course-smc-institutional-flow',
    title: 'Smart Money Concepts & Institutional Order Flow',
    instructor: 'RDX Senior Floor Trader',
    level: 'Advanced',
    duration: '25 Hours',
    modulesCount: 6,
    rating: 4.98,
    studentsCount: 1950,
    category: 'smc',
    thumbnail: '/src/assets/images/hero_trading_desk_1792054217980.jpg',
    description:
      'Learn how institutional algorithms, market makers, and prop firms move markets. Trade alongside banks using Order Blocks, Fair Value Gaps, and Liquidity Sweeps.',
    whatYouWillLearn: [
      'Stop thinking like retail: Understand where banks need liquidity to fill huge orders',
      'Identify institutional Order Blocks and high-probability Fair Value Gaps',
      'Master the Asian Range sweep and London/NY Killzone execution',
      'Trade with 1:5 to 1:10 Risk-to-Reward ratio entries',
    ],
    modules: [
      {
        moduleNumber: 1,
        title: 'Liquidity Pools & Market Maker Manipulation',
        lessons: [
          { id: 's1', title: 'Buy-Side Liquidity (BSL) & Sell-Side Liquidity (SSL)', duration: '35 min', type: 'video', description: 'Mapping where retail stop losses accumulate before each session.', keyTakeaway: 'Liquidity rests above equal highs and below equal lows.' },
          { id: 's2', title: 'The Judas Swing: The London Open Fakeout', duration: '42 min', type: 'video', description: 'Why price moves opposite to the real daily trend between 1:00 PM and 2:30 PM IST.', keyTakeaway: 'Wait for the manipulation wick before entering the true daily expansion.' },
        ],
      },
      {
        moduleNumber: 2,
        title: 'Order Block & Imbalance Mastery',
        lessons: [
          { id: 's3', title: 'Valid vs Invalid Order Blocks Explained', duration: '40 min', type: 'video', description: 'Filter out 70% of low-probability order blocks using displacement.', keyTakeaway: 'An order block without an adjacent FVG is weak.' },
          { id: 's4', title: 'Fair Value Gap (FVG) Entries & Targets', duration: '33 min', type: 'video', description: 'How to enter at the 50% rebalance point with razor-thin stop losses.', keyTakeaway: 'Price returns to fill imbalances like water filling a void.' },
        ],
      },
    ],
  },
];
