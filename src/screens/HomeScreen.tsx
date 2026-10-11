import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../theme/tokens';
import { modules } from '../data/modules';
import { getProgress } from '../lib/storage';

function Badge({ text, color }: { text: string; color?: string }) {
  return <View style={[styles.badge, color && { borderColor: color }]}><Text style={[styles.badgeText, color && { color }]}>{text}</Text></View>;
}

export function HomeScreen({ navigation }: any) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('All');
  const [progress, setProgress] = useState<Record<string, string[]>>({});
  useEffect(() => { getProgress().then(setProgress); const id = setInterval(() => getProgress().then(setProgress), 1500); return () => clearInterval(id); }, []);

  const filtered = modules.filter(m => {
    const okQ = !q || m.title.toLowerCase().includes(q.toLowerCase()) || m.description.toLowerCase().includes(q.toLowerCase());
    const okF = filter === 'All' || m.level === filter;
    return okQ && okF;
  });

  const totalLessons = modules.reduce((a, m) => a + m.lessonList.length, 0);
  const doneLessons = Object.values(progress).reduce((a, b) => a + b.length, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.kicker}>GOPHER FORGE</Text>
            <Text style={styles.title}>Learn Go.{'\n'}Forge code.</Text>
            <Text style={styles.sub}>15 tracks, 54 lessons. Code anywhere, even offline.</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{doneLessons}/{totalLessons}</Text>
            <Text style={styles.statLabel}>lessons done</Text>
            <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${Math.round((doneLessons / Math.max(1, totalLessons)) * 100)}%` }]} /></View>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput value={q} onChangeText={setQ} placeholder="Search modules" placeholderTextColor={tokens.textDim} style={styles.searchInput} />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(c => (
            <Pressable key={c} onPress={() => setFilter(c)} style={[styles.chip, filter === c && styles.chipActive]}>
              <Text style={[styles.chipText, filter === c && styles.chipTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {filtered.map(m => {
            const done = (progress[m.id] || []).length;
            const pct = Math.round((done / m.lessonList.length) * 100);
            return (
              <Pressable key={m.id} onPress={() => navigation.navigate('Module', { moduleId: m.id })} style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}>
                <View style={styles.cardTop}>
                  <View style={[styles.levelDot, { backgroundColor: m.color }]} />
                  <Text style={styles.level}>{m.level}</Text>
                  <Text style={styles.cardMeta}>{m.lessons} lessons  ·  {m.duration}</Text>
                </View>
                <Text style={styles.cardTitle}>{m.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{m.description}</Text>
                <View style={styles.cardFoot}>
                  <View style={styles.miniTrack}><View style={[styles.miniFill, { width: `${pct}%`, backgroundColor: m.color }]} /></View>
                  <Text style={styles.pct}>{pct}%</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {filtered.length === 0 && (
          <View style={styles.empty}><Text style={styles.emptyText}>No modules match.</Text></View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.bg },
  root: { flex: 1, backgroundColor: tokens.bg, paddingHorizontal: 16 },
  header: { flexDirection: 'row', gap: 12, paddingTop: 18, paddingBottom: 16 },
  kicker: { color: tokens.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8 },
  title: { color: tokens.text, fontSize: 30, fontWeight: '800', lineHeight: 30, letterSpacing: -0.8 },
  sub: { color: tokens.textMuted, fontSize: 13, lineHeight: 18, marginTop: 10 },
  statCard: { width: 122, backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 12, alignSelf: 'flex-start' },
  statNum: { color: tokens.text, fontSize: 20, fontWeight: '800' },
  statLabel: { color: tokens.textMuted, fontSize: 11, fontWeight: '600', marginTop: 2 },
  progressTrack: { height: 6, backgroundColor: tokens.surfaceRaised, borderRadius: 3, marginTop: 10, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: tokens.accent, borderRadius: 3 },
  searchRow: { marginBottom: 12 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 10, paddingHorizontal: 12, height: 44 },
  searchIcon: { color: tokens.textDim, fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: tokens.text, fontSize: 14 },
  chips: { gap: 8, paddingBottom: 14, flexDirection: 'row' },
  chip: { paddingHorizontal: 14, height: 32, borderRadius: 16, borderWidth: 1, borderColor: tokens.border, backgroundColor: tokens.surface, alignItems: 'center', justifyContent: 'center' },
  chipActive: { backgroundColor: tokens.accent, borderColor: tokens.accent },
  chipText: { color: tokens.textMuted, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#11110F' },
  grid: { gap: 12 },
  card: { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  levelDot: { width: 8, height: 8, borderRadius: 4 },
  level: { color: tokens.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' },
  cardMeta: { color: tokens.textDim, fontSize: 11, marginLeft: 'auto' },
  cardTitle: { color: tokens.text, fontSize: 16, fontWeight: '700', letterSpacing: -0.3 },
  cardDesc: { color: tokens.textMuted, fontSize: 13, lineHeight: 18, marginTop: 6 },
  cardFoot: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  miniTrack: { flex: 1, height: 6, backgroundColor: tokens.surfaceRaised, borderRadius: 3, overflow: 'hidden' },
  miniFill: { height: 6, borderRadius: 3 },
  pct: { color: tokens.textMuted, fontSize: 12, fontWeight: '700', width: 32, textAlign: 'right' },
  empty: { padding: 24, alignItems: 'center' },
  emptyText: { color: tokens.textDim },
  badge: { borderWidth: 1, borderColor: tokens.border, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: tokens.textMuted, fontSize: 11, fontWeight: '700' },
});
