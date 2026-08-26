export interface CountryCode {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
  pattern?: string;
}

export const countriesCodes: CountryCode[] = [
  { name: "United States", flag: "🇺🇸", code: "US", dialCode: "+1" },
  { name: "Canada", flag: "🇨🇦", code: "CA", dialCode: "+1" },
  { name: "Mexico", flag: "🇲🇽", code: "MX", dialCode: "+52" },
  { name: "Guatemala", flag: "🇬🇹", code: "GT", dialCode: "+502" },
  { name: "Honduras", flag: "🇭🇳", code: "HN", dialCode: "+504" },
  { name: "El Salvador", flag: "🇸🇻", code: "SV", dialCode: "+503" },
  { name: "Nicaragua", flag: "🇳🇮", code: "NI", dialCode: "+505" },
  { name: "Costa Rica", flag: "🇨🇷", code: "CR", dialCode: "+506" },
  { name: "Panama", flag: "🇵🇦", code: "PA", dialCode: "+507" },
  { name: "Cuba", flag: "🇨🇺", code: "CU", dialCode: "+53" },
  { name: "Dominican Republic", flag: "🇩🇴", code: "DO", dialCode: "+1" },
  { name: "Puerto Rico", flag: "🇵🇷", code: "PR", dialCode: "+1" },

  { name: "Colombia", flag: "🇨🇴", code: "CO", dialCode: "+57" },
  { name: "Argentina", flag: "🇦🇷", code: "AR", dialCode: "+54" },
  { name: "Brazil", flag: "🇧🇷", code: "BR", dialCode: "+55" },
  { name: "Chile", flag: "🇨🇱", code: "CL", dialCode: "+56" },
  { name: "Peru", flag: "🇵🇪", code: "PE", dialCode: "+51" },
  { name: "Venezuela", flag: "🇻🇪", code: "VE", dialCode: "+58" },
  { name: "Ecuador", flag: "🇪🇨", code: "EC", dialCode: "+593" },
  { name: "Bolivia", flag: "🇧🇴", code: "BO", dialCode: "+591" },
  { name: "Uruguay", flag: "🇺🇾", code: "UY", dialCode: "+598" },
  { name: "Paraguay", flag: "🇵🇾", code: "PY", dialCode: "+595" },

  { name: "Spain", flag: "🇪🇸", code: "ES", dialCode: "+34" },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB", dialCode: "+44" },
  { name: "France", flag: "🇫🇷", code: "FR", dialCode: "+33" },
  { name: "Germany", flag: "🇩🇪", code: "DE", dialCode: "+49" },
  { name: "Italy", flag: "🇮🇹", code: "IT", dialCode: "+39" },
  { name: "Portugal", flag: "🇵🇹", code: "PT", dialCode: "+351" },
  { name: "Netherlands", flag: "🇳🇱", code: "NL", dialCode: "+31" },
  { name: "Belgium", flag: "🇧🇪", code: "BE", dialCode: "+32" },
  { name: "Switzerland", flag: "🇨🇭", code: "CH", dialCode: "+41" },
  { name: "Austria", flag: "🇦🇹", code: "AT", dialCode: "+43" },
  { name: "Sweden", flag: "🇸🇪", code: "SE", dialCode: "+46" },
  { name: "Norway", flag: "🇳🇴", code: "NO", dialCode: "+47" },
  { name: "Denmark", flag: "🇩🇰", code: "DK", dialCode: "+45" },
  { name: "Poland", flag: "🇵🇱", code: "PL", dialCode: "+48" },
  { name: "Ukraine", flag: "🇺🇦", code: "UA", dialCode: "+380" },
  { name: "Russia", flag: "🇷🇺", code: "RU", dialCode: "+7" },

  { name: "China", flag: "🇨🇳", code: "CN", dialCode: "+86" },
  { name: "Japan", flag: "🇯🇵", code: "JP", dialCode: "+81" },
  { name: "South Korea", flag: "🇰🇷", code: "KR", dialCode: "+82" },
  { name: "India", flag: "🇮🇳", code: "IN", dialCode: "+91" },
  { name: "Turkey", flag: "🇹🇷", code: "TR", dialCode: "+90" },
  { name: "Australia", flag: "🇦🇺", code: "AU", dialCode: "+61" },
  { name: "New Zealand", flag: "🇳🇿", code: "NZ", dialCode: "+64" },
  { name: "Israel", flag: "🇮🇱", code: "IL", dialCode: "+972" },
  { name: "United Arab Emirates", flag: "🇦🇪", code: "AE", dialCode: "+971" },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "SA", dialCode: "+966" },
];

export const getCountryCode = (code?: string | null): string => {
  return (
    countriesCodes.find((country) => country.code === code)?.dialCode ?? ""
  );
};

export const defaultCountry = (): CountryCode => {
  return countriesCodes.find((country) => country.code === "US")!;
};
