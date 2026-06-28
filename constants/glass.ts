/**
 * PAKKA GLASS VARIANTS — LIGHT THEME
 * White cards with subtle shadows and borders.
 */

export type GlassVariant = 'frost' | 'liquid' | 'blur' | 'crystal' | 'ultra';

export interface GlassStyle {
  background: string;
  borderColor: string;
  blurIntensity: number;
  blurTint: 'light' | 'dark' | 'default';
  shadow: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

export const glassVariants: Record<GlassVariant, GlassStyle> = {
  frost: {
    background: '#FFFFFF',
    borderColor: '#F0F0F0',
    blurIntensity: 0,
    blurTint: 'light',
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 3,
    },
  },
  liquid: {
    background: '#FFFFFF',
    borderColor: '#E8E8E8',
    blurIntensity: 0,
    blurTint: 'light',
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
  },
  blur: {
    background: 'rgba(0,0,0,0.95)',
    borderColor: '#F0F0F0',
    blurIntensity: 20,
    blurTint: 'light',
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
  },
  crystal: {
    background: 'rgba(0,0,0,0.9)',
    borderColor: '#F5F5F5',
    blurIntensity: 10,
    blurTint: 'light',
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 1,
    },
  },
  ultra: {
    background: '#FAFAFA',
    borderColor: '#F0F0F0',
    blurIntensity: 0,
    blurTint: 'light',
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 1,
    },
  },
};
