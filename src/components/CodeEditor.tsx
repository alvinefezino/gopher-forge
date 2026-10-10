import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { tokens } from '../theme/tokens';

export function CodeEditor({ value, onChange, editable = true }: { value: string; onChange: (v: string) => void; editable?: boolean }) {
  const lines = value.split('\n');
  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <Text style={styles.headText}>main.go</Text>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
          <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
          <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.gutter}>
          {lines.map((_, i) => (
            <Text key={i} style={styles.lineNo}>{i + 1}</Text>
          ))}
        </View>
        <TextInput
          value={value}
          onChangeText={onChange}
          multiline
          editable={editable}
          autoCorrect={false}
          autoCapitalize="none"
          spellCheck={false}
          style={styles.input}
          placeholder="Write Go code..."
          placeholderTextColor={tokens.textDim}
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, overflow: 'hidden', backgroundColor: '#0D0F10' },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#121416', borderBottomWidth: 1, borderBottomColor: tokens.border },
  headText: { color: tokens.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 0.6 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  body: { flexDirection: 'row', minHeight: 280 },
  gutter: { width: 36, backgroundColor: '#0A0C0D', paddingVertical: 12, alignItems: 'flex-end', paddingRight: 8, borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.06)' },
  lineNo: { color: '#3A4440', fontFamily: 'monospace', fontSize: 12, lineHeight: 20 },
  input: { flex: 1, color: '#E8E6DE', fontFamily: 'monospace', fontSize: 13, lineHeight: 20, padding: 12, textAlignVertical: 'top' },
});
