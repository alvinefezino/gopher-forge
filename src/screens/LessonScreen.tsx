import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../theme/tokens';
import { modules } from '../data/modules';
import { CodeEditor } from '../components/CodeEditor';
import { Console } from '../components/Console';
import { runGo } from '../lib/goRunner';
import { markLessonDone } from '../lib/storage';
import { AppButton } from '../components/ui/Button';

export function LessonScreen({ route, navigation }: any) {
  const { moduleId, lessonId } = route.params;
  const mod = modules.find(m => m.id === moduleId)!;
  const lesson = mod.lessonList.find(l => l.id === lessonId)!;
  const idx = mod.lessonList.findIndex(l => l.id === lessonId);
  const [code, setCode] = useState(lesson.code);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const onRun = async () => {
    setRunning(true);
    setError(null);
    setOutput('');
    const res = await runGo(code);
    setRunning(false);
    setDuration(res.durationMs);
    if (res.error) setError(res.error);
    else setOutput(res.output);

    // check expected
    if (!res.error && lesson.expectedOutput) {
      const norm = (s: string) => s.trim().replace(/\r/g, '');
      if (norm(res.output) === norm(lesson.expectedOutput)) {
        setDone(true);
        await markLessonDone(mod.id, lesson.id);
      }
    }
  };

  const onReset = () => { setCode(lesson.code); setOutput(''); setError(null); setDuration(undefined); setDone(false); };

  const nextLesson = mod.lessonList[idx + 1];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}><Text style={styles.backText}>← {mod.title}</Text></Pressable>

        <View style={styles.header}>
          <Text style={styles.kicker}>LESSON {idx + 1} OF {mod.lessonList.length} · {lesson.duration}</Text>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.desc}>{lesson.description}</Text>
          {lesson.expectedOutput && (
            <View style={styles.expectBox}>
              <Text style={styles.expectLabel}>Expected output</Text>
              <Text style={styles.expectVal}>{lesson.expectedOutput}</Text>
            </View>
          )}
          <View style={styles.hintBox}>
            <Text style={styles.hintLabel}>Hint</Text>
            <Text style={styles.hintText}>{lesson.hint}</Text>
          </View>
        </View>

        <CodeEditor value={code} onChange={setCode} />

        <View style={styles.actions}>
          <AppButton label={running ? 'Running...' : 'Run'} onPress={onRun} variant="primary" disabled={running} style={{ flex: 1 }} />
          <AppButton label="Reset" onPress={onReset} variant="ghost" style={{ width: 96 }} />
        </View>

        <Console output={output} error={error} durationMs={duration} isRunning={running} />

        {done && (
          <View style={styles.doneBanner}>
            <Text style={styles.doneTitle}>Nice work. Output matched.</Text>
            <Text style={styles.doneSub}>Lesson marked complete. Keep going.</Text>
            {nextLesson ? (
              <Pressable onPress={() => navigation.replace('Lesson', { moduleId: mod.id, lessonId: nextLesson.id })} style={styles.nextBtn}>
                <Text style={styles.nextText}>Next: {nextLesson.title} →</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => navigation.navigate('Module', { moduleId: mod.id })} style={styles.nextBtn}>
                <Text style={styles.nextText}>Back to {mod.title} →</Text>
              </Pressable>
            )}
          </View>
        )}

        {error && <Text style={styles.errorHelp}>Fix the error above, then tap Run again. Check package name and imports.</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.bg },
  root: { flex: 1, backgroundColor: tokens.bg, paddingHorizontal: 16 },
  back: { alignSelf: 'flex-start', marginTop: 12, backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
  backText: { color: tokens.text, fontSize: 13, fontWeight: '600' },
  header: { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 14, marginTop: 12, marginBottom: 12 },
  kicker: { color: tokens.accent, fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  title: { color: tokens.text, fontSize: 18, fontWeight: '800', letterSpacing: -0.4, marginTop: 6 },
  desc: { color: tokens.textMuted, fontSize: 13, lineHeight: 18, marginTop: 8 },
  expectBox: { backgroundColor: tokens.surfaceRaised, borderWidth: 1, borderColor: tokens.border, borderRadius: 8, padding: 10, marginTop: 12 },
  expectLabel: { color: tokens.textDim, fontSize: 10, fontWeight: '800', letterSpacing: 0.6, textTransform: 'uppercase' },
  expectVal: { color: tokens.text, fontFamily: 'monospace', fontSize: 12, marginTop: 6, lineHeight: 16 },
  hintBox: { backgroundColor: tokens.accentSoft, borderWidth: 1, borderColor: tokens.accentBorder, borderRadius: 8, padding: 10, marginTop: 10 },
  hintLabel: { color: tokens.accent, fontSize: 10, fontWeight: '800', letterSpacing: 0.6, textTransform: 'uppercase' },
  hintText: { color: tokens.text, fontSize: 12, marginTop: 4, lineHeight: 16 },
  actions: { flexDirection: 'row', gap: 10, marginBottom: 12, marginTop: 2 },
  doneBanner: { backgroundColor: tokens.successSoft, borderWidth: 1, borderColor: 'rgba(61,220,132,0.24)', borderRadius: tokens.radiusLg, padding: 14, marginTop: 12 },
  doneTitle: { color: tokens.success, fontSize: 14, fontWeight: '800' },
  doneSub: { color: tokens.textMuted, fontSize: 12, marginTop: 4 },
  nextBtn: { marginTop: 10, backgroundColor: tokens.success, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  nextText: { color: '#0A0F0D', fontSize: 13, fontWeight: '800' },
  errorHelp: { color: tokens.textDim, fontSize: 12, marginTop: 8, lineHeight: 16 },
});
