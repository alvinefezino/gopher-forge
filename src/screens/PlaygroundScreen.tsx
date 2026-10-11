import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Share, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../theme/tokens';
import { CodeEditor } from '../components/CodeEditor';
import { Console } from '../components/Console';
import { runGo } from '../lib/goRunner';
import { formatGo } from '../lib/goFormat';
import { AppButton } from '../components/ui/Button';
import { getForgeFiles, saveForgeFiles, getForgeActiveId, saveForgeActiveId, type ForgeFile } from '../lib/storage';

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

const DEFAULT_FILES: ForgeFile[] = [
  { id: 'main', name: 'main.go', code: SNIPPETS.Hello },
  { id: 'fib', name: 'fib.go', code: SNIPPETS.Fib },
  { id: 'http', name: 'server.go', code: SNIPPETS.HTTP },
];

const TOOLBAR: { label: string; insert: string }[] = [
  { label: ':=', insert: ' := ' },
  { label: 'func', insert: 'func ' },
  { label: 'if', insert: 'if ' },
  { label: 'for', insert: 'for ' },
  { label: 'fmt.Println', insert: 'fmt.Println("")' },
  { label: '{}', insert: '{}' },
  { label: '()', insert: '()' },
  { label: '[]', insert: '[]' },
  { label: '" "', insert: '""' },
  { label: '<-', insert: ' <- ' },
  { label: 'go', insert: 'go ' },
  { label: 'return', insert: 'return ' },
];

function uid() {
  return Math.random().toString(36).slice(2, 8);
}

