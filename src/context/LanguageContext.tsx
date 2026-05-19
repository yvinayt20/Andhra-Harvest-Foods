'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Language = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml'

export const LANGUAGES: { code: Language; nativeLabel: string }[] = [
  { code: 'en', nativeLabel: 'English' },
  { code: 'te', nativeLabel: 'తెలుగు' },
  { code: 'hi', nativeLabel: 'हिंदी' },
  { code: 'ta', nativeLabel: 'தமிழ்' },
  { code: 'kn', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'ml', nativeLabel: 'മലയാളം' },
]

export interface Translations {
  navHome: string
  navAbout: string
  navProducts: string
  navQuality: string
  navExports: string
  navBulkOrders: string
  navContact: string
  navAllProducts: string
  shopNow: string
  heroLine1: string
  heroLine2: string
  heroLine3: string
  heroSubheading: string
  heroExploreProducts: string
  heroBulkOrders: string
  heroContactUs: string
}

const T: Record<Language, Translations> = {
  en: {
    navHome: 'Home',
    navAbout: 'About Us',
    navProducts: 'Products',
    navQuality: 'Quality & Packaging',
    navExports: 'Exports',
    navBulkOrders: 'Bulk Orders',
    navContact: 'Contact Us',
    navAllProducts: 'All Products →',
    shopNow: 'Shop Now',
    heroLine1: 'Premium Foods.',
    heroLine2: 'Trusted Quality.',
    heroLine3: 'Healthier Families.',
    heroSubheading: 'Pure grains, pulses, spices & essentials — carefully selected and hygienically packed for every home.',
    heroExploreProducts: 'Explore Products',
    heroBulkOrders: 'Bulk Orders',
    heroContactUs: 'Contact Us',
  },
  te: {
    navHome: 'హోమ్',
    navAbout: 'మా గురించి',
    navProducts: 'ఉత్పత్తులు',
    navQuality: 'నాణ్యత & ప్యాకేజింగ్',
    navExports: 'ఎగుమతులు',
    navBulkOrders: 'బల్క్ ఆర్డర్లు',
    navContact: 'సంప్రదించండి',
    navAllProducts: 'అన్ని ఉత్పత్తులు →',
    shopNow: 'ఇప్పుడే కొనండి',
    heroLine1: 'ప్రీమియం ఆహారాలు.',
    heroLine2: 'విశ్వసనీయ నాణ్యత.',
    heroLine3: 'ఆరోగ్యకరమైన కుటుంబాలు.',
    heroSubheading: 'స్వచ్ఛమైన ధాన్యాలు, పప్పులు, మసాలాలు & అవసరాలు — ప్రతి ఇంటికోసం శ్రద్ధగా ఎంచుకుని, పరిశుభ్రంగా ప్యాక్ చేయబడ్డాయి.',
    heroExploreProducts: 'ఉత్పత్తులు చూడండి',
    heroBulkOrders: 'బల్క్ ఆర్డర్లు',
    heroContactUs: 'సంప్రదించండి',
  },
  hi: {
    navHome: 'होम',
    navAbout: 'हमारे बारे में',
    navProducts: 'उत्पाद',
    navQuality: 'गुणवत्ता और पैकेजिंग',
    navExports: 'निर्यात',
    navBulkOrders: 'थोक ऑर्डर',
    navContact: 'संपर्क करें',
    navAllProducts: 'सभी उत्पाद →',
    shopNow: 'अभी खरीदें',
    heroLine1: 'उत्तम खाद्य पदार्थ।',
    heroLine2: 'भरोसेमंद गुणवत्ता।',
    heroLine3: 'स्वस्थ परिवार।',
    heroSubheading: 'शुद्ध अनाज, दालें, मसाले और जरूरी चीजें — हर घर के लिए सावधानी से चुनी और स्वच्छतापूर्वक पैक की गई।',
    heroExploreProducts: 'उत्पाद देखें',
    heroBulkOrders: 'थोक ऑर्डर',
    heroContactUs: 'संपर्क करें',
  },
  ta: {
    navHome: 'முகப்பு',
    navAbout: 'எங்களைப் பற்றி',
    navProducts: 'தயாரிப்புகள்',
    navQuality: 'தரம் & பேக்கேஜிங்',
    navExports: 'ஏற்றுமதி',
    navBulkOrders: 'மொத்த ஆர்டர்',
    navContact: 'தொடர்பு கொள்ளுங்கள்',
    navAllProducts: 'அனைத்து தயாரிப்புகள் →',
    shopNow: 'இப்போது வாங்கவும்',
    heroLine1: 'உயர்தர உணவுகள்.',
    heroLine2: 'நம்பகமான தரம்.',
    heroLine3: 'ஆரோக்கியமான குடும்பங்கள்.',
    heroSubheading: 'தூய தானியங்கள், பருப்புகள், மசாலா மற்றும் அத்தியாவசியங்கள் — ஒவ்வொரு வீட்டிற்கும் கவனமாக தேர்ந்தெடுக்கப்பட்டு சுகாதாரமாக பேக் செய்யப்பட்டவை.',
    heroExploreProducts: 'தயாரிப்புகளை காணுங்கள்',
    heroBulkOrders: 'மொத்த ஆர்டர்',
    heroContactUs: 'தொடர்பு கொள்ளுங்கள்',
  },
  kn: {
    navHome: 'ಮುಖ್ಯಪುಟ',
    navAbout: 'ನಮ್ಮ ಬಗ್ಗೆ',
    navProducts: 'ಉತ್ಪನ್ನಗಳು',
    navQuality: 'ಗುಣಮಟ್ಟ & ಪ್ಯಾಕೇಜಿಂಗ್',
    navExports: 'ರಫ್ತು',
    navBulkOrders: 'ಬಲ್ಕ್ ಆರ್ಡರ್‌ಗಳು',
    navContact: 'ಸಂಪರ್ಕಿಸಿ',
    navAllProducts: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು →',
    shopNow: 'ಈಗ ಕೊಳ್ಳಿ',
    heroLine1: 'ಉತ್ತಮ ಆಹಾರ.',
    heroLine2: 'ವಿಶ್ವಾಸಾರ್ಹ ಗುಣಮಟ್ಟ.',
    heroLine3: 'ಆರೋಗ್ಯಕರ ಕುಟುಂಬಗಳು.',
    heroSubheading: 'ಶುದ್ಧ ಧಾನ್ಯಗಳು, ಬೇಳೆಗಳು, ಮಸಾಲೆಗಳು ಮತ್ತು ಅಗತ್ಯ ವಸ್ತುಗಳು — ಪ್ರತಿ ಮನೆಗೆ ಎಚ್ಚರಿಕೆಯಿಂದ ಆಯ್ಕೆ ಮಾಡಿ, ಸ್ವಚ್ಛವಾಗಿ ಪ್ಯಾಕ್ ಮಾಡಲಾಗಿದೆ.',
    heroExploreProducts: 'ಉತ್ಪನ್ನಗಳನ್ನು ನೋಡಿ',
    heroBulkOrders: 'ಬಲ್ಕ್ ಆರ್ಡರ್‌ಗಳು',
    heroContactUs: 'ಸಂಪರ್ಕಿಸಿ',
  },
  ml: {
    navHome: 'ഹോം',
    navAbout: 'ഞങ്ങളെക്കുറിച്ച്',
    navProducts: 'ഉൽപ്പന്നങ്ങൾ',
    navQuality: 'ഗുണനിലവാരം & പ്യാക്കേജിംഗ്',
    navExports: 'കയറ്റുമതി',
    navBulkOrders: 'ബൾക്ക് ഓർഡർ',
    navContact: 'ഞങ്ങളെ ബന്ധപ്പെടുക',
    navAllProducts: 'എല്ലാ ഉൽപ്പന്നങ്ങളും →',
    shopNow: 'ഇപ്പോൾ വാങ്ങൂ',
    heroLine1: 'മികച്ച ഭക്ഷ്യ വസ്തുക്കൾ.',
    heroLine2: 'വിശ്വസനീയ ഗുണനിലവാരം.',
    heroLine3: 'ആരോഗ്യകരമായ കുടുംബങ്ങൾ.',
    heroSubheading: 'ശുദ്ധമായ ധാന്യങ്ങൾ, പയർ, മസാലകൾ & അവശ്യ സാധനങ്ങൾ — ഓരോ വീടിനും ശ്രദ്ധാപൂർവം തിരഞ്ഞെടുത്ത്, ശുചിത്വമായി പ്യാക്ക് ചെയ്തവ.',
    heroExploreProducts: 'ഉൽപ്പന്നങ്ങൾ കാണൂ',
    heroBulkOrders: 'ബൾക്ക് ഓർഡർ',
    heroContactUs: 'ഞങ്ങളെ ബന്ധപ്പെടുക',
  },
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'ahf_lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null
      if (saved && saved in T) setLanguageState(saved)
    } catch {}
  }, [])

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    try { localStorage.setItem(STORAGE_KEY, lang) } catch {}
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: T[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
