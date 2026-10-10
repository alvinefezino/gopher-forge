import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

export function Console({ output, error, durationMs, isRunning }: { output: string; error: string | null; durationMs?: number; isRunning?: boolean }) {
  const hasError = !!error;
  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <View style={[styles.dot, { backgroundColor: hasError ? tokens.danger : isRunning ? tokens.warning : tokens.success }]} />
        <Text style={styles.headText}>{isRunning ? 'Running' : hasError ? 'Error' : output ? 'Output' : 'Console'}</Text>
        {durationMs !== undefined && output ? <Text style={styles.time}>{durationMs} ms</Text> : null}
      </View>
      <View style={[styles.body, hasError && styles.bodyError]}>
        {isRunning ? (
          <Text style={styles.outputDim}>Running your code...</Text>
        ) : hasError ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : output ? (
          <Text style={styles.outputText}>{output}</Text>
        ) : (
          <Text style={styles.outputDim}>Tap Run to see output here.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, overflow: 'hidden', backgroundColor: tokens.surface },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8 as any, paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: tokens.border, backgroundColor: tokens.surfaceRaised },
  dot: { width: 8, height: 8, borderRadius: 4 },
  headText: { color: tokens.text, fontSize: 12, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase', flex: 1 },
  time: { color: tokens.textDim, fontSize: 11, fontWeight: '600' },
  body: { minHeight: 88, padding: 12 },
  bodyError: { backgroundColor: tokens.dangerSoft },
  outputText: { color: tokens.text, fontFamily: 'monospace', fontSize: 13, lineHeight: 18 },
  errorText: { color: '#FF8A80', fontFamily: 'monospace', fontSize: 13, lineHeight: 18 },
  outputDim: { color: tokens.textDim, fontSize: 13, fontStyle: 'italic' },
});
