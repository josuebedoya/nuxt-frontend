export interface ConfigComponentText {
  typeTag?: string;
  classDinamic?: string;
  text?: string;
  icon?: string;

  // Tipografía
  color?: string;
  background?: string;
  size?: string;
  fontWeight?: string;
  fontFamily?: string;
  textTransform?: string;
  letterSpacing?: string;
  textDecoration?: string;

  // Espaciado
  lineHeight?: string;
  textAlign?: string;
  margin?: string;
  padding?: string;
  textIndent?: string;

  // Comportamiento
  textOverflow?: string;
  whiteSpace?: string;
  overflow?: string;
  wordBreak?: string;

  // Estilos adicionales
  opacity?: string;
  maxWidth?: string;
  display?: string;
  visibility?: string;
  hoverColor?: string;
  transition?: string;
  textWrap?: string;

  // Orden (útil para flex/grid)
  order?: string;
  colStart?: string;
  colPosition?: string;
}
