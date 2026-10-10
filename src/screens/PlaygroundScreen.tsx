import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../theme/tokens';
import { CodeEditor } from '../components/CodeEditor';
import { Console } from '../components/Console';
import { runGo } from '../lib/goRunner';
import { AppButton } from '../components/ui/Button';

const SNIPPETS: Record<string, string> = {
  Hello: `package main
import "fmt"
func main() {
  fmt.Println("hello, forge")
}`,
  Fib: `package main
import "fmt"
func fib(n int) int {
  if n < 2 { return n }
  return fib(n-1) + fib(n-2)
}
func main() {
  for i := 0; i < 8; i++ {
    fmt.Printf("%d ", fib(i))
  }
}`,
  HTTP: `package main
import (
  "fmt"
  "net/http"
)
func handler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintln(w, "forge up")
}
func main() {
  http.HandleFunc("/", handler)
  fmt.Println("listening on :8080")
}`,
  Goroutine: `package main
import (
  "fmt"
  "time"
)
func say(s string) {
  for i := 0; i < 3; i++ {
    fmt.Println(s)
    time.Sleep(100 * time.Millisecond)
  }
}
func main() {
  go say("forge")
  say("gopher")
}`,
};

export function PlaygroundScreen() {
  const [code, setCode] = useState(SNIPPETS.Hello);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState('Hello');

  const onRun = async () => {
    setRunning(true);
    setError(null);
    setOutput('');
    const res = await runGo(code);
    setRunning(false);
    setDuration(res.durationMs);
    if (res.error) setError(res.error);
    else setOutput(res.output);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <Text style={styles.kicker}>YAEGI · OFFLINE</Text>
          <Text style={styles.title}>Playground</Text>
          <Text style={styles.sub}>Write Go, tap Run. Interpreted on-device with yaegi — no server, no network after package cache.</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {Object.keys(SNIPPETS).map(k => (
            <Pressable key={k} onPress={() => { setActive(k); setCode(SNIPPETS[k]); setOutput(''); setError(null); setDuration(undefined); }} style={[styles.chip, active === k && styles.chipActive]}>
              <Text style={[styles.chipText, active === k && styles.chipTextActive]}>{k}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <CodeEditor value={code} onChange={setCode} />

        <View style={styles.actions}>
          <AppButton label={running ? 'Running...' : 'Run  ▶'} onPress={onRun} disabled={running} variant="primary" style={{ flex: 1 }} />
          <AppButton label="Clear" onPress={() => { setOutput(''); setError(null); setDuration(undefined); }} variant="ghost" style={{ width: 96 }} />
        </View>

        <Console output={output} error={error} durationMs={duration} isRunning={running} />

        <View style={styles.note}>
          <Text style={styles.noteTitle}>Offline note</Text>
          <Text style={styles.noteText}>Yaegi runs ~90% of Go — fmt, strings, json, net/http stubs, goroutines, generics (partial). cgo, assembly, and unsafe are not supported on-device. For full gc fidelity, swap in a WASM build or proxy when online.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.bg },
  root: { flex: 1, backgroundColor: tokens.bg, paddingHorizontal: 16 },
  head: { paddingTop: 18, paddingBottom: 12 },
  kicker: { color: tokens.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: tokens.text, fontSize: 26, fontWeight: '800', letterSpacing: -0.6, marginTop: 6 },
  sub: { color: tokens.textMuted, fontSize: 13, lineHeight: 18, marginTop: 8 },
  chips: { gap: 8, flexDirection: 'row', paddingBottom: 12 },
  chip: { paddingHorizontal: 14, height: 32, borderRadius: 16, borderWidth: 1, borderColor: tokens.border, backgroundColor: tokens.surface, alignItems: 'center', justifyContent: 'center' },
  chipActive: { backgroundColor: tokens.accent, borderColor: tokens.accent },
  chipText: { color: tokens.textMuted, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#11110F' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 12, marginBottom: 12 },
  note: { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 12, marginTop: 12 },
  noteTitle: { color: tokens.text, fontSize: 12, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase' },
  noteText: { color: tokens.textMuted, fontSize: 12, lineHeight: 17, marginTop: 6 },
});