export function PlaygroundScreen() {
  const [files, setFiles] = useState<ForgeFile[]>(DEFAULT_FILES);
  const [activeId, setActiveId] = useState<string>('main');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [running, setRunning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newName, setNewName] = useState('');

  const activeFile = files.find(f => f.id === activeId) || files[0];
  const code = activeFile?.code ?? '';

  useEffect(() => {
    (async () => {
      const saved = await getForgeFiles();
      const savedActive = await getForgeActiveId();
      if (saved && saved.length) {
        const normalized = saved.map(f => ({ ...f, name: f.name.endsWith('.go') ? f.name : f.name + '.go' }));
        setFiles(normalized);
        if (savedActive && normalized.find(f => f.id === savedActive)) setActiveId(savedActive);
        else setActiveId(normalized[0].id);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveForgeFiles(files);
  }, [files, loaded]);

  useEffect(() => {
    if (!loaded) return;
    saveForgeActiveId(activeId);
  }, [activeId, loaded]);

  const updateCode = (v: string) => {
    setFiles(prev => prev.map(f => (f.id === activeId ? { ...f, code: v } : f)));
  };

  const insertToken = (tok: string) => {
    updateCode(code + tok);
  };

  const onRun = async () => {
    if (!code.includes('package main')) {
      setError('package main required — every file must start with package main');
      return;
    }
    setRunning(true);
    setError(null);
    setOutput('');
    const res = await runGo(code);
    setRunning(false);
    setDuration(res.durationMs);
    if (res.error) setError(res.error);
    else setOutput(res.output);
  };

  const onFormat = () => {
    const res = formatGo(code);
    if (res.error) {
      setError(res.error);
      return;
    }
    updateCode(res.code);
    setError(null);
  };

  const onShare = async () => {
    try {
      await Share.share({ message: code, title: activeFile.name });
    } catch {}
  };

  const onNewFile = () => {
    let name = newName.trim();
    if (!name) return;
    if (!name.endsWith('.go')) name += '.go';
    if (!/^[a-zA-Z0-9_.-]+\.go$/.test(name)) {
      Alert.alert('Invalid name', 'Use letters, numbers, _ - . and end with .go');
      return;
    }
    if (files.find(f => f.name === name)) {
      Alert.alert('Exists', `${name} already exists`);
      return;
    }
    const f: ForgeFile = { id: uid(), name, code: `package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("new file: ${name}")\n}\n` };
    setFiles(prev => [...prev, f]);
    setActiveId(f.id);
    setNewName('');
    setShowNewModal(false);
    setError(null);
    setOutput('');
  };

  const onDelete = (id: string) => {
    if (files.length <= 1) {
      Alert.alert('Cannot delete', 'Keep at least one .go file');
      return;
    }
    Alert.alert('Delete file?', `${files.find(f => f.id === id)?.name} will be removed`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const next = files.filter(f => f.id !== id);
          setFiles(next);
          if (activeId === id) setActiveId(next[0].id);
        },
      },
    ]);
  };

  const onDuplicate = () => {
    const copy: ForgeFile = { id: uid(), name: activeFile.name.replace('.go', '_copy.go'), code };
    setFiles(prev => [...prev, copy]);
    setActiveId(copy.id);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.head}>
          <Text style={styles.kicker}>OFFLINE · GO ONLY</Text>
          <Text style={styles.title}>Forge</Text>
          <Text style={styles.sub}>Pure Go editor. Every file is .go — write, run, and see output right here.</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.fileTabs}>
          {files.map(f => (
            <Pressable key={f.id} onPress={() => setActiveId(f.id)} style={[styles.fileTab, activeId === f.id && styles.fileTabActive]}>
              <Text style={[styles.fileTabText, activeId === f.id && styles.fileTabTextActive]}>{f.name}</Text>
              {files.length > 1 && (
                <Pressable onPress={() => onDelete(f.id)} hitSlop={8} style={styles.fileClose}>
                  <Text style={styles.fileCloseText}>×</Text>
                </Pressable>
              )}
            </Pressable>
          ))}
          <Pressable onPress={() => setShowNewModal(true)} style={styles.newTab}>
            <Text style={styles.newTabText}>+ New .go</Text>
          </Pressable>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.toolbar}>
          {TOOLBAR.map(t => (
            <Pressable key={t.label} onPress={() => insertToken(t.insert)} style={styles.toolChip}>
              <Text style={styles.toolChipText}>{t.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <CodeEditor value={code} onChange={updateCode} />

        <View style={styles.actions}>
          <AppButton label={running ? 'Running...' : 'Run  ▶'} onPress={onRun} disabled={running} variant="primary" style={{ flex: 1 }} />
          <AppButton label="Fmt" onPress={onFormat} variant="ghost" style={{ width: 72 }} />
          <AppButton label="Share" onPress={onShare} variant="ghost" style={{ width: 72 }} />
        </View>

        <View style={styles.secondaryRow}>
          <Pressable onPress={onDuplicate} style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>Duplicate</Text>
          </Pressable>
          <Pressable onPress={() => { setOutput(''); setError(null); setDuration(undefined); }} style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>Clear output</Text>
          </Pressable>
          <Pressable onPress={() => updateCode(SNIPPETS.Hello)} style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>Reset to hello</Text>
          </Pressable>
        </View>

        <Console output={output} error={error} durationMs={duration} isRunning={running} />

        <View style={styles.note}>
          <Text style={styles.noteTitle}>Offline · Go-only</Text>
          <Text style={styles.noteText}>Files stay on your device and keep working without internet after setup. Use Fmt to tidy your code and Run to see output below.</Text>
        </View>
      </ScrollView>

      <Modal visible={showNewModal} transparent animationType="fade" onRequestClose={() => setShowNewModal(false)}>
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Go file</Text>
            <Text style={styles.modalSub}>Name must end with .go — e.g. utils.go</Text>
            <TextInput value={newName} onChangeText={setNewName} placeholder="e.g. handler.go" placeholderTextColor={tokens.textDim} autoCapitalize="none" autoCorrect={false} style={styles.modalInput} />
            <View style={styles.modalRow}>
              <Pressable onPress={() => setShowNewModal(false)} style={[styles.modalBtn, styles.modalGhost]}>
                <Text style={styles.modalGhostText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={onNewFile} style={[styles.modalBtn, styles.modalPrimary]}>
                <Text style={styles.modalPrimaryText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  fileTabs: { gap: 8, flexDirection: 'row', paddingBottom: 12, alignItems: 'center' },
  fileTab: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, height: 34, borderRadius: 10, borderWidth: 1, borderColor: tokens.border, backgroundColor: tokens.surface },
  fileTabActive: { backgroundColor: tokens.accent, borderColor: tokens.accent },
  fileTabText: { color: tokens.textMuted, fontSize: 13, fontWeight: '700' },
  fileTabTextActive: { color: '#11110F' },
  fileClose: { width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(0,0,0,0.18)', alignItems: 'center', justifyContent: 'center' },
  fileCloseText: { color: '#11110F', fontSize: 13, fontWeight: '800', marginTop: -1 },
  newTab: { paddingHorizontal: 12, height: 34, borderRadius: 10, borderWidth: 1, borderColor: tokens.border, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  newTabText: { color: tokens.textMuted, fontSize: 12, fontWeight: '700' },
  toolbar: { gap: 8, flexDirection: 'row', paddingBottom: 10 },
  toolChip: { paddingHorizontal: 10, height: 30, borderRadius: 8, backgroundColor: tokens.surfaceRaised, borderWidth: 1, borderColor: tokens.border, alignItems: 'center', justifyContent: 'center' },
  toolChipText: { color: tokens.text, fontSize: 12, fontWeight: '700', fontFamily: 'monospace' },
  actions: { flexDirection: 'row', gap: 8, marginTop: 12, marginBottom: 8 },
  secondaryRow: { flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
  secondaryBtn: { paddingHorizontal: 10, height: 30, borderRadius: 8, borderWidth: 1, borderColor: tokens.border, backgroundColor: tokens.surface, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { color: tokens.textMuted, fontSize: 11, fontWeight: '700' },
  note: { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 12, marginTop: 12 },
  noteTitle: { color: tokens.text, fontSize: 12, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase' },
  noteText: { color: tokens.textMuted, fontSize: 12, lineHeight: 17, marginTop: 6 },
  modalWrap: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modalCard: { width: '100%', maxWidth: 360, backgroundColor: tokens.surface, borderRadius: 16, borderWidth: 1, borderColor: tokens.borderStrong, padding: 16, gap: 10 },
  modalTitle: { color: tokens.text, fontSize: 16, fontWeight: '800' },
  modalSub: { color: tokens.textMuted, fontSize: 12 },
  modalInput: { borderWidth: 1, borderColor: tokens.border, backgroundColor: tokens.surfaceRaised, borderRadius: 10, paddingHorizontal: 12, height: 42, color: tokens.text, fontSize: 14 },
  modalRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  modalBtn: { flex: 1, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  modalGhost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: tokens.border },
  modalGhostText: { color: tokens.textMuted, fontWeight: '700' },
  modalPrimary: { backgroundColor: tokens.accent },
  modalPrimaryText: { color: '#11110F', fontWeight: '800' },
});
