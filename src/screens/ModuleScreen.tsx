import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../theme/tokens';
import { modules } from '../data/modules';
import { getProgress } from '../lib/storage';
import { useEffect, useState } from 'react';

export function ModuleScreen({ route, navigation }: any) {
  const { moduleId } = route.params;
  const mod = modules.find(m => m.id === moduleId)!;
  const [progress, setProgress] = useState<Record<string, string[]>>({});
  useEffect(() => { getProgress().then(setProgress); }, []);
  const done = progress[mod.id] || [];
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}><Text style={styles.backText}>← Back</Text></Pressable>
        <View style={styles.hero}>
          <View style={[styles.heroBadge, { borderColor: mod.color }]}><View style={[styles.dot, { backgroundColor: mod.color }]} /><Text style={[styles.heroBadgeText, { color: mod.color }]}>{mod.level}</Text></View>
          <Text style={styles.title}>{mod.title}</Text>
          <Text style={styles.desc}>{mod.description}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>{mod.lessons} lessons</Text><Text style={styles.metaDot}>·</Text><Text style={styles.meta}>{mod.duration}</Text><Text style={styles.metaDot}>·</Text><Text style={styles.meta}>{done.length}/{mod.lessonList.length} done</Text>
          </View>
          <View style={styles.track}><View style={[styles.fill, { width: `${Math.round((done.length / mod.lessonList.length) * 100)}%`, backgroundColor: mod.color }]} /></View>
        </View>
        <View style={{ gap: 10, marginTop: 16 }}>
          {mod.lessonList.map((lesson, idx) => {
            const isDone = done.includes(lesson.id);
            const isLocked = idx > 0 && !done.includes(mod.lessonList[idx - 1].id) && !isDone;
            return (
              <Pressable
                key={lesson.id}
                onPress={() => !isLocked && navigation.navigate('Lesson', { moduleId: mod.id, lessonId: lesson.id })}
                style={[styles.lessonCard, isDone && styles.lessonDone, isLocked && { opacity: 0.5 }]}
              >
                <View style={[styles.numBox, isDone && { backgroundColor: mod.color, borderColor: mod.color }]}>
                  <Text style={[styles.numText, isDone && { color: '#11110F' }]}>{isDone ? '✓' : idx + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDesc} numberOfLines={2}>{lesson.description}</Text>
                  <Text style={styles.lessonDur}>{lesson.duration}{isLocked ? ' · Complete previous to unlock' : ''}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.bg },
  root: { flex: 1, backgroundColor: tokens.bg, paddingHorizontal: 16 },
  back: { alignSelf: 'flex-start', marginTop: 12, backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
  backText: { color: tokens.text, fontSize: 13, fontWeight: '600' },
  hero: { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 14, marginTop: 12 },
  heroBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: tokens.surfaceRaised },
  dot: { width: 6, height: 6, borderRadius: 3 },
  heroBadgeText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.6 },
  title: { color: tokens.text, fontSize: 22, fontWeight: '800', letterSpacing: -0.6, marginTop: 10 },
  desc: { color: tokens.textMuted, fontSize: 13, lineHeight: 18, marginTop: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  meta: { color: tokens.textDim, fontSize: 12, fontWeight: '600' },
  metaDot: { color: tokens.textDim },
  track: { height: 6, backgroundColor: tokens.surfaceRaised, borderRadius: 3, marginTop: 12, overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3 },
  lessonCard: { flexDirection: 'row', gap: 12, backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 12, alignItems: 'center' },
  lessonDone: { borderColor: 'rgba(255,193,69,0.22)' },
  numBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: tokens.surfaceRaised, borderWidth: 1, borderColor: tokens.border, alignItems: 'center', justifyContent: 'center' },
  numText: { color: tokens.text, fontSize: 14, fontWeight: '800' },
  lessonTitle: { color: tokens.text, fontSize: 14, fontWeight: '700' },
  lessonDesc: { color: tokens.textMuted, fontSize: 12, lineHeight: 16, marginTop: 3 },
  lessonDur: { color: tokens.textDim, fontSize: 11, fontWeight: '600', marginTop: 6 },
});
