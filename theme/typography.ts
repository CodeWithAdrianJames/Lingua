export const fontFamilies = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const typography = {
  h1: {
    label: "Page / Screen Title",
    fontSize: 32,
    lineHeight: 38.4,
    fontFamily: fontFamilies.bold,
    weight: "Bold",
  },
  h2: {
    label: "Section Title",
    fontSize: 24,
    lineHeight: 31.2,
    fontFamily: fontFamilies.semiBold,
    weight: "SemiBold",
  },
  h3: {
    label: "Card / Module Title",
    fontSize: 20,
    lineHeight: 26,
    fontFamily: fontFamilies.semiBold,
    weight: "SemiBold",
  },
  h4: {
    label: "Subheading",
    fontSize: 16,
    lineHeight: 22.4,
    fontFamily: fontFamilies.medium,
    weight: "Medium",
  },
  bodyLarge: {
    label: "Important content",
    fontSize: 16,
    lineHeight: 25.6,
    fontFamily: fontFamilies.regular,
    weight: "Regular",
  },
  bodyMedium: {
    label: "Body text",
    fontSize: 14,
    lineHeight: 22.4,
    fontFamily: fontFamilies.regular,
    weight: "Regular",
  },
  bodySmall: {
    label: "Supporting text",
    fontSize: 13,
    lineHeight: 20.8,
    fontFamily: fontFamilies.regular,
    weight: "Regular",
  },
  caption: {
    label: "Labels, meta text",
    fontSize: 11,
    lineHeight: 15.4,
    fontFamily: fontFamilies.regular,
    weight: "Regular",
  },
} as const;

export type TypographyRole = keyof typeof typography;
