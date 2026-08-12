/**
 * MAISON LUMIÈRE — Journal Article Data
 * Renders dynamic blog detail pages based on the ?post= query parameter.
 * Each post carries its own hero, body, author, pull-quote and curator blocks.
 */
(function () {
  'use strict';

  const POSTS = {
    tourbillon: {
      slug: 'tourbillon',
      title: 'The Tourbillon: Why Watchmaking\u2019s Greatest Achievement Defies the Digital Age',
      tag: 'Horology',
      heroImg: 'assets/images/bdetail-hero-tourbillon.png',
      heroAlt: 'Master watchmaker with tourbillon',
      author: 'Sir Edmund Ashworth',
      authorImg: 'assets/images/bdetail-author-edmund.png',
      authorRole: 'Founder of Maison Lumière',
      date: 'August 5, 2026',
      isoDate: '2026-08-05',
      readTime: '8 min read',
      metaExcerpt: 'In an era of atomic-precise quartz and GPS-synced smartwatches, why do the world\u2019s most discerning collectors still pay six figures for a mechanical complication that barely improves accuracy? The answer lies in the soul of horology itself.',
      body: [
        { type: 'p', text: 'Abraham-Louis Breguet patented the tourbillon in 1801 with a singular purpose: to counteract the effects of gravity on a pocket watch movement. Worn vertically in a waistcoat pocket, the escapement would consistently be in the same gravitational orientation, causing positional errors to accumulate over time. Breguet\u2019s genius was to mount the entire escapement and balance wheel within a rotating cage, completing one revolution per minute, thereby averaging out gravitational errors across all positions.' },
        { type: 'p', text: 'Today, that original mechanical rationale barely applies. Modern wristwatches are worn on a moving wrist, constantly changing orientation. A tourbillon in a wristwatch provides, at best, marginal precision improvements — and even then, only in very specific test conditions. A well-regulated COSC chronometer can beat a tourbillon on a timing machine without breaking a sweat.' },
        { type: 'blockquote', text: '\u201CThe tourbillon is not about precision. It never truly was. It is about the human desire to tame time itself — and to display that conquest openly on the wrist.\u201D' },
        { type: 'h2', text: 'The Theatre of Mechanics' },
        { type: 'p', text: 'And yet — the tourbillon endures, and not merely as a marketing conceit. There is something profoundly moving about observing a tourbillon in motion. Through the open dial, you witness a miniature cosmos of steel bridges, ruby jewels, and balance springs, all revolving in perfect choreography at sixty turns per hour. The finest examples — Patek Philippe\u2019s Reference 5216G, A. Lange & S\u00F6hne\u2019s Tourbograph Perpetual — are among the most extraordinary mechanical objects ever created by human hands.' },
        { type: 'figure', src: 'assets/images/bdetail-article-flying-tourbillon.png', alt: 'Luxury tourbillon watch movement', caption: 'A contemporary flying tourbillon — the cage suspended without upper bridge, allowing an unobstructed view of the rotating escapement.' },
        { type: 'h2', text: 'The Economics of Desire' },
        { type: 'p', text: 'A master watchmaker may spend 300 to 600 hours constructing a single tourbillon cage — a component that typically contains 70 to 100 parts and weighs less than 0.3 grams. This investment of human skill and time is not merely reflected in the price; it is the price. When you purchase a tourbillon, you are acquiring centuries of accumulated knowledge, embodied in a space smaller than a fingernail.' },
        { type: 'p', text: 'From an investment perspective, the calculus is compelling. The most desirable tourbillons from Patek Philippe, A. Lange & S\u00F6hne, and F.P. Journe consistently appreciate beyond retail value. At Maison Lumière, we have observed an average appreciation of 18-22% per annum on desirable tourbillon references over the past decade — far exceeding conventional asset classes.' },
        { type: 'blockquote', text: '\u201CTo own a great tourbillon is to participate in a lineage stretching from Breguet\u2019s Paris atelier to the present. It is not nostalgia. It is civilisation.\u201D' },
        { type: 'h2', text: 'The Digital Question' },
        { type: 'p', text: 'The smart watch industry invests billions in features that become obsolete within three years. A tourbillon created in Breguet\u2019s original workshop is still ticking today — and will continue to tick long after every computing device manufactured this year has been recycled into obsolescence. In a culture of disposability, the tourbillon represents a radical act of permanence.' },
        { type: 'p', text: 'This is why, at Maison Lumière, we continue to maintain a waiting list for the most desirable tourbillon references. Demand is not merely sustained — it is intensifying. The more we live in an ephemeral digital world, the more profoundly significant the enduring mechanical world becomes.' }
      ],
      tags: ['Horology', 'Tourbillon', 'Swiss Watches', 'Investment', 'Patek Philippe'],
      authorBio: 'Founder of Maison Lumière. Former head technician at Audemars Piguet Geneva. Fellow of the British Horological Institute, author of Mechanical Cosmos (2018), and collector of over 300 historic timepieces spanning four centuries.',
      quote: '\u201CIn a world of disposable technology, the tourbillon is a declaration of permanence — and a reminder that true luxury is measured in centuries, not software updates.\u201D',
      quoteBy: 'Sir Edmund Ashworth, Maison Lumière',
      curator: {
        eyebrow: 'About the Curator',
        name: 'Sir Edmund',
        surname: 'Ashworth',
        bio: 'With over four decades immersed in the finest mechanical watchmaking, Edmund has personally handled more than 15,000 timepieces — from 18th-century fus\u00E9e pocket watches to contemporary grand complications. His monograph Mechanical Cosmos is considered essential reading in horological circles worldwide.',
        stats: [
          { value: '42', label: 'Years Experience' },
          { value: '15k+', label: 'Pieces Handled' },
          { value: '3', label: 'Published Books' },
          { value: '12', label: 'Industry Awards' }
        ]
      },
      related: ['four-cs', 'gold-investment']
    },

    'four-cs': {
      slug: 'four-cs',
      title: 'The Four Cs Reimagined: How Modern Gemology Goes Beyond Clarity',
      tag: 'High Jewellery',
      heroImg: 'assets/images/blog-post-1-diamond.png',
      heroAlt: 'Diamond jewellery article',
      author: 'Lady Caroline Ashworth',
      authorImg: 'assets/images/about-team-caroline.png',
      authorRole: 'Head of Diamonds',
      date: 'July 28, 2026',
      isoDate: '2026-07-28',
      readTime: '6 min read',
      metaExcerpt: 'Beyond cut, colour, clarity, and carat — today\u2019s sophisticated buyers are asking deeper questions about provenance, origin, and ethical sourcing.',
      body: [
        { type: 'p', text: 'For more than a century, the four Cs — carat, cut, colour, and clarity — have served as the universal shorthand for evaluating a diamond. They are a useful starting point, but they were never a complete one. A stone can excel on all four and still be profoundly ordinary; another can fail every benchmark and still command a fortune at auction. The difference lives in the qualities that refuse to be codified.' },
        { type: 'p', text: 'Provenance has overtaken carat weight as the defining question for the new generation of buyers. A 2-carat stone unearthed in a conflict-free mine, certified down to its exact origin, with a documented path from rough crystal to polished gem, tells a story that resonates far more deeply than a larger but anonymous diamond from a generation ago.' },
        { type: 'blockquote', text: '\u201CA diamond is not defined by what it weighs, but by the truth of where it came from and the human hands that shaped it.\u201D' },
        { type: 'h2', text: 'Beyond the Grading Report' },
        { type: 'p', text: 'Laboratory reports describe what a diamond is. They do not describe why it captivates. Two stones with identical grading can be worlds apart in fire, brilliance, and presence — because light behaviour depends not just on the numbers, but on proportions, symmetry, and the invisible art of the cutter. At Maison Lumière, every stone that enters our collection is evaluated by a master gemologist before it ever reaches our case.' },
        { type: 'figure', src: 'assets/images/diamond-collection.png', alt: 'Diamond jewellery collection', caption: 'Fancy-cut diamonds at Maison Lumière — each certified, mapped, and personally selected.' },
        { type: 'h2', text: 'The Ethics of Beauty' },
        { type: 'p', text: 'Traceability is no longer a niche concern. Lab-grown alternatives, synthetic stones, and recycled diamonds have all entered the market, and each raises its own questions of value and authenticity. For clients who treasure the geological romance of a diamond formed over millions of years, we pair every piece with blockchain-verified provenance — a digital lineage recorded from the mine to the maison.' },
        { type: 'p', text: 'Value, in the modern sense, begins with trust. We remain committed to the Kimberley Process, partner exclusively with certified suppliers, and document the full journey of every stone. In doing so we honour not only our clients — but the universal truth that the most beautiful objects are always the most honest ones.' }
      ],
      tags: ['High Jewellery', 'Diamonds', 'Gemology', 'Ethical Sourcing', 'Provenance'],
      authorBio: 'Head of Diamonds at Maison Lumière. A graduate gemologist of GIA, Caroline spent a decade at leading Geneva auction houses before joining the family maison to lead its diamond acquisition and curation programme.',
      quote: '\u201CThe finest diamond is not the one that weighs most — it is the one whose story can be told with utter confidence.\u201D',
      quoteBy: 'Lady Caroline Ashworth, Maison Lumière',
      curator: {
        eyebrow: 'About the Curator',
        name: 'Lady Caroline',
        surname: 'Ashworth',
        bio: 'A certified gemologist and third-generation connoisseur, Caroline has appraised more than 60,000 diamonds and built the maison\u2019s celebrated antique and signature engagement collections. Her eye for light and proportion is regarded as among the finest in London.',
        stats: [
          { value: '60k+', label: 'Diamonds Appraised' },
          { value: '20', label: 'Years in House' },
          { value: '2', label: 'Published Guides' },
          { value: '5', label: 'Curation Awards' }
        ]
      },
      related: ['tourbillon', 'gold-investment']
    },

    'gold-investment': {
      slug: 'gold-investment',
      title: 'Why Gold Jewellery Remains the Wisest Luxury Investment of 2026',
      tag: 'Investment',
      heroImg: 'assets/images/blog-post-2-gold.png',
      heroAlt: 'Gold jewellery investment article',
      author: 'James Whitfield',
      authorImg: 'assets/images/about-team-james.png',
      authorRole: 'Director of Acquisitions',
      date: 'July 14, 2026',
      isoDate: '2026-07-14',
      readTime: '5 min read',
      metaExcerpt: 'As global markets fluctuate, high-quality 18k gold pieces continue to appreciate — combining aesthetic pleasure with financial resilience.',
      body: [
        { type: 'p', text: 'Gold has out-performed nearly every major asset class across the past decade — and unlike the others, it can be worn. This duality is the quiet secret of the investment jewellery market: a piece of serious 18k or 22k gold delivers the emotional return of a beautiful object and the balance-sheet return of a hard asset, simultaneously.' },
        { type: 'p', text: 'Bullion, of course, is the purest expression of value, but it offers no joy beyond the vault. The collector who acquires a well-made gold piece — a heavy chain, a sculptural cuff, a classic link bracelet — captures both the metal weight and the craftsmanship premium. When that piece is from a respected maison with a documented history, the premium can equal or exceed the pure gold value.' },
        { type: 'blockquote', text: '\u201CThe wisest investment is the one you can wear — and the one that makes every day feel like a return on capital.\u201D' },
        { type: 'h2', text: 'Reading the Market' },
        { type: 'p', text: 'Central bank demand continues to climb, and geopolitical uncertainty only strengthens the case for physical gold. Jewellery, unlike bars or coins, is finite in supply per design and rises with both gold price and scarcity. Our clients who acquired high-craft pieces a decade ago are seeing appreciation profiles that comfortably eclipse their equity portfolios on a risk-adjusted basis.' },
        { type: 'figure', src: 'assets/images/gold-collection.png', alt: 'Gold jewellery collection', caption: 'The maison\u2019s gold collection — each piece independently valued and accompanied by assay documentation.' },
        { type: 'h2', text: 'A Strategy for the Collector' },
        { type: 'p', text: 'Buy weight, but never at the cost of craft. A heavy but brutish piece will always lag a lighter, more beautiful one. Acquire with provenance and documentation, hold for a minimum of five years, and buy what you genuinely love — because the collector who loves a piece rarely sells it too early, which is precisely the discipline that wealth builders rely on.' },
        { type: 'p', text: 'At Maison Lumière, every acquisition is appraised by our in-house gemologist and accompanied by full certification. We invite you to arrange a private viewing of the current acquisition floor — where investment returns meet daily, wearable beauty.' }
      ],
      tags: ['Investment', 'Gold', '18k', 'Collecting', 'Wealth'],
      authorBio: 'Director of Acquisitions at Maison Lumière. A former commodities analyst, James bridges finance and craft, advising collectors on the art of building wealth through wearable assets.',
      quote: '\u201CGold never stops being beautiful, and it never stops being valuable. That is a combination no other asset can claim.\u201D',
      quoteBy: 'James Whitfield, Maison Lumière',
      curator: {
        eyebrow: 'About the Curator',
        name: 'James',
        surname: 'Whitfield',
        bio: 'James spent a decade in commodities trading before joining the maison as Director of Acquisitions. He has structured some of the most significant private gold acquisitions in recent British retail history and lectures on the subject of jewellery as an asset class.',
        stats: [
          { value: '25', label: 'Years in Finance' },
          { value: '£80m+', label: 'Acquisitions Led' },
          { value: '1', label: 'Market Monograph' },
          { value: '4', label: 'Advisory Boards' }
        ]
      },
      related: ['four-cs', 'tourbillon']
    },

    'art-of-gifting': {
      slug: 'art-of-gifting',
      title: 'The Art of Gifting: 10 Timepieces That Will Move Anyone to Tears',
      tag: 'Gifting Guide',
      heroImg: 'assets/images/blog-post-3-gifting.png',
      heroAlt: 'Gifting guide article',
      author: 'The Editorial Team',
      authorImg: 'assets/images/store-interior.png',
      authorRole: 'Maison Lumière',
      date: 'July 2, 2026',
      isoDate: '2026-07-02',
      readTime: '7 min read',
      metaExcerpt: 'The most meaningful gifts transcend their monetary value. Here are our curators\u2019 ten most emotionally resonant timepieces for 2026.',
      body: [
        { type: 'p', text: 'We have consoled executives, celebrated anniversaries, commemorated births, and bid farewell to colleagues grown dear. Across all of it, a single principle has held constant: the gifts that move people are never the most expensive — they are the most personal. A timepiece marks the one thing none of us have enough of, which is precisely why it lands with such force.' },
        { type: 'p', text: 'For an engagement, consider something engraved with the date itself. For a retirement, a classic dress watch that will be worn to dinners for the next thirty years. For a milestone birthday, a chronograph — a celebration of movement, measured in retrospect. The occasion should dictate the architecture of the gift, not the other way around.' },
        { type: 'blockquote', text: '\u201CA watch is the only piece of jewellery that tells the story of a relationship in minutes rather than in stones.\u201D' },
        { type: 'h2', text: 'Ten Pieces, Ten Emotions' },
        { type: 'p', text: 'Our current curation spans understated dress pieces for the sentimental, engineering marvels for the collector, and sculptural gold for the maximalist. Each has been chosen for its emotional resonance — the sound of its movement, the weight in the hand, the way light catches an edge. We avoid trends; we choose time.' },
        { type: 'figure', src: 'assets/images/gifting-service.png', alt: 'Gifting concierge service', caption: 'The gifting concierge experience — private previews, bespoke engraving, and presentation worthy of the moment.' },
        { type: 'h2', text: 'The Concierge Difference' },
        { type: 'p', text: 'Every gifting commission at Maison Lumière opens with a private consultation. We learn the recipient\u2019s taste, their profession, their wrist, even their handwriting for the dedication. The result is a present that appears to have been waiting — inevitably, perfectly — for the moment it is unboxed.' },
        { type: 'p', text: 'To begin, book a complimentary gifting consultation with our concierge team. Ten timepieces await; the right one, we promise, will find its owner.' }
      ],
      tags: ['Gifting', 'Timepieces', 'Engagement', 'Milestones', 'Concierge'],
      authorBio: 'The Editorial Team curates the maison\u2019s journal — blending horology, jewellery, and the culture of fine living for our most thoughtful readers.',
      quote: '\u201CThe perfect gift is never chosen. It is discovered — patiently, privately, and with the right person.\u201D',
      quoteBy: 'The Editorial Team, Maison Lumière',
      curator: {
        eyebrow: 'Gifting Desks',
        name: 'The Editorial',
        surname: 'Team',
        bio: 'Alongside the maison\u2019s specialist curators, the gifting desk brings together bespoke engraving, presentation ateliers, and a private preview floor to create moments that outlast the occasion itself.',
        stats: [
          { value: '10', label: 'Curated Pieces' },
          { value: '500+', label: 'Gifts Delivered' },
          { value: '24h', label: 'Concierge Turnaround' },
          { value: '100%', label: 'Engraved By Hand' }
        ]
      },
      related: ['gold-investment', 'four-cs']
    },

    'bond-street-atelier': {
      slug: 'bond-street-atelier',
      title: 'Behind Closed Doors: A Private Tour of Our Bond Street Atelier',
      tag: 'Experience',
      heroImg: 'assets/images/blog-post-4-vault.png',
      heroAlt: 'Private tour of the atelier',
      author: 'Amira Al-Rashid',
      authorImg: 'assets/images/about-team-amira.png',
      authorRole: 'Private Client Director',
      date: 'June 18, 2026',
      isoDate: '2026-06-18',
      readTime: '5 min read',
      metaExcerpt: 'Step beyond the showroom floor and into the heart of Maison Lumière — the private consultation suites, the repair workshop, the vault.',
      body: [
        { type: 'p', text: 'The showroom is a stage, and every client deserves to see the wings. Behind the glass cases of Bond Street lies a working maison: quiet corridors, lamplit benches, and rooms few visitors ever glimpse. Tonight we unlock a few of those doors.' },
        { type: 'p', text: 'The repair workshop is the soul of the building. Master watchmakers subordinate their artistry to the discipline of resurrection — restoring a 1950s chronograph to its original heartbeat, re-pinioning gears nobody else can source, polishing a case to the millimetre. It is slow, precise, and utterly absorbing work.' },
        { type: 'blockquote', text: '\u201CAnyone can sell a watch. To repair one faithfully is to be admitted to the lineage of those who made it.\u201D' },
        { type: 'h2', text: 'The Private Consultation Suite' },
        { type: 'p', text: 'Above the shop floor, the consultation suites are arranged for one thing: unhurried decision. Champagne is poured, the catalogue is set aside, and pieces arrive individually from the vault on velvet trays. There is no clock in the room — a deliberate omission, and one that says more about the maison than any slogan.' },
        { type: 'figure', src: 'assets/images/store-interior.png', alt: 'The Bond Street atelier interior', caption: 'The private consultation suite — designed to make time, not keep it.' },
        { type: 'h2', text: 'The Vault' },
        { type: 'p', text: 'Beneath the safety of bonded steel lie pieces never displayed publicly — archive references, one-of-a-kind commissions, and treasures awaiting their owner. It is here that the true scale of what four decades of acquisition has assembled becomes apparent. Access is by invitation, and it is the rarest privilege the maison offers.' },
        { type: 'p', text: 'Private tours of the atelier are occasionally available to clients and journalists. Enquiries are handled personally by the Private Client Director, who will be delighted to arrange a visit suited to your curiosity.' }
      ],
      tags: ['Experience', 'Atelier', 'Bond Street', 'Workshop', 'Heritage'],
      authorBio: 'Private Client Director at Maison Lumière. Amira leads the maison\u2019s concierge programme and private acquisitions for a select global clientele.',
      quote: '\u201CThe maison opens many doors. Its most beautiful one leads behind the counter.\u201D',
      quoteBy: 'Amira Al-Rashid, Maison Lumière',
      curator: {
        eyebrow: 'About the Curator',
        name: 'Amira',
        surname: 'Al-Rashid',
        bio: 'Amira has spent fifteen years orchestrating private acquisitions and bespoke commissions. Fluent in four languages and equally at home in a Geneva auction room or a Bond Street drawing room, she is the first point of contact for the maison\u2019s most personal requests.',
        stats: [
          { value: '15', label: 'Years in Maison' },
          { value: '300+', label: 'Private Commissions' },
          { value: '4', label: 'Languages Spoken' },
          { value: '1000+', label: 'Clients Advised' }
        ]
      },
      related: ['tourbillon', 'art-of-gifting']
    }
  };

  window.ML_BLOG_POSTS = POSTS;
})();