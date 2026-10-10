import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../theme/tokens';
import { popularPackages, categories } from '../data/packages';
import { getInstalledPackages, setInstalledPackages } from '../lib/storage';

export function PackagesScreen() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [installed, setInstalled] = useState<string[]>(['golang.org/x/tools']);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});

  // load
  useState(() => { getInstalledPackages().then(setInstalled); });

  const filtered = popularPackages.filter(p => {
    const okCat = cat === 'All' || p.category === cat;
    const okQ = !q || p.displayName.toLowerCase().includes(q.toLowerCase()) || p.importPath.toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  });

  const toggle = async (id: string) => {
    const isInstalled = installed.includes(id);
    if (isInstalled) {
      const next = installed.filter(x => x !== id);
      setInstalled(next);
      await setInstalledPackages(next);
      return;
    }
    setDownloading(id);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 800));
    const next = [...installed, id];
    setInstalled(next);
    await setInstalledPackages(next);
    setDoneMap(prev => ({ ...prev, [id]: true }));
    setDownloading(null);
    setTimeout(() => setDoneMap(prev => ({ ...prev, [id]: false })), 1800);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <Text style={styles.kicker}>OFFLINE CACHE</Text>
          <Text style={styles.title}>Packages</Text>
          <Text style={styles.sub}>Pick what to cache on onboarding. Everything here works offline after download. Stored in app sandbox.</Text>
          <View style={styles.cacheCard}>
            <View style={styles.cacheRow}>
              <Text style={styles.cacheLabel}>{installed.length} packages cached</Text>
              <Text style={styles.cacheSize}>~ {(installed.length * 0.6).toFixed(1)} MB</Text>
            </View>
            <View style={styles.track}><View style={[styles.fill, { width: `${Math.min(100, installed.length * 5)}%` }]} /></View>
            <Text style={styles.cacheHint}>Cache lives at FileSystem/documentDirectory/go/pkg/mod. Clear from Settings anytime.</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput value={q} onChangeText={setQ} placeholder="Search packages" placeholderTextColor={tokens.textDim} style={styles.input} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {categories.map(c => (
            <Pressable key={c} onPress={() => setCat(c)} style={[styles.chip, cat === c && styles.chipActive]}>
              <Text style={[styles.chipText, cat === c && styles.chipTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={{ gap: 10 }}>
          {filtered.map(pkg => {
            const isInstalled = installed.includes(pkg.id);
            const isDl = downloading === pkg.id;
            const justDone = doneMap[pkg.id];
            return (
              <View key={pkg.id} style={styles.pkgCard}>
                <View style={{ flex: 1 }}>
                  <View style={styles.pkgTop}>
                    <Text style={styles.pkgName}>{pkg.displayName}</Text>
                    <View style={styles.catBadge}><Text style={styles.catText}>{pkg.category}</Text></View>
                    {isInstalled && <View style={styles.doneBadge}><Text style={styles.doneText}>cached</Text></View>}
                  </View>
                  <Text style={styles.pkgPath}>{pkg.importPath}</Text>
                  <Text style={styles.pkgDesc}>{pkg.description}</Text>
                  <View style={styles.pkgMeta}>
                    <Text style={styles.metaText}>{pkg.stars} stars</Text>
                    <Text style={styles.metaDot}>·</Text>
                    <Text style={styles.metaText}>{pkg.size}</Text>
                    {justDone && <Text style={styles.justDone}>  downloaded</Text>}
                  </View>
                </View>
                <Pressable onPress={() => toggle(pkg.id)} disabled={!!isDl} style={[styles.pkgBtn, isInstalled ? styles.btnRemove : styles.btnAdd, isDl && { opacity: 0.6 }]}>
                  <Text style={[styles.btnText, isInstalled ? styles.btnTextRemove : styles.btnTextAdd]}>{isDl ? '...' : isInstalled ? 'Remove' : 'Get'}</Text>
                </Pressable>
              </View>
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
  head: { paddingTop: 18, paddingBottom: 12 },
  kicker: { color: tokens.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: tokens.text, fontSize: 26, fontWeight: '800', letterSpacing: -0.6, marginTop: 6 },
  sub: { color: tokens.textMuted, fontSize: 13, lineHeight: 18, marginTop: 8 },
  cacheCard: { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 12, marginTop: 12 },
  cacheRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cacheLabel: { color: tokens.text, fontSize: 13, fontWeight: '700' },
  cacheSize: { color: tokens.textMuted, fontSize: 12, fontWeight: '600' },
  track: { height: 6, backgroundColor: tokens.surfaceRaised, borderRadius: 3, marginTop: 10, overflow: 'hidden' },
  fill: { height: 6, backgroundColor: tokens.accent, borderRadius: 3 },
  cacheHint: { color: tokens.textDim, fontSize: 11, marginTop: 8, lineHeight: 14 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 10, paddingHorizontal: 12, height: 44, marginTop: 4, marginBottom: 12 },
  searchIcon: { color: tokens.textDim, fontSize: 16, marginRight: 8 },
  input: { flex: 1, color: tokens.text, fontSize: 14 },
  chips: { gap: 8, flexDirection: 'row', paddingBottom: 12 },
  chip: { paddingHorizontal: 14, height: 32, borderRadius: 16, borderWidth: 1, borderColor: tokens.border, backgroundColor: tokens.surface, alignItems: 'center', justifyContent: 'center' },
  chipActive: { backgroundColor: tokens.accent, borderColor: tokens.accent },
  chipText: { color: tokens.textMuted, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#11110F' },
  pkgCard: { flexDirection: 'row', gap: 12, backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 12, alignItems: 'center' },
  pkgTop: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  pkgName: { color: tokens.text, fontSize: 14, fontWeight: '700' },
  catBadge: { backgroundColor: tokens.surfaceRaised, borderWidth: 1, borderColor: tokens.border, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  catText: { color: tokens.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  doneBadge: { backgroundColor: tokens.successSoft, borderWidth: 1, borderColor: 'rgba(61,220,132,0.22)', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  doneText: { color: tokens.success, fontSize: 10, fontWeight: '800' },
  pkgPath: { color: tokens.textDim, fontSize: 11, fontFamily: 'monospace', marginTop: 4 },
  pkgDesc: { color: tokens.textMuted, fontSize: 12, marginTop: 4 },
  pkgMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  metaText: { color: tokens.textDim, fontSize: 11, fontWeight: '600' },
  metaDot: { color: tokens.textDim, marginHorizontal: 6 },
  justDone: { color: tokens.success, fontSize: 11, fontWeight: '700' },
  pkgBtn: { height: 36, paddingHorizontal: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  btnAdd: { backgroundColor: tokens.accent, borderColor: tokens.accent },
  btnRemove: { backgroundColor: 'transparent', borderColor: tokens.borderStrong },
  btnText: { fontSize: 13, fontWeight: '700' },
  btnTextAdd: { color: '#11110F' },
  btnTextRemove: { color: tokens.text },
});
