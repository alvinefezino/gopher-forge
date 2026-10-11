import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../theme/tokens';
import { popularPackages } from '../data/packages';
import { setOnboarded, setInstalledPackages } from '../lib/storage';
import { AppButton } from '../components/ui/Button';

export function OnboardingScreen({ navigation }: any) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>(['net-http', 'golang.org/x/tools', 'gin', 'godotenv']);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const startDownload = async () => {
    setDownloading(true);
    for (let i = 0; i <= 100; i += 2) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 22));
    }
    await setInstalledPackages(selected);
    await setOnboarded();
    navigation.replace('Main');
  };

  if (step === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.hero}>
          <View style={styles.logoWrap}>
            <Text style={styles.logoGlyph}>{'◈'}</Text>
          </View>
          <Text style={styles.kicker}>OFFLINE-FIRST · GO ONLY</Text>
          <Text style={styles.title}>Code Go{'\n'}anywhere.</Text>
          <Text style={styles.sub}>Gopher Forge is your Go playground. Pick your packages once, then build, run, and learn anywhere — no internet needed after setup.</Text>
          <View style={styles.bullets}>
            <View style={styles.bullet}><View style={styles.bulletDot} /><Text style={styles.bulletText}>Editor with tabs, search, and Go highlighting</Text></View>
            <View style={styles.bullet}><View style={styles.bulletDot} /><Text style={styles.bulletText}>Tap Run to see output instantly on your device</Text></View>
            <View style={styles.bullet}><View style={styles.bulletDot} /><Text style={styles.bulletText}>15 tracks · 54 lessons · progress stays on your phone</Text></View>
          </View>
          <AppButton label="Continue" onPress={() => setStep(1)} style={{ marginTop: 20 }} />
          <Text style={styles.foot}>Works fully offline after you cache packages.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 1) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.kicker2}>STEP 2 OF 3</Text>
          <Text style={styles.h2}>Cache your packages</Text>
          <Text style={styles.hint}>Pick the packages you want ready offline. You can add or remove them anytime from the Packages tab.</Text>

          <View style={styles.selectAllRow}>
            <Pressable onPress={() => setSelected(popularPackages.map(p => p.id))} style={styles.selectBtn}><Text style={styles.selectText}>Select all</Text></Pressable>
            <Pressable onPress={() => setSelected([])} style={styles.selectBtn}><Text style={styles.selectText}>Clear</Text></Pressable>
            <Text style={styles.count}>{selected.length} selected</Text>
          </View>

          <View style={{ gap: 10, marginTop: 12 }}>
            {popularPackages.map(pkg => {
              const on = selected.includes(pkg.id);
              return (
                <Pressable key={pkg.id} onPress={() => toggle(pkg.id)} style={[styles.pkgRow, on && styles.pkgRowOn]}>
                  <View style={[styles.check, on && styles.checkOn]}>
                    {on && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pkgName}>{pkg.displayName}</Text>
                    <Text style={styles.pkgPath}>{pkg.importPath}</Text>
                    <Text style={styles.pkgDesc} numberOfLines={2}>{pkg.description}</Text>
                  </View>
                  <Text style={styles.pkgSize}>{pkg.size}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.stickyActions}>
            <AppButton label="Back" onPress={() => setStep(0)} variant="ghost" style={{ flex: 1 }} />
            <AppButton label={`Cache ${selected.length} packages →`} onPress={() => setStep(2)} style={{ flex: 2 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>STEP 3 OF 3</Text>
        <Text style={styles.titleSmall}>Caching {selected.length} packages</Text>
        <Text style={styles.sub}>Getting your packages ready for offline use. This saves them on your device so lessons work without internet.</Text>

        <View style={styles.progressCard}>
          <View style={styles.progressHead}>
            <Text style={styles.progressLabel}>{downloading ? `Downloading ${progress}%` : 'Ready to cache'}</Text>
            <Text style={styles.progressPct}>{progress}%</Text>
          </View>
          <View style={styles.track}><View style={[styles.fill, { width: `${progress}%` }]} /></View>
          <Text style={styles.progressHint}>{downloading ? 'Saving to your device...' : 'Tap Download to save packages for offline use.'}</Text>
        </View>

        {!downloading ? (
          <AppButton label="Download & continue offline" onPress={startDownload} style={{ marginTop: 18 }} />
        ) : (
          <View style={[styles.downloadingBox]}>
            <Text style={styles.downText}>Caching... keep the app open. You will land in the editor next.</Text>
          </View>
        )}

        <Pressable onPress={async () => { await setInstalledPackages(selected); await setOnboarded(); navigation.replace('Main'); }} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip for now →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.bg },
  hero: { flex: 1, padding: 20, justifyContent: 'center' },
  root: { flex: 1, backgroundColor: tokens.bg, paddingHorizontal: 16, paddingTop: 18 },
  logoWrap: { width: 56, height: 56, borderRadius: 14, backgroundColor: tokens.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  logoGlyph: { color: '#11110F', fontSize: 28, fontWeight: '900', marginTop: -2 },
  kicker: { color: tokens.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  kicker2: { color: tokens.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: tokens.text, fontSize: 34, fontWeight: '900', letterSpacing: -1, lineHeight: 36, marginTop: 8 },
  titleSmall: { color: tokens.text, fontSize: 22, fontWeight: '800', letterSpacing: -0.6, marginTop: 8 },
  sub: { color: tokens.textMuted, fontSize: 14, lineHeight: 20, marginTop: 10 },
  bullets: { gap: 10, marginTop: 18 },
  bullet: { flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 10, padding: 12 },
  bulletDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: tokens.accent },
  bulletText: { color: tokens.text, fontSize: 13, flex: 1, lineHeight: 18 },
  foot: { color: tokens.textDim, fontSize: 12, marginTop: 12, textAlign: 'center' },
  h2: { color: tokens.text, fontSize: 24, fontWeight: '800', letterSpacing: -0.6, marginTop: 8 },
  hint: { color: tokens.textMuted, fontSize: 13, lineHeight: 18, marginTop: 8 },
  selectAllRow: { flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 14 },
  selectBtn: { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  selectText: { color: tokens.text, fontSize: 12, fontWeight: '700' },
  count: { color: tokens.textMuted, fontSize: 12, fontWeight: '700', marginLeft: 'auto' },
  pkgRow: { flexDirection: 'row', gap: 12, backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 12, alignItems: 'center' },
  pkgRowOn: { borderColor: tokens.accentBorder, backgroundColor: tokens.accentSoft },
  check: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: tokens.borderStrong, backgroundColor: tokens.surfaceRaised, alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: tokens.accent, borderColor: tokens.accent },
  checkMark: { color: '#11110F', fontSize: 12, fontWeight: '900' },
  pkgName: { color: tokens.text, fontSize: 13, fontWeight: '700' },
  pkgPath: { color: tokens.textDim, fontSize: 11, fontFamily: 'monospace', marginTop: 2 },
  pkgDesc: { color: tokens.textMuted, fontSize: 11, marginTop: 4 },
  pkgSize: { color: tokens.textDim, fontSize: 11, fontWeight: '700' },
  stickyActions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  progressCard: { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: tokens.radiusLg, padding: 14, marginTop: 16 },
  progressHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { color: tokens.text, fontSize: 13, fontWeight: '700' },
  progressPct: { color: tokens.accent, fontSize: 13, fontWeight: '800' },
  track: { height: 8, backgroundColor: tokens.surfaceRaised, borderRadius: 4, marginTop: 12, overflow: 'hidden' },
  fill: { height: 8, backgroundColor: tokens.accent, borderRadius: 4 },
  progressHint: { color: tokens.textDim, fontSize: 11, marginTop: 10, lineHeight: 14 },
  downloadingBox: { backgroundColor: tokens.surfaceRaised, borderWidth: 1, borderColor: tokens.border, borderRadius: 10, padding: 12, marginTop: 18 },
  downText: { color: tokens.textMuted, fontSize: 12, lineHeight: 16, textAlign: 'center' },
  skipBtn: { alignItems: 'center', marginTop: 14, padding: 8 },
  skipText: { color: tokens.textMuted, fontSize: 13, fontWeight: '600' },
});
