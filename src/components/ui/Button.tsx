import { View, Text, Pressable, StyleSheet } from 'react-native';
import { tokens } from '../../theme/tokens';

export function AppButton({ label, onPress, variant = 'primary', disabled, style }: { label: string; onPress?: () => void; variant?: 'primary' | 'ghost' | 'outline'; disabled?: boolean; style?: any }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'ghost' && styles.ghost,
        variant === 'outline' && styles.outline,
        pressed && !disabled && { opacity: 0.85, transform: [{ scale: 0.99 }] },
        disabled && { opacity: 0.4 },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.label, variant === 'primary' ? styles.labelPrimary : variant === 'outline' ? styles.labelOutline : styles.labelGhost]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, borderWidth: 1, borderColor: 'transparent' },
  primary: { backgroundColor: tokens.accent, borderColor: tokens.accent },
  ghost: { backgroundColor: tokens.surfaceRaised, borderColor: tokens.border },
  outline: { backgroundColor: 'transparent', borderColor: tokens.borderStrong },
  label: { fontSize: 15, fontWeight: '600', letterSpacing: 0.2 },
  labelPrimary: { color: '#11110F' },
  labelGhost: { color: tokens.text },
  labelOutline: { color: tokens.text },
});
